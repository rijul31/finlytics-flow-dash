import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Download, FileBarChart2 } from 'lucide-react';

// Accept transactions as a prop
export const OverviewChart = ({ transactions }) => {
  // Group by month and sum income/expenses
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  const data = months.map((month, idx) => {
    const monthTrans = transactions.filter(t => new Date(t.date).getMonth() === idx);
    const income = monthTrans.filter(t => t.category === 'Revenue').reduce((sum, t) => sum + t.amount, 0);
    const expenses = monthTrans.filter(t => t.category === 'Expense').reduce((sum, t) => sum + t.amount, 0);
    return { name: month, income, expenses };
  });
  return (
    <Card className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 hover-scale card-hover">
      <CardHeader>
        <div className="flex justify-between items-center">
          <div>
            <CardTitle className="text-gray-900 dark:text-white bg-gradient-to-r from-yellow-400 via-blue-400 to-green-400 bg-clip-text text-transparent">
              Overview
            </CardTitle>
            <CardDescription className="text-gray-600 dark:text-gray-400">
              Monthly income vs expenses
            </CardDescription>
          </div>
          <div className="flex gap-2">
            <button
              title="Generate PPT"
              className="p-2 rounded hover:bg-yellow-100 dark:hover:bg-yellow-900"
              onClick={() => alert('PPT will be generated based on the graphical analysis.')}
            >
              <FileBarChart2 className="h-5 w-5 text-yellow-500" />
            </button>
            <button
              title="Download CSV"
              className="p-2 rounded hover:bg-blue-100 dark:hover:bg-blue-900"
              onClick={() => {
                const csvRows = [
                  'Month,Income,Expenses',
                  ...data.map(row => `${row.name},${row.income},${row.expenses}`)
                ];
                const blob = new Blob([csvRows.join('\n')], { type: 'text/csv' });
                const url = URL.createObjectURL(blob);
                const a = document.createElement('a');
                a.href = url;
                a.download = 'overview.csv';
                a.click();
                URL.revokeObjectURL(url);
              }}
            >
              <Download className="h-5 w-5 text-blue-500" />
            </button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis dataKey="name" stroke="#334155" />
              <YAxis stroke="#334155" />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: '#fff',
                  border: '1px solid #e5e7eb',
                  borderRadius: '8px',
                  color: '#334155',
                  boxShadow: '0 10px 25px rgba(34,197,94,0.15)'
                }} 
              />
              <Line 
                type="monotone" 
                dataKey="income" 
                stroke="#facc15" 
                strokeWidth={3}
                name="Income (Yellow)"
                dot={{ fill: '#facc15', strokeWidth: 2, r: 4 }}
              />
              <Line 
                type="monotone" 
                dataKey="expenses" 
                stroke="#38bdf8" 
                strokeWidth={3}
                name="Expenses (Blue)"
                dot={{ fill: '#38bdf8', strokeWidth: 2, r: 4 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};
