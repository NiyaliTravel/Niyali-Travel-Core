-- ferry_schedule.sql
CREATE TABLE IF NOT EXISTS ferry_schedule (
  id SERIAL PRIMARY KEY,
  route_name TEXT NOT NULL,
  departure_island TEXT NOT NULL,
  arrival_island TEXT NOT NULL,
  departure_time TIME NOT NULL,
  arrival_time TIME NOT NULL,
  operating_days TEXT NOT NULL, -- e.g. "Mon,Tue,Wed,Fri"
  price NUMERIC(10, 2) NOT NULL
);