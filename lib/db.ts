import mongoose, {Connection} from 'mongoose';

// we need to do some different config because nextjs use edge server
// when hot reload happen - multiple db connection can be created


// add mongoose in global
declare global {
  var mongoose: {
    conn: Connection | null
    promise: Promise<Connection> | null
  }
}

const MONGODB_URI = process.env.DATABASE_URI;
if(!MONGODB_URI){
  throw new Error("DATABASE_URI is missing")
}

// first check the connection in global
let cached = global.mongoose;

// if connection is not then make all null
if(!cached){
  cached = global.mongoose = {
    conn: null,
    promise: null
  }
}

async function dbConnection() {
  if(cached.conn){
    return cached.conn;
  }

  if(!cached.promise){
    cached.promise = mongoose.connect(MONGODB_URI!).then(() => mongoose.connection)
  }

  try {
    cached.conn = await cached.promise;
  } 
  catch (err) {
    console.error("something went wrong while connecting to DB", err);
  }

  return cached.conn;
}

export default dbConnection;
