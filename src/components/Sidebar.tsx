import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { 
  Home, 
  CreditCard, 
  Wallet, 
  BarChart3, 
  Settings, 
  LogOut,
  Shield,
  TrendingUp
} from 'lucide-react';
import { toast } from 'sonner';

export const Sidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const menuItems = [
    { icon: Home, label: 'Dashboard', path: '/', active: true },
    { icon: CreditCard, label: 'Transactions', path: '/transactions' },
    { icon: Wallet, label: 'Wallet', path: '/wallet' },
    { icon: BarChart3, label: 'Analytics', path: '/analytics' },
    { icon: BarChart3, label: 'Customizable Graph', path: '/custom-graph' }, // Restored
    { icon: Settings, label: 'Settings', path: '/settings' },
  ];

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    toast.success('Logged out successfully');
    navigate('/login');
  };

  return (
    <div className="fixed left-0 top-0 h-full w-64 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 shadow-lg">
      {/* Logo */}
      <div className="flex items-center p-6 border-b border-gray-200 dark:border-gray-700">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-gradient-to-r from-yellow-400 to-yellow-300 rounded-lg">
            <Shield className="h-6 w-6 text-yellow-700" />
          </div>
          <div>
            <h1 className="text-xl font-bold bg-gradient-to-r from-yellow-400 to-yellow-300 bg-clip-text text-transparent">VaultVue</h1>
            <p className="text-xs text-gray-500 dark:text-gray-400">Financial Analytics</p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="p-4 space-y-2">
        {menuItems.map((item, index) => {
          const isActive = location.pathname === item.path;
          return (
            <Link
              key={index}
              to={item.path}
              replace={item.path === '/'}
              onClick={e => {
                if (location.pathname === item.path) {
                  e.preventDefault(); // Prevent reload if already on page
                }
              }}
              className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-200 ${
                isActive 
                  ? 'bg-gradient-to-r from-yellow-50 to-green-50 dark:from-yellow-900/20 dark:to-green-900/20 text-yellow-700 dark:text-yellow-400 border-r-2 border-yellow-500' 
                  : 'text-gray-600 dark:text-gray-300 hover:bg-gradient-to-r hover:from-green-50 hover:to-blue-50 dark:hover:from-green-900/20 dark:hover:to-blue-900/20 hover:text-green-700 dark:hover:text-green-400'
              }`}
            >
              <item.icon className={`h-5 w-5 ${isActive ? 'text-yellow-700 dark:text-yellow-400' : ''}`} />
              <span className="font-medium">{item.label}</span>
              {isActive && (
                <div className="ml-auto">
                  <TrendingUp className="h-4 w-4 text-green-600 dark:text-green-400" />
                </div>
              )}
            </Link>
          );
        })}
      </nav>

      {/* User Profile & Logout */}
      <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
        <div className="flex items-center space-x-3 mb-3 p-3 bg-gradient-to-r from-yellow-50 to-green-50 dark:from-yellow-900/20 dark:to-green-900/20 rounded-lg">
          <div className="h-10 w-10 bg-gradient-to-r from-yellow-400 to-yellow-300 rounded-full flex items-center justify-center">
            <span className="text-yellow-900 font-medium">U</span>
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-gray-900 dark:text-white truncate">Admin</p>
            {/* <p className="text-xs text-gray-500 dark:text-gray-400 truncate">admin@vaultvue.com</p> */}
          </div>
        </div>
        
        <Button
          onClick={handleLogout}
          variant="ghost"
          className="w-full justify-start text-gray-600 dark:text-gray-300 hover:bg-red-50 dark:hover:bg-red-900/20 hover:text-red-600 dark:hover:text-red-400"
        >
          <LogOut className="h-4 w-4 mr-3" />
          Logout
        </Button>
      </div>
    </div>
  );
};
