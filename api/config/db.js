const mongoose = require('mongoose');


const connectToDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI);
        console.log(`MongoDb connected: ${conn.connection.host}`.cyan.underline.bold);
    } catch (e) {
        console.log(e);
        process.exit(1)
    }
}

module.exports = connectToDB;
