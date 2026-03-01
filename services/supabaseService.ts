import { supabase } from './supabase';
import { Asset, Transaction, Notification } from '../types';

const isConfigured = !!import.meta.env.VITE_SUPABASE_URL && !!import.meta.env.VITE_SUPABASE_ANON_KEY;

export const supabaseService = {
  // Assets
  async getAssets() {
    if (!isConfigured) return [];
    const { data, error } = await supabase
      .from('assets')
      .select('*')
      .order('allocation', { ascending: false });
    
    if (error) throw error;
    return data as Asset[];
  },

  subscribeToAssets(callback: (payload: any) => void) {
    if (!isConfigured) return { unsubscribe: () => {} };
    return supabase
      .channel('public:assets')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'assets' }, callback)
      .subscribe();
  },

  // Transactions
  async getTransactions(userId: string) {
    if (!isConfigured) return [];
    const { data, error } = await supabase
      .from('transactions')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false });
    
    if (error) throw error;
    return data as Transaction[];
  },

  subscribeToTransactions(userId: string, callback: (payload: any) => void) {
    if (!isConfigured) return { unsubscribe: () => {} };
    return supabase
      .channel(`public:transactions:user:${userId}`)
      .on(
        'postgres_changes', 
        { 
          event: '*', 
          schema: 'public', 
          table: 'transactions',
          filter: `user_id=eq.${userId}`
        }, 
        callback
      )
      .subscribe();
  },

  async createTransaction(transaction: Omit<Transaction, 'id' | 'created_at'> & { user_id: string }) {
    if (!isConfigured) return null;
    const { data, error } = await supabase
      .from('transactions')
      .insert([transaction])
      .select()
      .single();
    
    if (error) throw error;
    return data as Transaction;
  },

  // Notifications
  async getNotifications(userId: string) {
    if (!isConfigured) return [];
    const { data, error } = await supabase
      .from('notifications')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false });
    
    if (error) throw error;
    return data as Notification[];
  },

  async markNotificationRead(notificationId: string) {
    if (!isConfigured) return;
    const { error } = await supabase
      .from('notifications')
      .update({ unread: false })
      .eq('id', notificationId);
    
    if (error) throw error;
  },

  async deleteNotification(notificationId: string) {
    if (!isConfigured) return;
    const { error } = await supabase
      .from('notifications')
      .delete()
      .eq('id', notificationId);
    
    if (error) throw error;
  },

  // Watchlist / Favorites
  async toggleFavorite(userId: string, symbol: string, isFavorite: boolean) {
    if (!isConfigured) return;
    if (isFavorite) {
      await supabase
        .from('watchlist')
        .insert([{ user_id: userId, asset_symbol: symbol }]);
    } else {
      await supabase
        .from('watchlist')
        .delete()
        .eq('user_id', userId)
        .eq('asset_symbol', symbol);
    }
  },

  // Admin Methods
  async isAdmin(userId: string) {
    if (!isConfigured) return false;
    const { data, error } = await supabase
      .from('profiles')
      .select('is_admin')
      .eq('id', userId)
      .single();
    
    if (error) return false;
    return data?.is_admin || false;
  },

  async getAllProfiles() {
    if (!isConfigured) return [];
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .order('created_at', { ascending: false });
    
    if (error) throw error;
    return data;
  },

  async getAllTransactions() {
    if (!isConfigured) return [];
    const { data, error } = await supabase
      .from('transactions')
      .select('*, profiles(full_name, email)')
      .order('created_at', { ascending: false });
    
    if (error) throw error;
    return data;
  },

  subscribeToNotifications(userId: string, callback: (payload: any) => void) {
    if (!isConfigured) return { unsubscribe: () => {} };
    return supabase
      .channel(`public:notifications:user:${userId}`)
      .on(
        'postgres_changes', 
        { 
          event: '*', 
          schema: 'public', 
          table: 'notifications',
          filter: `user_id=eq.${userId}`
        }, 
        callback
      )
      .subscribe();
  },

  // User Stats (Net Worth, etc.)
  async getUserStats(userId: string) {
    if (!isConfigured) return null;
    const { data, error } = await supabase
      .from('user_stats')
      .select('*')
      .eq('user_id', userId)
      .single();
    
    if (error) throw error;
    return data;
  },

  subscribeToUserStats(userId: string, callback: (payload: any) => void) {
    if (!isConfigured) return { unsubscribe: () => {} };
    return supabase
      .channel(`public:user_stats:user:${userId}`)
      .on(
        'postgres_changes', 
        { 
          event: 'UPDATE', 
          schema: 'public', 
          table: 'user_stats',
          filter: `user_id=eq.${userId}`
        }, 
        callback
      )
      .subscribe();
  }
};
