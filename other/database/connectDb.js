const { connect } = require('mongoose'), // Deconstructuring { }

    connDb = async () => { // Inside an async function we can use the try/catch block and the await keyword 

        try {

            await connect(process.env.MONGO_URI)

        } catch (error) {

            throw new Error(error)

        }
    }

// Exporting connDb function to app.js
module.exports = connDb;
