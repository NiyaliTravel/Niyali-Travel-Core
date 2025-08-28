import type { Express, Request, Response as ExpressResponse } from "express"; // Import Request and Response as ExpressResponse
import { createServer, type Server } from "http";
import { WebSocketServer, WebSocket } from "ws";
import { storageWrapper as storage } from "@/services/storage/storageWrapper";
import { db } from "@/models/db";
import { sql } from "drizzle-orm";
import { analyzeSentiment } from "@/services/openai";
import {
  insertUserSchema, insertAgentSchema, insertGuestHouseSchema,
  insertBookingSchema, insertReviewSchema, insertChatMessageSchema, insertDomesticAirlineSchema,
  insertContentSectionSchema, insertNavigationItemSchema,
  insertRoomAvailabilitySchema, insertPackageSchema, insertPackageAvailabilitySchema,
  type User, type Agent, type GuestHouse, type Booking, type Experience,
  type FerrySchedule, type Review, type ChatMessage, type DomesticAirline,
  type ContentSection, type NavigationItem
} from "@shared/schema";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { ObjectStorageService, ObjectNotFoundError } from "@/services/storage/objectStorage";
import { authenticateToken, authorizeRoles } from "@/middleware/middleware";
import adminRoutes from "./adminRoutes"; // Import admin routes
import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

import { createBooking, cancelBooking, confirmBooking, checkAvailability, updateAvailability, updateRates } from '../controllers/bookings';

dotenv.config();

const supabaseUrl = process.env.SUPABASE_URL as string;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY as string;

export const supabase = createClient(supabaseUrl, supabaseKey);

