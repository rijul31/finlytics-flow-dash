import { Request, Response } from 'express';
import Transaction from '../models/Transaction';

export const getTransactions = async (req: Request, res: Response) => {
  // Filtering, sorting, pagination, and search logic here
  try {
    const { page = 1, limit = 10, search = '', sort = 'date', order = 'desc', ...filters } = req.query;
    const query: any = {};
    if (search) {
      query.$or = [
        { category: { $regex: search, $options: 'i' } },
        { status: { $regex: search, $options: 'i' } },
        { user: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } },
      ];
    }
    Object.keys(filters).forEach((key) => {
      if (filters[key]) query[key] = filters[key];
    });
    const transactions = await Transaction.find(query)
      .sort({ [sort as string]: order === 'desc' ? -1 : 1 })
      .skip((+page - 1) * +limit)
      .limit(+limit);
    const total = await Transaction.countDocuments(query);
    res.json({ transactions, total });
  } catch (err) {
    console.error('Get Transactions Error:', err);
    res.status(500).json({ message: 'Server error', error: err instanceof Error ? err.message : err });
  }
};

export const createTransaction = async (req: Request, res: Response) => {
  try {
    const transaction = new Transaction(req.body);
    await transaction.save();
    res.status(201).json(transaction);
  } catch (err) {
    console.error('Create Transaction Error:', err);
    res.status(500).json({ message: 'Server error', error: err instanceof Error ? err.message : err });
  }
};

export const updateTransaction = async (req: Request, res: Response) => {
  try {
    const transaction = await Transaction.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!transaction) return res.status(404).json({ message: 'Not found' });
    res.json(transaction);
  } catch (err) {
    console.error('Update Transaction Error:', err);
    res.status(500).json({ message: 'Server error', error: err instanceof Error ? err.message : err });
  }
};

export const deleteTransaction = async (req: Request, res: Response) => {
  try {
    const transaction = await Transaction.findByIdAndDelete(req.params.id);
    if (!transaction) return res.status(404).json({ message: 'Not found' });
    res.json({ message: 'Deleted' });
  } catch (err) {
    console.error('Delete Transaction Error:', err);
    res.status(500).json({ message: 'Server error', error: err instanceof Error ? err.message : err });
  }
};

// Customizable Graph Data Endpoint
export const getTransactionGraphData = async (req: Request, res: Response) => {
  try {
    const { x = 'month', y = 'revenue' } = req.query;
    // Fetch all transactions
    const transactions = await Transaction.find({});
    let grouped: any = {};

    // Grouping logic for x axis
    transactions.forEach((t: any) => {
      let xKey = '';
      if (x === 'month') {
        xKey = t.date ? t.date.toISOString().slice(0, 7) : 'Unknown';
      } else if (x === 'week') {
        const d = new Date(t.date);
        const onejan = new Date(d.getFullYear(), 0, 1);
        const week = Math.ceil((((d.getTime() - onejan.getTime()) / 86400000) + onejan.getDay() + 1) / 7);
        xKey = `${d.getFullYear()}-W${week}`;
      } else if (x === 'people') {
        xKey = t.user || 'Unknown';
      } else {
        xKey = 'Unknown';
      }
      if (!grouped[xKey]) grouped[xKey] = { label: xKey, revenue: 0, expense: 0, transactions: 0 };
      grouped[xKey].revenue += t.category === 'revenue' ? t.amount : 0;
      grouped[xKey].expense += t.category === 'expense' ? t.amount : 0;
      grouped[xKey].transactions += 1;
    });
    // Prepare data for the selected y axis
    const data = Object.values(grouped).map((g: any) => ({
      label: g.label,
      value: y === 'revenue' ? g.revenue : y === 'expense' ? g.expense : g.transactions,
    }));
    res.json({ data });
  } catch (err) {
    console.error('Get Transaction Graph Data Error:', err);
    res.status(500).json({ message: 'Server error', error: err instanceof Error ? err.message : err });
  }
};
