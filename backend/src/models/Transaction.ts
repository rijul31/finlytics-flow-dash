import mongoose, { Document, Schema } from 'mongoose';

export interface ITransaction extends Document {
  date: Date;
  amount: number;
  category: string;
  status: string;
  user: string;
  description?: string;
}

const TransactionSchema = new Schema<ITransaction>({
  date: { type: Date, required: true },
  amount: { type: Number, required: true },
  category: { type: String, required: true },
  status: { type: String, required: true },
  user: { type: String, required: true },
  description: { type: String },
});

export default mongoose.model<ITransaction>('Transaction', TransactionSchema);
