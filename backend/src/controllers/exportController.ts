import { Request, Response } from 'express';
import Transaction from '../models/Transaction';
import { createObjectCsvStringifier } from 'csv-writer';

export const exportCSV = async (req: Request, res: Response) => {
  try {
    const { columns, filters } = req.body;
    const query: any = filters || {};
    const transactions = await Transaction.find(query).lean();
    const csvStringifier = createObjectCsvStringifier({
      header: columns.map((col: string) => ({ id: col, title: col.toUpperCase() }))
    });
    const csv = csvStringifier.getHeaderString() + csvStringifier.stringifyRecords(transactions.map((t: any) => {
      const obj: any = {};
      columns.forEach((col: string) => { obj[col] = t[col]; });
      return obj;
    }));
    res.setHeader('Content-disposition', 'attachment; filename=transactions.csv');
    res.set('Content-Type', 'text/csv');
    res.status(200).send(csv);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};
