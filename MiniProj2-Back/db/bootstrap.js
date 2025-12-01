const fs = require('fs');
const path = require('path');
const CONFIG = require('../config/config');

/**
 * Database Bootstrap Module
 * Automatically seeds the database with sample data on startup
 * Ensures idempotent behavior - can be run multiple times without creating duplicates
 */

// Map seed files to their corresponding Mongoose models
const SEED_MAPPING = {
    'animalec.animals.json': {
        model: () => require('../models/animal.model'),
        uniqueField: '_id',
        collectionName: 'animals'
    },
    'animalec.users.json': {
        model: () => require('../models/user.model'),
        uniqueField: '_id',
        collectionName: 'users'
    },
    'animalec.user_levels.json': {
        model: () => require('../models/userlevel.model'),
        uniqueField: '_id',
        collectionName: 'user_levels'
    },
    'animalec.experts.json': {
        model: () => require('../models/expert.model'),
        uniqueField: '_id',
        collectionName: 'experts'
    },
    'animalec.sponsors.json': {
        model: () => require('../models/sponsor.model'),
        uniqueField: '_id',
        collectionName: 'sponsors'
    },
    'animalec.questions.json': {
        model: () => require('../models/question.model'),
        uniqueField: '_id',
        collectionName: 'questions'
    },
    'animalec.quizzes.json': {
        model: () => require('../models/quiz.model'),
        uniqueField: '_id',
        collectionName: 'quizzes'
    }
};

/**
 * Transform MongoDB export format to clean objects
 * Handles $oid and $date conversions
 */
function transformDocument(doc) {
    if (!doc || typeof doc !== 'object') return doc;
    
    const transformed = Array.isArray(doc) ? [] : {};
    
    for (const key in doc) {
        const value = doc[key];
        
        // Handle MongoDB $oid format
        if (value && typeof value === 'object' && value.$oid) {
            transformed[key] = value.$oid;
        }
        // Handle MongoDB $date format
        else if (value && typeof value === 'object' && value.$date) {
            transformed[key] = new Date(value.$date);
        }
        // Recursively transform nested objects and arrays
        else if (value && typeof value === 'object') {
            transformed[key] = transformDocument(value);
        }
        else {
            transformed[key] = value;
        }
    }
    
    return transformed;
}

/**
 * Seed a single collection with data from a JSON file
 */
async function seedCollection(filename, config) {
    const seedPath = path.join(__dirname, 'seed', filename);
    
    // Check if seed file exists
    if (!fs.existsSync(seedPath)) {
        console.log(`⚠️  Seed file not found: ${filename}`);
        return { filename, status: 'skipped', reason: 'file not found' };
    }
    
    try {
        // Load and parse seed data
        const rawData = fs.readFileSync(seedPath, 'utf8');
        const seedData = JSON.parse(rawData);
        
        if (!Array.isArray(seedData) || seedData.length === 0) {
            console.log(`⚠️  No data in ${filename}`);
            return { filename, status: 'skipped', reason: 'no data' };
        }
        
        // Get the model
        const Model = config.model();
        
        // Check if collection already has data (unless FORCE_RESEED is enabled)
        const existingCount = await Model.countDocuments();
        const forceReseed = process.env.FORCE_RESEED === 'true';
        
        if (existingCount > 0 && !forceReseed) {
            console.log(`✓ ${config.collectionName} already seeded (${existingCount} documents) - skipping`);
            return { filename, status: 'skipped', reason: 'already seeded', count: existingCount };
        }
        
        // If FORCE_RESEED, clear the collection first
        if (forceReseed && existingCount > 0) {
            await Model.deleteMany({});
            console.log(`🗑️  Cleared ${existingCount} documents from ${config.collectionName}`);
        }
        
        // Transform and upsert each document
        let inserted = 0;
        let updated = 0;
        
        for (const doc of seedData) {
            const transformedDoc = transformDocument(doc);
            
            // Use _id as the unique identifier for upsert
            const filter = { _id: transformedDoc._id };
            
            try {
                const result = await Model.updateOne(
                    filter,
                    { $setOnInsert: transformedDoc },
                    { upsert: true }
                );
                
                if (result.upsertedCount > 0) {
                    inserted++;
                } else if (result.modifiedCount > 0) {
                    updated++;
                }
            } catch (error) {
                console.error(`   ❌ Error upserting document in ${config.collectionName}:`, error.message);
            }
        }
        
        console.log(`✓ ${config.collectionName}: ${inserted} inserted, ${updated} updated`);
        return { filename, status: 'success', inserted, updated };
        
    } catch (error) {
        console.error(`❌ Error seeding ${filename}:`, error.message);
        return { filename, status: 'error', error: error.message };
    }
}

/**
 * Main bootstrap function
 * Seeds all collections defined in SEED_MAPPING
 */
async function bootstrap() {
    console.log('\n🌱 Starting database bootstrap...\n');
    
    const forceReseed = process.env.FORCE_RESEED === 'true';
    if (forceReseed) {
        console.log('⚠️  FORCE_RESEED enabled - will clear and reseed all collections\n');
    }
    
    const results = [];
    
    // Process each seed file sequentially
    for (const [filename, config] of Object.entries(SEED_MAPPING)) {
        const result = await seedCollection(filename, config);
        results.push(result);
    }
    
    // Summary
    console.log('\nBootstrap Summary:');
    const successful = results.filter(r => r.status === 'success');
    const skipped = results.filter(r => r.status === 'skipped');
    const errors = results.filter(r => r.status === 'error');
    
    console.log(`Successful: ${successful.length}`);
    console.log(`Skipped: ${skipped.length}`);
    console.log(`Errors: ${errors.length}`);
    
    if (errors.length > 0) {
        console.log('\nErrors occurred during bootstrap:');
        errors.forEach(e => console.log(`   - ${e.filename}: ${e.error}`));
    }
    
    console.log('\nDatabase bootstrap completed!\n');
}

module.exports = bootstrap;
