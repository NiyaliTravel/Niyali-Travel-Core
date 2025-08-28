// User and Authentication Types
export interface User {
  id: string;
  username: string;
  email: string;
  firstName?: string;
  lastName?: string;
  phone?: string;
  country?: string;
  profileImage?: string;
  role: 'traveler' | 'agent' | 'admin';
  isVerified: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface Agent {
  id: string;
  userId: string;
  companyName?: string;
  bio?: string;
  languagesSpoken: string[];
  preferredAtolls: string[];
  tier: 'bronze' | 'silver' | 'gold' | 'platinum';
  commissionRate: string;
  totalEarnings: string;
  isActive: boolean;
  whatsappNumber?: string;
  verificationStatus: 'pending' | 'verified' | 'rejected';
}

// Guest House Types
export interface GuestHouse {
  id: string;
  name: string;
  description?: string;
  atoll: string;
  island: string;
  location?: {
    lat: number;
    lng: number;
    address: string;
  };
  images: string[];
  vrTourUrl?: string;
  amenities: string[];
  roomTypes: RoomType[];
  pricePerNight: string;
  maxGuests: number;
  rating: string;
  reviewCount: number;
  isActive: boolean;
  featured: boolean;
  contactInfo?: ContactInfo;
  policies?: GuestHousePolicy;
  createdAt: Date;
  updatedAt: Date;
}

export interface RoomType {
  id: string;
  name: string;
  description?: string;
  capacity: number;
  pricePerNight: string;
  amenities: string[];
  images: string[];
  available: boolean;
}

export interface ContactInfo {
  phone?: string;
  email?: string;
  whatsapp?: string;
  website?: string;
}

export interface GuestHousePolicy {
  checkIn: string;
  checkOut: string;
  cancellation: string;
  children: string;
  pets: boolean;
  smoking: boolean;
}

// Booking Types
export interface Booking {
  id: string;
  userId: string;
  guestHouseId: string;
  agentId?: string;
  checkIn: Date;
  checkOut: Date;
  guests: number;
  roomType?: string;
  totalAmount: string;
  agentCommission?: string;
  status: 'pending' | 'confirmed' | 'cancelled' | 'completed';
  paymentStatus: 'pending' | 'paid' | 'refunded';
  paymentMethod?: string;
  specialRequests?: string;
  guestDetails?: GuestDetails;
  createdAt: Date;
  updatedAt: Date;
}

export interface GuestDetails {
  primaryGuest: {
    name: string;
    email: string;
    phone: string;
  };
  additionalGuests: {
    name: string;
    age?: number;
  }[];
  dietaryRequirements?: string[];
  accessibility?: string[];
}

// Experience Types
export interface Experience {
  id: string;
  name: string;
  description?: string;
  category: 'freediving' | 'cultural' | 'adventure' | 'culinary';
  location?: string;
  duration?: string;
  price: string;
  maxParticipants: number;
  images: string[];
  vrPreviewUrl?: string;
  difficulty: 'easy' | 'moderate' | 'challenging';
  includedItems: string[];
  requirements: string[];
  isActive: boolean;
  featured: boolean;
  rating: string;
  reviewCount: number;
}

// Ferry Schedule Types
export interface FerrySchedule {
  id: string;
  operatorName: string;
  fromLocation: string;
  toLocation: string;
  departureTime: string;
  arrivalTime: string;
  duration?: string;
  price: string;
  vesselType: 'speedboat' | 'seaplane' | 'ferry';
  capacity?: number;
  availableSeats?: number;
  operatingDays: string[];
  isActive: boolean;
  bookingUrl?: string;
}

// Review Types
export interface Review {
  id: string;
  userId: string;
  bookingId?: string;
  guestHouseId?: string;
  experienceId?: string;
  rating: number;
  title?: string;
  comment?: string;
  images?: string[];
  isVerified: boolean;
  helpfulCount: number;
  createdAt: Date;
}

// Chat Types
export interface ChatMessage {
  id: string;
  sessionId: string;
  userId?: string;
  message: string;
  sender: 'user' | 'ai' | 'agent';
  messageType: 'text' | 'image' | 'booking' | 'vr_link';
  metadata?: any;
  createdAt: Date;
}

export interface ChatSession {
  id: string;
  userId?: string;
  agentId?: string;
  status: 'active' | 'closed';
  lastMessageAt: Date;
  createdAt: Date;
}

// Loyalty Program Types
export interface LoyaltyProgram {
  id: string;
  userId: string;
  points: number;
  tier: 'explorer' | 'adventurer' | 'navigator' | 'captain';
  totalSpent: string;
  blockchainAddress?: string;
  nftCollections?: NFTCollection[];
  redemptionHistory: Redemption[];
  updatedAt: Date;
}

export interface NFTCollection {
  id: string;
  name: string;
  description: string;
  imageUrl: string;
  contractAddress: string;
  tokenId: string;
  earnedAt: Date;
}

export interface Redemption {
  id: string;
  type: 'discount' | 'free_service' | 'upgrade' | 'nft';
  value: string;
  description: string;
  pointsCost: number;
  redeemedAt: Date;
  usedAt?: Date;
}

// Search and Filter Types
export interface SearchFilters {
  atoll?: string;
  priceRange?: {
    min: number;
    max: number;
  };
  guests?: number;
  amenities?: string[];
  checkIn?: Date;
  checkOut?: Date;
  rating?: number;
  featured?: boolean;
}

export interface SearchResults<T> {
  items: T[];
  total: number;
  page: number;
  limit: number;
  hasMore: boolean;
}

// API Response Types
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

export interface PaginatedResponse<T> {
  items: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    hasMore: boolean;
  };
}

// WebSocket Types
export interface WebSocketMessage {
  type: string;
  sessionId?: string;
  userId?: string;
  data?: any;
  timestamp?: Date;
}

// VR Viewer Types
export interface VRViewerSettings {
  autoRotate: boolean;
  rotationSpeed: number;
  zoomLevel: number;
  position: {
    x: number;
    y: number;
  };
}

// Navigation Types
export interface NavItem {
  href: string;
  label: string;
  testId?: string;
  children?: NavItem[];
}

// Form Types
export interface FormField {
  name: string;
  label: string;
  type: 'text' | 'email' | 'password' | 'number' | 'date' | 'select' | 'textarea' | 'checkbox';
  required?: boolean;
  placeholder?: string;
  options?: { value: string; label: string; }[];
  validation?: {
    min?: number;
    max?: number;
    pattern?: string;
    message?: string;
  };
}

// Analytics Types
export interface AnalyticsEvent {
  event: string;
  category: string;
  action: string;
  label?: string;
  value?: number;
  userId?: string;
  sessionId?: string;
  timestamp: Date;
  properties?: Record<string, any>;
}

// Error Types
export interface ApiError {
  code: string;
  message: string;
  details?: any;
  timestamp: Date;
}

// Location Types
export interface AtollInfo {
  name: string;
  description: string;
  guestHouseCount: number;
  islandCount: number;
  popularActivities: string[];
  image: string;
  coordinates: {
    lat: number;
    lng: number;
  };
}

// Payment Types
export interface PaymentDetails {
  method: 'card' | 'bank_transfer' | 'crypto' | 'paypal';
  amount: string;
  currency: string;
  transactionId?: string;
  status: 'pending' | 'processing' | 'completed' | 'failed' | 'refunded';
  processedAt?: Date;
}

// Notification Types
export interface Notification {
  id: string;
  userId: string;
  type: 'booking' | 'payment' | 'message' | 'system';
  title: string;
  message: string;
  isRead: boolean;
  actionUrl?: string;
  createdAt: Date;
}

export default {};
