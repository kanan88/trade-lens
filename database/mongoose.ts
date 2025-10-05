import mongoose from 'mongoose'

const MONGODB_URI = process.env.MONGODB_URI

declare global {
  var mongooseCache: {
    conn: typeof mongoose | null
    promise: Promise<typeof mongoose> | null
  }
}

let cached = global.mongooseCache

if (!cached) {
  cached = global.mongooseCache = { conn: null, promise: null }
}

export const connectToDatabase = async () => {
  if (!MONGODB_URI)
    throw new Error(
      'Please define the MONGODB_URI environment variable inside .env.local'
    )

  if (cached.conn) return cached.conn

  if (!cached.promise) {
    const opts = {
      bufferCommands: false,
      useNewUrlParser: true,
      useUnifiedTopology: true
    }

    cached.promise = mongoose
      .connect(MONGODB_URI, opts)
      .then(mongoose => mongoose)
  }
  try {
    cached.conn = await cached.promise
  } catch (err) {
    cached.promise = null
    throw err
  }

  console.log(`Connected to database ${process.env.NODE_ENV} - ${MONGODB_URI}`)

  return cached.conn
}