export async function registerRoutes(app: Express): Promise<Server> {
  const httpServer = createServer(app);
  
  // WebSocket setup for real-time features
  const wss = new WebSocketServer({ noServer: true });

  httpServer.on('upgrade', (request, socket, head) => {
    const url = new URL(request.url || '/', `http://${request.headers.host}`);
    const token = url.searchParams.get('token');

    if (token) {
      try {
        jwt.verify(token, process.env.JWT_SECRET || "niyali-travel-secret-key"); // Use JWT_SECRET from env
        wss.handleUpgrade(request, socket, head, (ws) => {
          wss.emit('connection', ws, request, token);
        });
      } catch (error) {
        console.error('WebSocket token verification failed:', error);
        socket.write('HTTP/1.1 401 Unauthorized\r\n\r\n');
        socket.destroy();
        return;
      }
    } else {
      // Allow connections without a token for public chat
      wss.handleUpgrade(request, socket, head, (ws) => {
        wss.emit('connection', ws, request);
      });
    }
  });
  
  wss.on('connection', (ws: WebSocket, request: Request, token?: string) => {
    console.log('Client connected to WebSocket');
    if (token) {
      console.log('WebSocket connected with token:', token);
    }
    
    ws.on('message', async (message: string) => {
      try {
        const data = JSON.parse(message.toString());
        
        if (data.type === 'chat_message') {
          // Handle AI chat message
          const chatMessage = await storage.createChatMessage({
            sessionId: data.sessionId,
            userId: data.userId,
            message: data.message,
            sender: 'user',
            messageType: 'text'
          });
          
          // Send AI response (simplified)
          const aiResponse = await storage.createChatMessage({
            sessionId: data.sessionId,
            userId: data.userId,
            message: "Thank you for your message. How can I help you with your Maldivian travel plans?",
            sender: 'ai',
            messageType: 'text'
          });
          
          ws.send(JSON.stringify({ type: 'chat_response', message: aiResponse }));
        }
      } catch (error) {
        console.error('WebSocket message error:', error);
      }
    });
    
    ws.on('close', () => {
      console.log('Client disconnected from WebSocket');
    });
  });

  // Mount admin routes
  app.use('/api/admin', adminRoutes);

  // Authentication routes
  app.post('/api/auth/register', async (req, res) => {
    try {
      const { email, password, username } = req.body;

      const { data: { user }, error: authError } = await supabase.auth.signUp({
        email,
        password,
      });

      if (authError) {
        return res.status(400).json({ message: authError.message });
      }

      if (!user) {
        return res.status(500).json({ message: 'User registration failed' });
      }

      // Insert user into public.users table
      const { data: userData, error: userInsertError } = await supabase
        .from('users')
        .insert([{ id: user.id, email, username, role: 'viewer' }])
        .select();

      if (userInsertError) {
        // If user insertion fails, revert Supabase auth user
        await supabase.auth.admin.deleteUser(user.id);
        return res.status(500).json({ message: userInsertError.message });
      }
      
      res.status(201).json({ 
        user: { id: user.id, email: user.email, username: username, role: 'viewer' }, 
        message: 'Registration successful. Please check your email to verify your account.'
      });
    } catch (error) {
      res.status(400).json({ message: 'Registration failed', error: (error as Error).message });
    }
  });

  app.post('/api/auth/login', async (req, res) => {
    try {
      const { email, password } = req.body;
      
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        return res.status(401).json({ message: error.message });
      }

      const { user, session } = data;

      if (!user || !session) {
        return res.status(401).json({ message: 'Invalid credentials' });
      }

      const { data: userData, error: userError } = await supabase
        .from('users')
        .select('id, email, username, role')
        .eq('id', user.id)
        .single();

      if (userError || !userData) {
        return res.status(403).json({ message: 'User profile not found or unauthorized' });
      }
      
      res.json({ 
        user: userData, 
        token: session.access_token // Supabase provides access_token
      });
    } catch (error) {
      res.status(500).json({ message: 'Login failed', error: (error as Error).message });
    }
  });

  // Islands routes
  app.get('/api/islands', async (req, res) => {
    try {
      const { search, atoll, hasGuestHouses } = req.query;
      const islands = await storage.getAllIslands({
        search: search as string,
        atoll: atoll as string,
        hasGuestHouses: hasGuestHouses === 'true'
      });
      res.json(islands);
    } catch (error) {
      res.status(500).json({ message: 'Failed to fetch islands', error: (error as Error).message });
    }
  });

  app.get('/api/islands/:id', async (req, res) => {
    try {
      const result = await db.execute(sql`
        SELECT * FROM islands
        WHERE id = ${req.params.id} AND is_active = true
      `);
      
      if (result.rows.length === 0) {
        return res.status(404).json({ message: 'Island not found' });
      }
      
      res.json(result.rows);
    } catch (error) {
      res.status(500).json({ message: 'Failed to fetch island', error: (error as Error).message });
    }
  });
 
  // Atolls route
  app.get('/api/atolls', async (req, res) => {
    try {
      const result = await db.execute(sql`
        SELECT DISTINCT atoll FROM islands
        WHERE atoll IS NOT NULL AND atoll != ''
        ORDER BY atoll ASC
      `);
      const atolls = result.rows.map((row: any) => row.atoll);
      res.json(atolls);
    } catch (error) {
      res.status(500).json({ message: 'Failed to fetch atolls', error: (error as Error).message });
    }
  });

  // Packages routes
  app.get('/api/packages', async (req, res) => {
    try {
      const packages = await storage.getPackages();
      res.json(packages);
    } catch (error) {
      console.error("Error fetching packages:", error);
      res.status(500).json({ message: "Failed to fetch packages" });
    }
  });

  // Guest Houses routes  
  app.get('/api/guest-houses', async (req, res) => {
    try {
      const { atoll, search, featured } = req.query;
      
      let guestHouses: GuestHouse[];
      
      if (featured === 'true') {
        guestHouses = await storage.getFeaturedGuestHouses();
      } else if (atoll) {
        guestHouses = await storage.getGuestHousesByAtoll(atoll as string);
      } else if (search) {
        guestHouses = await storage.searchGuestHouses(search as string);
      } else {
        guestHouses = await storage.getAllGuestHouses();
      }
      
      res.json(guestHouses);
    } catch (error) {
      res.status(500).json({ message: 'Failed to fetch guest houses', error: (error as Error).message });
    }
  });

  app.get('/api/guest-houses/:id', async (req, res) => {
    try {
      const guestHouse = await storage.getGuestHouse(req.params.id);
      if (!guestHouse) {
        return res.status(404).json({ message: 'Guest house not found' });
      }
      res.json(guestHouse);
    } catch (error) {
      res.status(500).json({ message: 'Failed to fetch guest house', error: (error as Error).message });
    }
  });

  // Experiences routes
  app.get('/api/experiences', async (req, res) => {
    try {
      const { category, featured } = req.query;
      
      let experiences: Experience[];
      
      if (featured === 'true') {
        experiences = await storage.getFeaturedExperiences();
      } else if (category) {
        experiences = await storage.getExperiencesByCategory(category as string);
      } else {
        experiences = await storage.getAllExperiences();
      }
      
      res.json(experiences);
    } catch (error) {
      res.status(500).json({ message: 'Failed to fetch experiences', error: (error as Error).message });
    }
  });

  // Ferry Schedules routes
  app.get('/api/ferry-schedules', async (req, res) => {
    try {
      const { from, to, date } = req.query;
      
      let schedules: FerrySchedule[];
      
      if (from && to) {
        schedules = await storage.searchFerrySchedules(
          from as string, 
          to as string, 
          date as string
        );
      } else {
        schedules = await storage.getAllFerrySchedules();
      }
      
      res.json(schedules);
    } catch (error) {
      res.status(500).json({ message: 'Failed to fetch ferry schedules', error: (error as Error).message });
    }
  });

  // Domestic Airlines routes
  app.get('/api/domestic-airlines', async (req, res) => {
    try {
      const { from, to, date, aircraftType } = req.query;
      
      let airlines: DomesticAirline[];
      
      if (from && to) {
        airlines = await storage.searchDomesticAirlines(
          from as string, 
          to as string, 
          date as string
        );
      } else if (aircraftType) {
        airlines = await storage.getDomesticAirlinesByType(aircraftType as string);
      } else {
        airlines = await storage.getAllDomesticAirlines();
      }
      
      res.json(airlines);
    } catch (error) {
      res.status(500).json({ message: 'Failed to fetch domestic airlines', error: (error as Error).message });
    }
  });

  app.get('/api/domestic-airlines/:id', async (req, res) => {
    try {
      const airline = await storage.getDomesticAirline(req.params.id);
      if (!airline) {
        return res.status(404).json({ message: 'Airline not found' });
      }
      res.json(airline);
    } catch (error) {
      res.status(500).json({ message: 'Failed to fetch airline', error: (error as Error).message });
    }
  });

  // Bookings routes
  app.post('/api/bookings/create', authenticateToken, createBooking);
  app.post('/api/bookings/cancel', authenticateToken, cancelBooking);
  app.post('/api/bookings/confirm', authenticateToken, authorizeRoles(['admin', 'editor']), confirmBooking);

  app.get('/api/bookings/check', checkAvailability);
  app.patch('/api/availability/update', authenticateToken, authorizeRoles(['admin', 'editor']), updateAvailability);

  app.post('/api/guesthouses/rates', authenticateToken, authorizeRoles(['admin', 'editor']), updateRates);

  app.get('/api/bookings/user', authenticateToken, async (req, res) => {
    try {
      const bookings = await storage.getBookingsByUser(req.user!.id);
      res.json(bookings);
    } catch (error) {
      res.status(500).json({ message: 'Failed to fetch bookings', error: (error as Error).message });
    }
  });

  // Agent B2B Authentication routes
  app.post('/api/agents/register', async (req, res) => {
    try {
      const { email, password, firstName, lastName, phone, companyName, whatsappNumber, bio } = req.body;
      
      // Check if user already exists
      const existingUser = await storage.getUserByEmail(email);
      if (existingUser) {
        return res.status(400).json({ message: 'Email already registered' });
      }
      
      // Hash password
      const hashedPassword = await bcrypt.hash(password, 10);
      
      // Create user with agent role
      const user = await storage.createUser({
        username: email,
        email,
        password: hashedPassword,
        firstName,
        lastName,
        phone,
        role: 'agent',
        isVerified: false
      });
      
      // Create agent profile
      const agent = await storage.createAgent({
        userId: user.id,
        companyName,
        bio,
        whatsappNumber,
        verificationStatus: 'pending'
      });
      
      res.status(201).json({ message: 'Registration submitted for review', agent });
    } catch (error) {
      res.status(400).json({ message: 'Failed to register agent', error: (error as Error).message });
    }
  });

  app.post('/api/agents/login', async (req, res) => {
    try {
      const { email, password } = req.body;
      
      const user = await storage.getUserByEmail(email);
      if (!user || user.role !== 'agent') {
        return res.status(401).json({ message: 'Invalid credentials or not an agent account' });
      }
      
      const validPassword = await bcrypt.compare(password, user.password);
      if (!validPassword) {
        return res.status(401).json({ message: 'Invalid credentials' });
      }
      
      // Check if agent is verified
      const agent = await storage.getAgentByUserId(user.id);
      if (!agent || agent.verificationStatus !== 'verified') {
        return res.status(401).json({ message: 'Agent account pending verification' });
      }
      
      const token = jwt.sign(
        { id: user.id, email: user.email, role: user.role },
        process.env.JWT_SECRET || 'your-secret-key',
        { expiresIn: '7d' }
      );
      
      res.json({ token, agent, user: { id: user.id, email: user.email, firstName: user.firstName, lastName: user.lastName } });
    } catch (error) {
      res.status(500).json({ message: 'Login failed', error: (error as Error).message });
    }
  });

  // Agent routes
  app.post('/api/agents', authenticateToken, authorizeRoles(['admin', 'editor', 'agent']), async (req, res) => {
    try {
      const agentData = insertAgentSchema.parse(req.body);
      const agent = await storage.createAgent({
        ...agentData,
        userId: req.user!.id
      });
      res.status(201).json(agent);
    } catch (error) {
      res.status(400).json({ message: 'Failed to create agent profile', error: (error as Error).message });
    }
  });

  app.get('/api/agents', async (req, res) => {
    try {
      const agents = await storage.getAllAgents();
      res.json(agents);
    } catch (error) {
      res.status(500).json({ message: 'Failed to fetch agents', error: (error as Error).message });
    }
  });

  app.get('/api/agents/profile', authenticateToken, async (req, res) => {
    try {
      const agent = await storage.getAgentByUserId(req.user!.id);
      if (!agent) {
        return res.status(404).json({ message: 'Agent profile not found' });
      }
      res.json(agent);
    } catch (error) {
      res.status(500).json({ message: 'Failed to fetch agent profile', error: (error as Error).message });
    }
  });

  // Reviews routes
  app.post('/api/reviews', authenticateToken, authorizeRoles(['admin', 'editor', 'viewer', 'agent']), async (req, res) => {
    try {
      const reviewData = insertReviewSchema.parse(req.body);
      
      // Analyze sentiment of the review
      const sentiment = await analyzeSentiment(reviewData.comment || '');
      
      const review = await storage.createReview({
        ...reviewData,
        userId: req.user!.id
      });
      
      res.status(201).json({ ...review, sentiment });
    } catch (error) {
      res.status(400).json({ message: 'Failed to create review', error: (error as Error).message });
    }
  });

  app.get('/api/reviews/guest-house/:id', async (req, res) => {
    try {
      const reviews = await storage.getReviewsByGuestHouse(req.params.id);
      res.json(reviews);
    } catch (error) {
      res.status(500).json({ message: 'Failed to fetch reviews', error: (error as Error).message });
    }
  });

  app.post('/api/chat', async (req, res) => {
    try {
      const messageData = insertChatMessageSchema.parse(req.body);
      const message = await storage.createChatMessage(messageData);
      res.status(201).json(message);
    } catch (error) {
      res.status(400).json({ message: 'Failed to send message', error: (error as Error).message });
    }
  });

  // Check availability endpoint
  app.post('/api/availability/check', async (req, res) => {
    try {
      const { guestHouseId, checkIn, checkOut } = req.body;
      
      const isAvailable = await storage.getBookingAvailability(
        guestHouseId,
        new Date(checkIn),
        new Date(checkOut)
      );
      
      if (!isAvailable) {
        return res.status(400).json({ message: 'Guest house not available for selected dates' });
      }
      
      res.json({ available: isAvailable });
    } catch (error) {
      res.status(500).json({ message: 'Failed to check availability', error: (error as Error).message });
    }
  });

  // Content Management routes for backend editing
  app.get('/api/content', async (req, res) => {
    try {
      const sections = await storage.getAllContentSections();
      res.json(sections);
    } catch (error) {
      res.status(500).json({ message: 'Failed to fetch content sections', error: (error as Error).message });
    }
  });

  app.get('/api/content/:sectionKey', async (req, res) => {
    try {
      const section = await storage.getContentSection(req.params.sectionKey);
      if (!section) {
        return res.status(404).json({ message: 'Content section not found' });
      }
      res.json(section);
    } catch (error) {
      res.status(500).json({ message: 'Failed to fetch content section', error: (error as Error).message });
    }
  });

  app.post('/api/content', authenticateToken, authorizeRoles(['admin', 'editor']), async (req, res) => {
    try {
      const contentData = insertContentSectionSchema.parse(req.body);
      const section = await storage.createContentSection({
        ...contentData,
        lastEditedBy: req.user!.id
      });
      res.status(201).json(section);
    } catch (error) {
      res.status(400).json({ message: 'Failed to create content section', error: (error as Error).message });
    }
  });

  app.put('/api/content/:id', authenticateToken, authorizeRoles(['admin', 'editor']), async (req, res) => {
    try {
      const contentData = insertContentSectionSchema.partial().parse(req.body);
      const section = await storage.updateContentSection(req.params.id, {
        ...contentData,
        lastEditedBy: req.user!.id
      });
      if (!section) {
        return res.status(404).json({ message: 'Content section not found' });
      }
      res.json(section);
    } catch (error) {
      res.status(400).json({ message: 'Failed to update content section', error: (error as Error).message });
    }
  });

  app.delete('/api/navigation/:id', authenticateToken, authorizeRoles(['admin']), async (req, res) => {
    try {
      const deleted = await storage.deleteNavigationItem(req.params.id);
      if (!deleted) {
        return res.status(404).json({ message: 'Navigation item not found' });
      }
      res.json({ message: 'Navigation item deleted successfully' });
    } catch (error) {
      res.status(500).json({ message: 'Failed to delete navigation item', error: (error as Error).message });
    }
  });

  // Admin authentication routes
  app.post('/api/admin/login', async (req, res) => {
    try {
      const { email, password } = req.body;
      
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        return res.status(401).json({ message: error.message });
      }

      const { user, session } = data;

      if (!user || !session) {
        return res.status(401).json({ message: 'Invalid credentials' });
      }

      const { data: userData, error: userError } = await supabase
        .from('users')
        .select('id, email, username, role')
        .eq('id', user.id)
        .single();

      if (userError || !userData || !['admin', 'editor'].includes(userData.role)) {
        return res.status(403).json({ message: 'Unauthorized: Admin or Editor access required' });
      }
      
      res.json({ 
        user: userData, 
        token: session.access_token 
      });
    } catch (error) {
      res.status(500).json({ message: 'Login failed', error: (error as Error).message });
    }
  });

  // Room availability routes
  app.get('/api/room-availability', async (req, res) => {
    try {
      const { guestHouseId, date } = req.query;
      const availability = await storage.getRoomAvailability(
        guestHouseId as string,
        date ? new Date(date as string) : undefined
      );
      res.json(availability);
    } catch (error) {
      res.status(500).json({ message: 'Failed to fetch availability', error: (error as Error).message });
    }
  });

  app.post('/api/room-availability', authenticateToken, authorizeRoles(['admin', 'editor']), async (req, res) => {
    try {
      const availabilityData = insertRoomAvailabilitySchema.parse(req.body);
      const availability = await storage.createRoomAvailability(availabilityData);
      res.status(201).json(availability);
    } catch (error) {
      res.status(400).json({ message: 'Failed to create availability', error: (error as Error).message });
    }
  });

  app.put('/api/room-availability/:id', authenticateToken, authorizeRoles(['admin', 'editor']), async (req, res) => {
    try {
      const availabilityData = insertRoomAvailabilitySchema.partial().parse(req.body);
      const availability = await storage.updateRoomAvailability(req.params.id, availabilityData);
      res.json(availability);
    } catch (error) {
      res.status(400).json({ message: 'Failed to update availability', error: (error as Error).message });
    }
  });

  // Package routes (removed duplicate - using the one at line 196)

  app.post('/api/packages', authenticateToken, authorizeRoles(['admin', 'editor']), async (req, res) => {
    try {
      const packageData = insertPackageSchema.parse(req.body);
      const pkg = await storage.createPackage(packageData);
      res.status(201).json(pkg);
    } catch (error) {
      res.status(400).json({ message: 'Failed to create package', error: (error as Error).message });
    }
  });

  app.put('/api/packages/:id', authenticateToken, authorizeRoles(['admin', 'editor']), async (req, res) => {
    try {
      const packageData = insertPackageAvailabilitySchema.partial().parse(req.body);
      const pkg = await storage.updatePackage(req.params.id, packageData);
      res.json(pkg);
    } catch (error) {
      res.status(400).json({ message: 'Failed to update package', error: (error as Error).message });
    }
  });

  // Package availability routes
  app.get('/api/package-availability', async (req, res) => {
    try {
      const { packageId, date } = req.query;
      const availability = await storage.getPackageAvailability(
        packageId as string,
        date ? new Date(date as string) : undefined
      );
      res.json(availability);
    } catch (error) {
      res.status(500).json({ message: 'Failed to fetch package availability', error: (error as Error).message });
    }
  });

  app.post('/api/package-availability', authenticateToken, authorizeRoles(['admin', 'editor']), async (req, res) => {
    try {
      const availabilityData = insertPackageAvailabilitySchema.parse(req.body);
      const availability = await storage.createPackageAvailability(availabilityData);
      res.status(201).json(availability);
    } catch (error) {
      res.status(400).json({ message: 'Failed to create package availability', error: (error as Error).message });
    }
  });

  // Enhanced booking routes with availability check
  app.post('/api/bookings', authenticateToken, createBooking);
  app.put('/api/bookings/:id/cancel', authenticateToken, cancelBooking);
  app.put('/api/bookings/:id/confirm', authenticateToken, authorizeRoles(['admin', 'editor']), confirmBooking);

  app.get('/api/availability/check', checkAvailability);
  app.post('/api/availability/update', authenticateToken, authorizeRoles(['admin', 'editor']), updateAvailability);

  app.post('/api/guesthouses/rates', authenticateToken, authorizeRoles(['admin', 'editor']), updateRates);

  app.get('/api/bookings', authenticateToken, async (req, res) => {
    try {
      const bookings = await storage.getUserBookings(req.user!.id);
      res.json(bookings);
    } catch (error) {
      res.status(500).json({ message: 'Failed to fetch bookings', error: (error as Error).message });
    }
  });

  app.put('/api/bookings/:id/status', authenticateToken, authorizeRoles(['admin', 'editor']), async (req, res) => {
    try {
      const { status } = req.body;
      const booking = await storage.updateBookingStatus(req.params.id, status);
      res.json(booking);
    } catch (error) {
      res.status(400).json({ message: 'Failed to update booking status', error: (error as Error).message });
    }
  });

  // Object Storage routes for image uploads
  app.get("/public-objects/:filePath(*)", async (req, res) => {
    const filePath = req.params.filePath;
    const objectStorageService = new ObjectStorageService();
    try {
      const file = await objectStorageService.searchPublicObject(filePath);
      if (!file) {
        return res.status(404).json({ error: "File not found" });
      }
      objectStorageService.downloadObject(file, res as ExpressResponse);
    } catch (error) {
      console.error("Error searching for public object:", error);
      return res.status(500).json({ error: "Internal server error" });
    }
  });

  app.get("/objects/:objectPath(*)", async (req, res) => {
    const objectStorageService = new ObjectStorageService();
    try {
      const objectFile = await objectStorageService.getObjectEntityFile(
        req.path,
      );
      objectStorageService.downloadObject(objectFile, res as ExpressResponse);
    } catch (error) {
      console.error("Error accessing object:", error);
      if (error instanceof ObjectNotFoundError) {
        return res.sendStatus(404);
      }
      return res.sendStatus(500);
    }
  });

  app.post("/api/objects/upload", async (req, res) => {
    const objectStorageService = new ObjectStorageService();
    try {
      const uploadURL = await objectStorageService.getObjectEntityUploadURL();
      res.json({ uploadURL });
    } catch (error) {
      console.error("Error getting upload URL:", error);
      res.status(500).json({ error: "Failed to get upload URL" });
    }
  });

  app.put("/api/content-images", authenticateToken, authorizeRoles(['admin', 'editor']), async (req, res) => {
    if (!req.body.imageURL) {
      return res.status(400).json({ error: "imageURL is required" });
    }

    try {
      const objectStorageService = new ObjectStorageService();
      const objectPath = objectStorageService.normalizeObjectEntityPath(
        req.body.imageURL,
      );

      // Store the image path in database if needed
      // For now, just return the normalized path
      res.status(200).json({
        objectPath: objectPath
      });
    } catch (error) {
      console.error("Error setting content image:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  });

  return httpServer;
}
