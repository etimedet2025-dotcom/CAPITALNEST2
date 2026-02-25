
import { 
  TrendingUp, 
  TrendingDown, 
  Wallet, 
  PieChart, 
  ArrowUpRight, 
  Repeat, 
  Settings, 
  ShieldCheck, 
  Zap, 
  Layers,
  Search,
  Users,
  CreditCard,
  ArrowDownCircle,
  ShieldAlert,
  ArrowLeftRight,
  Briefcase,
  History
} from 'lucide-react';
import { FinancialStat, ActionItem, Asset } from './types';

export const STATS: FinancialStat[] = [
  { label: 'Total Value', value: '$1,118,070', trend: 14.2, icon: 'Wallet', color: 'text-emerald-400' },
  { label: 'Stock Equity', value: '$840,200', trend: 8.2, icon: 'PieChart', color: 'text-blue-400' },
  { label: 'Dividends', value: '$12,450', trend: 5.4, icon: 'Layers', color: 'text-amber-400' },
  { label: 'Cash Balance', value: '$45,000', trend: 0.1, icon: 'CreditCard', color: 'text-purple-400' },
  { label: 'Index Funds', value: '$92,100', trend: 12.8, icon: 'Zap', color: 'text-orange-400' },
  { label: 'Yield', value: '4.8%', trend: 1.2, icon: 'TrendingUp', color: 'text-pink-400' },
];

export const ACTIONS: ActionItem[] = [
  { id: 'deposit', label: 'Deposit', icon: 'ArrowDownCircle', description: 'Add funds' },
  { id: 'withdraw', label: 'Withdraw', icon: 'ArrowUpRight', description: 'Move to bank' },
  { id: 'invest', label: 'Buy Stock', icon: 'Briefcase', description: 'New positions' },
  { id: 'portfolio', label: 'Portfolio', icon: 'PieChart', description: 'View holdings' },
  { id: 'history', label: 'History', icon: 'History', description: 'Past orders' },
  { id: 'kyc', label: 'Verification', icon: 'ShieldAlert', description: 'Verify ID' },
  { id: 'profile', label: 'Profile', icon: 'Users', description: 'Account' },
];

export const ASSETS: Asset[] = [
  { 
    name: 'Nvidia Corp', 
    symbol: 'NVDA', 
    allocation: 35, 
    current_price: 294070, 
    change_percent: 4.2, 
    isPositive: true, 
    sparkline: [40, 45, 42, 48, 52, 50, 58],
    maturityDate: '2026-12-31',
    earlyWithdrawalFee: 5.0
  },
  { 
    name: 'Apple Inc', 
    symbol: 'AAPL', 
    allocation: 25, 
    current_price: 210030, 
    change_percent: 1.8, 
    isPositive: true, 
    sparkline: [45, 46, 45, 47, 46, 48, 49],
    maturityDate: '2025-12-31', // Already matured
    earlyWithdrawalFee: 3.5
  },
  { 
    name: 'Microsoft Corp', 
    symbol: 'MSFT', 
    allocation: 20, 
    current_price: 168040, 
    change_percent: 0.4, 
    isPositive: true, 
    sparkline: [50, 52, 51, 53, 52, 54, 55],
    maturityDate: '2027-06-15',
    earlyWithdrawalFee: 4.0
  },
  { 
    name: 'Tesla Inc', 
    symbol: 'TSLA', 
    allocation: 12, 
    current_price: 100824, 
    change_percent: -2.1, 
    isPositive: false, 
    sparkline: [50, 48, 49, 45, 42, 44, 40],
    maturityDate: '2026-08-20',
    earlyWithdrawalFee: 6.0
  },
  { 
    name: 'Amazon.com Inc', 
    symbol: 'AMZN', 
    allocation: 8, 
    current_price: 67215, 
    change_percent: 3.1, 
    isPositive: true, 
    sparkline: [30, 32, 35, 38, 34, 39, 42],
    maturityDate: '2026-03-01', // Close to maturity
    earlyWithdrawalFee: 4.5
  },
];

export const ICON_MAP: Record<string, any> = {
  TrendingUp,
  TrendingDown,
  Wallet,
  PieChart,
  ArrowUpRight,
  Repeat,
  Settings,
  ShieldCheck,
  Zap,
  Layers,
  Search,
  Users,
  CreditCard,
  ArrowDownCircle,
  ShieldAlert,
  ArrowLeftRight,
  Briefcase,
  History
};
