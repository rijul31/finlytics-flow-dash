import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";

export const RecentTransactions = ({ transactions }) => {
  // Sort by date descending and take the 5 most recent
  const recent = [...transactions]
    .sort((a, b) => new Date(b.date) - new Date(a.date))
    .slice(0, 5);

  return (
    <Card className="bg-gray-800 border-gray-700">
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle className="text-white">Recent Transactions</CardTitle>
          <CardDescription className="text-gray-400">
            Latest activity
          </CardDescription>
        </div>
        <Button variant="ghost" className="text-green-500 hover:text-green-400">
          See all
        </Button>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {recent.map((transaction) => (
            <div key={transaction.id} className="flex items-center space-x-4">
              <Avatar className="h-10 w-10">
                <AvatarImage src={transaction.user_profile || "/placeholder-avatar.jpg"} />
                <AvatarFallback className="bg-gray-700 text-white">
                  {transaction.user_id ? transaction.user_id.slice(-2).toUpperCase() : '?'}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-white truncate">
                  {transaction.category}
                </p>
                <p className="text-sm text-gray-400 truncate">
                  {transaction.status} • {new Date(transaction.date).toLocaleDateString()}
                </p>
              </div>
              <div className={`text-sm font-medium ${transaction.category === 'Revenue' ? 'text-green-500' : 'text-red-500'}`}>
                {transaction.category === 'Revenue' ? '+' : '-'}${transaction.amount.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
