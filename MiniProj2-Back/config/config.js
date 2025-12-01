// Load environment variables from .env file (if it exists)
require('dotenv').config();

module.exports = {
    mongodb: {
        uri: process.env.MONGO_URI || 'mongodb://localhost:27017/animalec',
        collections: {
            animal: 'animals',
            question: 'questions',
            quiz: 'quizzes',
            user: 'users',
            user_levels: "user_levels",
            sponsor: 'sponsors',
            expert: 'experts'
        }
    },
    auth: {
        expiration_time: 15000,
        issuer: "FCA"
    },
    sanitize: {
        alphabet: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyzŠŒŽšœžŸ¥µÀÁÂÃÄÅÆÇÈÉÊËẼÌÍÎÏĨÐÑÒÓÔÕÖØÙÚÛÜÝßàáâãäåæçèéêëẽìíîïĩðñòóôõöøùúûüýÿ\\ ",
        numerical: "0123456789"
    },
    email: {
        service: "Gmail",
        auth: {
            user: "mailserverpw@gmail.com",
            pass: "ttxirdxzkafhcuel"
        }
    }
}