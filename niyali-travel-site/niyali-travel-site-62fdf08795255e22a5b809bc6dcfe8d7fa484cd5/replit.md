# Overview

Niyali Travel is a full-stack web application for authentic Maldivian travel experiences, specializing in guest house bookings and cultural experiences. The platform features an AI-powered chatbot, domestic airlines functionality, agent commission system, real-time ferry schedules, and backend content management. Built with React, Express, and PostgreSQL, it targets travelers seeking local Maldivian experiences beyond traditional resorts.

# User Preferences

Preferred communication style: Simple, everyday language.

# System Architecture

## Frontend Architecture
- **React 18** with TypeScript for the user interface
- **Vite** as the build tool and development server
- **Tailwind CSS** with custom theming for styling
- **shadcn/ui** component library for consistent UI elements
- **Wouter** for client-side routing (lightweight React Router alternative)
- **TanStack Query** for server state management and API caching
- **WebSocket** integration for real-time features like chat

## Backend Architecture
- **Express.js** server with TypeScript
- **RESTful API** design with authentication middleware
- **WebSocket server** for real-time chat and notifications
- **JWT-based authentication** with bcrypt for password hashing
- **Session management** with connect-pg-simple
- **OpenAI integration** for AI chatbot and sentiment analysis

## Database Design
- **PostgreSQL** with Drizzle ORM for type-safe database operations
- **Neon Database** as the cloud PostgreSQL provider
- **Schema-first approach** with shared types between frontend and backend
- **Key entities**: Users, Agents, Guest Houses, Bookings, Experiences, Ferry Schedules, Reviews, Chat Messages, Loyalty Program
- **Relational design** with proper foreign keys and constraints

## Authentication & Authorization
- **Role-based access control** (traveler, agent, admin)
- **JWT tokens** for stateless authentication
- **Agent verification system** with tier-based commission rates
- **Secure password handling** with bcrypt hashing

## External Dependencies

- **@neondatabase/serverless**: Cloud PostgreSQL database connection
- **OpenAI API**: Powers the AI chatbot and sentiment analysis features
- **WebSocket (ws)**: Real-time communication for chat functionality
- **Radix UI**: Accessible component primitives for the UI
- **Google Fonts**: Custom typography (Inter, Playfair Display, Fira Code)
- **Unsplash**: Image hosting for property and destination photos

## Key Features
- **Domestic Airlines System**: Comprehensive flight booking with real-time search and filtering
- **AI Travel Assistant**: OpenAI-powered chatbot for personalized recommendations and flight queries
- **Agent Portal**: Commission tracking, booking management, and tier progression
- **Ferry Schedule Integration**: Real-time transportation information
- **Backend Content Management**: Admin dashboard for editing website content and navigation
- **Interactive Statistics**: Animated counters and smooth transitions for engagement
- **Multi-language Support**: Prepared for internationalization
- **Mobile-responsive Design**: Optimized for all device sizes
- **Real-time Notifications**: WebSocket-based live updates

