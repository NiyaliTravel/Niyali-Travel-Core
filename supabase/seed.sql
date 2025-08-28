-- Seed data for guesthouses
INSERT INTO guesthouses (name, location, description, price_per_night, image_url) VALUES
('Beachside Bungalow', 'Maldives', 'A cozy bungalow right on the beach.', 150.00, 'https://example.com/bungalow.jpg'),
('Mountain Retreat', 'Switzerland', 'Stunning views from a secluded mountain cabin.', 250.00, 'https://example.com/mountain.jpg'),
('City Loft', 'New York', 'Modern loft in the heart of the city.', 300.00, 'https://example.com/loft.jpg');

-- Seed data for travel_agents
INSERT INTO travel_agents (name, email, phone_number) VALUES
('Global Travel Co.', 'info@globaltravel.com', '+1234567890'),
('Adventure Seekers', 'contact@adventureseekers.com', '+1987654321');

-- Seed data for users (example users, in a real app these would be created via auth)
INSERT INTO users (email, password) VALUES
('user1@example.com', 'hashed_password_1'),
('user2@example.com', 'hashed_password_2');

-- Seed data for availability (example, assuming guesthouse IDs exist)
-- You would typically get guesthouse IDs dynamically or use a more robust seeding strategy
INSERT INTO availability (guesthouse_id, date, available_rooms, price_override) VALUES
((SELECT id FROM guesthouses WHERE name = 'Beachside Bungalow'), '2025-09-01', 5, NULL),
((SELECT id FROM guesthouses WHERE name = 'Beachside Bungalow'), '2025-09-02', 3, 160.00),
((SELECT id FROM guesthouses WHERE name = 'Mountain Retreat'), '2025-09-01', 2, NULL);

-- Seed data for bookings (example, assuming user and guesthouse IDs exist)
INSERT INTO bookings (user_id, guesthouse_id, check_in_date, check_out_date, number_of_guests, total_price, status) VALUES
((SELECT id FROM users WHERE email = 'user1@example.com'), (SELECT id FROM guesthouses WHERE name = 'Beachside Bungalow'), '2025-09-01', '2025-09-03', 2, 300.00, 'confirmed'),
((SELECT id FROM users WHERE email = 'user2@example.com'), (SELECT id FROM guesthouses WHERE name = 'Mountain Retreat'), '2025-09-05', '2025-09-07', 4, 500.00, 'pending');