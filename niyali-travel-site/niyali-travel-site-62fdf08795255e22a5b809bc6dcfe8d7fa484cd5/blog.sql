-- blog.sql
CREATE TABLE IF NOT EXISTS blog (
  id SERIAL PRIMARY KEY,
  title TEXT NOT NULL,
  author TEXT NOT NULL,
  content TEXT NOT NULL,
  image_url TEXT,
  published_date DATE DEFAULT CURRENT_DATE,
  is_published BOOLEAN DEFAULT FALSE
);