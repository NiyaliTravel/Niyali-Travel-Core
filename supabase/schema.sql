-- Create users table
CREATE TABLE users (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  password TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create bookings table
CREATE TABLE bookings (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  guesthouse_id UUID NOT NULL, -- This will be linked to guesthouses table later
  check_in_date DATE NOT NULL,
  check_out_date DATE NOT NULL,
  number_of_guests INT NOT NULL,
  total_price NUMERIC(10, 2) NOT NULL,
  status TEXT DEFAULT 'pending',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create guesthouses table
CREATE TABLE guesthouses (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  location TEXT NOT NULL,
  description TEXT,
  price_per_night NUMERIC(10, 2) NOT NULL,
  image_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create travel_agents table
CREATE TABLE travel_agents (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT UNIQUE NOT NULL,
  phone_number TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create availability table
CREATE TABLE availability (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  guesthouse_id UUID REFERENCES guesthouses(id) ON DELETE CASCADE,
  date DATE NOT NULL,
  available_rooms INT NOT NULL,
  price_override NUMERIC(10, 2),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE (guesthouse_id, date)
);

-- Create admin_logs table
CREATE TABLE admin_logs (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  admin_id UUID, -- This could link to an admin user table if one exists
  action TEXT NOT NULL,
  details JSONB,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable Row Level Security (RLS)
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE bookings ENABLE ROW LEVEL SECURITY;
ALTER TABLE guesthouses ENABLE ROW LEVEL SECURITY;
ALTER TABLE travel_agents ENABLE ROW LEVEL SECURITY;
ALTER TABLE availability ENABLE ROW LEVEL SECURITY;
ALTER TABLE admin_logs ENABLE ROW LEVEL SECURITY;

-- Policies for users table
CREATE POLICY "Allow public read access" ON users FOR SELECT USING (true);
CREATE POLICY "Allow individual users to insert their own data" ON users FOR INSERT WITH CHECK (auth.uid() = id);
CREATE POLICY "Allow individual users to update their own data" ON users FOR UPDATE USING (auth.uid() = id);
CREATE POLICY "Allow individual users to delete their own data" ON users FOR DELETE USING (auth.uid() = id);

-- Policies for bookings table
CREATE POLICY "Allow authenticated users to view their own bookings" ON bookings FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Allow authenticated users to create bookings" ON bookings FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Allow authenticated users to update their own bookings" ON bookings FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Allow authenticated users to delete their own bookings" ON bookings FOR DELETE USING (auth.uid() = user_id);

-- Policies for guesthouses table (public read, admin write)
CREATE POLICY "Allow public read access to guesthouses" ON guesthouses FOR SELECT USING (true);
-- Admin policies would go here, e.g., for insert, update, delete by specific admin roles

-- Policies for travel_agents table (public read, admin write)
CREATE POLICY "Allow public read access to travel_agents" ON travel_agents FOR SELECT USING (true);
-- Admin policies would go here

-- Policies for availability table (public read, admin write)
CREATE POLICY "Allow public read access to availability" ON availability FOR SELECT USING (true);
-- Admin policies would go here

-- Policies for admin_logs table (admin only)
-- Admin policies would go here