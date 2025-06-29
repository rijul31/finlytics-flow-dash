import { Request, Response } from 'express';
import Transaction from '../models/Transaction';

export const getAnalytics = async (req: Request, res: Response) => {
  try {
    // Example: revenue vs expenses, category breakdown, summary metrics
    const revenue = await Transaction.aggregate([
      { $match: { amount: { $gt: 0 } } },
      { $group: { _id: null, total: { $sum: '$amount' } } }
    ]);
    const expenses = await Transaction.aggregate([
      { $match: { amount: { $lt: 0 } } },
      { $group: { _id: null, total: { $sum: '$amount' } } }
    ]);
    const byCategory = await Transaction.aggregate([
      { $group: { _id: '$category', total: { $sum: '$amount' } } }
    ]);
    res.json({
      revenue: revenue[0]?.total || 0,
      expenses: expenses[0]?.total || 0,
      byCategory
    });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};
