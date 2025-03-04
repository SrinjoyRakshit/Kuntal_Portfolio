import mongoose from "mongoose";

const dbConnection = () => {
    mongoose.connect(process.env.MONGO_URI, {
        dbName: 'KUNTAL_PORTFOLIO'
    }).then(() => {
        console.log('Connected to MongoDB')
    }).catch(err => console.error(err))
}

export default dbConnection;