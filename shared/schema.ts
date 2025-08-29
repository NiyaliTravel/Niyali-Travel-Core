import { pgTable, serial, text, timestamp, boolean, integer, doublePrecision, pgEnum } from "drizzle-orm/pg-core";
import { InferSelectModel, InferInsertModel } from "drizzle-orm";

export const userRoleEnum = pgEnum("user_role", ["admin", "agent", "traveler"]);
export const agentVerificationStatusEnum = pgEnum("agent_verification_status", ["pending", "verified", "rejected"]);

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").unique().notNull(),
  email: text("email").unique().notNull(),
  password: text("password").notNull(),
  role: userRoleEnum("role").notNull().default("traveler"),
  firstName: text("first_name"),
  lastName: text("last_name"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const agents = pgTable("agents", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").references(() => users.id).unique().notNull(),
  tier: text("tier").notNull().default("standard"),
  verificationStatus: agentVerificationStatusEnum("verification_status").notNull().default("pending"),
  isActive: boolean("is_active").default(true).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const atolls = pgTable("atolls", {
  id: serial("id").primaryKey(),
  name: text("name").unique().notNull(),
  description: text("description"),
  image_url: text("image_url"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const guestHouses = pgTable("guest_houses", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  description: text("description"),
  atoll: text("atoll").notNull().references(() => atolls.name),
  island: text("island").notNull(),
  location: text("location").notNull(), // Storing as JSON string
  images: text("images").array().notNull().default([]),
  amenities: text("amenities").array().notNull().default([]),
  roomTypes: text("room_types").array().notNull().default([]), // Storing as JSON string array
  price: doublePrecision("price").notNull().default(0),
  maxGuests: integer("max_guests").notNull().default(1),
  rating: doublePrecision("rating").default(0),
  reviewCount: integer("review_count").default(0),
  featured: boolean("featured").default(false),
  isActive: boolean("is_active").default(true).notNull(),
  contactInfo: text("contact_info").notNull(), // Storing as JSON string
  policies: text("policies").notNull(), // Storing as JSON string
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const experiences = pgTable("experiences", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  description: text("description"),
  category: text("category").notNull(),
  location: text("location").notNull(),
  duration: text("duration").notNull(),
  price: doublePrecision("price").notNull().default(0),
  maxParticipants: integer("max_participants").notNull().default(1),
  images: text("images").array().notNull().default([]),
  difficulty: text("difficulty").notNull(),
  includedItems: text("included_items").array().notNull().default([]),
  requirements: text("requirements").array().notNull().default([]),
  rating: doublePrecision("rating").default(0),
  reviewCount: integer("review_count").default(0),
  featured: boolean("featured").default(false),
  isActive: boolean("is_active").default(true).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});
export const islands = pgTable("islands", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  atoll: text("atoll").notNull(),
  localName: text("local_name"),
  population: text("population"),
  area: text("area"), // in km²
  hasGuestHouses: boolean("has_guest_houses").default(false),
  numberOfGuestHouses: text("number_of_guest_houses"),
  distanceFromMale: text("distance_from_male"), // in km
  transportOptions: text("transport_options"), // speedboat, seaplane, ferry
  popularActivities: text("popular_activities").array(),
  description: text("description"),
  coordinates: text("coordinates"), // { lat, lng }
  isActive: boolean("is_active").default(true),
  createdAt: timestamp("created_at").defaultNow(),
});

export const ferrySchedules = pgTable("ferry_schedules", {
  id: serial("id").primaryKey(),
  operatorName: text("operator_name").notNull(),
  fromLocation: text("from_location").notNull(),
  toLocation: text("to_location").notNull(),
  departureTime: text("departure_time").notNull(),
  arrivalTime: text("arrival_time").notNull(),
  duration: text("duration").notNull(),
  price: doublePrecision("price").notNull().default(0),
  vesselType: text("vessel_type").notNull(),
  capacity: integer("capacity").notNull().default(0),
  availableSeats: integer("available_seats").notNull().default(0),
  operatingDays: text("operating_days").array().notNull(),
  isActive: boolean("is_active").default(true).notNull(),
  bookingUrl: text("booking_url"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const domesticAirlines = pgTable("domestic_airlines", {
  id: serial("id").primaryKey(),
  airlineName: text("airline_name").notNull(),
  airlineCode: text("airline_code").notNull(),
  flightNumber: text("flight_number").notNull(),
  fromLocation: text("from_location").notNull(),
  toLocation: text("to_location").notNull(),
  departureTime: text("departure_time").notNull(),
  arrivalTime: text("arrival_time").notNull(),
  duration: text("duration").notNull(),
  aircraftType: text("aircraft_type").notNull(),
  price: doublePrecision("price").notNull().default(0),
  frequency: text("frequency").notNull(),
  operatingDays: text("operating_days").array().notNull(),
  capacity: integer("capacity").notNull().default(0),
  availableSeats: integer("available_seats").notNull().default(0),
  baggageAllowance: text("baggage_allowance"),
  isActive: boolean("is_active").default(true).notNull(),
  bookingUrl: text("booking_url"),
  contactInfo: text("contact_info"), // Storing as JSON string
  notes: text("notes"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const packages = pgTable("packages", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  description: text("description"),
  price: doublePrecision("price").notNull(),
  duration: text("duration").notNull(),
  inclusions: text("inclusions").array().notNull().default([]),
  exclusions: text("exclusions").array().notNull().default([]),
  maxGuests: integer("max_guests").notNull().default(1),
  guestHouseIds: integer("guest_house_ids").array().notNull().default([]),
  experienceIds: integer("experience_ids").array().notNull().default([]),
  images: text("images").array().notNull().default([]),
  validFrom: timestamp("valid_from"),
  validTo: timestamp("valid_to"),
  isActive: boolean("is_active").default(true).notNull(),
  featured: boolean("featured").default(false),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const bookings = pgTable("bookings", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").references(() => users.id).notNull(),
  agentId: integer("agent_id").references(() => agents.id),
  guestHouseId: integer("guest_house_id").references(() => guestHouses.id),
  packageId: integer("package_id").references(() => packages.id),
  checkIn: timestamp("check_in").notNull(),
  checkOut: timestamp("check_out").notNull(),
  numGuests: integer("num_guests").notNull(),
  status: text("status").notNull().default("pending"),
  totalPrice: doublePrecision("total_price").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const reviews = pgTable("reviews", {
  id: serial("id").primaryKey(),
  guestHouseId: integer("guest_house_id").references(() => guestHouses.id).notNull(),
  userId: integer("user_id").references(() => users.id).notNull(),
  rating: integer("rating").notNull(),
  comment: text("comment"),
  sentiment: text("sentiment"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const chatMessages = pgTable("chat_messages", {
  id: serial("id").primaryKey(),
  sessionId: text("session_id").notNull(),
  role: text("role").notNull(),
  content: text("content").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const loyaltyProgram = pgTable("loyalty_program", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").references(() => users.id).unique().notNull(),
  points: integer("points").default(0).notNull(),
  level: text("level").default("bronze").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const contentSections = pgTable("content_sections", {
  id: serial("id").primaryKey(),
  sectionKey: text("section_key").unique().notNull(),
  title: text("title").notNull(),
  content: text("content"),
  isActive: boolean("is_active").default(true).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const navigationItems = pgTable("navigation_items", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  path: text("path").notNull(),
  order: integer("order").notNull(),
  isActive: boolean("is_active").default(true).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const roomAvailability = pgTable("room_availability", {
  id: serial("id").primaryKey(),
  guestHouseId: integer("guest_house_id").references(() => guestHouses.id).notNull(),
  date: timestamp("date").notNull(),
  totalRooms: integer("total_rooms").notNull(),
  availableRooms: integer("available_rooms").notNull(),
  pricePerNight: doublePrecision("price_per_night").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const packageAvailability = pgTable("package_availability", {
  id: serial("id").primaryKey(),
  packageId: integer("package_id").references(() => packages.id).notNull(),
  date: timestamp("date").notNull(),
  totalPackages: integer("total_packages").notNull(),
  availablePackages: integer("available_packages").notNull(),
  price: doublePrecision("price").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});


export type User = InferSelectModel<typeof users>;
export type InsertUser = InferInsertModel<typeof users>;
export type Agent = InferSelectModel<typeof agents>;
export type InsertAgent = InferInsertModel<typeof agents>;
export type Atoll = InferSelectModel<typeof atolls>;
export type InsertAtoll = InferInsertModel<typeof atolls>;
export type GuestHouse = InferSelectModel<typeof guestHouses>;
export type InsertGuestHouse = InferInsertModel<typeof guestHouses>;
export type Experience = InferSelectModel<typeof experiences>;
export type InsertExperience = InferInsertModel<typeof experiences>;
export type FerrySchedule = InferSelectModel<typeof ferrySchedules>;
export type InsertFerrySchedule = InferInsertModel<typeof ferrySchedules>;
export type DomesticAirline = InferSelectModel<typeof domesticAirlines>;
export type InsertDomesticAirline = InferInsertModel<typeof domesticAirlines>;
export type Package = InferSelectModel<typeof packages>;
export type InsertPackage = InferInsertModel<typeof packages>;
export type Booking = InferSelectModel<typeof bookings>;
export type InsertBooking = InferInsertModel<typeof bookings>;
export type Review = InferSelectModel<typeof reviews>;
export type InsertReview = InferInsertModel<typeof reviews>;
export type ChatMessage = InferSelectModel<typeof chatMessages>;
export type InsertChatMessage = InferInsertModel<typeof chatMessages>;
export type LoyaltyProgram = InferSelectModel<typeof loyaltyProgram>;
export type InsertLoyaltyProgram = InferInsertModel<typeof loyaltyProgram>;
export type ContentSection = InferSelectModel<typeof contentSections>;
export type InsertContentSection = InferInsertModel<typeof contentSections>;
export type NavigationItem = InferSelectModel<typeof navigationItems>;
export type InsertNavigationItem = InferInsertModel<typeof navigationItems>;
export type RoomAvailability = InferSelectModel<typeof roomAvailability>;
export type InsertRoomAvailability = InferInsertModel<typeof roomAvailability>;
export type PackageAvailability = InferSelectModel<typeof packageAvailability>;
export type InsertPackageAvailability = InferInsertModel<typeof packageAvailability>;