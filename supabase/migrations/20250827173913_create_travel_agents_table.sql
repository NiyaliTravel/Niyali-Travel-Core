CREATE TABLE travel_agents (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT,
  email TEXT UNIQUE,
  password TEXT,
  agencyname TEXT,
  createdat TIMESTAMP DEFAULT now()
);