import mongoose from "mongoose";
const uri = "mongodb+srv://dana:1234@cluster0.fn9p6zs.mongodb.net/socketNote";
mongoose.set("strictQuery", false);
export const connectDB = async() => {
    try {
        const db = await mongoose.connect(uri);
        console.log(`Database ${db.connection.name} connected`);
    } catch (error) {
        console.log("Connection to DB error: " + error.message);
    }
};