import mongoose from 'mongoose';

async function dbConnection() {
  try {
    const DB_URI = process.env.DATABASE_URI;
    if(!DB_URI){
      throw new Error("DATABASE_URI is missing");
    }

    const conn = await mongoose.connect(DB_URI);
    console.log(`DATABASE CONNECTED: ${conn.connection.host}`);
  } 
  catch (err) {
    console.error("something went wrong while connecting to DB", err);
    process.exit(1);
  }
}

export default dbConnection;
