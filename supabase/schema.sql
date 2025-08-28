CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT UNIQUE NOT NULL,
  username TEXT,
  role TEXT CHECK (role IN ('admin', 'editor', 'viewer')) DEFAULT 'viewer',
  created_at TIMESTAMP DEFAULT now()
);

CREATE TABLE atolls (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT,
  description TEXT,
  image_url TEXT
);

CREATE TABLE experiences (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT,
  description TEXT,
  image_url TEXT,
  category TEXT
);

CREATE TABLE contact_info (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  phone TEXT,
  email TEXT,
  address TEXT,
  map_embed TEXT
);

CREATE TABLE guesthouses (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT,
  location TEXT,
  description TEXT,
  price_range TEXT,
  image_url TEXT
);

CREATE TABLE bookings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  guesthouseid UUID REFERENCES guesthouses(id) ON DELETE CASCADE,
  userid UUID REFERENCES users(id) ON DELETE CASCADE,
  checkin DATE NOT NULL,
  checkout DATE NOT NULL,
  status TEXT CHECK (status IN ('pending', 'confirmed', 'cancelled')) DEFAULT 'pending',
  created_at TIMESTAMP DEFAULT now()
);

CREATE TABLE availability (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  guesthouseid UUID,
  date DATE,
  isavailable BOOLEAN
);

-- RLS for bookings table
ALTER TABLE bookings ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow user insert" ON bookings
FOR INSERT WITH CHECK (auth.uid() = userid);

CREATE POLICY "Authenticated users can view their own bookings" ON bookings
  FOR SELECT USING (auth.uid() = userid);

CREATE POLICY "Admins can view all bookings" ON bookings
  FOR SELECT USING (EXISTS (SELECT 1 FROM users WHERE id = auth.uid() AND role = 'admin'));

-- RLS for availability table
ALTER TABLE availability ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view availability" ON availability
  FOR SELECT USING (TRUE);

CREATE POLICY "Admins can manage availability" ON availability
  FOR ALL USING (EXISTS (SELECT 1 FROM users WHERE id = auth.uid() AND role = 'admin'));