import { Request, Response } from 'express';
import { db } from '@/models/db';
import { guestHouses, bookings } from '@shared/schema';
import { eq, and } from 'drizzle-orm';
import { logAgentAction } from '../middleware/logAgentAction';
import { AuthPayload } from '../types/express.d';

interface AuthenticatedRequest extends Request {
  user?: AuthPayload;
}

export const getGuesthouses = async (req: AuthenticatedRequest, res: Response) => {
  if (!req.user) return res.status(401).json({ message: 'Unauthorized' });
  logAgentAction('Fetched guesthouses', req.user.id);
  try {
    const result = await db.select().from(guestHouses);
    res.status(200).json(result);
  } catch (error) {
    console.error('Error fetching guesthouses:', error);
    res.status(500).json({ message: 'Failed to fetch guesthouses', error: (error as Error).message });
  }
};

export const createBooking = async (req: AuthenticatedRequest, res: Response) => {
  if (!req.user) return res.status(401).json({ message: 'Unauthorized' });
  logAgentAction('Created a booking', req.user.id);
  try {
    const { userId, guestHouseId, packageId, checkIn, checkOut, numGuests, totalPrice, status } = req.body;
    const [newBooking] = await db.insert(bookings).values({
      userId,
      agentId: parseInt(req.user.id),
      guestHouseId,
      packageId,
      checkIn,
      checkOut,
      numGuests,
      totalPrice,
      status: status || 'pending',
    }).returning();
    res.status(201).json(newBooking);
  } catch (error) {
    console.error('Error creating booking:', error);
    res.status(500).json({ message: 'Failed to create booking', error: (error as Error).message });
  }
};

export const getAgentBookings = async (req: AuthenticatedRequest, res: Response) => {
  if (!req.user) return res.status(401).json({ message: 'Unauthorized' });
  logAgentAction('Fetched agent bookings', req.user.id);
  try {
    const agentBookings = await db.select().from(bookings).where(eq(bookings.agentId, parseInt(req.user.id)));
    res.status(200).json(agentBookings);
  } catch (error) {
    console.error('Error fetching agent bookings:', error);
    res.status(500).json({ message: 'Failed to fetch agent bookings', error: (error as Error).message });
  }
};

export const updateBooking = async (req: AuthenticatedRequest, res: Response) => {
  if (!req.user) return res.status(401).json({ message: 'Unauthorized' });
  logAgentAction(`Updated booking ${req.params.id}`, req.user.id);
  try {
    const { id } = req.params;
    const { status } = req.body;
    const [updatedBooking] = await db.update(bookings).set({ status }).where(and(eq(bookings.id, parseInt(id)), eq(bookings.agentId, parseInt(req.user.id)))).returning();
    if (!updatedBooking) {
      return res.status(404).json({ message: 'Booking not found or not authorized to update' });
    }
    res.status(200).json(updatedBooking);
  } catch (error) {
    console.error('Error updating booking:', error);
    res.status(500).json({ message: 'Failed to update booking', error: (error as Error).message });
  }
};