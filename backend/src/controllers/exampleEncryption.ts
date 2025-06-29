import { Request, Response } from 'express';
import Transaction from '../models/Transaction';
import crypto from 'crypto';

const ENCRYPTION_KEY = process.env.ENCRYPTION_KEY || 'your-32-byte-key-here-1234567890123456'; // 32 bytes
const IV_LENGTH = 16;

function encrypt(text: string) {
  let iv = crypto.randomBytes(IV_LENGTH);
  let cipher = crypto.createCipheriv('aes-256-cbc', Buffer.from(ENCRYPTION_KEY), iv);
  let encrypted = cipher.update(text, 'utf8', 'hex');
  encrypted += cipher.final('hex');
  return iv.toString('hex') + ':' + encrypted;
}

function decrypt(text: string) {
  let [ivHex, encrypted] = text.split(':');
  let iv = Buffer.from(ivHex, 'hex');
  let decipher = crypto.createDecipheriv('aes-256-cbc', Buffer.from(ENCRYPTION_KEY), iv);
  let decrypted = decipher.update(encrypted, 'hex', 'utf8');
  decrypted += decipher.final('utf8');
  return decrypted;
}

// Example usage in controller:
export const createTransaction = async (req: Request, res: Response) => {
  try {
    // Encrypt sensitive fields
    const encryptedTransaction = {
      ...req.body,
      user: encrypt(req.body.user),
      description: req.body.description ? encrypt(req.body.description) : undefined,
    };
    const transaction = new Transaction(encryptedTransaction);
    await transaction.save();
    res.status(201).json(transaction);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err instanceof Error ? err.message : err });
  }
};

export const getTransactions = async (req: Request, res: Response) => {
  try {
    const transactions = await Transaction.find({});
    // Decrypt sensitive fields
    const decrypted = transactions.map(t => ({
      ...t.toObject(),
      user: decrypt(t.user),
      description: t.description ? decrypt(t.description) : undefined,
    }));
    res.json(decrypted);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err instanceof Error ? err.message : err });
  }
};
