import { Request, Response } from 'express';
import db from '../../utils/db'; // Supabase client

export const getContactInfo = async (_req: Request, res: Response) => {
  const { data, error } = await db.from('contact_info').select('*').single();
  if (error) return res.status(500).json({ error });
  res.json(data);
};

export const updateContactInfo = async (req: Request, res: Response) => {
  const updates = req.body;
  const { data, error } = await db.from('contact_info').update(updates).eq('id', 1); // Assuming a single contact info entry with ID 1
  if (error) return res.status(500).json({ error });
  res.json(data);
};