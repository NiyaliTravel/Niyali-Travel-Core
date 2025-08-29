import { Request, Response } from 'express';
import { db } from '@/models/db';
import { experiences } from '@shared/schema';
import { eq } from 'drizzle-orm';

export const getExperiences = async (_req: Request, res: Response) => {
  try {
    const result = await db.select().from(experiences);
    res.status(200).json(result);
  } catch (error) {
    console.error('Error fetching experiences:', error);
    res.status(500).json({ message: 'Failed to fetch experiences', error: (error as Error).message });
  }
};

export const createExperience = async (req: Request, res: Response) => {
  try {
    const { name, description, category, location, duration, price, difficulty, images } = req.body;
    const [newExperience] = await db.insert(experiences).values({ 
      name, 
      description, 
      category, 
      location, 
      duration, 
      price, 
      difficulty, 
      images 
    }).returning();
    res.status(201).json(newExperience);
  } catch (error) {
    console.error('Error creating experience:', error);
    res.status(500).json({ message: 'Failed to create experience', error: (error as Error).message });
  }
};

export const updateExperience = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { name, description, category, location, duration, price, difficulty, images } = req.body;
    const [updatedExperience] = await db.update(experiences).set({ 
      name, 
      description, 
      category, 
      location, 
      duration, 
      price, 
      difficulty, 
      images 
    }).where(eq(experiences.id, parseInt(id))).returning();
    if (!updatedExperience) {
      return res.status(404).json({ message: 'Experience not found' });
    }
    res.status(200).json(updatedExperience);
  } catch (error) {
    console.error('Error updating experience:', error);
    res.status(500).json({ message: 'Failed to update experience', error: (error as Error).message });
  }
};

export const deleteExperience = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const [deletedExperience] = await db.delete(experiences).where(eq(experiences.id, parseInt(id))).returning();
    if (!deletedExperience) {
      return res.status(404).json({ message: 'Experience not found' });
    }
    res.status(204).end();
  } catch (error) {
    console.error('Error deleting experience:', error);
    res.status(500).json({ message: 'Failed to delete experience', error: (error as Error).message });
  }
};