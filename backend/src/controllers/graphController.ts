import { Request, Response } from 'express';
import Transaction from '../models/Transaction';

const groupBy = (array: any[], keyGetter: (item: any) => string) => {
	const map = new Map();
	array.forEach((item) => {
		const key = keyGetter(item);
		const collection = map.get(key);
		if (!collection) map.set(key, [item]);
		else collection.push(item);
	});
	return map;
};

export const getGraphData = async (req: Request, res: Response) => {
	const { x, y } = req.query as { x: string; y: string };

	try {
		const transactions = await Transaction.find();

		// Grouping function
		let grouped: Map<string, any[]>;

		if (x === 'month') {
			grouped = groupBy(transactions, (t) => new Date(t.date).toLocaleString('default', { month: 'short', year: 'numeric' }));
		} else if (x === 'week') {
			grouped = groupBy(transactions, (t) => {
				const date = new Date(t.date);
				const week = Math.ceil(date.getDate() / 7);
				return `${date.toLocaleString('default', { month: 'short' })} W${week}`;
			});
		} else if (x === 'people') {
			grouped = groupBy(transactions, (t) => t.user);
		} else {
			return res.status(400).json({ error: 'Invalid x-axis type' });
		}

		// Process y value
		const data = Array.from(grouped, ([label, group]) => {
			if (y === 'revenue') {
				const value = group
					.filter((t) => t.category.toLowerCase() === 'revenue')
					.reduce((acc, curr) => acc + curr.amount, 0);
				return { label, value };
			} else if (y === 'expense') {
				const value = group
					.filter((t) => t.category.toLowerCase() === 'expense')
					.reduce((acc, curr) => acc + curr.amount, 0);
				return { label, value };
			} else if (y === 'transactions') {
				return { label, value: group.length };
			} else {
				return { label, value: 0 };
			}
		});

		res.json({ data });
	} catch (err) {
		console.error(err);
		res.status(500).json({ error: 'Server error', details: err });
	}
};
