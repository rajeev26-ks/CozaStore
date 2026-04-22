import mongoose from "mongoose";

const dbconnect = async( ) => {
try {
    await mongoose.connect("mongodb+srv://rishu:rishu@cluster0.hfitddb.mongodb.net/rishu")
    console.log("Database is connected")
} catch (error) {
    console.log(error)
}
}

export default dbconnect;