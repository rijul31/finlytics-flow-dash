import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Search, Filter, Download, ArrowUpDown } from 'lucide-react';
import { ExportModal } from './ExportModal';

// Accept transactions and filters as props
interface TransactionFilters {
  search?: string;
  category?: string;
  status?: string;
  type?: string;
  sortBy?: string;
  dateFrom?: Date | null;
  dateTo?: Date | null;
  amountMin?: string;
  amountMax?: string;
  user?: string;
}

export const TransactionTable = ({ transactions = [], filters = {} as TransactionFilters }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [showExportModal, setShowExportModal] = useState(false);
  const [sortConfig, setSortConfig] = useState<{key: string, direction: 'asc' | 'desc'} | null>(null);

  // Filtering logic
  let filteredTransactions = transactions;
  if (filters.search) {
    filteredTransactions = filteredTransactions.filter(transaction =>
      (transaction.name ? transaction.name.toLowerCase().includes(filters.search.toLowerCase()) : true) ||
      (transaction.category ? transaction.category.toLowerCase().includes(filters.search.toLowerCase()) : true)
    );
  }
  if (filters.category) {
    filteredTransactions = filteredTransactions.filter(transaction => transaction.category === filters.category);
  }
  if (filters.status) {
    filteredTransactions = filteredTransactions.filter(transaction => transaction.status === filters.status);
  }
  if (filters.type) {
    filteredTransactions = filteredTransactions.filter(transaction => transaction.type === filters.type);
  }
  if (filters.user) {
    filteredTransactions = filteredTransactions.filter(transaction => transaction.user_id?.toLowerCase().includes(filters.user.toLowerCase()));
  }
  if (filters.amountMin) {
    filteredTransactions = filteredTransactions.filter(transaction => Number(transaction.amount) >= Number(filters.amountMin));
  }
  if (filters.amountMax) {
    filteredTransactions = filteredTransactions.filter(transaction => Number(transaction.amount) <= Number(filters.amountMax));
  }
  if (filters.dateFrom) {
    filteredTransactions = filteredTransactions.filter(transaction => new Date(transaction.date) >= new Date(filters.dateFrom));
  }
  if (filters.dateTo) {
    filteredTransactions = filteredTransactions.filter(transaction => new Date(transaction.date) <= new Date(filters.dateTo));
  }
  // Sorting
  if (filters.sortBy) {
    filteredTransactions = [...filteredTransactions].sort((a, b) => {
      if (filters.sortBy === 'amount') {
        return Number(a.amount) - Number(b.amount);
      } else if (filters.sortBy === 'date') {
        return new Date(a.date).getTime() - new Date(b.date).getTime();
      } else if (filters.sortBy === 'name') {
        return (a.name || '').localeCompare(b.name || '');
      }
      return 0;
    });
  }

  return (
    <>
      <Card className="bg-gray-800 border-gray-700">
        <CardHeader>
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <CardTitle className="text-white">Transactions</CardTitle>
              <CardDescription className="text-gray-400">
                Manage your financial transactions
              </CardDescription>
            </div>
            <div className="flex items-center space-x-2">
              <Button 
                onClick={() => setShowExportModal(true)}
                className="bg-green-600 hover:bg-green-700 text-white"
              >
                <Download className="h-4 w-4 mr-2" />
                Export
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-700">
                  <th className="text-left py-3 px-4 text-gray-400 font-medium">
                    <button 
                      onClick={() => handleSort('name')}
                      className="flex items-center space-x-1 hover:text-white"
                    >
                      <span>Name</span>
                      <ArrowUpDown className="h-4 w-4" />
                    </button>
                  </th>
                  <th className="text-left py-3 px-4 text-gray-400 font-medium">
                    <button 
                      onClick={() => handleSort('date')}
                      className="flex items-center space-x-1 hover:text-white"
                    >
                      <span>Date</span>
                      <ArrowUpDown className="h-4 w-4" />
                    </button>
                  </th>
                  <th className="text-left py-3 px-4 text-gray-400 font-medium">
                    <button 
                      onClick={() => handleSort('amount')}
                      className="flex items-center space-x-1 hover:text-white"
                    >
                      <span>Amount</span>
                      <ArrowUpDown className="h-4 w-4" />
                    </button>
                  </th>
                  <th className="text-left py-3 px-4 text-gray-400 font-medium">Status</th>
                </tr>
              </thead>
              <tbody>
                {filteredTransactions.map((transaction) => (
                  <tr key={transaction.id} className="border-b border-gray-700 hover:bg-gray-750">
                    <td className="py-4 px-4">
                      <div className="flex items-center space-x-3">
                        <Avatar className="h-8 w-8">
                          <AvatarImage src={transaction.user_profile || "/placeholder-avatar.jpg"} />
                          <AvatarFallback className="bg-gray-700 text-white text-xs">
                            {(transaction.name ? transaction.name.split(' ').map(n => n[0]).join('') : (transaction.user_id || 'U'))}
                          </AvatarFallback>
                        </Avatar>
                        <span className="text-white">{transaction.name || transaction.user_id || 'User'}</span>
                      </div>
                    </td>
                    <td className="py-4 px-4 text-gray-300">{transaction.date}</td>
                    <td className={`py-4 px-4 font-medium ${
                      transaction.category === 'Revenue' ? 'text-green-500' : 'text-red-500'
                    }`}>
                      {transaction.amount.toLocaleString(undefined, { style: 'currency', currency: 'USD' })}
                    </td>
                    <td className="py-4 px-4">
                      <Badge 
                        variant={transaction.status === 'Paid' ? 'default' : 'secondary'}
                        className={
                          transaction.status === 'Paid' 
                            ? 'bg-green-600 text-white' 
                            : 'bg-yellow-600 text-white'
                        }
                      >
                        {transaction.status}
                      </Badge>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      <ExportModal 
        isOpen={showExportModal} 
        onClose={() => setShowExportModal(false)} 
        transactions={transactions}
      />
    </>
  );
};
