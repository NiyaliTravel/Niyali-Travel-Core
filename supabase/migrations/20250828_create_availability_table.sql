-- Create availability table
CREATE TABLE availability (
  guesthouseid UUID,
  date DATE,
  isavailable BOOLEAN,
  PRIMARY KEY (guesthouseid, date)
);