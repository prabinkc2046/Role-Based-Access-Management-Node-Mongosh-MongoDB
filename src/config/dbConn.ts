import mongoose from 'mongoose';

export const dbConn = async () => {
  return await mongoose.connect(process.env.MONGO_URI!);
};
