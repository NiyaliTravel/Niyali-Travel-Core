-- bookings.sql
CREATE TABLE IF NOT EXISTS bookings (
  id SERIAL PRIMARY KEY,
  customer_name TEXT NOT NULL,
  customer_email TEXT NOT NULL,
  package_id INTEGER NOT NULL,
  travel_date DATE NOT NULL,
  number_of_guests INTEGER DEFAULT 1,
  special_requests TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);