import mongoose from 'mongoose';

async function DBConnection() {
    try {
        await mongoose.connect(process.env.DB_URL);
        console.log("db connection established");
    } catch (error) {
        console.log("db connection error: " + error);
    }
}

export default DBConnection;