module.exports = (app, callback) => {
    const CONFIG = require('../config/config');
    const bootstrap = require('../db/bootstrap');
    
    //Connect to DB
    const mongoose = require('mongoose');
    let settings = {
        reconnectTries: Number.MAX_VALUE,
        autoReconnect: true,
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
        useCreateIndex: true
    };
    global.mongoConnection = mongoose.createConnection(CONFIG.mongodb.uri, settings, async (error) => {
        if (error) throw error;
        console.log('---Connected to DB');
        
        // Run database bootstrap to seed collections
        try {
            await bootstrap();
        } catch (bootstrapError) {
            console.error('Bootstrap error:', bootstrapError);
            // Don't throw - allow app to continue even if bootstrap fails
        }
        
        return callback();
    })

}