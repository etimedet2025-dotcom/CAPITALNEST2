
export type AppView = 
  | 'home' 
  | 'portfolio' 
  | 'insights' 
  | 'profile' 
  | 'referral' 
  | 'kyc' 
  | 'deposit' 
  | 'withdraw' 
  | 'transfer'
  | 'history'
  | 'buy'
  | 'sell'
  | 'settings'
  | 'security'
  | 'payments'
  | 'add_payment'
  | 'billing_setup'
  | 'add_card'
  | 'identity'
  | 'auth'
  | 'withdrawal_detail'
  | 'swap'
  | 'invest'
  | 'asset_detail'
  | 'buy_asset'
  | 'notifications'
  | 'help'
  | 'terms'
  | 'privacy'
  | 'investor_profile'
  | 'admin_auth'
  | 'admin_dashboard';

export type AdminSubView = 
  | 'dashboard' 
  | 'users' 
  | 'referrals' 
  | 'deposits' 
  | 'withdrawals' 
  | 'kyc' 
  | 'settings';

export interface FinancialStat {
  label: string;
  value: string;
  trend: number;
  icon: string;
  color: string;
}

export interface ActionItem {
  id: AppView;
  label: string;
  icon: string;
  description: string;
}

export interface MarketInsight {
  title: string;
  summary: string;
  sentiment: 'bullish' | 'bearish' | 'neutral';
}

export interface Asset {
  id?: string;
  name: string;
  symbol: string;
  allocation: number;
  current_price: number;
  change_percent: number;
  isPositive: boolean;
  isFavorite?: boolean;
  sparkline: number[];
  maturityDate?: string; // ISO date string
  earlyWithdrawalFee: number; // Percentage, e.g., 5 for 5%
}

export interface Notification {
  id: string;
  title: string;
  message: string;
  time?: string;
  unread: boolean;
  type: 'alert' | 'success' | 'info';
  created_at?: string;
}

export interface Transaction {
  id: string;
  type: 'buy' | 'sell' | 'deposit' | 'withdraw' | 'transfer' | 'swap' | 'invest';
  asset_symbol?: string;
  amount: number;
  date?: string;
  status: 'completed' | 'pending' | 'failed';
  referenceId?: string;
  estimatedArrival?: string;
  maturityDate?: string;
  created_at?: string;
}

export interface PayoutMethod {
  id: string;
  type: 'Bank' | 'PayPal' | 'USDT' | 'Bitcoin' | 'Venmo';
  details: string;
  label: string;
  status?: 'active' | 'coming_soon';
}

export interface BillingCard {
  id: string;
  brand: string;
  last4: string;
  expiry: string;
}

export interface Investor {
  name: string;
  role: string;
  img: string;
  quote: string;
  bio: string;
  netWorth: string;
  investments: string[];
}
