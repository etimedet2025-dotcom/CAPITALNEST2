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
