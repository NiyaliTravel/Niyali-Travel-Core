import { Request, Response } from 'express';
import db from '../../utils/db'; // Supabase client

export const getAtolls = async (_req: Request, res: Response) => {
  const { data, error } = await db.from('atolls').select('*');
  if (error) return res.status(500).json({ error });
  res.json(data);
};

export const createAtoll = async (req: Request, res: Response) => {
  const { name, description, image_url } = req.body;
  const { data, error } = await db.from('atolls').insert([{ name, description, image_url }]);
  if (error) return res.status(500).json({ error });
  res.status(201).json(data);
};

export const updateAtoll = async (req: Request, res: Response) => {
  const { id } = req.params;
  const updates = req.body;
  const { data, error } = await db.from('atolls').update(updates).eq('id', id);
  if (error) return res.status(500).json({ error });
  res.json(data);
};

export const deleteAtoll = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { error } = await db.from('atolls').delete().eq('id', id);
  if (error) return res.status(500).json({ error });
  res.status(204).end();
};