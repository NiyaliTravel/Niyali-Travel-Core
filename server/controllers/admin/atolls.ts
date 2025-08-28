import { Request, Response } from 'express';
import { db } from '@/models/db';
import { atolls } from '@shared/schema';
import { eq } from 'drizzle-orm';

export const getAtolls = async (req: Request, res: Response) => {
  try {
    const result = await db.select().from(atolls);
    res.status(200).json(result);
  } catch (error) {
    console.error('Error fetching atolls:', error);
    res.status(500).json({ message: 'Failed to fetch atolls', error: (error as Error).message });
  }
};

export const createAtoll = async (req: Request, res: Response) => {
  try {
    const { name, description, image_url } = req.body;
    const [newAtoll] = await db.insert(atolls).values({ name, description, image_url }).returning();
    res.status(201).json(newAtoll);
  } catch (error) {
    console.error('Error creating atoll:', error);
    res.status(500).json({ message: 'Failed to create atoll', error: (error as Error).message });
  }
};

export const updateAtoll = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { name, description, image_url } = req.body;
    const [updatedAtoll] = await db.update(atolls).set({ name, description, image_url }).where(eq(atolls.id, parseInt(id))).returning();
    if (!updatedAtoll) {
      return res.status(404).json({ message: 'Atoll not found' });
    }
    res.status(200).json(updatedAtoll);
  } catch (error) {
    console.error('Error updating atoll:', error);
    res.status(500).json({ message: 'Failed to update atoll', error: (error as Error).message });
  }
};

export const deleteAtoll = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const result = await db.delete(atolls).where(eq(atolls.id, parseInt(id)));
    if (result.rowCount === 0) {
      return res.status(404).json({ message: 'Atoll not found' });
    }
    res.status(204).send();
  } catch (error) {
    console.error('Error deleting atoll:', error);
    res.status(500).json({ message: 'Failed to delete atoll', error: (error as Error).message });
  }
};