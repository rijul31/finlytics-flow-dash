import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { DollarSign, TrendingUp, TrendingDown, PiggyBank, Users, CreditCard } from 'lucide-react';
import { Sidebar } from '@/components/Sidebar';
import { OverviewChart } from '@/components/OverviewChart';
import { TransactionTable } from '@/components/TransactionTable';
import { RecentTransactions } from '@/components/RecentTransactions';
import { CategoryChart } from '@/components/CategoryChart';
import { RevenueChart } from '@/components/RevenueChart';
import { Header } from '@/components/Header';
import { TransactionFilters } from '@/components/TransactionFilters';
import transactions from '@/lib/hardcodedTransactions';

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

function applyFilters(transactions, filters) {
  let filtered = transactions;
  if (filters.search) {
    filtered = filtered.filter(t =>
      (t.name ? t.name.toLowerCase().includes(filters.search.toLowerCase()) : false) ||
      (t.user_id ? t.user_id.toLowerCase().includes(filters.search.toLowerCase()) : false) ||
      (t.category ? t.category.toLowerCase().includes(filters.search.toLowerCase()) : false)
    );
  }
  if (filters.category) filtered = filtered.filter(t => t.category === filters.category);
  if (filters.status) filtered = filtered.filter(t => t.status === filters.status);
  if (filters.type) filtered = filtered.filter(t => t.type === filters.type);
  if (filters.user) filtered = filtered.filter(t => t.user_id?.toLowerCase().includes(filters.user.toLowerCase()));
  if (filters.amountMin) filtered = filtered.filter(t => Number(t.amount) >= Number(filters.amountMin));
  if (filters.amountMax) filtered = filtered.filter(t => Number(t.amount) <= Number(filters.amountMax));
  if (filters.dateFrom) filtered = filtered.filter(t => new Date(t.date) >= new Date(filters.dateFrom));
  if (filters.dateTo) filtered = filtered.filter(t => new Date(t.date) <= new Date(filters.dateTo));
  if (filters.sortBy) {
    filtered = [...filtered].sort((a, b) => {
      if (filters.sortBy === 'amount') return Number(a.amount) - Number(b.amount);
      if (filters.sortBy === 'date') return new Date(a.date).getTime() - new Date(b.date).getTime();
      if (filters.sortBy === 'name') return (a.name || '').localeCompare(b.name || '');
      return 0;
    });
  }
  return filtered;
}

function getTotalBalance(transactions) {
  const revenue = transactions.filter(t => t.category === 'Revenue').reduce((sum, t) => sum + t.amount, 0);
  const expense = transactions.filter(t => t.category === 'Expense').reduce((sum, t) => sum + t.amount, 0);
  return revenue - expense;
}
function getTotalRevenue(transactions) {
  return transactions.filter(t => t.category === 'Revenue').reduce((sum, t) => sum + t.amount, 0);
}
function getTotalExpense(transactions) {
  return transactions.filter(t => t.category === 'Expense').reduce((sum, t) => sum + t.amount, 0);
}
function getActiveUsers(transactions) {
  return new Set(transactions.map(t => t.user_id)).size;
}
function getTransactionCount(transactions) {
  return transactions.length;
}

const Dashboard = () => {
  const [filters, setFilters] = useState(defaultFilters);
  const [appliedFilters, setAppliedFilters] = useState(defaultFilters);
  const handleApplyFilters = () => setAppliedFilters(filters);
  const handleClearFilters = () => {
    setFilters(defaultFilters);
    setAppliedFilters(defaultFilters);
  };
  const filteredTransactions = applyFilters(transactions, appliedFilters);

  const stats = [
    {
      title: "Total Balance",
      value: `$${getTotalBalance(filteredTransactions).toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}`,
      change: "-",
      icon: DollarSign,
      color: "text-green-500",
      bgColor: "bg-green-50 dark:bg-green-900/20"
    },
    {
      title: "Revenue",
      value: `$${getTotalRevenue(filteredTransactions).toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}`,
      change: "-",
      icon: TrendingUp,
      color: "text-blue-500",
      bgColor: "bg-blue-50 dark:bg-blue-900/20"
    },
    {
      title: "Expenses",
      value: `$${getTotalExpense(filteredTransactions).toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}`,
      change: "-",
      icon: TrendingDown,
      color: "text-red-500",
      bgColor: "bg-red-50 dark:bg-red-900/20"
    },
    {
      title: "Active Users",
      value: getActiveUsers(filteredTransactions).toString(),
      change: "-",
      icon: Users,
      color: "text-orange-500",
      bgColor: "bg-orange-50 dark:bg-orange-900/20"
    },
    {
      title: "Transactions",
      value: getTransactionCount(filteredTransactions).toString(),
      change: "-",
      icon: CreditCard,
      color: "text-cyan-500",
      bgColor: "bg-cyan-50 dark:bg-cyan-900/20"
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="flex">
        <Sidebar />
        <div className="flex-1 ml-64">
          <Header />
          <main className="p-6 space-y-6">
            {/* Welcome Section */}
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                Financial Analytics Dashboard
              </h1>
              <p className="text-gray-600 dark:text-gray-400">
                Welcome back! Here's your comprehensive financial overview and analytics.
              </p>
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

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
              {stats.map((stat, index) => (
                <Card key={index} className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 hover:shadow-lg transition-shadow duration-200">
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium text-gray-600 dark:text-gray-400">
                      {stat.title}
                    </CardTitle>
                    <div className={`p-2 rounded-full ${stat.bgColor}`}>
                      <stat.icon className={`h-4 w-4 ${stat.color}`} />
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold text-gray-900 dark:text-white mb-1">
                      {stat.value}
                    </div>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      {stat.change}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Charts Section */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
              <OverviewChart transactions={filteredTransactions} />
              <CategoryChart transactions={filteredTransactions} />
            </div>

            {/* Revenue Chart */}
            <div className="mb-8">
              <RevenueChart transactions={filteredTransactions} />
            </div>

            {/* Transaction Management */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
              <div className="lg:col-span-2">
                <TransactionTable transactions={filteredTransactions} filters={appliedFilters} />
              </div>
              <div>
                <RecentTransactions transactions={filteredTransactions} />
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
