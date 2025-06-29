
import { Sidebar } from '@/components/Sidebar';
import { Header } from '@/components/Header';
import { OverviewChart } from '@/components/OverviewChart';
import { CategoryChart } from '@/components/CategoryChart';
import { RevenueChart } from '@/components/RevenueChart';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { TrendingUp, TrendingDown, BarChart3, PieChart } from 'lucide-react';

const Analytics = () => {
  const analyticsData = [
    {
      title: "Monthly Growth Rate",
      value: "12.5%",
      change: "+2.3% from last month",
      icon: TrendingUp,
      color: "text-green-500"
    },
    {
      title: "Expense Ratio",
      value: "68.2%",
      change: "-1.8% from last month",
      icon: TrendingDown,
      color: "text-red-500"
    },
    {
      title: "Profit Margin",
      value: "31.8%",
      change: "+4.2% from last month",
      icon: BarChart3,
      color: "text-blue-500"
    },
    {
      title: "Diversification Index",
      value: "8.7",
      change: "+0.3% from last month",
      icon: PieChart,
      color: "text-purple-500"
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="flex">
        <Sidebar />
        <div className="flex-1 ml-64">
          <Header />
          <main className="p-6">
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                Financial Analytics
              </h1>
              <p className="text-gray-600 dark:text-gray-400">
                Deep dive into your financial performance and trends
              </p>
            </div>

            {/* Analytics Stats */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              {analyticsData.map((stat, index) => (
                <Card key={index} className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium text-gray-600 dark:text-gray-400">
                      {stat.title}
                    </CardTitle>
                    <stat.icon className={`h-4 w-4 ${stat.color}`} />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold text-gray-900 dark:text-white">
                      {stat.value}
                    </div>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                      {stat.change}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Charts Grid */}
            <div className="space-y-6">
              <RevenueChart />
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <OverviewChart />
                <CategoryChart />
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default Analytics;
