import { Request, Response } from 'express';
import { supabase } from '../utils/supabase';
import { v4 as uuidv4 } from 'uuid';

export const createBooking = async (req: Request, res: Response) => {
  const { guesthouseid, userid, checkin, checkout, status } = req.body;

  try {
    const bookingId = uuidv4();
    const { data, error } = await supabase.from('bookings').insert([{
      id: bookingId,
      guesthouseid,
      userid,
      checkin,
      checkout,
      status: status || 'pending',
      created_at: new Date().toISOString()
    }]).select();

    if (error) {
      return res.status(500).json({ error: error.message });
    }
    res.status(201).json(data[0]);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
};

export const cancelBooking = async (req: Request, res: Response) => {
  const { id } = req.body;

  try {
    const { data, error } = await supabase
      .from('bookings')
      .update({ status: 'cancelled' })
      .eq('id', id)
      .select();

    if (error) {
      return res.status(500).json({ error: error.message });
    }
    if (!data || data.length === 0) {
      return res.status(404).json({ error: 'Booking not found' });
    }
    res.status(200).json(data[0]);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
};

export const confirmBooking = async (req: Request, res: Response) => {
  const { id } = req.body;

  try {
    const { data, error } = await supabase
      .from('bookings')
      .update({ status: 'confirmed' })
      .eq('id', id)
      .select();

    if (error) {
      return res.status(500).json({ error: error.message });
    }
    if (!data || data.length === 0) {
      return res.status(404).json({ error: 'Booking not found' });
    }
    res.status(200).json(data[0]);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
};

export const checkAvailability = async (req: Request, res: Response) => {
  const { guesthouseid, checkin, checkout } = req.query;

  if (!guesthouseid || !checkin || !checkout) {
    return res.status(400).json({ error: 'Missing guesthouseid, checkin, or checkout dates.' });
  }

  try {
    const checkinDate = new Date(checkin as string);
    const checkoutDate = new Date(checkout as string);
    const dates: string[] = [];

    for (let d = new Date(checkinDate); d <= checkoutDate; d.setDate(d.getDate() + 1)) {
      dates.push(new Date(d).toISOString().split('T')[0]);
    }

    const { data, error } = await supabase
      .from('availability')
      .select('date, isavailable')
      .in('date', dates)
      .eq('guesthouseid', guesthouseid as string);

    if (error) {
      return res.status(500).json({ error: error.message });
    }

    const allAvailable = data?.every((d: any) => d.isavailable);
    res.status(200).json({ isAvailable: allAvailable, details: data });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
};

export const updateAvailability = async (req: Request, res: Response) => {
  const { guesthouseid, updates } = req.body; // updates: [{ date: 'YYYY-MM-DD', isavailable: true/false }]

  if (!guesthouseid || !updates || !Array.isArray(updates) || updates.length === 0) {
    return res.status(400).json({ error: 'Missing guesthouseid or availability updates.' });
  }

  try {
    const availabilityData = updates.map((update: any) => ({
      guesthouseid,
      date: update.date,
      isavailable: update.isavailable,
    }));

    const { error } = await supabase.from('availability').upsert(availabilityData, { onConflict: 'guesthouseid, date' });

    if (error) {
      return res.status(500).json({ error: error.message });
    }
    res.status(200).json({ message: 'Availability updated successfully!' });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
};

export const updateRates = async (req: Request, res: Response) => {
  const { guesthouseid, newRate } = req.body;

  if (!guesthouseid || !newRate) {
    return res.status(400).json({ error: 'Missing guesthouseid or newRate.' });
  }

  try {
    const { data, error } = await supabase
      .from('guesthouses')
      .update({ price_per_night: parseFloat(newRate) })
      .eq('id', guesthouseid)
      .select();

    if (error) {
      return res.status(500).json({ error: error.message });
    }
    if (!data || data.length === 0) {
      return res.status(404).json({ error: 'Guesthouse not found' });
    }
    res.status(200).json(data[0]);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
};