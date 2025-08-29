import { Request, Response } from 'express';
import db from '../utils/db'; // Supabase client

export const getGuestHouses = async (_req: Request, res: Response) => {
  const { data, error } = await db.from('guesthouses').select('*');
  if (error) return res.status(500).json({ error });
  res.json(data);
};

export const createGuestHouse = async (req: Request, res: Response) => {
  const { name, description, image_url, location, rooms, price_per_night } = req.body;
  const { data, error } = await db.from('guesthouses').insert([{ name, description, image_url, location, rooms, price_per_night }]);
  if (error) return res.status(500).json({ error });
  res.status(201).json(data);
};

export const updateGuestHouse = async (req: Request, res: Response) => {
  const { id } = req.params;
  const updates = req.body;
  const { data, error } = await db.from('guesthouses').update(updates).eq('id', id);
  if (error) return res.status(500).json({ error });
  res.json(data);
};

export const deleteGuestHouse = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { error } = await db.from('guesthouses').delete().eq('id', id);
  if (error) return res.status(500).json({ error });
  res.status(204).end();
};