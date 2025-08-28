// import { DatabaseStorage } from "./storage";
// import { mockStorage } from "./mockStorage";
// import type { IStorage } from "./storage";

class StorageWrapper implements IStorage {
  private useDatabase = true;
  private dbStorage = new DatabaseStorage();
  private fallbackStorage = mockStorage;

  private async tryWithFallback<T>(
    operation: (storage: IStorage) => Promise<T>,
    fallbackValue?: T
  ): Promise<T> {
    if (!this.useDatabase) {
      return operation(this.fallbackStorage);
    }

    try {
      return await operation(this.dbStorage);
    } catch (error) {
      console.warn('Database operation failed, falling back to mock storage:', error);
      this.useDatabase = false;
      try {
        return await operation(this.fallbackStorage);
      } catch (fallbackError) {
        console.error('Both database and mock storage failed:', fallbackError);
        if (fallbackValue !== undefined) {
          return fallbackValue;
        }
        throw fallbackError;
      }
    }
  }

  // User operations
  async getUser(id: string) {
    return this.tryWithFallback(storage => storage.getUser(id));
  }

  async getUserByUsername(username: string) {
    return this.tryWithFallback(storage => storage.getUserByUsername(username));
  }

  async getUserByEmail(email: string) {
    return this.tryWithFallback(storage => storage.getUserByEmail(email));
  }

  async createUser(user: any) {
    return this.tryWithFallback(storage => storage.createUser(user));
  }

  async updateUser(id: string, user: any) {
    return this.tryWithFallback(storage => storage.updateUser(id, user));
  }

  // Agent operations
  async getAgent(id: string) {
    return this.tryWithFallback(storage => storage.getAgent(id));
  }

  async getAgentByUserId(userId: string) {
    return this.tryWithFallback(storage => storage.getAgentByUserId(userId));
  }

  async createAgent(agent: any) {
    return this.tryWithFallback(storage => storage.createAgent(agent));
  }

  async updateAgent(id: string, agent: any) {
    return this.tryWithFallback(storage => storage.updateAgent(id, agent));
  }

  async getAgentsByTier(tier: string) {
    return this.tryWithFallback(storage => storage.getAgentsByTier(tier), []);
  }

  async getAllAgents() {
    return this.tryWithFallback(storage => storage.getAllAgents(), []);
  }

  // Guest House operations
  async getGuestHouse(id: string) {
    return this.tryWithFallback(storage => storage.getGuestHouse(id));
  }

  async getAllGuestHouses() {
    return this.tryWithFallback(storage => storage.getAllGuestHouses(), []);
  }

  async getFeaturedGuestHouses() {
    return this.tryWithFallback(storage => storage.getFeaturedGuestHouses(), []);
  }

  async getGuestHousesByAtoll(atoll: string) {
    return this.tryWithFallback(storage => storage.getGuestHousesByAtoll(atoll), []);
  }

  async searchGuestHouses(query: string) {
    return this.tryWithFallback(storage => storage.searchGuestHouses(query), []);
  }

  async createGuestHouse(guestHouse: any) {
    return this.tryWithFallback(storage => storage.createGuestHouse(guestHouse));
  }

  async updateGuestHouse(id: string, guestHouse: any) {
    return this.tryWithFallback(storage => storage.updateGuestHouse(id, guestHouse));
  }

  async deleteGuestHouse(id: string) {
    return this.tryWithFallback(storage => storage.deleteGuestHouse(id), false);
  }

  // Islands operations
  async getAllIslands(filters?: { search?: string; atoll?: string; hasGuestHouses?: boolean }) {
    return this.tryWithFallback(storage => {
      if ('getAllIslands' in storage) {
        return (storage as any).getAllIslands(filters);
      }
      return [];
    }, []);
  }

  async getIsland(id: string) {
    return this.tryWithFallback(storage => (storage as any).getIsland(id));
  }

  // Experience operations
  async getAllExperiences() {
    return this.tryWithFallback(storage => storage.getAllExperiences(), []);
  }

  async getFeaturedExperiences() {
    return this.tryWithFallback(storage => storage.getFeaturedExperiences(), []);
  }