## Design Specifications
- **Color Scheme**: Cream, Teal, Turquoise Blue, Sky Blue, White
  - Primary: Teal (#008080)
  - Secondary: Turquoise (#5ED0CA)
  - Accent: Sky Blue (#87CEEB)
  - Background: Cream (#FDF6E3)
  - Text/Components: White and Teal variations

## Recent Changes
- Implemented comprehensive booking engine with room and package availability management
- Added secure admin authentication system with JWT tokens for admin-only access
- Created separate admin login page at `/admin-login` for restricted access (not visible in public navigation)
- Built booking availability management interface for admins at `/admin/availability`
- Integrated booking engine with real-time availability checking at `/booking`
- Added database tables for room availability, packages, package availability, and payments
- Implemented backend API routes for managing bookings, availability, and packages
- Created admin-only middleware for protecting sensitive routes
- Enhanced storage layer with booking and availability management methods
- Prepared infrastructure for Stripe payment gateway integration (keys pending)
- Added advanced hero search bar with destination/island selection, date pickers, and guest differentiation (adults/children/infants)
- Integrated social media links in footer only (Facebook/NiyaliTravel, Instagram/NiyaliTravel, WhatsApp +9609107338, Email sales@niyalitravel.com)
- Set up object storage for image uploads with Google Cloud Storage backend
- Implemented file upload functionality with ObjectUploader component using Uppy
- Added public and private object storage routes for serving and uploading images
- Created comprehensive content management capabilities for admin dashboard
- Added Guest Houses to main navigation menu with dynamic dropdown showing real guest houses
- Removed admin link from public navigation for better security in production
- Removed social media links from main menu bar, keeping them only in footer
- Added B2B agent authentication system with separate login and registration at `/agent-login`
- Implemented agent portal authentication requirement - only accessible to verified B2B agents
- Seeded database with 10 complete guest houses with detailed information
- Added 26 Maldivian islands with guest houses to backend database for search functionality
- Created islands API endpoints (`/api/islands`) for backend search capabilities
- Implemented Interactive Maldives Island Explorer with Map View at `/island-explorer`
- Added visual map displaying all 26 islands with interactive markers and details panel
- Integrated search functionality, transport options display, and popular activities for each island
- Connected Island Explorer with guest house booking system for seamless navigation
- Updated color scheme to Cream, Teal, Turquoise Blue, Sky Blue, and White theme (January 2025)
- Applied new color palette across all UI components, buttons, navigation, and interactive elements
- Maintained accessibility with proper contrast ratios between text and backgrounds
- **Latest Updates (August 2025):**
  - Added Guest Houses dropdown menu in navigation bar showing up to 8 guest houses with "View All" option
  - Updated Hero Search Bar to fetch real islands from API instead of using static hardcoded data
  - Created admin seed script and added admin credentials (admin@niyalitravel.com / NiyaliAdmin2025!)
  - Fixed navigation and hero search component TypeScript errors
  - Integrated live islands data fetching from backend API for dynamic island selection by atoll
  - Created new Islands page at /islands with grid layout, search, and atoll filtering
  - Added Islands as separate menu item in navigation
  - Changed Hero Search Bar label from "Destination" to "Atolls" for clarity
  - Enhanced Island Explorer with improved styling and better color scheme
  - Fixed React rendering errors and SVG element issues in Island Explorer
  - Changed navigation menu from "Destinations" to "Atolls" for consistency
  - Removed VR Tour buttons from guest house cards to clean up interface
  - Made booking buttons functional by linking them to booking engine with guest house parameters
  - Added 6 new guest houses: TME Retreat, Ari Grand, The Arrival, Noomuraka Inn, Noomo Hotels, and Madi Grand Guest House
  - Added specialized packages for Madi Grand Guest House including Romantic Lagoon Escape, Explorer's Island Quest, Family Discovery, Dive & Discover, Freediver's Ocean Flow, and Ocean Harmony Experience
  - Fixed blank page issues by resolving empty Select values and adding proper Footer components
  - Simplified Guest Houses navigation by removing dropdown and making it a direct link
  - Moved Packages under Experiences menu item - both /experiences and /packages routes now show the packages page
  - Updated packages with detailed inclusions, exclusions, and pricing information from provided documents
  - Added 4 TME Retreat packages: Whale Shark Signature Experience ($2,365.50), Dive with Whale Shark ($1,762.80), Island Hopper Adventure ($1,498.00), and Romantic Escape for Two ($2,340.00)
  - Fixed React Query data fetching issues for packages and islands pages - resolved caching and stale data problems
  - Updated queryClient configuration to ensure fresh data fetching (staleTime: 0, retry: 1)
  - Fixed array handling in packages and islands pages to properly display data
  - Confirmed APIs returning correct data: 10 packages and 26 islands