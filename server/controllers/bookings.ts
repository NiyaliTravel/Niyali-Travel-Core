import { Request, Response } from 'express';
import { db } from '@/models/db';
import { guestHouses } from '@shared/schema';
import { bookings, roomAvailability } from '@shared/schema';
import { eq, and, gte, lte } from 'drizzle-orm';

export const createBooking = async (req: Request, res: Response) => {
  try {
    const { userId, guestHouseId, packageId, checkIn, checkOut, numGuests, totalPrice, status } = req.body;
    const [newBooking] = await db.insert(bookings).values({
      userId,
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

export const cancelBooking = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const [cancelledBooking] = await db.update(bookings).set({ status: 'cancelled' }).where(eq(bookings.id, parseInt(id))).returning();
    if (!cancelledBooking) {
      return res.status(404).json({ message: 'Booking not found' });
    }
    res.status(200).json(cancelledBooking);
  } catch (error) {
    console.error('Error cancelling booking:', error);
    res.status(500).json({ message: 'Failed to cancel booking', error: (error as Error).message });
  }
};

export const confirmBooking = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const [confirmedBooking] = await db.update(bookings).set({ status: 'confirmed' }).where(eq(bookings.id, parseInt(id))).returning();
    if (!confirmedBooking) {
      return res.status(404).json({ message: 'Booking not found' });
    }
    res.status(200).json(confirmedBooking);
  } catch (error) {
    console.error('Error confirming booking:', error);
    res.status(500).json({ message: 'Failed to confirm booking', error: (error as Error).message });
  }
};

export const checkAvailability = async (req: Request, res: Response) => {
  const { guestHouseId, checkIn, checkOut } = req.query;

  if (!guestHouseId || !checkIn || !checkOut) {
    return res.status(400).json({ error: 'Missing guestHouseId, checkIn, or checkOut dates.' });
  }

  try {
    const availability = await db.select().from(roomAvailability).where(
      and(
        eq(roomAvailability.guestHouseId, parseInt(guestHouseId as string)),
        gte(roomAvailability.date, new Date(checkIn as string)),
        lte(roomAvailability.date, new Date(checkOut as string))
      )
    );

    const allAvailable = availability.every(day => day.availableRooms > 0);
    res.status(200).json({ isAvailable: allAvailable, details: availability });
  } catch (error) {
    console.error('Error checking availability:', error);
    res.status(500).json({ message: 'Failed to check availability', error: (error as Error).message });
  }
};

export const updateAvailability = async (req: Request, res: Response) => {
  const { guestHouseId, updates } = req.body; // updates: [{ date: 'YYYY-MM-DD', availableRooms: 5 }]

  if (!guestHouseId || !updates || !Array.isArray(updates) || updates.length === 0) {
    return res.status(400).json({ error: 'Missing guestHouseId or availability updates.' });
  }

  try {
    await db.transaction(async (tx) => {
      for (const update of updates) {
        await tx.update(roomAvailability).set({ availableRooms: update.availableRooms }).where(
          and(
            eq(roomAvailability.guestHouseId, guestHouseId),
            eq(roomAvailability.date, new Date(update.date))
          )
        );
      }
    });
    res.status(200).json({ message: 'Availability updated successfully!' });
  } catch (error) {
    console.error('Error updating availability:', error);
    res.status(500).json({ message: 'Failed to update availability', error: (error as Error).message });
  }
};
export const updateRates = async (req: Request, res: Response) => {
  const { guestHouseId, newRate } = req.body;

  if (!guestHouseId || !newRate) {
    return res.status(400).json({ error: 'Missing guestHouseId or newRate.' });
  }

  try {
    const [updatedGuesthouse] = await db.update(guestHouses).set({ price: newRate }).where(eq(guestHouses.id, guestHouseId)).returning();
    if (!updatedGuesthouse) {
      return res.status(404).json({ message: 'Guesthouse not found' });
    }
    res.status(200).json(updatedGuesthouse);
  } catch (error) {
    console.error('Error updating rates:', error);
    res.status(500).json({ message: 'Failed to update rates', error: (error as Error).message });
  }
};