  async getExperiencesByCategory(category: string) {
    return this.tryWithFallback(storage => storage.getExperiencesByCategory(category), []);
  }

  async getExperience(id: string) {
    return this.tryWithFallback(storage => storage.getExperience(id));
  }

  async createExperience(experience: any) {
    return this.tryWithFallback(storage => storage.createExperience(experience));
  }

  async updateExperience(id: string, experience: any) {
    return this.tryWithFallback(storage => storage.updateExperience(id, experience));
  }

  async deleteExperience(id: string) {
    return this.tryWithFallback(storage => storage.deleteExperience(id), false);
  }

  // Ferry Schedule operations
  async getAllFerrySchedules() {
    return this.tryWithFallback(storage => storage.getAllFerrySchedules(), []);
  }

  async searchFerrySchedules(from: string, to: string, date?: string) {
    return this.tryWithFallback(storage => storage.searchFerrySchedules(from, to, date), []);
  }

  async getFerrySchedule(id: string) {
    return this.tryWithFallback(storage => storage.getFerrySchedule(id));
  }

  async createFerrySchedule(schedule: any) {
    return this.tryWithFallback(storage => storage.createFerrySchedule(schedule));
  }

  async updateFerrySchedule(id: string, schedule: any) {
    return this.tryWithFallback(storage => storage.updateFerrySchedule(id, schedule));
  }

  async deleteFerrySchedule(id: string) {
    return this.tryWithFallback(storage => storage.deleteFerrySchedule(id), false);
  }

  // Domestic Airlines operations
  async getAllDomesticAirlines() {
    return this.tryWithFallback(storage => storage.getAllDomesticAirlines(), []);
  }

  async searchDomesticAirlines(from: string, to: string, date?: string) {
    return this.tryWithFallback(storage => storage.searchDomesticAirlines(from, to, date), []);
  }

  async getDomesticAirline(id: string) {
    return this.tryWithFallback(storage => storage.getDomesticAirline(id));
  }

  async createDomesticAirline(airline: any) {
    return this.tryWithFallback(storage => storage.createDomesticAirline(airline));
  }

  async updateDomesticAirline(id: string, airline: any) {
    return this.tryWithFallback(storage => storage.updateDomesticAirline(id, airline));
  }

  async deleteDomesticAirline(id: string) {
    return this.tryWithFallback(storage => storage.deleteDomesticAirline(id), false);
  }

  async getDomesticAirlinesByType(aircraftType: string) {
    return this.tryWithFallback(storage => storage.getDomesticAirlinesByType(aircraftType), []);
  }

  // Package operations
  async getAllPackages() {
    return this.tryWithFallback(storage => storage.getAllPackages(), []);
  }

  async getPackages() {
    return this.tryWithFallback(storage => storage.getPackages(), []);
  }

  async getPackage(id: string) {
    return this.tryWithFallback(storage => storage.getPackage(id));
  }

  async getPackageById(id: string) {
    return this.tryWithFallback(storage => storage.getPackageById(id));
  }

  async createPackage(data: any) {
    return this.tryWithFallback(storage => storage.createPackage(data));
  }

  async updatePackage(id: string, data: any) {
    return this.tryWithFallback(storage => storage.updatePackage(id, data));
  }

  async deletePackage(id: string) {
    return this.tryWithFallback(storage => storage.deletePackage(id), false);
  }

  // Booking operations
  async getBooking(id: string) {
    return this.tryWithFallback(storage => storage.getBooking(id));
  }

  async getBookingsByUser(userId: string) {
    return this.tryWithFallback(storage => storage.getBookingsByUser(userId), []);
  }

  async getBookingsByAgent(agentId: string) {
    return this.tryWithFallback(storage => storage.getBookingsByAgent(agentId), []);
  }

  async getBookingsByGuestHouse(guestHouseId: string) {
    return this.tryWithFallback(storage => storage.getBookingsByGuestHouse(guestHouseId), []);
  }

  async createBooking(booking: any) {
    return this.tryWithFallback(storage => storage.createBooking(booking));
  }

