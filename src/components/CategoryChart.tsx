import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';
import { Download, FileBarChart2 } from 'lucide-react';

// Accept transactions as a prop
export const CategoryChart = ({ transactions }) => {
  // Group expenses by category
  const categoryMap = {};
  transactions.filter(t => t.category === 'Expense').forEach(t => {
    categoryMap[t.status] = categoryMap[t.status] || 0;
    categoryMap[t.status] += t.amount;
  });
  // If you want to group by a different field, change above
  const brightColors = ['#facc15', '#38bdf8', '#4ade80', '#fde047', '#60d394']; // yellow, blue, green, light yellow, light green
  const data = Object.entries(categoryMap).map(([name, value], i) => ({
    name,
    value,
    color: brightColors[i % brightColors.length]
  }));
  return (
    <Card className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 hover-scale card-hover">
      <CardHeader>
        <div className="flex justify-between items-center">
          <div>
            <CardTitle className="text-gray-900 dark:text-white bg-gradient-to-r from-yellow-400 via-blue-400 to-green-400 bg-clip-text text-transparent">
              Expense Categories
            </CardTitle>
            <CardDescription className="text-gray-600 dark:text-gray-400">
              Breakdown of expenses by status
            </CardDescription>
          </div>
          <div className="flex gap-2">
            <button
              title="Download CSV"
              className="p-2 rounded hover:bg-blue-100 dark:hover:bg-blue-900"
              onClick={() => {
                const csvRows = [
                  'Category,Value',
                  ...data.map(row => `${row.name},${row.value}`)
                ];
                const blob = new Blob([csvRows.join('\n')], { type: 'text/csv' });
                const url = URL.createObjectURL(blob);
                const a = document.createElement('a');
                a.href = url;
                a.download = 'expense-categories.csv';
                a.click();
                URL.revokeObjectURL(url);
              }}
            >
              <Download className="h-5 w-5 text-blue-500" />
            </button>
            <button
              title="Generate PPT"
              className="p-2 rounded hover:bg-yellow-100 dark:hover:bg-yellow-900"
              onClick={() => alert('PPT will be generated based on the graphical analysis.')}
            >
              <FileBarChart2 className="h-5 w-5 text-yellow-500" />
            </button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                outerRadius={80}
                fill="#facc15"
                dataKey="value"
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: '#fff',
                  border: '1px solid #e5e7eb',
                  borderRadius: '8px',
                  color: '#334155',
                  boxShadow: '0 10px 25px rgba(34,197,94,0.15)'
                }} 
              />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};
