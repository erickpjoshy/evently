
import mongoose from 'mongoose'
const MONGODB_URI = process.env.MONGODB_URI;
let cached = (global as any).mongoose || {conn : null ,promise :null};

export const connectToDatabase = async () => {
    console.log('Connecting to MongoDB...'); 
    if(cached.conn) return cached.conn;

    console.log('Connecting to MongoDB...'); 
    if(!MONGODB_URI) throw new Error('MONGOSB URI is missing');

    cached.promise = cached.promise || mongoose.connect(MONGODB_URI,{
        dbName : 'evently',
        bufferCommands : false
    })
    console.log('db connected succesfully');
    cached.conn = await cached.promise;

    return cached.conn;
}