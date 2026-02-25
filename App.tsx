
import React, { useEffect, useState, useMemo, useRef } from 'react';
import { StatTile } from './components/StatTile';
import { ActionGrid } from './components/ActionGrid';
import { ReferralWidget } from './components/ReferralWidget';
import { BottomNav } from './components/BottomNav';
import { STATS, ASSETS } from './constants';
import { AppView, AdminSubView, Asset, Notification, Transaction, PayoutMethod, BillingCard, Investor } from './types';
import { supabaseService } from './services/supabaseService';
import { 
  AreaChart,
  Area,
  ResponsiveContainer,
  LineChart,
  Line
} from 'recharts';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Bell, 
  ChevronRight, 
  ChevronLeft,
  ShieldCheck,
  CreditCard,
  Plus,
  ArrowRight,
  UserCheck,
  History as HistoryIcon,
  Wallet,
  Search,
  X,
  Star,
  ArrowUp,
  ArrowDown,
  Settings,
  LogOut,
  Mail,
  Lock,
  Globe,
  Smartphone,
  Clock,
  CheckCircle2,
  AlertCircle,
  XCircle,
  Loader2,
  Eye,
  EyeOff,
  User,
  Phone,
  Hash,
  LayoutDashboard,
  Users,
  Activity,
  Settings2,
  Database,
  Share2
} from 'lucide-react';

const MOCK_CHART_DATA = [
  { name: 'Mon', value: 3400 },
  { name: 'Tue', value: 3200 },
  { name: 'Wed', value: 4100 },
  { name: 'Thu', value: 3900 },
  { name: 'Fri', value: 4800 },
  { name: 'Sat', value: 5200 },
  { name: 'Sun', value: 5600 },
];

const COUNTRIES = [
  { name: 'United States', code: '+1', flag: '🇺🇸' },
  { name: 'United Kingdom', code: '+44', flag: '🇬🇧' },
  { name: 'Germany', code: '+49', flag: '🇩🇪' },
  { name: 'France', code: '+33', flag: '🇫🇷' },
  { name: 'United Arab Emirates', code: '+971', flag: '🇦🇪' },
  { name: 'Canada', code: '+1', flag: '🇨🇦' },
  { name: 'Australia', code: '+61', flag: '🇦🇺' },
  { name: 'Japan', code: '+81', flag: '🇯🇵' },
  { name: 'China', code: '+86', flag: '🇨🇳' },
  { name: 'India', code: '+91', flag: '🇮🇳' },
  { name: 'Brazil', code: '+55', flag: '🇧🇷' },
  { name: 'Nigeria', code: '+234', flag: '🇳🇬' },
  { name: 'South Africa', code: '+27', flag: '🇿🇦' },
  { name: 'Singapore', code: '+65', flag: '🇸🇬' },
  { name: 'Switzerland', code: '+41', flag: '🇨🇭' },
  { name: 'Netherlands', code: '+31', flag: '🇳🇱' },
  { name: 'Italy', code: '+39', flag: '🇮🇹' },
  { name: 'Spain', code: '+34', flag: '🇪🇸' },
  { name: 'Mexico', code: '+52', flag: '🇲🇽' },
  { name: 'Russia', code: '+7', flag: '🇷🇺' },
  { name: 'Turkey', code: '+90', flag: '🇹🇷' },
  { name: 'Saudi Arabia', code: '+966', flag: '🇸🇦' },
  { name: 'Israel', code: '+972', flag: '🇮🇱' },
  { name: 'South Korea', code: '+82', flag: '🇰🇷' },
  { name: 'Argentina', code: '+54', flag: '🇦🇷' },
  { name: 'Norway', code: '+47', flag: '🇳🇴' },
  { name: 'Sweden', code: '+46', flag: '🇸🇪' },
  { name: 'Denmark', code: '+45', flag: '🇩🇰' },
  { name: 'Finland', code: '+358', flag: '🇫🇮' },
  { name: 'Ireland', code: '+353', flag: '🇮🇪' },
  { name: 'Portugal', code: '+351', flag: '🇵🇹' },
  { name: 'Greece', code: '+30', flag: '🇬🇷' },
  { name: 'New Zealand', code: '+64', flag: '🇳🇿' },
  { name: 'Thailand', code: '+66', flag: '🇹🇭' },
  { name: 'Vietnam', code: '+84', flag: '🇻🇳' },
  { name: 'Malaysia', code: '+60', flag: '🇲🇾' },
  { name: 'Indonesia', code: '+62', flag: '🇮🇩' },
  { name: 'Philippines', code: '+63', flag: '🇵🇭' },
  { name: 'Egypt', code: '+20', flag: '🇪🇬' },
  { name: 'Kenya', code: '+254', flag: '🇰🇪' },
  { name: 'Ghana', code: '+233', flag: '🇬🇭' },
  { name: 'Morocco', code: '+212', flag: '🇲🇦' },
  { name: 'Colombia', code: '+57', flag: '🇨🇴' },
  { name: 'Chile', code: '+56', flag: '🇨🇱' },
  { name: 'Peru', code: '+51', flag: '🇵🇪' },
  { name: 'Ukraine', code: '+380', flag: '🇺🇦' },
  { name: 'Poland', code: '+48', flag: '🇵🇱' },
  { name: 'Austria', code: '+43', flag: '🇦🇹' },
  { name: 'Belgium', code: '+32', flag: '🇧🇪' },
  { name: 'Norway', code: '+47', flag: '🇳🇴' },
  { name: 'Sweden', code: '+46', flag: '🇸🇪' },
  { name: 'Denmark', code: '+45', flag: '🇩🇰' },
  { name: 'Finland', code: '+358', flag: '🇫🇮' },
  { name: 'Ireland', code: '+353', flag: '🇮🇪' },
  { name: 'Portugal', code: '+351', flag: '🇵🇹' },
  { name: 'Greece', code: '+30', flag: '🇬🇷' },
  { name: 'New Zealand', code: '+64', flag: '🇳🇿' },
  { name: 'Thailand', code: '+66', flag: '🇹🇭' },
  { name: 'Vietnam', code: '+84', flag: '🇻🇳' },
  { name: 'Malaysia', code: '+60', flag: '🇲🇾' },
  { name: 'Indonesia', code: '+62', flag: '🇮🇩' },
  { name: 'Philippines', code: '+63', flag: '🇵🇭' },
  { name: 'Egypt', code: '+20', flag: '🇪🇬' },
  { name: 'Kenya', code: '+254', flag: '🇰🇪' },
  { name: 'Ghana', code: '+233', flag: '🇬🇭' },
  { name: 'Morocco', code: '+212', flag: '🇲🇦' },
  { name: 'Colombia', code: '+57', flag: '🇨🇴' },
  { name: 'Chile', code: '+56', flag: '🇨🇱' },
  { name: 'Peru', code: '+51', flag: '🇵🇪' },
  { name: 'Ukraine', code: '+380', flag: '🇺🇦' },
  { name: 'Poland', code: '+48', flag: '🇵🇱' },
  { name: 'Austria', code: '+43', flag: '🇦🇹' },
  { name: 'Belgium', code: '+32', flag: '🇧🇪' },
  { name: 'Czech Republic', code: '+420', flag: '🇨🇿' },
  { name: 'Hungary', code: '+36', flag: '🇭🇺' },
  { name: 'Romania', code: '+40', flag: '🇷🇴' },
  { name: 'Bulgaria', code: '+359', flag: '🇧🇬' },
  { name: 'Croatia', code: '+385', flag: '🇭🇷' },
  { name: 'Slovakia', code: '+421', flag: '🇸🇰' },
  { name: 'Slovenia', code: '+386', flag: '🇸🇮' },
  { name: 'Estonia', code: '+372', flag: '🇪🇪' },
  { name: 'Latvia', code: '+371', flag: '🇱🇻' },
  { name: 'Lithuania', code: '+370', flag: '🇱🇹' },
  { name: 'Luxembourg', code: '+352', flag: '🇱🇺' },
  { name: 'Malta', code: '+356', flag: '🇲🇹' },
  { name: 'Cyprus', code: '+357', flag: '🇨🇾' },
  { name: 'Iceland', code: '+354', flag: '🇮🇸' },
  { name: 'Monaco', code: '+377', flag: '🇲🇨' },
  { name: 'Liechtenstein', code: '+423', flag: '🇱🇮' },
  { name: 'San Marino', code: '+378', flag: '🇸🇲' },
  { name: 'Andorra', code: '+376', flag: '🇦🇩' },
  { name: 'Vatican City', code: '+379', flag: '🇻🇦' },
  { name: 'Qatar', code: '+974', flag: '🇶🇦' },
  { name: 'Kuwait', code: '+965', flag: '🇰🇼' },
  { name: 'Oman', code: '+968', flag: '🇴🇲' },
  { name: 'Bahrain', code: '+973', flag: '🇧🇭' },
  { name: 'Jordan', code: '+962', flag: '🇯🇴' },
  { name: 'Lebanon', code: '+961', flag: '🇱🇧' },
  { name: 'Pakistan', code: '+92', flag: '🇵🇰' },
  { name: 'Bangladesh', code: '+880', flag: '🇧🇩' },
  { name: 'Sri Lanka', code: '+94', flag: '🇱🇰' },
  { name: 'Nepal', code: '+977', flag: '🇳🇵' },
  { name: 'Kazakhstan', code: '+7', flag: '🇰🇿' },
  { name: 'Uzbekistan', code: '+998', flag: '🇺🇿' },
  { name: 'Azerbaijan', code: '+994', flag: '🇦🇿' },
  { name: 'Georgia', code: '+995', flag: '🇬🇪' },
  { name: 'Armenia', code: '+374', flag: '🇦🇲' },
];

const MOCK_NOTIFICATIONS: Notification[] = [
  { id: '1', title: 'Dividend Received', message: 'You received $12.40 in dividends from NVDA.', created_at: '2h ago', unread: true, type: 'success' },
  { id: '2', title: 'Market Alert', message: 'The S&P 500 is up 2.4% today. Check your portfolio.', created_at: '5h ago', unread: true, type: 'info' },
  { id: '3', title: 'Security Update', message: 'Your password was successfully changed.', created_at: '1d ago', unread: false, type: 'alert' },
  { id: '4', title: 'Deposit Confirmed', message: 'Your deposit of $5,000.00 has been processed.', created_at: '2d ago', unread: false, type: 'success' },
];

const TRANSACTIONS: Transaction[] = [
  { id: 'tx1', type: 'buy', asset_symbol: 'NVDA', amount: 1200.00, created_at: 'Oct 24, 2023', status: 'completed' },
  { id: 'tx2', type: 'deposit', amount: 5000.00, created_at: 'Oct 22, 2023', status: 'completed' },
  { id: 'tx3', type: 'sell', asset_symbol: 'TSLA', amount: 850.40, created_at: 'Oct 20, 2023', status: 'completed' },
  { id: 'tx4', type: 'withdraw', amount: 2000.00, created_at: 'Oct 15, 2023', status: 'pending', referenceId: 'W-9821-ARC', estimatedArrival: 'Oct 17, 2023' },
  { id: 'tx5', type: 'buy', asset_symbol: 'BTC', amount: 4500.00, created_at: 'Oct 10, 2023', status: 'completed' },
];

const INVESTORS: Investor[] = [
  { 
    name: 'Elon Musk', 
    role: 'Tech Visionary & Investor', 
    img: 'elon', 
    quote: 'CapitalNest is the best website to invest ahead for a good retirement. Their institutional-grade tools and private tier access make wealth management feel seamless and futuristic. It\'s the X of investing.',
    bio: 'Elon Musk is a business magnate and investor. He is the founder, CEO, and chief engineer of SpaceX; angel investor, CEO, and product architect of Tesla, Inc.; owner and CEO of Twitter, Inc.; founder of the Boring Company; co-founder of Neuralink and OpenAI; and president of the philanthropic Musk Foundation.',
    netWorth: '$240B',
    investments: ['Tesla', 'SpaceX', 'X', 'Neuralink']
  },
  { 
    name: 'Warren Buffett', 
    role: 'Value Legend', 
    img: 'warren', 
    quote: 'The best platform for long-term compounding.',
    bio: 'Warren Edward Buffett is an American business magnate, investor, and philanthropist. He is currently the co-founder, chairman and CEO of Berkshire Hathaway.',
    netWorth: '$120B',
    investments: ['Apple', 'Coca-Cola', 'American Express']
  },
  { 
    name: 'Cathie Wood', 
    role: 'Innovation Focus', 
    img: 'cathie', 
    quote: 'Identifying the future of finance today.',
    bio: 'Catherine Duddy Wood is an American investor and the founder, CEO and CIO of ARK Invest, an investment management firm.',
    netWorth: '$250M',
    investments: ['Coinbase', 'Zoom', 'Roku']
  },
  { 
    name: 'Ray Dalio', 
    role: 'Principles First', 
    img: 'ray', 
    quote: 'A balanced approach to global markets.',
    bio: 'Raymond Thomas Dalio is an American billionaire investor and hedge fund manager, who has served as co-chief investment officer of the world\'s largest hedge fund, Bridgewater Associates, since 1985.',
    netWorth: '$19B',
    investments: ['Gold', 'Emerging Markets', 'Treasuries']
  }
];

