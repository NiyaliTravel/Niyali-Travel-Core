import {
  users, agents, guestHouses, bookings, experiences, ferrySchedules, reviews, chatMessages, loyaltyProgram, domesticAirlines,
  contentSections, navigationItems,
  roomAvailability, packages, packageAvailability,
  type User, type InsertUser, type Agent, type InsertAgent, type GuestHouse, type InsertGuestHouse,
  type Booking, type InsertBooking, type Experience, type InsertExperience, type FerrySchedule,
  type InsertFerrySchedule, type Review, type InsertReview, type ChatMessage, type InsertChatMessage,
  type LoyaltyProgram, type DomesticAirline, type InsertDomesticAirline, type ContentSection,
  type InsertContentSection, type NavigationItem, type InsertNavigationItem,
  type InsertRoomAvailability, type RoomAvailability, type InsertPackage, type Package,
  type InsertPackageAvailability, type PackageAvailability
} from "@shared/schema";
import { db } from "@/models/db";
import { eq, and, gte, lte, desc, sql, like, or } from "drizzle-orm";

export interface IStorage {
  // User operations
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  getUserByEmail(email: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  updateUser(id: number, user: Partial<InsertUser>): Promise<User | undefined>;

  // Agent operations
  getAgent(id: number): Promise<Agent | undefined>;
  getAgentByUserId(userId: number): Promise<Agent | undefined>;
  createAgent(agent: InsertAgent): Promise<Agent>;
  updateAgent(id: number, agent: Partial<InsertAgent>): Promise<Agent | undefined>;
  getAgentsByTier(tier: string): Promise<Agent[]>;
  getAllAgents(): Promise<Agent[]>;

  // Guest House operations
  getGuestHouse(id: number): Promise<GuestHouse | undefined>;
  getAllGuestHouses(): Promise<GuestHouse[]>;
  getFeaturedGuestHouses(): Promise<GuestHouse[]>;
  getGuestHousesByAtoll(atoll: string): Promise<GuestHouse[]>;
  searchGuestHouses(query: string): Promise<GuestHouse[]>;
  createGuestHouse(guestHouse: InsertGuestHouse): Promise<GuestHouse>;
  updateGuestHouse(id: number, guestHouse: Partial<InsertGuestHouse>): Promise<GuestHouse | undefined>;
  deleteGuestHouse(id: number): Promise<boolean>;

  // Booking operations
  getBooking(id: number): Promise<Booking | undefined>;
  getBookingsByUser(userId: number): Promise<Booking[]>;
  getBookingsByAgent(agentId: number): Promise<Booking[]>;
  getBookingsByGuestHouse(guestHouseId: number): Promise<Booking[]>;
  createBooking(booking: InsertBooking): Promise<Booking>;
  updateBooking(id: number, booking: Partial<InsertBooking>): Promise<Booking | undefined>;
  getBookingAvailability(guestHouseId: number, checkIn: Date, checkOut: Date): Promise<boolean>;

  // Experience operations
  getAllExperiences(): Promise<Experience[]>;
  getFeaturedExperiences(): Promise<Experience[]>;
  getExperiencesByCategory(category: string): Promise<Experience[]>;
  getExperience(id: number): Promise<Experience | undefined>;
  createExperience(experience: InsertExperience): Promise<Experience>;
  updateExperience(id: number, experience: Partial<InsertExperience>): Promise<Experience | undefined>;
  deleteExperience(id: number): Promise<boolean>;

  // Ferry Schedule operations
  getAllFerrySchedules(): Promise<FerrySchedule[]>;
  searchFerrySchedules(from: string, to: string, date?: string): Promise<FerrySchedule[]>;
  getFerrySchedule(id: number): Promise<FerrySchedule | undefined>;
  createFerrySchedule(schedule: InsertFerrySchedule): Promise<FerrySchedule>;
  updateFerrySchedule(id: number, schedule: Partial<InsertFerrySchedule>): Promise<FerrySchedule | undefined>;
  deleteFerrySchedule(id: number): Promise<boolean>;

  // Domestic Airlines operations
  getAllDomesticAirlines(): Promise<DomesticAirline[]>;
  searchDomesticAirlines(from: string, to: string, date?: string): Promise<DomesticAirline[]>;
  getDomesticAirline(id: number): Promise<DomesticAirline | undefined>;
  createDomesticAirline(airline: InsertDomesticAirline): Promise<DomesticAirline>;
  updateDomesticAirline(id: number, airline: Partial<InsertDomesticAirline>): Promise<DomesticAirline | undefined>;
  deleteDomesticAirline(id: number): Promise<boolean>;
  getDomesticAirlinesByType(aircraftType: string): Promise<DomesticAirline[]>;

  // Review operations
  getReviewsByGuestHouse(guestHouseId: number): Promise<Review[]>;
  getReviewsByUser(userId: number): Promise<Review[]>;
  createReview(review: InsertReview): Promise<Review>;

  // Chat operations
  getChatMessages(sessionId: string): Promise<ChatMessage[]>;
  createChatMessage(message: InsertChatMessage): Promise<ChatMessage>;

  // Loyalty Program operations
  getLoyaltyProgram(userId: number): Promise<LoyaltyProgram | undefined>;
  updateLoyaltyPoints(userId: number, points: number): Promise<LoyaltyProgram | undefined>;

  // Content Management operations
  getContentSection(sectionKey: string): Promise<ContentSection | undefined>;
  getAllContentSections(): Promise<ContentSection[]>;
  createContentSection(content: InsertContentSection): Promise<ContentSection>;
  updateContentSection(id: number, content: Partial<InsertContentSection>): Promise<ContentSection | undefined>;

  // Navigation operations
  getAllNavigationItems(): Promise<NavigationItem[]>;
  createNavigationItem(item: InsertNavigationItem): Promise<NavigationItem>;
  updateNavigationItem(id: number, item: Partial<InsertNavigationItem>): Promise<NavigationItem | undefined>;
  deleteNavigationItem(id: number): Promise<boolean>;

  // Room availability methods
  getRoomAvailability(guestHouseId?: string, date?: Date): Promise<RoomAvailability[]>;
  createRoomAvailability(data: InsertRoomAvailability): Promise<RoomAvailability>;
  updateRoomAvailability(id: number, data: Partial<InsertRoomAvailability>): Promise<RoomAvailability | null>;
  checkRoomAvailability(guestHouseId: number, checkIn: Date, checkOut: Date): Promise<boolean>;

  // Package methods
  getAllPackages(): Promise<Package[]>;
  getPackages(): Promise<Package[]>;
  getPackage(id: number): Promise<Package | null>;
  getPackageById(id: number): Promise<Package | null>;
  createPackage(data: InsertPackage): Promise<Package>;
  updatePackage(id: number, data: Partial<InsertPackage>): Promise<Package | null>;
  deletePackage(id: number): Promise<boolean>;

  // Package availability methods
  getPackageAvailability(packageId?: number, date?: Date): Promise<PackageAvailability[]>;
  createPackageAvailability(data: InsertPackageAvailability): Promise<PackageAvailability>;
  updatePackageAvailability(id: number, data: Partial<InsertPackageAvailability>): Promise<PackageAvailability | null>;

  // Enhanced booking methods
  updateAvailabilityAfterBooking(booking: Booking): Promise<void>;
  getUserBookings(userId: number): Promise<Booking[]>;
  updateBookingStatus(bookingId: number, status: string): Promise<Booking | null>;
}

export class DatabaseStorage implements IStorage {
  // User operations
  async getUser(id: number): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user || undefined;
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.username, username));
    return user || undefined;
  }

  async getUserByEmail(email: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.email, email));
    return user || undefined;
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const [user] = await db.insert(users).values(insertUser).returning();
    return user;
  }

  async updateUser(id: number, updateUser: Partial<InsertUser>): Promise<User | undefined> {
    const [user] = await db.update(users)
      .set({ ...updateUser, updatedAt: new Date() })
      .where(eq(users.id, id))
      .returning();
    return user || undefined;
  }

  // Agent operations
  async getAgent(id: number): Promise<Agent | undefined> {
    const [agent] = await db.select().from(agents).where(eq(agents.id, id));
    return agent || undefined;
  }

  async getAgentByUserId(userId: number): Promise<Agent | undefined> {
    const [agent] = await db.select().from(agents).where(eq(agents.userId, userId));
    return agent || undefined;
  }

  async createAgent(insertAgent: InsertAgent): Promise<Agent> {
    const [agent] = await db.insert(agents).values(insertAgent).returning();
    return agent;
  }

  async updateAgent(id: number, updateAgent: Partial<InsertAgent>): Promise<Agent | undefined> {
    const [agent] = await db.update(agents)
      .set(updateAgent)
      .where(eq(agents.id, id))
      .returning();
    return agent || undefined;
  }

  async getAgentsByTier(tier: string): Promise<Agent[]> {
    return await db.select().from(agents).where(eq(agents.tier, tier));
  }

  async getAllAgents(): Promise<Agent[]> {
    return await db.select().from(agents).where(eq(agents.isActive, true));
  }

  // Guest House operations
  async getGuestHouse(id: number): Promise<GuestHouse | undefined> {
    const [guestHouse] = await db.select().from(guestHouses).where(eq(guestHouses.id, id));
    return guestHouse || undefined;
  }

  async getAllGuestHouses(): Promise<GuestHouse[]> {
    return await db.select().from(guestHouses)
      .where(eq(guestHouses.isActive, true))
      .orderBy(desc(guestHouses.rating));
  }

  async getFeaturedGuestHouses(): Promise<GuestHouse[]> {
    return await db.select().from(guestHouses)
      .where(and(eq(guestHouses.isActive, true), eq(guestHouses.featured, true)))
      .orderBy(desc(guestHouses.rating));
  }

  async getGuestHousesByAtoll(atoll: string): Promise<GuestHouse[]> {
    return await db.select().from(guestHouses)
      .where(and(eq(guestHouses.isActive, true), eq(guestHouses.atoll, atoll)))
      .orderBy(desc(guestHouses.rating));
  }

  async searchGuestHouses(query: string): Promise<GuestHouse[]> {
    return await db.select().from(guestHouses)
      .where(
        and(
          eq(guestHouses.isActive, true),
          or(
            like(guestHouses.name, `%${query}%`),
            like(guestHouses.description, `%${query}%`),
            like(guestHouses.atoll, `%${query}%`),
            like(guestHouses.island, `%${query}%`)
          )
        )
      )
      .orderBy(desc(guestHouses.rating));
  }

  async createGuestHouse(insertGuestHouse: InsertGuestHouse): Promise<GuestHouse> {
    const [guestHouse] = await db.insert(guestHouses).values(insertGuestHouse).returning();
    return guestHouse;
  }

  async updateGuestHouse(id: number, updateGuestHouse: Partial<InsertGuestHouse>): Promise<GuestHouse | undefined> {
    const [guestHouse] = await db.update(guestHouses)
      .set({ ...updateGuestHouse, updatedAt: new Date() })
      .where(eq(guestHouses.id, id))
      .returning();
    return guestHouse || undefined;
  }

  async deleteGuestHouse(id: number): Promise<boolean> {
    const result = await db.delete(guestHouses).where(eq(guestHouses.id, id));
    return (result.rowCount ?? 0) > 0;
  }

  // Booking operations
  async getBooking(id: number): Promise<Booking | undefined> {
    const [booking] = await db.select().from(bookings).where(eq(bookings.id, id));
    return booking || undefined;
  }

  async getBookingsByUser(userId: number): Promise<Booking[]> {
    return await db.select().from(bookings)
      .where(eq(bookings.userId, userId))
      .orderBy(desc(bookings.createdAt));
  }

  async getBookingsByAgent(agentId: number): Promise<Booking[]> {
    return await db.select().from(bookings)
      .where(eq(bookings.agentId, agentId))
      .orderBy(desc(bookings.createdAt));
  }

  async getBookingsByGuestHouse(guestHouseId: number): Promise<Booking[]> {
    return await db.select().from(bookings)
      .where(eq(bookings.guestHouseId, guestHouseId))
      .orderBy(desc(bookings.createdAt));
  }

  async createBooking(insertBooking: InsertBooking): Promise<Booking> {
    const [booking] = await db.insert(bookings).values(insertBooking).returning();
    return booking;
  }

  async updateBooking(id: number, updateBooking: Partial<InsertBooking>): Promise<Booking | undefined> {
    const [booking] = await db.update(bookings)
      .set({ ...updateBooking, updatedAt: new Date() })
      .where(eq(bookings.id, id))
      .returning();
    return booking || undefined;
  }

  async getBookingAvailability(guestHouseId: number, checkIn: Date, checkOut: Date): Promise<boolean> {
    const conflictingBookings = await db.select().from(bookings)
      .where(
        and(
          eq(bookings.guestHouseId, guestHouseId),
          or(
            and(gte(bookings.checkIn, checkIn), lte(bookings.checkIn, checkOut)),
            and(gte(bookings.checkOut, checkIn), lte(bookings.checkOut, checkOut)),
            and(lte(bookings.checkIn, checkIn), gte(bookings.checkOut, checkOut))
          ),
          or(eq(bookings.status, "confirmed"), eq(bookings.status, "pending"))
        )
      );
    
    return conflictingBookings.length === 0;
  }

  // Experience operations
  async getAllExperiences(): Promise<Experience[]> {
    return await db.select().from(experiences)
      .where(eq(experiences.isActive, true))
      .orderBy(desc(experiences.rating));
  }

  async getFeaturedExperiences(): Promise<Experience[]> {
    return await db.select().from(experiences)
      .where(and(eq(experiences.isActive, true), eq(experiences.featured, true)))
      .orderBy(desc(experiences.rating));
  }

  async getExperiencesByCategory(category: string): Promise<Experience[]> {
    return await db.select().from(experiences)
      .where(and(eq(experiences.isActive, true), eq(experiences.category, category)))
      .orderBy(desc(experiences.rating));
  }

  async getExperience(id: number): Promise<Experience | undefined> {
    const [experience] = await db.select().from(experiences).where(eq(experiences.id, id));
    return experience || undefined;
  }

  async createExperience(insertExperience: InsertExperience): Promise<Experience> {
    const [experience] = await db.insert(experiences).values(insertExperience).returning();
    return experience;
  }

  async updateExperience(id: number, updateExperience: Partial<InsertExperience>): Promise<Experience | undefined> {
    const [experience] = await db.update(experiences)
      .set({ ...updateExperience })
      .where(eq(experiences.id, id))
      .returning();
    return experience || undefined;
  }

  async deleteExperience(id: number): Promise<boolean> {
    const result = await db.delete(experiences).where(eq(experiences.id, id));
    return (result.rowCount ?? 0) > 0;
  }

  // Ferry Schedule operations
  async getAllFerrySchedules(): Promise<FerrySchedule[]> {
    return await db.select().from(ferrySchedules)
      .where(eq(ferrySchedules.isActive, true))
      .orderBy(ferrySchedules.departureTime);
  }

  async searchFerrySchedules(from: string, to: string, date?: string): Promise<FerrySchedule[]> {
    let conditions = [
      eq(ferrySchedules.isActive, true),
      eq(ferrySchedules.fromLocation, from),
      eq(ferrySchedules.toLocation, to)
    ];

    if (date) {
      const dayOfWeek = new Date(date).toLocaleDateString('en-US', { weekday: 'long' });
      conditions.push(
        sql`${ferrySchedules.operatingDays} @> ARRAY[${dayOfWeek}]::text[]`
      );
    }

    return await db.select().from(ferrySchedules)
      .where(and(...conditions))
      .orderBy(ferrySchedules.departureTime);
  }

  async getFerrySchedule(id: number): Promise<FerrySchedule | undefined> {
    const [schedule] = await db.select().from(ferrySchedules).where(eq(ferrySchedules.id, id));
    return schedule || undefined;
  }

  async createFerrySchedule(insertSchedule: InsertFerrySchedule): Promise<FerrySchedule> {
    const [schedule] = await db.insert(ferrySchedules).values(insertSchedule).returning();
    return schedule;
  }

  async updateFerrySchedule(id: number, updateSchedule: Partial<InsertFerrySchedule>): Promise<FerrySchedule | undefined> {
    const [schedule] = await db.update(ferrySchedules)
      .set({ ...updateSchedule })
      .where(eq(ferrySchedules.id, id))
      .returning();
    return schedule || undefined;
  }

  async deleteFerrySchedule(id: number): Promise<boolean> {
    const result = await db.delete(ferrySchedules).where(eq(ferrySchedules.id, id));
    return (result.rowCount ?? 0) > 0;
  }

  // Domestic Airlines operations
  async getAllDomesticAirlines(): Promise<DomesticAirline[]> {
    return await db.select().from(domesticAirlines)
      .where(eq(domesticAirlines.isActive, true))
      .orderBy(domesticAirlines.departureTime);
  }

  async searchDomesticAirlines(from: string, to: string, date?: string): Promise<DomesticAirline[]> {
    let conditions = [
      eq(domesticAirlines.isActive, true),
      eq(domesticAirlines.fromLocation, from),
      eq(domesticAirlines.toLocation, to)
    ];

    if (date) {
      const dayOfWeek = new Date(date).toLocaleDateString('en-US', { weekday: 'long' });
      conditions.push(
        sql`${domesticAirlines.operatingDays} @> ARRAY[${dayOfWeek}]::text[]`
      );
    }

    return await db.select().from(domesticAirlines)
      .where(and(...conditions))
      .orderBy(domesticAirlines.departureTime);
  }

  async getDomesticAirline(id: number): Promise<DomesticAirline | undefined> {
    const [airline] = await db.select().from(domesticAirlines).where(eq(domesticAirlines.id, id));
    return airline || undefined;
  }

  async createDomesticAirline(insertAirline: InsertDomesticAirline): Promise<DomesticAirline> {
    const [airline] = await db.insert(domesticAirlines).values(insertAirline).returning();
    return airline;
  }

  async updateDomesticAirline(id: number, updateAirline: Partial<InsertDomesticAirline>): Promise<DomesticAirline | undefined> {
    const [airline] = await db.update(domesticAirlines)
      .set({ ...updateAirline, updatedAt: new Date() })
      .where(eq(domesticAirlines.id, id))
      .returning();
    return airline || undefined;
  }

  async deleteDomesticAirline(id: number): Promise<boolean> {
    const result = await db.delete(domesticAirlines).where(eq(domesticAirlines.id, id));
    return (result.rowCount ?? 0) > 0;
  }

  async getDomesticAirlinesByType(aircraftType: string): Promise<DomesticAirline[]> {
    return await db.select().from(domesticAirlines)
      .where(
        and(
          eq(domesticAirlines.isActive, true),
          eq(domesticAirlines.aircraftType, aircraftType)
        )
      )
      .orderBy(domesticAirlines.departureTime);
  }

  // Review operations
  async getReviewsByGuestHouse(guestHouseId: number): Promise<Review[]> {
    return await db.select().from(reviews)
      .where(eq(reviews.guestHouseId, guestHouseId))
      .orderBy(desc(reviews.createdAt));
  }

  async getReviewsByUser(userId: number): Promise<Review[]> {
    return await db.select().from(reviews)
      .where(eq(reviews.userId, userId))
      .orderBy(desc(reviews.createdAt));
  }

  async createReview(insertReview: InsertReview): Promise<Review> {
    const [review] = await db.insert(reviews).values(insertReview).returning();
    return review;
  }

  // Chat operations
  async getChatMessages(sessionId: string): Promise<ChatMessage[]> {
    return await db.select().from(chatMessages)
      .where(eq(chatMessages.sessionId, sessionId))
      .orderBy(chatMessages.createdAt);
  }

  async createChatMessage(insertMessage: InsertChatMessage): Promise<ChatMessage> {
    const [message] = await db.insert(chatMessages).values(insertMessage).returning();
    return message;
  }

  // Loyalty Program operations
  async getLoyaltyProgram(userId: number): Promise<LoyaltyProgram | undefined> {
    const [program] = await db.select().from(loyaltyProgram).where(eq(loyaltyProgram.userId, userId));
    return program || undefined;
  }

  async updateLoyaltyPoints(userId: number, points: number): Promise<LoyaltyProgram | undefined> {
    const [program] = await db.update(loyaltyProgram)
      .set({ 
        points: sql`${loyaltyProgram.points} + ${points}`,
        updatedAt: new Date()
      })
      .where(eq(loyaltyProgram.userId, userId))
      .returning();
    return program || undefined;
  }

  // Content Management operations
  async getContentSection(sectionKey: string): Promise<ContentSection | undefined> {
    const [section] = await db.select().from(contentSections)
      .where(eq(contentSections.sectionKey, sectionKey));
    return section || undefined;
  }

  async getAllContentSections(): Promise<ContentSection[]> {
    return await db.select().from(contentSections)
      .where(eq(contentSections.isActive, true))
      .orderBy(contentSections.createdAt);
  }

  async createContentSection(insertContent: InsertContentSection): Promise<ContentSection> {
    const [section] = await db.insert(contentSections).values(insertContent).returning();
    return section;
  }

  async updateContentSection(id: number, updateContent: Partial<InsertContentSection>): Promise<ContentSection | undefined> {
    const [section] = await db.update(contentSections)
      .set({ ...updateContent, updatedAt: new Date() })
      .where(eq(contentSections.id, id))
      .returning();
    return section || undefined;
  }

  // Navigation operations
  async getAllNavigationItems(): Promise<NavigationItem[]> {
    return await db.select().from(navigationItems)
      .where(eq(navigationItems.isActive, true))
      .orderBy(navigationItems.order);
  }

  async createNavigationItem(insertItem: InsertNavigationItem): Promise<NavigationItem> {
    const [item] = await db.insert(navigationItems).values(insertItem).returning();
    return item;
  }

  async updateNavigationItem(id: number, updateItem: Partial<InsertNavigationItem>): Promise<NavigationItem | undefined> {
    const [item] = await db.update(navigationItems)
      .set(updateItem)
      .where(eq(navigationItems.id, id))
      .returning();
    return item || undefined;
  }

  async deleteNavigationItem(id: number): Promise<boolean> {
    const result = await db.delete(navigationItems).where(eq(navigationItems.id, id));
    return (result.rowCount ?? 0) > 0;
  }

  // Room availability methods
  async getRoomAvailability(guestHouseId?: string, date?: Date): Promise<RoomAvailability[]> {
    if (guestHouseId && date) {
      return await db.select().from(roomAvailability)
        .where(and(
          eq(roomAvailability.guestHouseId, parseInt(guestHouseId)),
          eq(roomAvailability.date, date)
        ));
    } else if (guestHouseId) {
      return await db.select().from(roomAvailability)
        .where(eq(roomAvailability.guestHouseId, parseInt(guestHouseId)));
    }
    return await db.select().from(roomAvailability);
  }

  async createRoomAvailability(data: InsertRoomAvailability): Promise<RoomAvailability> {
    const [availability] = await db.insert(roomAvailability).values(data).returning();
    return availability;
  }

  async updateRoomAvailability(id: number, data: Partial<InsertRoomAvailability>): Promise<RoomAvailability | null> {
    const [updated] = await db.update(roomAvailability)
      .set({ ...data, updatedAt: new Date() })
      .where(eq(roomAvailability.id, id))
      .returning();
    return updated || null;
  }

  async checkRoomAvailability(guestHouseId: number, checkIn: Date, checkOut: Date): Promise<boolean> {
    const availabilities = await db.select().from(roomAvailability)
      .where(and(
        eq(roomAvailability.guestHouseId, guestHouseId),
        gte(roomAvailability.date, checkIn),
        lte(roomAvailability.date, checkOut)
      ));
    
    return availabilities.every((a: RoomAvailability) => a.availableRooms > 0);
  }

  // Package methods
  async getAllPackages(): Promise<Package[]> {
    return await db.select().from(packages).where(eq(packages.isActive, true));
  }

  async getPackages(): Promise<Package[]> {
    return await db.select().from(packages).where(eq(packages.isActive, true));
  }

  async getPackage(id: number): Promise<Package | null> {
    const [pkg] = await db.select().from(packages).where(eq(packages.id, id));
    return pkg || null;
  }

  async getPackageById(id: number): Promise<Package | null> {
    const [pkg] = await db.select().from(packages).where(eq(packages.id, id));
    return pkg || null;
  }

  async createPackage(data: InsertPackage): Promise<Package> {
    const [pkg] = await db.insert(packages).values(data).returning();
    return pkg;
  }

  async updatePackage(id: number, data: Partial<InsertPackage>): Promise<Package | null> {
    const [updated] = await db.update(packages)
      .set({ ...data, updatedAt: new Date() })
      .where(eq(packages.id, id))
      .returning();
    return updated || null;
  }

  async deletePackage(id: number): Promise<boolean> {
    const result = await db.delete(packages).where(eq(packages.id, id));
    return (result.rowCount ?? 0) > 0;
  }

  // Package availability methods
  async getPackageAvailability(packageId?: number, date?: Date): Promise<PackageAvailability[]> {
    if (packageId && date) {
      return await db.select().from(packageAvailability)
        .where(and(
          eq(packageAvailability.packageId, packageId),
          eq(packageAvailability.date, date)
        ));
    } else if (packageId) {
      return await db.select().from(packageAvailability)
        .where(eq(packageAvailability.packageId, packageId));
    }
    return await db.select().from(packageAvailability);
  }

  async createPackageAvailability(data: InsertPackageAvailability): Promise<PackageAvailability> {
    const [availability] = await db.insert(packageAvailability).values(data).returning();
    return availability;
  }

  async updatePackageAvailability(id: number, data: Partial<InsertPackageAvailability>): Promise<PackageAvailability | null> {
    const [updated] = await db.update(packageAvailability)
      .set({ ...data, updatedAt: new Date() })
      .where(eq(packageAvailability.id, id))
      .returning();
    return updated || null;
  }

  // Enhanced booking methods
  async updateAvailabilityAfterBooking(booking: Booking): Promise<void> {
    // Update room availability if it's a room booking
    if (booking.guestHouseId) {
      const checkInDate = new Date(booking.checkIn);
      const checkOutDate = new Date(booking.checkOut);
      
      for (let date = checkInDate; date < checkOutDate; date.setDate(date.getDate() + 1)) {
        await db.update(roomAvailability)
          .set({ 
            availableRooms: sql`${roomAvailability.availableRooms} - 1`
          })
          .where(and(
            eq(roomAvailability.guestHouseId, booking.guestHouseId),
            eq(roomAvailability.date, new Date(date))
          ));
      }
    }
  }

  async getUserBookings(userId: number): Promise<Booking[]> {
    return await db.select().from(bookings)
      .where(eq(bookings.userId, userId))
      .orderBy(desc(bookings.createdAt));
  }

  async updateBookingStatus(bookingId: number, status: string): Promise<Booking | null> {
    const [updated] = await db.update(bookings)
      .set({ status, updatedAt: new Date() })
      .where(eq(bookings.id, bookingId))
      .returning();
    return updated || null;
  }
}

export const storage = new DatabaseStorage();
