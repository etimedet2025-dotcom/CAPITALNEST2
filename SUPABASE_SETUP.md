# Supabase Database Setup (Real-time Optimized)

Run the following SQL in your Supabase SQL Editor. This script sets up all necessary tables, enables Row Level Security (RLS), and configures Real-time updates.

```sql
-- 1. CLEANUP (Optional: Uncomment if you want to start fresh)
-- drop table if exists public.watchlist;
-- drop table if exists public.notifications;
-- drop table if exists public.transactions;
-- drop table if exists public.user_stats;
-- drop table if exists public.assets;
-- drop table if exists public.profiles;

-- 2. PROFILES TABLE
-- Stores user-specific information
create table public.profiles (
  id uuid references auth.users on delete cascade primary key,
  full_name text,
  email text,
  avatar_url text,
  kyc_status text default 'none' check (kyc_status in ('none', 'pending', 'verified')),
  withdrawal_fee numeric default 5,
  referral_code text unique,
  referred_by uuid references auth.users,
  created_at timestamp with time zone default now(),
  updated_at timestamp with time zone default now()
);

-- 3. USER STATS TABLE
-- Stores real-time financial data for the dashboard
create table public.user_stats (
  user_id uuid references auth.users on delete cascade primary key,
  total_net_worth numeric default 0,
  day_gain numeric default 0,
  invested numeric default 0,
  available numeric default 0,
  updated_at timestamp with time zone default now()
);

-- 4. ASSETS TABLE (Private Tier Assets)
-- Stores information about available investment assets
create table public.assets (
  id uuid default gen_random_uuid() primary key,
  name text not null,
  symbol text not null unique,
  allocation numeric not null,
  current_price numeric not null,
  change_percent numeric not null,
  is_positive boolean default true,
  sparkline numeric[] not null,
  maturity_date timestamp with time zone,
  early_withdrawal_fee numeric default 5,
  created_at timestamp with time zone default now()
);

-- 5. TRANSACTIONS TABLE
-- Stores history of all financial movements
create table public.transactions (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references auth.users on delete cascade not null,
  type text not null check (type in ('buy', 'sell', 'deposit', 'withdraw', 'transfer', 'swap', 'invest')),
  asset_symbol text,
  amount numeric not null,
  status text not null default 'pending' check (status in ('completed', 'pending', 'failed')),
  reference_id text,
  estimated_arrival timestamp with time zone,
  created_at timestamp with time zone default now()
);

-- 6. NOTIFICATIONS TABLE
-- Stores real-time alerts for users
create table public.notifications (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references auth.users on delete cascade not null,
  title text not null,
  message text not null,
  unread boolean default true,
  type text not null check (type in ('alert', 'success', 'info')),
  created_at timestamp with time zone default now()
);

-- 7. WATCHLIST TABLE
-- Stores assets users are tracking
create table public.watchlist (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references auth.users on delete cascade not null,
  asset_symbol text not null,
  created_at timestamp with time zone default now(),
  unique(user_id, asset_symbol)
);

-- 8. ENABLE ROW LEVEL SECURITY (RLS)
alter table public.profiles enable row level security;
alter table public.user_stats enable row level security;
alter table public.assets enable row level security;
alter table public.transactions enable row level security;
alter table public.notifications enable row level security;
alter table public.watchlist enable row level security;

-- 9. RLS POLICIES

-- Profiles: Users can view and update their own profile
create policy "Users can view own profile" on public.profiles for select using (auth.uid() = id);
create policy "Users can update own profile" on public.profiles for update using (auth.uid() = id);

-- User Stats: Users can view their own stats
create policy "Users can view own stats" on public.user_stats for select using (auth.uid() = user_id);

-- Assets: Everyone can view assets
create policy "Anyone can view assets" on public.assets for select using (true);

-- Transactions: Users can view their own transactions
create policy "Users can view own transactions" on public.transactions for select using (auth.uid() = user_id);
create policy "Users can insert own transactions" on public.transactions for insert with check (auth.uid() = user_id);

-- Notifications: Users can view and update their own notifications
create policy "Users can view own notifications" on public.notifications for select using (auth.uid() = user_id);
create policy "Users can update own notifications" on public.notifications for update using (auth.uid() = user_id);

-- Watchlist: Users can manage their own watchlist
create policy "Users can view own watchlist" on public.watchlist for select using (auth.uid() = user_id);
create policy "Users can manage own watchlist" on public.watchlist for all using (auth.uid() = user_id);

-- 10. AUTOMATIC PROFILE CREATION
-- This trigger creates a profile and stats entry automatically on signup
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, full_name, email, avatar_url)
  values (new.id, new.raw_user_meta_data->>'full_name', new.email, new.raw_user_meta_data->>'avatar_url');
  
  insert into public.user_stats (user_id, total_net_worth, available)
  values (new.id, 0, 0);
  
  return new;
end;
$$ language plpgsql security definer;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

-- 11. ENABLE REAL-TIME
-- Add tables to the supabase_realtime publication
begin;
  -- Remove existing if any (to avoid errors)
  drop publication if exists supabase_realtime;
  create publication supabase_realtime;
commit;

alter publication supabase_realtime add table public.assets;
alter publication supabase_realtime add table public.user_stats;
alter publication supabase_realtime add table public.transactions;
alter publication supabase_realtime add table public.notifications;
alter publication supabase_realtime add table public.watchlist;


### Key Changes:
1. **RLS Policies**: Added strict Row Level Security so users can only access their own data.
2. **Triggers**: Added a `handle_new_user` trigger that automatically creates a `profile` and `user_stats` entry when a user signs up.
3. **Data Types**: Changed financial values to `numeric` for accurate calculations.
4. **Real-time**: Properly configured the `supabase_realtime` publication.
5. **Foreign Keys**: Ensured all user-related tables reference `auth.users` with `on delete cascade`.