  async updateBooking(id: string, booking: any) {
    return this.tryWithFallback(storage => storage.updateBooking(id, booking));
  }

  async getBookingAvailability(guestHouseId: string, checkIn: Date, checkOut: Date) {
    return this.tryWithFallback(storage => storage.getBookingAvailability(guestHouseId, checkIn, checkOut), true);
  }

  // Review operations
  async getReviewsByGuestHouse(guestHouseId: string) {
    return this.tryWithFallback(storage => storage.getReviewsByGuestHouse(guestHouseId), []);
  }

  async getReviewsByUser(userId: string) {
    return this.tryWithFallback(storage => storage.getReviewsByUser(userId), []);
  }

  async createReview(review: any) {
    return this.tryWithFallback(storage => storage.createReview(review));
  }

  // Chat operations
  async getChatMessages(sessionId: string) {
    return this.tryWithFallback(storage => storage.getChatMessages(sessionId), []);
  }

  async createChatMessage(message: any) {
    return this.tryWithFallback(storage => storage.createChatMessage(message));
  }

  // Loyalty Program operations
  async getLoyaltyProgram(userId: string) {
    return this.tryWithFallback(storage => storage.getLoyaltyProgram(userId));
  }

  async updateLoyaltyPoints(userId: string, points: number) {
    return this.tryWithFallback(storage => storage.updateLoyaltyPoints(userId, points));
  }

  // Content Management operations
  async getContentSection(sectionKey: string) {
    return this.tryWithFallback(storage => storage.getContentSection(sectionKey));
  }

  async getAllContentSections() {
    return this.tryWithFallback(storage => storage.getAllContentSections(), []);
  }

  async createContentSection(content: any) {
    return this.tryWithFallback(storage => storage.createContentSection(content));
  }

  async updateContentSection(id: string, content: any) {
    return this.tryWithFallback(storage => storage.updateContentSection(id, content));
  }

  // Navigation operations
  async getAllNavigationItems() {
    return this.tryWithFallback(storage => storage.getAllNavigationItems(), []);
  }

  async createNavigationItem(item: any) {
    return this.tryWithFallback(storage => storage.createNavigationItem(item));
  }

  async updateNavigationItem(id: string, item: any) {
    return this.tryWithFallback(storage => storage.updateNavigationItem(id, item));
  }

  async deleteNavigationItem(id: string) {
    return this.tryWithFallback(storage => storage.deleteNavigationItem(id), false);
  }

  // Room availability operations
  async getRoomAvailability(guestHouseId?: string, date?: Date) {
    return this.tryWithFallback(storage => storage.getRoomAvailability(guestHouseId, date), []);
  }

  async createRoomAvailability(data: any) {
    return this.tryWithFallback(storage => storage.createRoomAvailability(data));
  }

  async updateRoomAvailability(id: string, data: any) {
    return this.tryWithFallback(storage => storage.updateRoomAvailability(id, data));
  }

  async checkRoomAvailability(guestHouseId: string, checkIn: Date, checkOut: Date) {
    return this.tryWithFallback(storage => storage.checkRoomAvailability(guestHouseId, checkIn, checkOut), true);
  }

  // Package availability operations
  async getPackageAvailability(packageId?: string, date?: Date) {
    return this.tryWithFallback(storage => storage.getPackageAvailability(packageId, date), []);
  }

  async createPackageAvailability(data: any) {
    return this.tryWithFallback(storage => storage.createPackageAvailability(data));
  }

  async updatePackageAvailability(id: string, data: any) {
    return this.tryWithFallback(storage => storage.updatePackageAvailability(id, data));
  }

  // Enhanced booking operations
  async updateAvailabilityAfterBooking(booking: any) {
    return this.tryWithFallback(storage => storage.updateAvailabilityAfterBooking(booking));
  }

  async getUserBookings(userId: string) {
    return this.tryWithFallback(storage => storage.getUserBookings(userId), []);
  }

  async updateBookingStatus(bookingId: string, status: string) {
    return this.tryWithFallback(storage => storage.updateBookingStatus(bookingId, status));
  }
}

export const storageWrapper = new StorageWrapper();