const haptic = {
  light: () => window.navigator.vibrate?.(10),
  medium: () => window.navigator.vibrate?.(20),
  success: () => window.navigator.vibrate?.([10, 30, 10]),
  error: () => window.navigator.vibrate?.([50, 50, 50]),
};

const App: React.FC = () => {
  const [view, setView] = useState<AppView>('auth');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [authMode, setAuthMode] = useState<'login' | 'signup'>('login');
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');
  const [showPassword, setShowPassword] = useState(false);
  const [notifications, setNotifications] = useState<Notification[]>(MOCK_NOTIFICATIONS);
  const [dbAssets, setDbAssets] = useState<Asset[]>(ASSETS);
  const [dbTransactions, setDbTransactions] = useState<Transaction[]>(TRANSACTIONS);
  const [userStats, setUserStats] = useState<any>(null);
  const [selectedCountry, setSelectedCountry] = useState(COUNTRIES[0]);
  
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchActive, setIsSearchActive] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [favorites, setFavorites] = useState<Set<string>>(new Set());
  const [showOnlyFavorites, setShowOnlyFavorites] = useState(false);

  const [selectedAsset, setSelectedAsset] = useState<Asset | null>(null);
  const [selectedInvestor, setSelectedInvestor] = useState<Investor | null>(null);
  const [selectedTx, setSelectedTx] = useState<Transaction | null>(null);
  const [orderAmount, setOrderAmount] = useState('0');
  const [showMaturityWarning, setShowMaturityWarning] = useState(false);
  const [pendingWithdrawal, setPendingWithdrawal] = useState<{ amount: number, fee: number } | null>(null);
  const [transactionStatus, setTransactionStatus] = useState<'none' | 'processing' | 'success' | 'failed'>('none');
  
  // KYC State
  const [kycStep, setKycStep] = useState(1);
  const [kycData, setKycData] = useState({ firstName: '', lastName: '', idNumber: '', country: 'United States' });
  const [isKycSubmitting, setIsKycSubmitting] = useState(false);
  const [kycStatus, setKycStatus] = useState<'none' | 'pending' | 'verified'>('none');

  // Admin Sub-view State
  const [adminSubView, setAdminSubView] = useState<AdminSubView>('dashboard');
  const [adminUsers, setAdminUsers] = useState([
    { id: '1', name: 'Alex Volkov', email: 'alex@volkov.io', balance: 1118070.42, kyc: 'verified', withdrawalFee: 5 },
    { id: '2', name: 'Sarah Chen', email: 'sarah@chen.com', balance: 45200.00, kyc: 'pending', withdrawalFee: 5 },
    { id: '3', name: 'Marcus Thorne', email: 'marcus@thorne.net', balance: 890000.00, kyc: 'none', withdrawalFee: 5 },
  ]);

  // Settings State
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [biometricsEnabled, setBiometricsEnabled] = useState(false);
  const [language, setLanguage] = useState('English');

  const isMatured = (dateStr: string) => {
    const maturityDate = new Date(dateStr);
    const now = new Date('2026-02-23');
    return now >= maturityDate;
  };

  const calculateFee = (asset: Asset, amount: number) => {
    if (isMatured(asset.maturityDate)) return 0;
    return (amount * asset.earlyWithdrawalFee) / 100;
  };

  const [payoutMethods] = useState<PayoutMethod[]>([
    { id: '1', type: 'Bank', details: 'Main Checking •••• 9210', label: 'WealthChase' },
    { id: '2', type: 'USDT', details: 'TX8s...v2M1', label: 'Binance Wallet' }
  ]);
  const [billingCards, setBillingCards] = useState<BillingCard[]>([
    { id: 'c1', brand: 'Visa', last4: '4242', expiry: '04/26' }
  ]);
  const [selectedPayoutId, setSelectedPayoutId] = useState('1');

  const searchInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.get('admin') === 'true') {
      setView('admin_auth');
    }

    // Supabase Real-time Setup
    if (isLoggedIn) {
      const userId = 'user-123'; // In a real app, this would come from auth

      // Initial Fetch
      const fetchData = async () => {
        try {
          const [assets, transactions, stats, notifs] = await Promise.all([
            supabaseService.getAssets(),
            supabaseService.getTransactions(userId),
            supabaseService.getUserStats(userId),
            supabaseService.getNotifications(userId)
          ]);
          setDbAssets(assets);
          setDbTransactions(transactions);
          setUserStats(stats);
          setNotifications(notifs);
        } catch (err) {
          console.error('Error fetching Supabase data:', err);
        }
      };

      fetchData();

      // Subscriptions
      const assetSub = supabaseService.subscribeToAssets((payload) => {
        console.log('Asset change:', payload);
        supabaseService.getAssets().then(setDbAssets);
      });

      const txSub = supabaseService.subscribeToTransactions(userId, (payload) => {
        console.log('Transaction change:', payload);
        supabaseService.getTransactions(userId).then(setDbTransactions);
      });

      const statsSub = supabaseService.subscribeToUserStats(userId, (payload) => {
        console.log('Stats change:', payload);
        setUserStats(payload.new);
      });

      const notifSub = supabaseService.subscribeToNotifications(userId, (payload) => {
        console.log('Notification change:', payload);
        supabaseService.getNotifications(userId).then(setNotifications);
      });

      return () => {
        assetSub.unsubscribe();
        txSub.unsubscribe();
        statsSub.unsubscribe();
        notifSub.unsubscribe();
      };
    }
  }, [isLoggedIn]);

  const handleNavigate = (newView: AppView) => {
    haptic.light();
    setView(newView);
    setIsNotificationsOpen(false);
    setIsSearchActive(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleLogOut = () => {
    haptic.medium();
    setIsLoggedIn(false);
    setIsAdmin(false);
    setView('auth');
  };

  const toggleTheme = () => {
    haptic.light();
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
    document.documentElement.classList.toggle('dark');
  };

  const toggleFavorite = (symbol: string) => {
    haptic.medium();
    setFavorites(prev => {
      const next = new Set(prev);
      if (next.has(symbol)) next.delete(symbol);
      else next.add(symbol);
      return next;
    });
  };

  const filteredAssets = useMemo(() => {
    return dbAssets.filter(asset => {
      const matchesSearch = asset.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                            asset.symbol.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesFavorite = !showOnlyFavorites || favorites.has(asset.symbol);
      return matchesSearch && matchesFavorite;
    });
  }, [dbAssets, searchQuery, favorites, showOnlyFavorites]);

  const renderAuth = () => (
    <div className="min-h-screen flex flex-col justify-center animate-in fade-in zoom-in-95 duration-700 pb-12 px-2">
      <div className="flex flex-col items-center mb-10">
        <div className="w-24 h-24 bg-white dark:bg-white/5 rounded-[32px] flex items-center justify-center shadow-2xl shadow-blue-500/10 mb-6 group transition-transform hover:scale-105 duration-500 overflow-hidden border border-slate-100 dark:border-white/10">
          <img src="/logo.png" alt="CapitalNest Logo" className="w-full h-full object-contain p-2" referrerPolicy="no-referrer" />
        </div>
        <h1 className="text-4xl font-black text-slate-900 dark:text-white tracking-tighter mb-1">CapitalNest</h1>
        <p className="text-slate-500 dark:text-white/40 text-[10px] font-black uppercase tracking-[0.3em]">Institutional Wealth</p>
      </div>

      <div className="glass-card p-8 rounded-[48px] shadow-2xl space-y-8 border border-white/20 dark:border-white/5">
        <div className="flex bg-slate-500/5 dark:bg-white/5 rounded-2xl p-1.5">
          <button onClick={() => { haptic.light(); setAuthMode('login'); }} className={`flex-1 py-3.5 rounded-xl text-xs font-black uppercase tracking-widest transition-all ${authMode === 'login' ? 'bg-white dark:bg-white/10 shadow-lg text-blue-600 dark:text-white' : 'text-slate-400'}`}>Login</button>
          <button onClick={() => { haptic.light(); setAuthMode('signup'); }} className={`flex-1 py-3.5 rounded-xl text-xs font-black uppercase tracking-widest transition-all ${authMode === 'signup' ? 'bg-white dark:bg-white/10 shadow-lg text-blue-600 dark:text-white' : 'text-slate-400'}`}>Sign Up</button>
        </div>

        <div className="space-y-4">
          {authMode === 'signup' && (
            <div className="space-y-1.5">
              <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Full Name</label>
              <div className="relative group">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-500 transition-colors" size={18} />
                <input type="text" placeholder="Alex Volkov" className="w-full bg-slate-500/5 dark:bg-white/5 border border-slate-200 dark:border-transparent focus:border-blue-500/30 rounded-2xl py-4 pl-12 pr-4 outline-none text-sm dark:text-white transition-all" />
              </div>
            </div>
          )}

          <div className="space-y-1.5">
            <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Email Address</label>
            <div className="relative group">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-500 transition-colors" size={18} />
              <input type="email" placeholder="alex@volkov.io" className="w-full bg-slate-500/5 dark:bg-white/5 border border-slate-200 dark:border-transparent focus:border-blue-500/30 rounded-2xl py-4 pl-12 pr-4 outline-none text-sm dark:text-white transition-all" />
            </div>
          </div>

          {authMode === 'signup' && (
            <div className="space-y-1.5">
              <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Phone Number</label>
              <div className="flex gap-2">
                <div className="relative w-32">
                  <div className="absolute left-3 top-1/2 -translate-y-1/2 text-lg pointer-events-none">{selectedCountry.flag}</div>
                  <select 
                    className="w-full bg-slate-500/5 dark:bg-white/5 border border-slate-200 dark:border-transparent focus:border-blue-500/30 rounded-2xl py-4 pl-10 pr-6 outline-none text-xs dark:text-white appearance-none transition-all font-bold"
                    value={selectedCountry.code}
                    onChange={(e) => {
                      const country = COUNTRIES.find(c => c.code === e.target.value);
                      if (country) setSelectedCountry(country);
                    }}
                  >
                    {COUNTRIES.map((c, i) => (
                      <option key={i} value={c.code}>{c.code} {c.name}</option>
                    ))}
                  </select>
                  <ChevronRight size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 rotate-90 pointer-events-none" />
                </div>
                <div className="relative flex-1 group">
                  <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-500 transition-colors" size={18} />
                  <input type="tel" placeholder="555 0123" className="w-full bg-slate-500/5 dark:bg-white/5 border border-slate-200 dark:border-transparent focus:border-blue-500/30 rounded-2xl py-4 pl-12 pr-4 outline-none text-sm dark:text-white transition-all font-bold" />
                </div>
              </div>
            </div>
          )}
          
          <div className="space-y-1.5">
            <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Secure Password</label>
            <div className="relative group">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-500 transition-colors" size={18} />
              <input 
                type={showPassword ? "text" : "password"} 
                placeholder="••••••••" 
                className="w-full bg-slate-500/5 dark:bg-white/5 border border-slate-200 dark:border-transparent focus:border-blue-500/30 rounded-2xl py-4 pl-12 pr-12 outline-none text-sm dark:text-white transition-all" 
              />
              <button 
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-blue-500 transition-colors"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          {authMode === 'signup' && (
            <div className="space-y-1.5">
              <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Confirm Password</label>
              <div className="relative group">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-500 transition-colors" size={18} />
                <input 
                  type={showPassword ? "text" : "password"} 
                  placeholder="••••••••" 
                  className="w-full bg-slate-500/5 dark:bg-white/5 border border-slate-200 dark:border-transparent focus:border-blue-500/30 rounded-2xl py-4 pl-12 pr-12 outline-none text-sm dark:text-white transition-all" 
                />
              </div>
            </div>
          )}

          {authMode === 'signup' && (
            <div className="space-y-1.5">
              <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Referral Code (Optional)</label>
              <div className="relative group">
                <Hash className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-500 transition-colors" size={18} />
                <input type="text" placeholder="REF-123456" className="w-full bg-slate-500/5 dark:bg-white/5 border border-slate-200 dark:border-transparent focus:border-blue-500/30 rounded-2xl py-4 pl-12 pr-4 outline-none text-sm dark:text-white transition-all" />
              </div>
            </div>
          )}
          
          {authMode === 'login' && (
            <div className="flex justify-between items-center">
              <label className="flex items-center gap-2 cursor-pointer group">
                <div className="w-4 h-4 rounded border border-slate-300 dark:border-white/20 flex items-center justify-center group-hover:border-blue-500 transition-colors">
                  <div className="w-2 h-2 bg-blue-500 rounded-sm opacity-0 group-hover:opacity-20 transition-opacity"></div>
                </div>
                <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">Remember Me</span>
              </label>
              <button className="text-[10px] font-black uppercase tracking-widest text-blue-600 dark:text-blue-400 hover:underline">Forgot Password?</button>
            </div>
          )}
        </div>

        <div className="space-y-4">
          <button 
            onClick={() => { haptic.success(); setIsLoggedIn(true); setView('home'); }}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-black py-5 rounded-3xl shadow-xl shadow-blue-500/25 transition-all active:scale-[0.98] uppercase tracking-[0.2em] text-xs"
          >
            {authMode === 'login' ? 'Authorize Access' : 'Create Portfolio'}
          </button>

          <div className="relative flex items-center justify-center py-2">
            <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-slate-200 dark:border-white/10"></div></div>
            <span className="relative px-4 bg-white dark:bg-[#050505] text-[10px] font-black text-slate-400 uppercase tracking-widest">Or Continue With</span>
          </div>

          <div className="flex justify-center">
            <button className="w-full flex items-center justify-center gap-3 py-4 bg-slate-500/5 dark:bg-white/5 border border-slate-200 dark:border-transparent rounded-2xl hover:bg-slate-500/10 transition-all active:scale-95">
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" />
                <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
              </svg>
              <span className="text-[10px] font-black uppercase tracking-widest">Google Account</span>
            </button>
          </div>
        </div>
      </div>
      
      <p className="mt-8 text-center text-[10px] text-slate-400 font-medium px-8 leading-relaxed">
        By continuing, you agree to CapitalNest's <button onClick={() => handleNavigate('terms')} className="text-blue-600 dark:text-blue-400 font-bold">Terms of Service</button> and <button onClick={() => handleNavigate('privacy')} className="text-blue-600 dark:text-blue-400 font-bold">Privacy Policy</button>.
      </p>

      <div className="mt-6 text-center">
        <button 
          onClick={() => { haptic.light(); setView('admin_auth'); }}
          className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 hover:text-blue-600 transition-all"
        >
          Admin Portal
        </button>
      </div>
    </div>
  );

  const triggerTransaction = (onSuccess: () => void) => {
    haptic.medium();
    setTransactionStatus('processing');
    setTimeout(() => {
      const isSuccess = Math.random() > 0.1; // 90% success rate
      if (isSuccess) {
        setTransactionStatus('success');
        haptic.success();
        setTimeout(() => {
          setTransactionStatus('none');
          onSuccess();
        }, 2000);
      } else {
        setTransactionStatus('failed');
        haptic.error();
        setTimeout(() => {
          setTransactionStatus('none');
        }, 2500);
      }
    }, 2000);
  };

  const renderHome = () => (
    <>
      <section className="relative mb-6 group">
        <div className="absolute inset-0 bg-gradient-to-tr from-blue-600 via-blue-500 to-indigo-600 rounded-[40px] blur-2xl opacity-20 group-hover:opacity-30 transition-opacity duration-500"></div>
        <div className="glass-card p-6 rounded-[40px] relative overflow-hidden border border-white/20 shadow-xl">
          <div className="absolute top-0 right-0 -mr-16 -mt-16 w-48 h-48 bg-blue-500/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 left-0 -ml-16 -mb-16 w-48 h-48 bg-indigo-500/10 rounded-full blur-3xl"></div>
          
          <div className="relative z-10">
            <div className="flex justify-between items-start mb-6">
              <div>
                <div className="flex items-center gap-2 mb-1.5">
                  <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></div>
                  <p className="text-slate-500 dark:text-white/60 text-[9px] font-black uppercase tracking-[0.2em]">Live Portfolio Value</p>
                </div>
                <h2 className="text-4xl font-black tracking-tighter text-slate-900 dark:text-white drop-shadow-sm">
                  ${userStats?.total_net_worth?.toLocaleString() || '1,118,070'}<span className="text-slate-400 dark:text-white/60 text-2xl">.{userStats?.net_worth_cents || '42'}</span>
                </h2>
              </div>
              <div className="flex flex-col items-end gap-1.5">
                <div className="px-3 py-1.5 bg-emerald-500/10 dark:bg-white/20 backdrop-blur-md border border-emerald-500/20 dark:border-white/20 text-emerald-600 dark:text-white rounded-xl text-[10px] font-black tracking-wider flex items-center gap-1 shadow-sm">
                  <ArrowUp size={12} strokeWidth={3} />
                  14.2%
                </div>
                <p className="text-slate-400 dark:text-white/40 text-[8px] font-bold uppercase tracking-widest">vs last month</p>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-3 mb-4">
              <div className="bg-slate-500/5 dark:bg-white/5 backdrop-blur-sm rounded-2xl p-3 border border-slate-200/50 dark:border-white/10">
                <p className="text-slate-400 dark:text-white/40 text-[7px] font-black uppercase tracking-widest mb-0.5">Day Gain</p>
                <p className="text-emerald-600 dark:text-emerald-400 text-xs font-black tracking-tight">
                  {userStats?.day_gain >= 0 ? '+' : ''}${userStats?.day_gain?.toLocaleString() || '4,210'}
                </p>
              </div>
              <div className="bg-slate-500/5 dark:bg-white/5 backdrop-blur-sm rounded-2xl p-3 border border-slate-200/50 dark:border-white/10">
                <p className="text-slate-400 dark:text-white/40 text-[7px] font-black uppercase tracking-widest mb-0.5">Invested</p>
                <p className="text-slate-900 dark:text-white text-xs font-black tracking-tight">
                  ${userStats?.invested?.toLocaleString() || '982.4k'}
                </p>
              </div>
              <div className="bg-slate-500/5 dark:bg-white/5 backdrop-blur-sm rounded-2xl p-3 border border-slate-200/50 dark:border-white/10">
                <p className="text-slate-400 dark:text-white/40 text-[7px] font-black uppercase tracking-widest mb-0.5">Available</p>
                <p className="text-slate-900 dark:text-white text-xs font-black tracking-tight">
                  ${userStats?.available?.toLocaleString() || '135.6k'}
                </p>
              </div>
            </div>

            <div className="h-20 w-full -mb-2 -mx-2">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={MOCK_CHART_DATA}>
                  <defs>
                    <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <Area 
                    type="monotone" 
                    dataKey="value" 
                    stroke="#3b82f6" 
                    strokeWidth={3}
                    fillOpacity={1} 
                    fill="url(#colorValue)" 
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </section>
      <section className="mb-8 grid grid-cols-2 gap-4">
        {STATS.slice(0, 4).map((stat, i) => <StatTile key={i} stat={stat} />)}
      </section>
      <section className="mb-6">
        <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 px-2 mb-4">Quick Actions</h3>
        <ActionGrid onNavigate={handleNavigate} />
      </section>
      <ReferralWidget />

      <section className="mt-10 mb-12">
        <div className="flex items-center justify-between mb-6 px-2">
          <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Elite Investors Circle</h3>
          <div className="flex items-center gap-1 text-[9px] font-bold text-blue-600 uppercase tracking-widest">
            <span>Top 20</span>
            <ChevronRight size={12} />
          </div>
        </div>
        
        <div className="space-y-4">
          <div 
            onClick={() => { haptic.light(); setSelectedInvestor(INVESTORS[0]); setView('investor_profile'); }}
            className="glass-card p-6 rounded-[32px] border-l-4 border-l-blue-500 active:scale-[0.98] transition-all cursor-pointer"
          >
            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-12 rounded-2xl bg-slate-900 flex items-center justify-center text-white font-bold text-lg overflow-hidden">
                <img src={`https://picsum.photos/seed/${INVESTORS[0].img}/100/100`} alt={INVESTORS[0].name} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
              </div>
              <div>
                <h4 className="text-sm font-black text-slate-900 dark:text-white">{INVESTORS[0].name}</h4>
                <p className="text-[9px] text-slate-500 uppercase font-bold tracking-widest">{INVESTORS[0].role}</p>
              </div>
              <div className="ml-auto flex items-center gap-0.5">
                {[1,2,3,4,5].map(s => <Star key={s} size={10} className="text-amber-500 fill-amber-500" />)}
              </div>
            </div>
            <p className="text-xs text-slate-600 dark:text-white/70 italic leading-relaxed">
              "{INVESTORS[0].quote}"
            </p>
          </div>

          <div className="flex gap-4 overflow-x-auto pb-4 no-scrollbar -mx-5 px-5">
            {INVESTORS.slice(1).map((inv, i) => (
              <div 
                key={i} 
                onClick={() => { haptic.light(); setSelectedInvestor(inv); setView('investor_profile'); }}
                className="glass-card p-5 rounded-[28px] min-w-[240px] flex flex-col justify-between active:scale-[0.98] transition-all cursor-pointer"
              >
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-xl bg-slate-200 overflow-hidden">
                    <img src={`https://picsum.photos/seed/${inv.img}/100/100`} alt={inv.name} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                  </div>
                  <div>
                    <h5 className="text-xs font-black text-slate-900 dark:text-white">{inv.name}</h5>
                    <p className="text-[8px] text-slate-400 uppercase font-bold tracking-widest">{inv.role}</p>
                  </div>
                </div>
                <p className="text-[10px] text-slate-500 dark:text-white/60 italic leading-snug">"{inv.quote}"</p>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-8 glass-card p-8 rounded-[40px] bg-gradient-to-br from-blue-600/5 to-indigo-600/5 border border-blue-500/10 text-center">
          <h4 className="text-lg font-black text-slate-900 dark:text-white mb-2">Secure Your Future</h4>
          <p className="text-xs text-slate-500 dark:text-white/60 leading-relaxed mb-6">
            Join the elite circle of investors who trust CapitalNest for their retirement planning. Our automated vesting and high-yield private assets are designed for generational wealth.
          </p>
          <button className="w-full py-4 bg-slate-900 dark:bg-white text-white dark:text-black font-black rounded-2xl text-[10px] uppercase tracking-[0.2em] shadow-lg active:scale-95 transition-all">
            Start Retirement Plan
          </button>
        </div>
      </section>
    </>
  );

  const renderPortfolio = () => (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <button onClick={() => setView('home')} className="p-2 rounded-xl bg-gray-500/10 dark:bg-white/10 text-slate-800 dark:text-white">
            <ChevronLeft size={20} />
          </button>
          <h2 className="text-2xl font-black tracking-tight text-slate-900 dark:text-white">Portfolio</h2>
        </div>
        <button 
          onClick={() => { haptic.light(); setShowOnlyFavorites(!showOnlyFavorites); }}
          className={`p-2 rounded-xl border flex items-center gap-2 transition-all ${showOnlyFavorites ? 'bg-amber-500/10 border-amber-500/50 text-amber-500' : 'bg-gray-500/10 border-transparent text-slate-500'}`}
        >
          <Star size={16} fill={showOnlyFavorites ? "currentColor" : "none"} />
        </button>
      </div>
      <div className="space-y-3">
        {filteredAssets.map((asset) => {
          const matured = isMatured(asset.maturityDate);
          return (
            <div 
              key={asset.symbol} 
              className="glass-card p-4 rounded-3xl flex items-center gap-4 active:scale-[0.98] transition-transform"
              onClick={() => { haptic.light(); setSelectedAsset(asset); setView('asset_detail'); }}
            >
              <div onClick={(e) => { e.stopPropagation(); toggleFavorite(asset.symbol); }} className="p-1">
                <Star size={18} className={`${favorites.has(asset.symbol) ? 'text-amber-500 fill-amber-500' : 'text-slate-300 dark:text-white/20'}`} />
              </div>
              <div className="w-10 h-10 rounded-2xl bg-blue-500/10 flex items-center justify-center font-bold text-blue-600 flex-shrink-0">{asset.symbol[0]}</div>
              <div className="flex-1">
                <div className="text-sm font-bold text-slate-900 dark:text-white">{asset.name}</div>
                <div className="flex items-center gap-2">
                  <div className="text-[10px] text-slate-500">{asset.symbol} • {asset.allocation}%</div>
                  <div className={`text-[9px] px-1.5 py-0.5 rounded-full font-bold uppercase ${matured ? 'bg-emerald-500/10 text-emerald-500' : 'bg-amber-500/10 text-amber-500'}`}>
                    {matured ? 'Matured' : 'Vesting'}
                  </div>
                </div>
              </div>
              <div className="text-right">
                <div className="text-sm font-black text-slate-900 dark:text-white">${asset.current_price.toLocaleString()}</div>
                <div className={`text-[10px] font-bold ${asset.isPositive ? 'text-emerald-500' : 'text-rose-500'}`}>
                  {asset.change_percent >= 0 ? '+' : ''}{asset.change_percent}%
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );

  const renderAssetDetail = () => {
    if (!selectedAsset) return null;
    const matured = isMatured(selectedAsset.maturityDate);
    
    return (
      <div className="animate-in fade-in slide-in-from-bottom-8 duration-500">
        <div className="flex items-center gap-3 mb-8">
          <button onClick={() => setView('portfolio')} className="p-2 rounded-xl bg-gray-500/10 dark:bg-white/10 text-slate-800 dark:text-white">
            <ChevronLeft size={20} />
          </button>
          <h2 className="text-2xl font-black tracking-tight text-slate-900 dark:text-white">{selectedAsset.symbol}</h2>
        </div>

        <div className="glass-card p-6 rounded-[40px] mb-6">
          <div className="flex justify-between items-start mb-6">
            <div>
              <p className="text-slate-500 text-xs font-bold uppercase tracking-widest mb-1">Current Value</p>
              <h3 className="text-3xl font-black text-slate-900 dark:text-white">${selectedAsset.current_price.toLocaleString()}</h3>
            </div>
            <div className={`px-3 py-1 rounded-full text-xs font-bold ${selectedAsset.isPositive ? 'bg-emerald-500/20 text-emerald-500' : 'bg-rose-500/20 text-rose-500'}`}>
              {selectedAsset.change_percent >= 0 ? '+' : ''}{selectedAsset.change_percent}%
            </div>
          </div>
          
          <div className="h-32 w-full mb-6">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={selectedAsset.sparkline.map((val, idx) => ({ idx, val }))}>
                <Area type="monotone" dataKey="val" stroke={selectedAsset.isPositive ? '#10b981' : '#f43f5e'} fillOpacity={0.1} fill={selectedAsset.isPositive ? '#10b981' : '#f43f5e'} strokeWidth={3} />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          <div className="grid grid-cols-2 gap-4 pt-4 border-t border-gray-500/10">
            <div>
              <p className="text-[10px] font-bold text-slate-400 uppercase mb-1">Maturity Date</p>
              <p className="text-sm font-bold text-slate-900 dark:text-white">{new Date(selectedAsset.maturityDate).toLocaleDateString()}</p>
            </div>
            <div>
              <p className="text-[10px] font-bold text-slate-400 uppercase mb-1">Status</p>
              <p className={`text-sm font-bold ${matured ? 'text-emerald-500' : 'text-amber-500'}`}>
                {matured ? 'Fully Matured' : 'In Maturity Period'}
              </p>
            </div>
          </div>
        </div>

        <div className="space-y-3">
          <button 
            onClick={() => { haptic.light(); setView('buy_asset'); }}
            className="w-full py-5 bg-blue-600 text-white font-black rounded-[32px] shadow-xl shadow-blue-500/20 active:scale-95 transition-all uppercase tracking-widest text-sm"
          >
            Buy More {selectedAsset.symbol}
          </button>
          <button 
            onClick={() => {
              haptic.medium();
              if (!matured) {
                const fee = (selectedAsset.current_price * selectedAsset.earlyWithdrawalFee) / 100;
                setPendingWithdrawal({ amount: selectedAsset.current_price, fee });
                setShowMaturityWarning(true);
              } else {
                handleNavigate('withdraw');
              }
            }}
            className="w-full py-5 bg-gray-500/10 text-slate-900 dark:text-white font-black rounded-[32px] active:scale-95 transition-all uppercase tracking-widest text-sm"
          >
            Withdraw Funds
          </button>
        </div>
      </div>
    );
  };

  const renderBuyAsset = () => {
    if (!selectedAsset) return null;
    const amount = parseFloat(orderAmount) || 0;
    const pricePerShare = selectedAsset.current_price / 100; // Mock price
    const shares = amount / pricePerShare;
    
    return (
      <div className="animate-in fade-in slide-in-from-bottom-8 duration-500">
        <div className="flex items-center gap-3 mb-8">
          <button onClick={() => setView('asset_detail')} className="p-2 rounded-xl bg-gray-500/10 dark:bg-white/10 text-slate-800 dark:text-white">
            <ChevronLeft size={20} />
          </button>
          <h2 className="text-2xl font-black tracking-tight text-slate-900 dark:text-white">Buy {selectedAsset.symbol}</h2>
        </div>

        <div className="glass-card p-8 rounded-[40px] mb-6 text-center">
          <p className="text-[10px] font-black uppercase text-slate-400 tracking-widest mb-4">Investment Amount</p>
          <div className="flex items-center justify-center gap-2 mb-6">
            <span className="text-4xl font-black text-slate-400">$</span>
            <input 
              type="number" 
              className="bg-transparent border-none outline-none text-6xl font-black tracking-tighter text-center w-full max-w-[220px] dark:text-white" 
              placeholder="0" 
              autoFocus 
              value={orderAmount === '0' ? '' : orderAmount}
              onChange={(e) => setOrderAmount(e.target.value)}
            />
          </div>
          
          <div className="grid grid-cols-2 gap-4 py-4 border-t border-gray-500/10">
            <div className="text-left">
              <p className="text-[9px] font-bold text-slate-400 uppercase">Est. Shares</p>
              <p className="text-sm font-black text-slate-900 dark:text-white">{shares.toFixed(4)}</p>
            </div>
            <div className="text-right">
              <p className="text-[9px] font-bold text-slate-400 uppercase">Market Price</p>
              <p className="text-sm font-black text-slate-900 dark:text-white">${pricePerShare.toFixed(2)}</p>
            </div>
          </div>
        </div>

        <div className="glass-card p-6 rounded-[32px] mb-8 space-y-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-xl bg-blue-500/10 flex items-center justify-center text-blue-600">
                <Clock size={16} />
              </div>
              <span className="text-xs font-bold text-slate-500">Maturity Period</span>
            </div>
            <span className="text-xs font-black text-slate-900 dark:text-white">12 Months</span>
          </div>
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-xl bg-amber-500/10 flex items-center justify-center text-amber-600">
                <ShieldCheck size={16} />
              </div>
              <span className="text-xs font-bold text-slate-500">Early Exit Fee</span>
            </div>
            <span className="text-xs font-black text-amber-500">{selectedAsset.earlyWithdrawalFee}%</span>
          </div>
        </div>

        <button 
          onClick={() => { 
            if (amount > 0) {
              triggerTransaction(() => {
                handleNavigate('history');
              });
            }
          }} 
          className={`w-full py-5 font-black rounded-[32px] shadow-xl transition-all uppercase tracking-widest text-sm ${amount > 0 ? 'bg-blue-600 text-white shadow-blue-500/20 active:scale-95' : 'bg-gray-500/10 text-slate-400 cursor-not-allowed'}`}
        >
          Confirm Purchase
        </button>
      </div>
    );
  };

  const renderKYC = () => {
    const steps = [
      { id: 1, title: 'Personal Info', icon: UserCheck },
      { id: 2, title: 'ID Document', icon: CreditCard },
      { id: 3, title: 'Selfie Check', icon: Smartphone },
    ];

    return (
      <div className="animate-in fade-in slide-in-from-bottom-8 duration-500">
        <div className="flex items-center gap-3 mb-8">
          <button onClick={() => setView('profile')} className="p-2 rounded-xl bg-gray-500/10 dark:bg-white/10 text-slate-800 dark:text-white">
            <ChevronLeft size={20} />
          </button>
          <h2 className="text-2xl font-black tracking-tight text-slate-900 dark:text-white">Verification</h2>
        </div>

        {/* Progress Bar */}
        <div className="flex justify-between mb-10 px-2">
          {steps.map((step) => (
            <div key={step.id} className="flex flex-col items-center gap-2">
              <div className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-all duration-300 ${kycStep >= step.id ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/30' : 'bg-gray-500/10 text-slate-400'}`}>
                <step.icon size={20} />
              </div>
              <span className={`text-[10px] font-bold uppercase tracking-wider ${kycStep >= step.id ? 'text-blue-600' : 'text-slate-400'}`}>{step.title}</span>
            </div>
          ))}
        </div>

        <div className="glass-card p-8 rounded-[40px] shadow-xl">
          {kycStep === 1 && (
            <div className="space-y-6 animate-in fade-in duration-300">
              <div className="space-y-4">
                <div className="space-y-1.5">
                  <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">First Name</label>
                  <input 
                    type="text" 
                    placeholder="Alex" 
                    className="w-full bg-slate-500/5 dark:bg-white/5 border border-slate-200 dark:border-transparent focus:border-blue-500/30 rounded-2xl py-4 px-4 outline-none text-sm dark:text-white transition-all"
                    value={kycData.firstName}
                    onChange={(e) => setKycData({...kycData, firstName: e.target.value})}
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Last Name</label>
                  <input 
                    type="text" 
                    placeholder="Volkov" 
                    className="w-full bg-slate-500/5 dark:bg-white/5 border border-slate-200 dark:border-transparent focus:border-blue-500/30 rounded-2xl py-4 px-4 outline-none text-sm dark:text-white transition-all"
                    value={kycData.lastName}
                    onChange={(e) => setKycData({...kycData, lastName: e.target.value})}
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Country</label>
                  <select 
                    className="w-full bg-slate-500/5 dark:bg-white/5 border border-slate-200 dark:border-transparent focus:border-blue-500/30 rounded-2xl py-4 px-4 outline-none text-sm dark:text-white appearance-none transition-all"
                    value={kycData.country}
                    onChange={(e) => setKycData({...kycData, country: e.target.value})}
                  >
                    <option>United States</option>
                    <option>United Kingdom</option>
                    <option>Germany</option>
                    <option>France</option>
                  </select>
                </div>
              </div>
              <button 
                onClick={() => { haptic.light(); setKycStep(2); }}
                className="w-full py-5 bg-blue-600 text-white font-black rounded-3xl shadow-xl shadow-blue-500/20 active:scale-95 transition-all uppercase tracking-widest text-sm"
              >
                Continue
              </button>
            </div>
          )}

          {kycStep === 2 && (
            <div className="space-y-6 animate-in fade-in duration-300">
              <div className="p-10 border-2 border-dashed border-gray-500/20 rounded-[32px] flex flex-col items-center justify-center text-center group hover:border-blue-500/30 transition-colors cursor-pointer">
                <div className="w-16 h-16 bg-blue-500/10 rounded-full flex items-center justify-center mb-4 text-blue-600 group-hover:scale-110 transition-transform">
                  <Plus size={32} />
                </div>
                <p className="text-sm font-bold text-slate-900 dark:text-white">Upload ID Document</p>
                <p className="text-[10px] text-slate-400 mt-1">Passport, Driver's License or National ID</p>
              </div>
              <div className="flex gap-3">
                <button onClick={() => setKycStep(1)} className="flex-1 py-5 bg-gray-500/10 text-slate-600 dark:text-white font-black rounded-3xl active:scale-95 transition-all uppercase tracking-widest text-xs">Back</button>
                <button onClick={() => setKycStep(3)} className="flex-[2] py-5 bg-blue-600 text-white font-black rounded-3xl shadow-xl shadow-blue-500/20 active:scale-95 transition-all uppercase tracking-widest text-sm">Continue</button>
              </div>
            </div>
          )}

          {kycStep === 3 && (
            <div className="space-y-6 animate-in fade-in duration-300">
              <div className="aspect-square bg-slate-900 rounded-full overflow-hidden relative border-4 border-blue-500/30">
                <div className="absolute inset-0 flex items-center justify-center">
                  <Smartphone size={64} className="text-white/20 animate-pulse" />
                </div>
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-blue-600/20"></div>
              </div>
              <p className="text-center text-xs text-slate-500">Position your face in the circle and follow the instructions.</p>
              <div className="flex gap-3">
                <button onClick={() => setKycStep(2)} className="flex-1 py-5 bg-gray-500/10 text-slate-600 dark:text-white font-black rounded-3xl active:scale-95 transition-all uppercase tracking-widest text-xs">Back</button>
                <button 
                  onClick={() => {
                    haptic.success();
                    setIsKycSubmitting(true);
                    setTimeout(() => {
                      setIsKycSubmitting(false);
                      setKycStatus('pending');
                      setView('profile');
                    }, 2000);
                  }} 
                  className="flex-[2] py-5 bg-blue-600 text-white font-black rounded-3xl shadow-xl shadow-blue-500/20 active:scale-95 transition-all uppercase tracking-widest text-sm flex items-center justify-center gap-2"
                >
                  {isKycSubmitting ? <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div> : 'Complete Verification'}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  };

  const renderSettings = () => (
    <div className="animate-in fade-in slide-in-from-bottom-8 duration-500">
      <div className="flex items-center gap-3 mb-8">
        <button onClick={() => setView('profile')} className="p-2 rounded-xl bg-gray-500/10 dark:bg-white/10 text-slate-800 dark:text-white">
          <ChevronLeft size={20} />
        </button>
        <h2 className="text-2xl font-black tracking-tight text-slate-900 dark:text-white">Settings</h2>
      </div>

      <div className="space-y-6">
        <div className="glass-card p-6 rounded-[32px] space-y-4">
          <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 ml-1">General</h3>
          <div className="space-y-1">
            <button onClick={toggleTheme} className="w-full flex justify-between items-center py-3.5 px-3 rounded-2xl hover:bg-slate-500/5 transition-colors group">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-blue-500/10 text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-all">
                  <Globe size={18} strokeWidth={2.5} />
                </div>
                <span className="text-sm font-black text-slate-900 dark:text-white tracking-tight">Appearance</span>
              </div>
              <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">{theme === 'dark' ? 'Dark' : 'Light'} Mode</span>
            </button>
            <div className="w-full flex justify-between items-center py-3.5 px-3 rounded-2xl">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-emerald-500/10 text-emerald-600">
                  <Bell size={18} strokeWidth={2.5} />
                </div>
                <span className="text-sm font-black text-slate-900 dark:text-white tracking-tight">Notifications</span>
              </div>
              <button 
                onClick={() => setNotificationsEnabled(!notificationsEnabled)}
                className={`w-11 h-6 rounded-full transition-colors relative ${notificationsEnabled ? 'bg-blue-600' : 'bg-slate-200 dark:bg-white/10'}`}
              >
                <div className={`absolute top-1 w-4 h-4 bg-white rounded-full shadow-sm transition-all ${notificationsEnabled ? 'left-6' : 'left-1'}`}></div>
              </button>
            </div>
          </div>
        </div>

        <div className="glass-card p-6 rounded-[32px] space-y-4">
          <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 ml-1">Security</h3>
          <div className="space-y-1">
            <div className="w-full flex justify-between items-center py-3.5 px-3 rounded-2xl">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-purple-500/10 text-purple-600">
                  <Smartphone size={18} strokeWidth={2.5} />
                </div>
                <span className="text-sm font-black text-slate-900 dark:text-white tracking-tight">Biometric Login</span>
              </div>
              <button 
                onClick={() => setBiometricsEnabled(!biometricsEnabled)}
                className={`w-11 h-6 rounded-full transition-colors relative ${biometricsEnabled ? 'bg-blue-600' : 'bg-slate-200 dark:bg-white/10'}`}
              >
                <div className={`absolute top-1 w-4 h-4 bg-white rounded-full shadow-sm transition-all ${biometricsEnabled ? 'left-6' : 'left-1'}`}></div>
              </button>
            </div>
            <button className="w-full flex justify-between items-center py-3.5 px-3 rounded-2xl hover:bg-slate-500/5 transition-colors group">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-rose-500/10 text-rose-600 group-hover:bg-rose-600 group-hover:text-white transition-all">
                  <Lock size={18} strokeWidth={2.5} />
                </div>
                <span className="text-sm font-black text-slate-900 dark:text-white tracking-tight">Change Password</span>
              </div>
              <ChevronRight size={16} className="text-slate-400" />
            </button>
          </div>
        </div>

        <div className="glass-card p-6 rounded-[32px] space-y-4">
          <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 ml-1">Support</h3>
          <div className="space-y-1">
            <button onClick={() => handleNavigate('help')} className="w-full flex justify-between items-center py-3.5 px-3 rounded-2xl hover:bg-slate-500/5 transition-colors group">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-amber-500/10 text-amber-600 group-hover:bg-amber-600 group-hover:text-white transition-all">
                  <AlertCircle size={18} strokeWidth={2.5} />
                </div>
                <span className="text-sm font-black text-slate-900 dark:text-white tracking-tight">Help Center</span>
              </div>
              <ChevronRight size={16} className="text-slate-400" />
            </button>
            <button className="w-full flex justify-between items-center py-3.5 px-3 rounded-2xl hover:bg-rose-500/5 transition-colors text-rose-500 group">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-rose-500/10 text-rose-600 group-hover:bg-rose-600 group-hover:text-white transition-all">
                  <LogOut size={18} strokeWidth={2.5} />
                </div>
                <span className="text-sm font-black tracking-tight">Delete Account</span>
              </div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  const renderProfile = () => (
    <div className="animate-in fade-in slide-in-from-bottom-8 duration-500">
      <div className="flex flex-col items-center mb-8">
        <div className="w-24 h-24 rounded-full bg-blue-500/10 flex items-center justify-center mb-4 relative">
          <div className="text-3xl font-black text-blue-600">AV</div>
          <div className="absolute bottom-0 right-0 p-1.5 bg-emerald-500 rounded-full border-4 border-white dark:border-slate-900">
            {kycStatus === 'verified' ? <UserCheck size={14} className="text-white" /> : <Clock size={14} className="text-white" />}
          </div>
        </div>
        <h2 className="text-2xl font-black text-slate-900 dark:text-white">Alex Volkov</h2>
        <p className="text-slate-500 dark:text-white/40 text-sm font-medium">alex.volkov@capitalnest.io</p>
        
        {kycStatus !== 'verified' && (
          <div className={`mt-3 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest ${kycStatus === 'pending' ? 'bg-amber-500/10 text-amber-500' : 'bg-rose-500/10 text-rose-500'}`}>
            {kycStatus === 'pending' ? 'Verification Pending' : 'Identity Not Verified'}
          </div>
        )}
      </div>

      <div className="space-y-3">
        {[
          { icon: HistoryIcon, label: 'History', view: 'history' as AppView },
          { icon: CreditCard, label: 'Payments', view: 'payments' as AppView },
          { icon: ShieldCheck, label: 'Identity & KYC', view: 'kyc' as AppView, badge: kycStatus === 'verified' ? 'Verified' : kycStatus === 'pending' ? 'Pending' : 'Action Required' },
          { icon: Settings, label: 'Settings', view: 'settings' as AppView },
        ].map((item, idx) => (
          <button 
            key={idx}
            onClick={() => handleNavigate(item.view)}
            className="w-full glass-card p-5 rounded-3xl flex items-center justify-between transition-all active:scale-[0.98]"
          >
            <div className="flex items-center gap-4">
              <div className="p-2.5 rounded-2xl bg-gray-500/10 text-slate-600 dark:text-white/80">
                <item.icon size={20} />
              </div>
              <div className="text-left">
                <div className="font-bold text-slate-900 dark:text-white">{item.label}</div>
                {item.badge && <div className={`text-[9px] font-bold uppercase ${item.badge === 'Verified' ? 'text-emerald-500' : item.badge === 'Pending' ? 'text-amber-500' : 'text-rose-500'}`}>{item.badge}</div>}
              </div>
            </div>
            <ChevronRight size={18} className="text-slate-400" />
          </button>
        ))}
        
        <button 
          onClick={handleLogOut}
          className="w-full mt-6 p-5 rounded-3xl bg-rose-500/10 text-rose-500 flex items-center justify-center gap-2 font-bold transition-all active:scale-[0.98]"
        >
          <LogOut size={20} />
          <span>Secure Sign Out</span>
        </button>
      </div>
    </div>
  );

  const renderTransaction = (type: 'deposit' | 'withdraw' | 'transfer') => (
    <div className="animate-in fade-in slide-in-from-bottom-8 duration-500">
      <div className="flex items-center gap-3 mb-8">
        <button onClick={() => setView('home')} className="p-2 rounded-xl bg-gray-500/10 dark:bg-white/10 text-slate-800 dark:text-white">
          <ChevronLeft size={20} />
        </button>
        <h2 className="text-2xl font-black tracking-tight capitalize text-slate-900 dark:text-white">{type}</h2>
      </div>
      <div className="glass-card p-10 rounded-[40px] mb-8 text-center flex flex-col items-center">
        <p className="text-[10px] font-black uppercase text-slate-400 tracking-widest mb-4">Enter Amount (USD)</p>
        <div className="flex items-center gap-2">
          <span className="text-4xl font-black text-slate-400">$</span>
          <input type="number" className="bg-transparent border-none outline-none text-6xl font-black tracking-tighter text-center w-full max-w-[200px] dark:text-white" placeholder="0" autoFocus />
        </div>
      </div>
      {type === 'withdraw' && (
        <div className="space-y-4 mb-8">
          <h3 className="text-xs font-black uppercase tracking-widest text-slate-400 px-2">Select Payout Method</h3>
          <div className="space-y-3">
            {payoutMethods.map((method) => (
              <div key={method.id} onClick={() => { haptic.light(); setSelectedPayoutId(method.id); }} className={`glass-card p-5 rounded-3xl flex items-center justify-between transition-all cursor-pointer ${selectedPayoutId === method.id ? 'border-blue-500 ring-2 ring-blue-500/20' : ''}`}>
                <div className="flex items-center gap-4">
                  <div className="p-2 rounded-xl bg-gray-500/10 text-slate-400"><CreditCard size={20}/></div>
                  <div className="text-slate-900 dark:text-white">
                    <div className="text-sm font-bold">{method.label}</div>
                    <div className="text-[10px] text-slate-400 uppercase">{method.details}</div>
                  </div>
                </div>
                {selectedPayoutId === method.id && <CheckCircle2 size={18} className="text-blue-500" />}
              </div>
            ))}
          </div>
        </div>
      )}
      <button 
        onClick={() => { 
          triggerTransaction(() => {
            handleNavigate('history');
          });
        }} 
        className="w-full py-5 bg-blue-600 text-white font-black rounded-[32px] shadow-xl shadow-blue-500/20 active:scale-95 transition-all uppercase tracking-widest text-sm"
      >
        Confirm {type}
      </button>
    </div>
  );

  const renderNotifications = () => (
    <div className="animate-in fade-in slide-in-from-bottom-8 duration-500">
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-3">
          <button onClick={() => setView('home')} className="p-2 rounded-xl bg-gray-500/10 dark:bg-white/10 text-slate-800 dark:text-white">
            <ChevronLeft size={20} />
          </button>
          <h2 className="text-2xl font-black tracking-tight text-slate-900 dark:text-white">Notifications</h2>
        </div>
        <button onClick={() => setNotifications(notifications.map(n => ({ ...n, unread: false })))} className="text-[10px] font-black uppercase tracking-widest text-blue-600">Mark all read</button>
      </div>
      <div className="space-y-3">
        {notifications.length > 0 ? (
          notifications.map((n) => (
            <div key={n.id} className={`glass-card p-5 rounded-3xl flex items-start gap-4 transition-all ${n.unread ? 'border-blue-500/30 bg-blue-500/5' : ''}`}>
              <div className={`p-2.5 rounded-2xl ${n.type === 'success' ? 'bg-emerald-500/10 text-emerald-600' : n.type === 'alert' ? 'bg-rose-500/10 text-rose-600' : 'bg-blue-500/10 text-blue-600'}`}>
                {n.type === 'success' ? <CheckCircle2 size={18} /> : n.type === 'alert' ? <AlertCircle size={18} /> : <Bell size={18} />}
              </div>
              <div className="flex-1">
                <div className="flex justify-between items-start mb-1">
                  <h4 className="text-sm font-black text-slate-900 dark:text-white tracking-tight">{n.title}</h4>
                  <span className="text-[9px] font-bold text-slate-400 uppercase">{n.created_at || n.time}</span>
                </div>
                <p className="text-xs text-slate-500 dark:text-white/60 leading-relaxed">{n.message}</p>
              </div>
            </div>
          ))
        ) : (
          <div className="flex flex-col items-center justify-center py-20 opacity-40">
            <Bell size={48} className="mb-4" />
            <p className="text-sm font-bold">No notifications yet</p>
          </div>
        )}
      </div>
    </div>
  );

  const renderHelp = () => (
    <div className="animate-in fade-in slide-in-from-bottom-8 duration-500">
      <div className="flex items-center gap-3 mb-8">
        <button onClick={() => setView('settings')} className="p-2 rounded-xl bg-gray-500/10 dark:bg-white/10 text-slate-800 dark:text-white">
          <ChevronLeft size={20} />
        </button>
        <h2 className="text-2xl font-black tracking-tight text-slate-900 dark:text-white">Help Center</h2>
      </div>
      <div className="space-y-6">
        <div className="glass-card p-8 rounded-[40px] text-center">
          <div className="w-16 h-16 bg-blue-600/10 rounded-3xl flex items-center justify-center mb-4 mx-auto text-blue-600">
            <Globe size={32} />
          </div>
          <h3 className="text-xl font-black text-slate-900 dark:text-white mb-2">How can we help?</h3>
          <p className="text-sm text-slate-500 dark:text-white/60 mb-6">Search our knowledge base or contact support directly.</p>
          <div className="relative group">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-500 transition-colors" size={18} />
            <input type="text" placeholder="Search topics..." className="w-full bg-slate-500/5 dark:bg-white/5 border border-slate-200 dark:border-transparent focus:border-blue-500/30 rounded-2xl py-4 pl-12 pr-4 outline-none text-sm dark:text-white transition-all" />
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <button className="glass-card p-6 rounded-[32px] text-center hover:bg-blue-500/5 transition-all group">
            <div className="w-12 h-12 bg-emerald-500/10 rounded-2xl flex items-center justify-center mb-3 mx-auto text-emerald-600 group-hover:bg-emerald-500 group-hover:text-white transition-all">
              <Mail size={20} />
            </div>
            <p className="text-xs font-black uppercase tracking-widest text-slate-900 dark:text-white">Email Us</p>
          </button>
          <button className="glass-card p-6 rounded-[32px] text-center hover:bg-blue-500/5 transition-all group">
            <div className="w-12 h-12 bg-purple-500/10 rounded-2xl flex items-center justify-center mb-3 mx-auto text-purple-600 group-hover:bg-purple-500 group-hover:text-white transition-all">
              <Smartphone size={20} />
            </div>
            <p className="text-xs font-black uppercase tracking-widest text-slate-900 dark:text-white">Live Chat</p>
          </button>
        </div>
        <div className="glass-card p-6 rounded-[32px] space-y-4">
          <h4 className="text-[10px] font-black uppercase tracking-widest text-slate-400">Popular Topics</h4>
          <div className="space-y-1">
            {['How to withdraw funds', 'KYC verification process', 'Understanding maturity dates', 'Security best practices'].map((topic, i) => (
              <button key={i} className="w-full flex justify-between items-center py-3 px-2 rounded-xl hover:bg-slate-500/5 transition-colors text-left">
                <span className="text-sm font-bold text-slate-700 dark:text-white/80">{topic}</span>
                <ChevronRight size={16} className="text-slate-400" />
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  const renderLegal = (type: 'terms' | 'privacy') => (
    <div className="animate-in fade-in slide-in-from-bottom-8 duration-500">
      <div className="flex items-center gap-3 mb-8">
        <button onClick={() => setView('auth')} className="p-2 rounded-xl bg-gray-500/10 dark:bg-white/10 text-slate-800 dark:text-white">
          <ChevronLeft size={20} />
        </button>
        <h2 className="text-2xl font-black tracking-tight text-slate-900 dark:text-white">{type === 'terms' ? 'Terms of Service' : 'Privacy Policy'}</h2>
      </div>
      <div className="glass-card p-8 rounded-[40px] prose prose-slate dark:prose-invert max-w-none">
        <p className="text-xs text-slate-500 dark:text-white/60 leading-relaxed mb-6">Last updated: February 23, 2026</p>
        <div className="space-y-6 text-sm text-slate-700 dark:text-white/80 leading-relaxed">
          <h3 className="text-lg font-black text-slate-900 dark:text-white">1. Introduction</h3>
          <p>Welcome to CapitalNest. By using our services, you agree to these terms. Please read them carefully. Our platform provides institutional-grade wealth management and investment opportunities.</p>
          <h3 className="text-lg font-black text-slate-900 dark:text-white">2. Eligibility</h3>
          <p>You must be at least 18 years old and have the legal capacity to enter into a binding agreement to use CapitalNest. Verification through our KYC process is mandatory for all users.</p>
          <h3 className="text-lg font-black text-slate-900 dark:text-white">3. Investment Risks</h3>
          <p>Investing in financial markets involves risks. Past performance is not indicative of future results. You should only invest capital that you can afford to lose. CapitalNest is not responsible for market fluctuations.</p>
          <h3 className="text-lg font-black text-slate-900 dark:text-white">4. Privacy & Data</h3>
          <p>We value your privacy. Your data is encrypted and handled according to international security standards. We do not sell your personal information to third parties.</p>
        </div>
      </div>
    </div>
  );

  const renderAddPayment = () => {
    const [addType, setAddType] = useState<'crypto' | 'bank' | 'other'>('crypto');
    
    return (
      <div className="animate-in fade-in slide-in-from-bottom-8 duration-500">
        <div className="flex items-center gap-3 mb-8">
          <button onClick={() => setView('payments')} className="p-2 rounded-xl bg-gray-500/10 dark:bg-white/10 text-slate-800 dark:text-white">
            <ChevronLeft size={20} />
          </button>
          <h2 className="text-2xl font-black tracking-tight text-slate-900 dark:text-white">Add Method</h2>
        </div>

        <div className="flex bg-slate-500/5 dark:bg-white/5 rounded-2xl p-1.5 mb-8">
          <button onClick={() => setAddType('crypto')} className={`flex-1 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${addType === 'crypto' ? 'bg-white dark:bg-white/10 shadow-lg text-blue-600 dark:text-white' : 'text-slate-400'}`}>Crypto</button>
          <button onClick={() => setAddType('bank')} className={`flex-1 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${addType === 'bank' ? 'bg-white dark:bg-white/10 shadow-lg text-blue-600 dark:text-white' : 'text-slate-400'}`}>Bank</button>
          <button onClick={() => setAddType('other')} className={`flex-1 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${addType === 'other' ? 'bg-white dark:bg-white/10 shadow-lg text-blue-600 dark:text-white' : 'text-slate-400'}`}>Others</button>
        </div>

        <div className="glass-card p-8 rounded-[40px] space-y-6">
          {addType === 'crypto' && (
            <div className="space-y-4">
              <div className="space-y-1.5">
                <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Asset Type</label>
                <select className="w-full bg-slate-500/5 dark:bg-white/5 border border-slate-200 dark:border-transparent focus:border-blue-500/30 rounded-2xl py-4 px-4 outline-none text-sm dark:text-white appearance-none">
                  <option>Bitcoin (BTC)</option>
                  <option>Tether (USDT)</option>
                </select>
              </div>
              <div className="space-y-1.5">
                <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Wallet Address</label>
                <input type="text" placeholder="bc1q..." className="w-full bg-slate-500/5 dark:bg-white/5 border border-slate-200 dark:border-transparent focus:border-blue-500/30 rounded-2xl py-4 px-4 outline-none text-sm dark:text-white" />
              </div>
            </div>
          )}

          {addType === 'bank' && (
            <div className="space-y-4">
              <div className="space-y-1.5">
                <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Bank Name</label>
                <input type="text" placeholder="WealthChase Bank" className="w-full bg-slate-500/5 dark:bg-white/5 border border-slate-200 dark:border-transparent focus:border-blue-500/30 rounded-2xl py-4 px-4 outline-none text-sm dark:text-white" />
              </div>
              <div className="space-y-1.5">
                <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Account Number</label>
                <input type="text" placeholder="0000 0000 0000" className="w-full bg-slate-500/5 dark:bg-white/5 border border-slate-200 dark:border-transparent focus:border-blue-500/30 rounded-2xl py-4 px-4 outline-none text-sm dark:text-white" />
              </div>
            </div>
          )}

          {addType === 'other' && (
            <div className="space-y-4">
              <div className="p-6 rounded-3xl bg-blue-500/5 border border-blue-500/20 text-center">
                <p className="text-sm font-black text-blue-600 mb-2">PayPal & Venmo</p>
                <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Coming Soon</p>
              </div>
            </div>
          )}

          <button 
            disabled={addType === 'other'}
            onClick={() => { haptic.success(); handleNavigate('payments'); }} 
            className={`w-full py-5 font-black rounded-3xl shadow-xl transition-all uppercase tracking-widest text-sm ${addType === 'other' ? 'bg-slate-200 text-slate-400 cursor-not-allowed' : 'bg-blue-600 text-white shadow-blue-500/20 active:scale-95'}`}
          >
            Save Method
          </button>
        </div>
      </div>
    );
  };

  const renderPayments = () => (
    <div className="animate-in fade-in slide-in-from-bottom-8 duration-500">
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-3">
          <button onClick={() => setView('profile')} className="p-2 rounded-xl bg-gray-500/10 dark:bg-white/10 text-slate-800 dark:text-white">
            <ChevronLeft size={20} />
          </button>
          <h2 className="text-2xl font-black tracking-tight text-slate-900 dark:text-white">Payouts</h2>
        </div>
        <button className="p-2.5 rounded-2xl bg-blue-600 text-white" onClick={() => handleNavigate('add_payment')}><Plus size={20}/></button>
      </div>
      <div className="space-y-4">
        {payoutMethods.map((method) => (
          <div key={method.id} className="glass-card p-6 rounded-[32px] flex items-center justify-between group hover:border-blue-500/30 transition-all">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-2xl bg-slate-500/5 text-slate-400 group-hover:text-blue-500 transition-colors">
                {method.type === 'Bank' ? <Globe size={24}/> : <Wallet size={24}/>}
              </div>
              <div>
                <div className="text-sm font-black text-slate-900 dark:text-white">{method.label}</div>
                <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{method.details}</div>
              </div>
            </div>
            <ChevronRight size={18} className="text-slate-300" />
          </div>
        ))}
        <button 
          onClick={() => { haptic.light(); handleNavigate('add_payment'); }}
          className="w-full p-8 border-2 border-dashed border-slate-200 dark:border-white/10 rounded-[32px] flex flex-col items-center justify-center opacity-40 hover:opacity-100 hover:border-blue-500/50 transition-all active:scale-[0.98]"
        >
          <Plus size={32} className="mb-2" />
          <p className="text-xs font-black uppercase tracking-widest">Add New Method</p>
        </button>
      </div>
    </div>
  );

  const renderHistory = () => (
    <div className="animate-in fade-in slide-in-from-bottom-8 duration-500">
      <div className="flex items-center gap-3 mb-8">
        <button onClick={() => setView('profile')} className="p-2 rounded-xl bg-gray-500/10 dark:bg-white/10 text-slate-800 dark:text-white">
          <ChevronLeft size={20} />
        </button>
        <h2 className="text-2xl font-black tracking-tight text-slate-900 dark:text-white">History</h2>
      </div>
      <div className="space-y-4">
        {dbTransactions.map((tx) => (
          <div key={tx.id} className="glass-card p-5 rounded-3xl flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className={`p-3 rounded-2xl ${tx.type === 'buy' || tx.type === 'deposit' ? 'bg-emerald-500/10 text-emerald-600' : 'bg-rose-500/10 text-rose-600'}`}>
                {tx.type === 'buy' ? <ArrowDown size={20}/> : tx.type === 'withdraw' ? <ArrowUp size={20}/> : <Wallet size={20}/>}
              </div>
              <div className="text-slate-900 dark:text-white">
                <div className="text-sm font-bold capitalize">{tx.type} {tx.asset_symbol}</div>
                <div className="text-[10px] text-slate-400">{tx.created_at || tx.date}</div>
              </div>
            </div>
            <div className="text-right">
              <div className="text-sm font-black text-slate-900 dark:text-white">${tx.amount.toLocaleString()}</div>
              <div className={`text-[10px] font-bold uppercase ${tx.status === 'completed' ? 'text-emerald-500' : 'text-amber-500'}`}>{tx.status}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderInvestorProfile = () => {
    if (!selectedInvestor) return null;
    return (
      <div className="animate-in fade-in slide-in-from-bottom-8 duration-500">
        <div className="flex items-center gap-3 mb-8">
          <button onClick={() => setView('home')} className="p-2 rounded-xl bg-gray-500/10 dark:bg-white/10 text-slate-800 dark:text-white">
            <ChevronLeft size={20} />
          </button>
          <h2 className="text-2xl font-black tracking-tight text-slate-900 dark:text-white">Investor Profile</h2>
        </div>

        <div className="glass-card p-8 rounded-[40px] mb-8 text-center relative overflow-hidden">
          <div className="absolute top-0 right-0 -mr-16 -mt-16 w-48 h-48 bg-blue-500/5 rounded-full blur-3xl"></div>
          <div className="w-32 h-32 rounded-[40px] bg-slate-900 mx-auto mb-6 overflow-hidden shadow-2xl border-4 border-white dark:border-slate-800">
            <img src={`https://picsum.photos/seed/${selectedInvestor.img}/200/200`} alt={selectedInvestor.name} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
          </div>
          <h3 className="text-2xl font-black text-slate-900 dark:text-white mb-1">{selectedInvestor.name}</h3>
          <p className="text-[10px] text-blue-600 font-black uppercase tracking-[0.3em] mb-4">{selectedInvestor.role}</p>
          
          <div className="flex justify-center gap-8 py-6 border-y border-slate-500/10">
            <div>
              <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1">Net Worth</p>
              <p className="text-lg font-black text-slate-900 dark:text-white">{selectedInvestor.netWorth}</p>
            </div>
            <div>
              <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1">Rating</p>
              <div className="flex items-center gap-0.5">
                {[1,2,3,4,5].map(s => <Star key={s} size={12} className="text-amber-500 fill-amber-500" />)}
              </div>
            </div>
          </div>
        </div>

        <div className="glass-card p-8 rounded-[40px] mb-8">
          <h4 className="text-xs font-black text-slate-900 dark:text-white uppercase tracking-widest mb-4">Biography</h4>
          <p className="text-sm text-slate-500 dark:text-white/70 leading-relaxed">
            {selectedInvestor.bio}
          </p>
        </div>

        <div className="glass-card p-8 rounded-[40px] mb-8">
          <h4 className="text-xs font-black text-slate-900 dark:text-white uppercase tracking-widest mb-6">Core Investments</h4>
          <div className="grid grid-cols-2 gap-4">
            {selectedInvestor.investments.map((inv, i) => (
              <div key={i} className="p-4 rounded-2xl bg-slate-500/5 dark:bg-white/5 border border-slate-200/50 dark:border-white/10 flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-blue-600/10 flex items-center justify-center text-blue-600 font-bold text-xs">
                  {inv[0]}
                </div>
                <span className="text-xs font-bold text-slate-700 dark:text-white/80">{inv}</span>
              </div>
            ))}
          </div>
        </div>

        <button 
          onClick={() => {
            haptic.medium();
            triggerTransaction(() => {
              handleNavigate('history');
            });
          }}
          className="w-full py-5 bg-blue-600 text-white font-black rounded-[32px] shadow-xl shadow-blue-500/20 active:scale-95 transition-all uppercase tracking-widest text-sm"
        >
          Follow Strategy
        </button>
      </div>
    );
  };

  const renderTransactionStatusModal = () => {
    if (transactionStatus === 'none') return null;

    return (
      <AnimatePresence>
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[200] flex items-center justify-center p-6 bg-black/60 backdrop-blur-md"
        >
          <motion.div 
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            className="glass-card w-full max-w-sm p-10 rounded-[48px] shadow-2xl text-center"
          >
            {transactionStatus === 'processing' && (
              <div className="flex flex-col items-center">
                <div className="w-20 h-20 bg-blue-500/10 rounded-full flex items-center justify-center mb-6">
                  <Loader2 size={40} className="text-blue-600 animate-spin" />
                </div>
                <h3 className="text-xl font-black text-slate-900 dark:text-white mb-2">Processing Transaction</h3>
                <p className="text-sm text-slate-500 dark:text-white/60">Please do not close the app. We are securing your investment.</p>
              </div>
            )}

            {transactionStatus === 'success' && (
              <div className="flex flex-col items-center">
                <motion.div 
                  initial={{ scale: 0.5, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ type: 'spring', damping: 12 }}
                  className="w-20 h-20 bg-emerald-500/10 rounded-full flex items-center justify-center mb-6"
                >
                  <CheckCircle2 size={40} className="text-emerald-500" />
                </motion.div>
                <h3 className="text-xl font-black text-slate-900 dark:text-white mb-2">Payment Successful</h3>
                <p className="text-sm text-slate-500 dark:text-white/60">Your funds have been securely allocated to your portfolio.</p>
              </div>
            )}

            {transactionStatus === 'failed' && (
              <div className="flex flex-col items-center">
                <motion.div 
                  initial={{ scale: 0.5, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ type: 'spring', damping: 12 }}
                  className="w-20 h-20 bg-rose-500/10 rounded-full flex items-center justify-center mb-6"
                >
                  <XCircle size={40} className="text-rose-500" />
                </motion.div>
                <h3 className="text-xl font-black text-slate-900 dark:text-white mb-2">Transaction Declined</h3>
                <p className="text-sm text-slate-500 dark:text-white/60">Your bank or payment provider declined the request. Please try another method.</p>
                <button 
                  onClick={() => setTransactionStatus('none')}
                  className="mt-8 w-full py-4 bg-slate-900 dark:bg-white text-white dark:text-black font-black rounded-2xl text-xs uppercase tracking-widest"
                >
                  Try Again
                </button>
              </div>
            )}
          </motion.div>
        </motion.div>
      </AnimatePresence>
    );
  };

  const renderAdminAuth = () => (
    <div className="min-h-screen flex flex-col justify-center animate-in fade-in zoom-in-95 duration-700 pb-12 px-2">
      <div className="flex flex-col items-center mb-10">
        <div className="w-20 h-20 bg-white dark:bg-white/5 rounded-[28px] flex items-center justify-center shadow-2xl mb-6 overflow-hidden border border-slate-100 dark:border-white/10">
          <img src="/logo.png" alt="Admin Access" className="w-full h-full object-contain p-2" referrerPolicy="no-referrer" />
        </div>
        <h1 className="text-3xl font-black text-slate-900 dark:text-white tracking-tighter mb-1">Admin Access</h1>
        <p className="text-slate-500 dark:text-white/40 text-[10px] font-black uppercase tracking-[0.3em]">Secure Management Terminal</p>
      </div>

      <div className="glass-card p-8 rounded-[48px] shadow-2xl space-y-6 border border-white/20 dark:border-white/5 max-w-sm mx-auto w-full">
        <div className="space-y-4">
          <div className="space-y-1.5">
            <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Admin ID</label>
            <div className="relative group">
              <User className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-500 transition-colors" size={18} />
              <input type="text" placeholder="ADM-XXXX" className="w-full bg-slate-500/5 dark:bg-white/5 border border-slate-200 dark:border-transparent focus:border-blue-500/30 rounded-2xl py-4 pl-12 pr-4 outline-none text-sm dark:text-white transition-all" />
            </div>
          </div>
          <div className="space-y-1.5">
            <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Security Key</label>
            <div className="relative group">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-500 transition-colors" size={18} />
              <input type={showPassword ? "text" : "password"} placeholder="••••••••" className="w-full bg-slate-500/5 dark:bg-white/5 border border-slate-200 dark:border-transparent focus:border-blue-500/30 rounded-2xl py-4 pl-12 pr-12 outline-none text-sm dark:text-white transition-all" />
              <button onClick={() => setShowPassword(!showPassword)} className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400">{showPassword ? <EyeOff size={18}/> : <Eye size={18}/>}</button>
            </div>
          </div>
        </div>

        <button 
          onClick={() => {
            haptic.success();
            setIsAdmin(true);
            setIsLoggedIn(true);
            setView('admin_dashboard');
          }}
          className="w-full py-5 bg-slate-900 text-white font-black rounded-3xl shadow-xl active:scale-95 transition-all uppercase tracking-widest text-sm"
        >
          Authorize Access
        </button>

        <button 
          onClick={() => setView('auth')}
          className="w-full py-4 text-slate-400 font-black text-[10px] uppercase tracking-widest hover:text-slate-600 transition-colors"
        >
          Return to User Login
        </button>
      </div>
    </div>
  );

  const renderAdminDashboard = () => {
    const sidebarItems: { id: AdminSubView, label: string, icon: any }[] = [
      { id: 'dashboard', label: 'Overview', icon: LayoutDashboard },
      { id: 'users', label: 'Users', icon: Users },
      { id: 'referrals', label: 'Referrals', icon: Share2 },
      { id: 'deposits', label: 'Deposits', icon: ArrowDown },
      { id: 'withdrawals', label: 'Withdrawals', icon: ArrowUp },
      { id: 'kyc', label: 'KYC', icon: ShieldCheck },
      { id: 'settings', label: 'Settings', icon: Settings2 },
    ];

    const renderAdminSubView = () => {
      switch (adminSubView) {
        case 'dashboard':
          return (
            <div className="space-y-8 animate-in fade-in duration-500">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {[
                  { label: 'Total Users', value: adminUsers.length.toString(), icon: Users, color: 'blue' },
                  { label: 'Active Sessions', value: '1,420', icon: Activity, color: 'emerald' },
                  { label: 'Pending KYC', value: adminUsers.filter(u => u.kyc === 'pending').length.toString(), icon: ShieldCheck, color: 'amber' },
                  { label: 'System Load', value: '24%', icon: Database, color: 'purple' },
                ].map((stat, i) => (
                  <div key={i} className="glass-card p-6 rounded-[32px]">
                    <div className={`w-12 h-12 rounded-2xl bg-${stat.color}-500/10 text-${stat.color}-600 flex items-center justify-center mb-4`}>
                      <stat.icon size={24} />
                    </div>
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">{stat.label}</p>
                    <p className="text-2xl font-black text-slate-900 dark:text-white">{stat.value}</p>
                  </div>
                ))}
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="glass-card p-8 rounded-[40px]">
                  <h3 className="text-sm font-black uppercase tracking-widest text-slate-400 mb-6">Platform Controls</h3>
                  <div className="space-y-6">
                    {[
                      { label: 'Maintenance Mode', active: false },
                      { label: 'New User Signups', active: true },
                      { label: 'Real-time Market Feed', active: true },
                      { label: 'Withdrawal Processing', active: true },
                    ].map((control, i) => (
                      <div key={i} className="flex justify-between items-center">
                        <span className="text-sm font-bold text-slate-700 dark:text-white/80">{control.label}</span>
                        <button className={`w-12 h-6 rounded-full relative transition-colors ${control.active ? 'bg-blue-600' : 'bg-slate-200 dark:bg-white/10'}`}>
                          <div className={`absolute top-1 w-4 h-4 bg-white rounded-full shadow-sm transition-all ${control.active ? 'left-7' : 'left-1'}`}></div>
                        </button>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="glass-card p-8 rounded-[40px]">
                  <h3 className="text-sm font-black uppercase tracking-widest text-slate-400 mb-6">Recent Alerts</h3>
                  <div className="space-y-4">
                    {[
                      { title: 'High Volume Deposit', user: 'User #8291', amount: '$50,000', time: '2m ago' },
                      { title: 'New KYC Submission', user: 'User #9012', amount: 'Pending', time: '15m ago' },
                      { title: 'Failed Login Attempt', user: 'IP: 192.168.1.1', amount: 'Security', time: '1h ago' },
                    ].map((alert, i) => (
                      <div key={i} className="flex items-center justify-between p-4 bg-slate-500/5 dark:bg-white/5 rounded-2xl">
                        <div>
                          <p className="text-xs font-black text-slate-900 dark:text-white">{alert.title}</p>
                          <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">{alert.user}</p>
                        </div>
                        <div className="text-right">
                          <p className="text-[10px] font-black text-blue-600">{alert.amount}</p>
                          <p className="text-[8px] text-slate-400 uppercase font-bold">{alert.time}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          );
        case 'users':
          return (
            <div className="space-y-6 animate-in fade-in duration-500">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-black text-slate-900 dark:text-white">User Management</h3>
                <button className="px-4 py-2 bg-blue-600 text-white text-xs font-black rounded-xl uppercase tracking-widest">Add User</button>
              </div>
              <div className="glass-card rounded-[32px] overflow-hidden">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-slate-500/5 border-b border-slate-500/10">
                      <th className="p-4 text-[10px] font-black uppercase tracking-widest text-slate-400">User</th>
                      <th className="p-4 text-[10px] font-black uppercase tracking-widest text-slate-400">Balance</th>
                      <th className="p-4 text-[10px] font-black uppercase tracking-widest text-slate-400">KYC</th>
                      <th className="p-4 text-[10px] font-black uppercase tracking-widest text-slate-400">Fee</th>
                      <th className="p-4 text-[10px] font-black uppercase tracking-widest text-slate-400 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {adminUsers.map((user) => (
                      <tr key={user.id} className="border-b border-slate-500/5 hover:bg-slate-500/5 transition-colors">
                        <td className="p-4">
                          <div className="font-bold text-slate-900 dark:text-white text-sm">{user.name}</div>
                          <div className="text-[10px] text-slate-400">{user.email}</div>
                        </td>
                        <td className="p-4">
                          <div className="flex items-center gap-2">
                            <span className="text-sm font-black text-slate-900 dark:text-white">${user.balance.toLocaleString()}</span>
                            <button 
                              onClick={() => {
                                const newBalance = prompt('Enter new balance:', user.balance.toString());
                                if (newBalance !== null) {
                                  setAdminUsers(adminUsers.map(u => u.id === user.id ? { ...u, balance: parseFloat(newBalance) } : u));
                                }
                              }}
                              className="p-1.5 rounded-lg bg-blue-500/10 text-blue-600 hover:bg-blue-600 hover:text-white transition-all"
                            >
                              <Settings2 size={12} />
                            </button>
                          </div>
                        </td>
                        <td className="p-4">
                          <span className={`text-[9px] font-black uppercase px-2 py-1 rounded-full ${user.kyc === 'verified' ? 'bg-emerald-500/10 text-emerald-500' : user.kyc === 'pending' ? 'bg-amber-500/10 text-amber-500' : 'bg-rose-500/10 text-rose-500'}`}>
                            {user.kyc}
                          </span>
                        </td>
                        <td className="p-4">
                          <div className="flex items-center gap-2">
                            <span className="text-sm font-bold text-slate-700 dark:text-white/80">{user.withdrawalFee}%</span>
                            <button 
                              onClick={() => {
                                const newFee = prompt('Enter new withdrawal fee (%):', user.withdrawalFee.toString());
                                if (newFee !== null) {
                                  setAdminUsers(adminUsers.map(u => u.id === user.id ? { ...u, withdrawalFee: parseFloat(newFee) } : u));
                                }
                              }}
                              className="p-1.5 rounded-lg bg-amber-500/10 text-amber-600 hover:bg-amber-600 hover:text-white transition-all"
                            >
                              <Settings2 size={12} />
                            </button>
                          </div>
                        </td>
                        <td className="p-4 text-right">
                          <button className="text-rose-500 hover:text-rose-600 font-black text-[10px] uppercase tracking-widest">Suspend</button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          );
        case 'referrals':
          return (
            <div className="space-y-6 animate-in fade-in duration-500">
              <h3 className="text-xl font-black text-slate-900 dark:text-white">Referral Program</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {[
                  { label: 'Total Referrals', value: '1,240' },
                  { label: 'Active Rewards', value: '$12,400' },
                  { label: 'Conversion Rate', value: '18.4%' },
                ].map((s, i) => (
                  <div key={i} className="glass-card p-6 rounded-3xl">
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">{s.label}</p>
                    <p className="text-2xl font-black text-slate-900 dark:text-white">{s.value}</p>
                  </div>
                ))}
              </div>
              <div className="glass-card rounded-[32px] overflow-hidden">
                <div className="p-6 border-b border-slate-500/10">
                  <h4 className="text-sm font-black uppercase tracking-widest text-slate-400">Top Referrers</h4>
                </div>
                <div className="divide-y divide-slate-500/5">
                  {[
                    { name: 'Alex Volkov', referrals: 42, earned: '$4,200' },
                    { name: 'Sarah Chen', referrals: 38, earned: '$3,800' },
                    { name: 'Marcus Thorne', referrals: 25, earned: '$2,500' },
                  ].map((r, i) => (
                    <div key={i} className="p-4 flex justify-between items-center hover:bg-slate-500/5 transition-colors">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-blue-500/10 flex items-center justify-center text-blue-600 font-bold text-xs">{r.name[0]}</div>
                        <span className="text-sm font-bold text-slate-700 dark:text-white/80">{r.name}</span>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-black text-slate-900 dark:text-white">{r.referrals} users</p>
                        <p className="text-[10px] font-bold text-emerald-500">{r.earned} earned</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          );
        case 'deposits':
          return (
            <div className="space-y-6 animate-in fade-in duration-500">
              <h3 className="text-xl font-black text-slate-900 dark:text-white">Deposit Requests</h3>
              <div className="glass-card rounded-[32px] overflow-hidden">
                <div className="divide-y divide-slate-500/5">
                  {[
                    { user: 'User #8291', amount: '$50,000', method: 'Bank Transfer', time: '2m ago', status: 'pending' },
                    { user: 'User #4412', amount: '$12,500', method: 'USDT', time: '1h ago', status: 'pending' },
                  ].map((d, i) => (
                    <div key={i} className="p-6 flex justify-between items-center hover:bg-slate-500/5 transition-colors">
                      <div>
                        <p className="text-sm font-black text-slate-900 dark:text-white">{d.amount}</p>
                        <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">{d.user} • {d.method}</p>
                      </div>
                      <div className="flex gap-2">
                        <button className="px-3 py-1.5 bg-emerald-500 text-white text-[10px] font-black rounded-lg uppercase tracking-widest">Approve</button>
                        <button className="px-3 py-1.5 bg-rose-500/10 text-rose-500 text-[10px] font-black rounded-lg uppercase tracking-widest">Reject</button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          );
        case 'withdrawals':
          return (
            <div className="space-y-6 animate-in fade-in duration-500">
              <h3 className="text-xl font-black text-slate-900 dark:text-white">Withdrawal Queue</h3>
              <div className="glass-card rounded-[32px] overflow-hidden">
                <div className="divide-y divide-slate-500/5">
                  {[
                    { user: 'Alex Volkov', amount: '$25,000', fee: '$1,250', method: 'Bank', time: '5m ago' },
                    { user: 'Sarah Chen', amount: '$8,000', fee: '$400', method: 'USDT', time: '45m ago' },
                  ].map((w, i) => (
                    <div key={i} className="p-6 flex justify-between items-center hover:bg-slate-500/5 transition-colors">
                      <div>
                        <p className="text-sm font-black text-slate-900 dark:text-white">{w.amount}</p>
                        <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">{w.user} • {w.method}</p>
                        <p className="text-[9px] text-amber-500 font-bold">Fee: {w.fee}</p>
                      </div>
                      <div className="flex gap-2">
                        <button className="px-3 py-1.5 bg-blue-600 text-white text-[10px] font-black rounded-lg uppercase tracking-widest">Process</button>
                        <button className="px-3 py-1.5 bg-rose-500/10 text-rose-500 text-[10px] font-black rounded-lg uppercase tracking-widest">Hold</button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          );
        case 'kyc':
          return (
            <div className="space-y-6 animate-in fade-in duration-500">
              <h3 className="text-xl font-black text-slate-900 dark:text-white">KYC Verifications</h3>
              <div className="glass-card rounded-[32px] overflow-hidden">
                <div className="divide-y divide-slate-500/5">
                  {[
                    { user: 'Marcus Thorne', type: 'Passport', submitted: '2h ago', status: 'pending' },
                    { user: 'Elena Rossi', type: 'ID Card', submitted: '5h ago', status: 'pending' },
                  ].map((k, i) => (
                    <div key={i} className="p-6 flex justify-between items-center hover:bg-slate-500/5 transition-colors">
                      <div>
                        <p className="text-sm font-black text-slate-900 dark:text-white">{k.user}</p>
                        <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">{k.type} • Submitted {k.submitted}</p>
                      </div>
                      <div className="flex gap-2">
                        <button className="px-3 py-1.5 bg-blue-600 text-white text-[10px] font-black rounded-lg uppercase tracking-widest">Review</button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          );
        case 'settings':
          return (
            <div className="space-y-6 animate-in fade-in duration-500">
              <h3 className="text-xl font-black text-slate-900 dark:text-white">System Settings</h3>
              <div className="glass-card p-8 rounded-[40px] space-y-6">
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-sm font-bold text-slate-900 dark:text-white">Global Withdrawal Fee</p>
                    <p className="text-[10px] text-slate-400">Default fee for all new users</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <input type="number" defaultValue="5" className="w-16 bg-slate-500/5 dark:bg-white/5 border border-slate-200 dark:border-transparent rounded-xl p-2 text-center text-sm font-black" />
                    <span className="text-sm font-bold">%</span>
                  </div>
                </div>
              </div>
            </div>
          );
        default:
          return null;
      }
    };

    return (
      <div className="flex min-h-screen bg-slate-50 dark:bg-[#050505] -mx-5 -mt-12 -mb-32 overflow-x-hidden">
        {/* Sidebar - Hidden on mobile, shown on md+ */}
        <aside className="hidden md:flex w-64 bg-white dark:bg-[#0a0a0a] border-r border-slate-200 dark:border-white/5 flex-col fixed h-full z-50">
          <div className="p-8 flex items-center gap-3">
            <div className="w-10 h-10 bg-white dark:bg-white/5 rounded-xl flex items-center justify-center shadow-lg overflow-hidden border border-slate-100 dark:border-white/10">
              <img src="/logo.png" alt="Admin" className="w-full h-full object-contain p-1" referrerPolicy="no-referrer" />
            </div>
            <h1 className="text-lg font-black tracking-tighter text-slate-900 dark:text-white">Admin</h1>
          </div>

          <nav className="flex-1 px-4 space-y-1">
            {sidebarItems.map((item) => (
              <button
                key={item.id}
                onClick={() => { haptic.light(); setAdminSubView(item.id); }}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-2xl text-sm font-black transition-all ${adminSubView === item.id ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/20' : 'text-slate-400 hover:bg-slate-500/5 hover:text-slate-600'}`}
              >
                <item.icon size={18} />
                {item.label}
              </button>
            ))}
          </nav>

          <div className="p-4 mt-auto">
            <button 
              onClick={handleLogOut}
              className="w-full flex items-center gap-3 px-4 py-3 rounded-2xl text-sm font-black text-rose-500 hover:bg-rose-500/5 transition-all"
            >
              <LogOut size={18} />
              Sign Out
            </button>
          </div>
        </aside>

        {/* Mobile Admin Nav */}
        <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white dark:bg-[#0a0a0a] border-t border-slate-200 dark:border-white/5 p-4 flex justify-around z-[100]">
          {sidebarItems.slice(0, 5).map((item) => (
            <button
              key={item.id}
              onClick={() => { haptic.light(); setAdminSubView(item.id); }}
              className={`p-3 rounded-xl transition-all ${adminSubView === item.id ? 'bg-blue-600 text-white' : 'text-slate-400'}`}
            >
              <item.icon size={20} />
            </button>
          ))}
        </div>

        {/* Main Content */}
        <main className="flex-1 md:ml-64 p-6 md:p-12 pb-32 md:pb-12">
          <header className="flex justify-between items-center mb-8 md:mb-12">
            <div>
              <h2 className="text-2xl md:text-3xl font-black text-slate-900 dark:text-white tracking-tight capitalize">{adminSubView}</h2>
              <p className="text-[10px] text-slate-400 font-black uppercase tracking-[0.3em] mt-1">System Management Terminal</p>
            </div>
            <div className="flex items-center gap-4">
              <div className="hidden sm:flex items-center gap-2 px-4 py-2 bg-emerald-500/10 text-emerald-600 rounded-full text-[10px] font-black uppercase tracking-widest">
                <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></div>
                Live Status
              </div>
              <button onClick={handleLogOut} className="md:hidden p-3 rounded-xl bg-rose-500/10 text-rose-500">
                <LogOut size={20} />
              </button>
            </div>
          </header>

          {renderAdminSubView()}
        </main>
      </div>
    );
  };

  const renderContent = () => {
    if (!isLoggedIn) {
      if (view === 'admin_auth') return renderAdminAuth();
      return renderAuth();
    }
    switch (view) {
      case 'admin_dashboard': return renderAdminDashboard();
      case 'home': return renderHome();
      case 'portfolio': return renderPortfolio();
      case 'asset_detail': return renderAssetDetail();
      case 'buy_asset': return renderBuyAsset();
      case 'invest': return renderPortfolio(); 
      case 'kyc': return renderKYC();
      case 'settings': return renderSettings();
      case 'profile': return renderProfile();
      case 'deposit': return renderTransaction('deposit');
      case 'withdraw': return renderTransaction('withdraw');
      case 'payments': return renderPayments();
      case 'add_payment': return renderAddPayment();
      case 'notifications': return renderNotifications();
      case 'help': return renderHelp();
      case 'terms': return renderLegal('terms');
      case 'privacy': return renderLegal('privacy');
      case 'investor_profile': return renderInvestorProfile();
      case 'history': return renderHistory();
      default: return renderHome();
    }
  };

  return (
    <div className={`min-h-screen ${isAdmin ? '' : 'pb-32 pt-12 px-5 max-w-md mx-auto'} relative transition-colors`}>
      {!isSearchActive && isLoggedIn && !isAdmin && (
        <header className="flex items-center justify-between mb-8 animate-in fade-in duration-300">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-white dark:bg-white/5 rounded-2xl flex items-center justify-center shadow-lg shadow-blue-500/10 overflow-hidden border border-slate-100 dark:border-white/10">
              <img src="/logo.png" alt="CapitalNest" className="w-full h-full object-contain p-1.5 cursor-pointer" onClick={() => handleNavigate('home')} referrerPolicy="no-referrer" />
            </div>
            <div onClick={() => handleNavigate('home')} className="cursor-pointer">
              <h1 className="text-lg font-bold tracking-tight text-slate-900 dark:text-white">CapitalNest</h1>
              <p className="text-[10px] text-slate-500 dark:text-white/40 uppercase font-black tracking-widest">Private Tier</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button onClick={() => { haptic.light(); handleNavigate('notifications'); }} className="relative p-2.5 rounded-2xl bg-gray-500/10 dark:bg-white/5 border border-gray-100 dark:border-white/10 text-slate-600 dark:text-white/80">
              <Bell size={20}/>
              {notifications.some(n => n.unread) && (
                <span className="absolute top-2.5 right-2.5 w-2 h-2 bg-rose-500 rounded-full border-2 border-white dark:border-black"></span>
              )}
            </button>
          </div>
        </header>
      )}
      {renderContent()}
      {renderTransactionStatusModal()}
      
      {/* Maturity Warning Modal */}
      {showMaturityWarning && pendingWithdrawal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-black/60 backdrop-blur-sm animate-in fade-in duration-300">
          <div className="glass-card w-full max-w-sm p-8 rounded-[40px] shadow-2xl animate-in zoom-in-95 duration-300">
            <div className="w-16 h-16 bg-amber-500/20 rounded-3xl flex items-center justify-center mb-6 mx-auto">
              <AlertCircle size={32} className="text-amber-500" />
            </div>
            <h3 className="text-xl font-black text-center text-slate-900 dark:text-white mb-2">Early Withdrawal Fee</h3>
            <p className="text-sm text-slate-500 dark:text-white/60 text-center mb-6">
              Your investment in <span className="font-bold text-slate-900 dark:text-white">{selectedAsset?.symbol}</span> has not reached its maturity date ({selectedAsset && new Date(selectedAsset.maturityDate).toLocaleDateString()}).
            </p>
            
            <div className="bg-gray-500/5 dark:bg-white/5 rounded-3xl p-5 mb-8 space-y-3">
              <div className="flex justify-between text-xs font-bold">
                <span className="text-slate-400">Withdrawal Amount</span>
                <span className="text-slate-900 dark:text-white">${pendingWithdrawal.amount.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-xs font-bold">
                <span className="text-amber-500">Early Exit Fee ({selectedAsset?.earlyWithdrawalFee}%)</span>
                <span className="text-amber-500">-${pendingWithdrawal.fee.toLocaleString()}</span>
              </div>
              <div className="pt-3 border-t border-gray-500/10 flex justify-between text-sm font-black">
                <span className="text-slate-900 dark:text-white">Net Payout</span>
                <span className="text-emerald-500">${(pendingWithdrawal.amount - pendingWithdrawal.fee).toLocaleString()}</span>
              </div>
            </div>

            <div className="space-y-3">
              <button 
                onClick={() => { haptic.success(); setShowMaturityWarning(false); handleNavigate('withdraw'); }}
                className="w-full py-4 bg-amber-500 text-white font-black rounded-2xl shadow-lg shadow-amber-500/20 active:scale-95 transition-all uppercase tracking-widest text-xs"
              >
                Pay Fee & Withdraw
              </button>
              <button 
                onClick={() => { haptic.light(); setShowMaturityWarning(false); setPendingWithdrawal(null); }}
                className="w-full py-4 bg-gray-500/10 text-slate-500 font-black rounded-2xl active:scale-95 transition-all uppercase tracking-widest text-xs"
              >
                Keep Investment
              </button>
            </div>
          </div>
        </div>
      )}

      {isLoggedIn && !isAdmin && <BottomNav activeView={view} onNavigate={handleNavigate} />}
    </div>
  );
};

export default App;