import { Request, Response } from 'express';
import { db } from '@/models/db';
import { contentSections } from '@shared/schema';
import { eq } from 'drizzle-orm';

export const getContactInfo = async (_req: Request, res: Response) => {
  try {
    const result = await db.select().from(contentSections).where(eq(contentSections.sectionKey, 'contact_info'));
    res.status(200).json(result[0]);
  } catch (error) {
    console.error('Error fetching contact info:', error);
    res.status(500).json({ message: 'Failed to fetch contact info', error: (error as Error).message });
  }
};

export const updateContactInfo = async (req: Request, res: Response) => {
  try {
    const { title, content } = req.body;
    const [updatedContactInfo] = await db.update(contentSections).set({ title, content }).where(eq(contentSections.sectionKey, 'contact_info')).returning();
    if (!updatedContactInfo) {
      return res.status(404).json({ message: 'Contact info not found' });
    }
    res.status(200).json(updatedContactInfo);
  } catch (error) {
    console.error('Error updating contact info:', error);
    res.status(500).json({ message: 'Failed to update contact info', error: (error as Error).message });
  }
};