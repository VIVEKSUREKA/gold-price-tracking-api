import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

async function connect() {
  try {
    await mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true });
    console.log('Connected to MongoDB');
  } catch (error) {
    console.error('Failed to connect to MongoDB', error);
  }
}

export default connect;