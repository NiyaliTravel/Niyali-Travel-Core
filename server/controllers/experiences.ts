import { Request, Response } from 'express';
import db from '../../utils/db'; // Supabase client

export const getExperiences = async (_req: Request, res: Response) => {
  const { data, error } = await db.from('experiences').select('*');
  if (error) return res.status(500).json({ error });
  res.json(data);
};

export const createExperience = async (req: Request, res: Response) => {
  const { name, description, image_url, price } = req.body;
  const { data, error } = await db.from('experiences').insert([{ name, description, image_url, price }]);
  if (error) return res.status(500).json({ error });
  res.status(201).json(data);
};

export const updateExperience = async (req: Request, res: Response) => {
  const { id } = req.params;
  const updates = req.body;
  const { data, error } = await db.from('experiences').update(updates).eq('id', id);
  if (error) return res.status(500).json({ error });
  res.json(data);
};

export const deleteExperience = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { error } = await db.from('experiences').delete().eq('id', id);
  if (error) return res.status(500).json({ error });
  res.status(204).end();
};