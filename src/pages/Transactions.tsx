import { useState } from 'react';
import { Sidebar } from '@/components/Sidebar';
import { Header } from '@/components/Header';
import { TransactionTable } from '@/components/TransactionTable';
import { TransactionFilters } from '@/components/TransactionFilters';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus, Download } from 'lucide-react';
import transactionsData from '@/lib/hardcodedTransactions';

const defaultFilters = {
  search: '',
  category: '',
  status: '',
  type: '',
  sortBy: '',
  dateFrom: null,
  dateTo: null,
  amountMin: '',
  amountMax: '',
  user: ''
};

const Transactions = () => {
  const [filters, setFilters] = useState(defaultFilters);
  const [appliedFilters, setAppliedFilters] = useState(defaultFilters);

  const handleApplyFilters = () => setAppliedFilters(filters);
  const handleClearFilters = () => {
    setFilters(defaultFilters);
    setAppliedFilters(defaultFilters);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="flex">
        <Sidebar />
        <div className="flex-1 ml-64">
          <Header />
          <main className="p-6">
            <div className="mb-8">
              <div className="flex justify-between items-center mb-4">
                <div>
                  <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                    Transaction Management
                  </h1>
                  <p className="text-gray-600 dark:text-gray-400">
                    Manage and analyze all your financial transactions
                  </p>
                </div>
                <div className="flex space-x-3">
                  <Button className="bg-green-600 hover:bg-green-700 text-white">
                    <Plus className="h-4 w-4 mr-2" />
                    Add Transaction
                  </Button>
                </div>
              </div>

              {/* Transaction Statistics */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                <Card className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
                  <CardContent className="p-4">
                    <div className="text-2xl font-bold text-green-600">1,247</div>
                    <div className="text-sm text-gray-500">Total Transactions</div>
                  </CardContent>
                </Card>
                <Card className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
                  <CardContent className="p-4">
                    <div className="text-2xl font-bold text-blue-600">$45,231</div>
                    <div className="text-sm text-gray-500">Total Value</div>
                  </CardContent>
                </Card>
                <Card className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
                  <CardContent className="p-4">
                    <div className="text-2xl font-bold text-orange-600">23</div>
                    <div className="text-sm text-gray-500">Pending</div>
                  </CardContent>
                </Card>
                <Card className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
                  <CardContent className="p-4">
                    <div className="text-2xl font-bold text-red-600">5</div>
                    <div className="text-sm text-gray-500">Failed</div>
                  </CardContent>
                </Card>
              </div>
            </div>

            {/* Filters - always visible */}
            <div className="mb-6">
              <TransactionFilters
                filters={filters}
                onChange={setFilters}
                onApply={handleApplyFilters}
                onClear={handleClearFilters}
              />
            </div>

            {/* Transaction Table */}
            <TransactionTable filters={appliedFilters} transactions={transactionsData} />
          </main>
        </div>
      </div>
    </div>
  );
};

export default Transactions;
