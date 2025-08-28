-- Alter bookings table to match UI expectations
ALTER TABLE bookings
DROP COLUMN traveler_id,
DROP COLUMN agent_id,
DROP COLUMN package_id,
DROP COLUMN resort_id,
DROP COLUMN experience_id,
DROP COLUMN ferry_id,
DROP COLUMN booking_type,
DROP COLUMN adult_count,
DROP COLUMN child_count,
DROP COLUMN infant_count,
DROP COLUMN total_price,
DROP COLUMN special_requests,
DROP COLUMN payment_status,
DROP COLUMN payment_method,
DROP COLUMN updated_at;

ALTER TABLE bookings
RENAME COLUMN checkin_date TO checkin;

ALTER TABLE bookings
RENAME COLUMN checkout_date TO checkout;

ALTER TABLE bookings
ADD COLUMN guesthouseid UUID,
ADD COLUMN userid UUID;