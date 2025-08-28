-- This migration creates the user_role enum and the users, atolls, experiences, contact_info, and guesthouses tables.

-- Create a custom type for user roles
CREATE TYPE user_role AS ENUM ('admin', 'editor', 'viewer');

-- users table
CREATE TABLE users (
  id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  username TEXT UNIQUE NOT NULL,
  role user_role DEFAULT 'viewer' NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- atolls table
CREATE TABLE atolls (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT,
  image_url TEXT
);

-- experiences table
CREATE TABLE experiences (
  id SERIAL PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT,
  image_url TEXT,
  category TEXT
);

-- contact_info table
CREATE TABLE contact_info (
  id SERIAL PRIMARY KEY,
  phone TEXT,
  email TEXT,
  address TEXT,
  map_embed TEXT
);

-- guesthouses table
CREATE TABLE guesthouses (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  location TEXT,
  description TEXT,
  price_range TEXT,
  image_url TEXT
);

-- Down migration to revert the changes
DROP TABLE IF EXISTS guesthouses;
DROP TABLE IF EXISTS contact_info;
DROP TABLE IF EXISTS experiences;
DROP TABLE IF EXISTS atolls;
DROP TABLE IF EXISTS users;
DROP TYPE IF EXISTS user_role;