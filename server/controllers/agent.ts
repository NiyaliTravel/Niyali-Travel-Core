import { logAgentAction } from '../middleware/logAgentAction';

export const getGuesthouses = async (req, res) => {
  logAgentAction('Fetched guesthouses', req.user.id);
  // Fetch all guesthouses
};

export const createBooking = async (req, res) => {
  logAgentAction('Created a booking', req.user.id);
  // Create booking for authenticated agent
};

export const getAgentBookings = async (req, res) => {
  logAgentAction('Fetched agent bookings', req.user.id);
  // Return bookings where agent_id matches req.user.id
};

export const updateBooking = async (req, res) => {
  logAgentAction(`Updated booking ${req.params.id}`, req.user.id);
  // Allow agent to update their own booking status
};