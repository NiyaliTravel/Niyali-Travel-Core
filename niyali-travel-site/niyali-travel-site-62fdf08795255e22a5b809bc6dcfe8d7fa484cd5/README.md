# NiyaliTravel - Maldives Travel Platform

A comprehensive travel platform for exploring the Maldives, featuring destination guides, resort bookings, experience planning, and a complete referral program system.

## 🌴 Live Demo

Visit the live site: [https://niyalitravel.github.io/niyali-travel-site/](https://niyalitravel.github.io/niyali-travel-site/)

## 🚀 Features

### Core Platform Features
- **Destination Explorer**: Browse Maldivian atolls and islands
- **Resort Finder**: Search and book luxury resorts
- **Experience Planner**: Discover and book activities
- **Ferry Schedule**: Real-time ferry timing information
- **Travel Blog**: Expert travel tips and guides

### User Management
- **Multi-role Authentication**: Traveler, Agent, and Admin roles
- **Traveler Portal**: Personal dashboard for bookings and wishlist
- **Agent Portal**: Commission tracking and client management
- **Admin Dashboard**: Complete platform management

### Referral Program (Phase 5 - Latest Addition)
- **Referral Code Generation**: Unique codes for each user
- **Tier System**: Bronze, Silver, Gold, Platinum levels
- **Reward Tracking**: Multiple reward types (percentage, fixed, points)
- **Social Sharing**: Built-in sharing capabilities
- **Admin Management**: Complete referral oversight

## 🛠️ Technology Stack

- **Frontend**: React + TypeScript + Vite
- **Styling**: Tailwind CSS + shadcn/ui
- **Database**: Supabase (PostgreSQL)
- **Authentication**: Supabase Auth
- **Deployment**: GitHub Pages
- **CI/CD**: GitHub Actions

## 📦 Installation

### Prerequisites
- Node.js 18+ 
- pnpm (or npm/yarn)
- Supabase account

### Local Development Setup

1. **Clone the repository**
```bash
git clone https://github.com/NiyaliTravel/niyali-travel-site.git
cd niyali-travel-site
```

2. **Install dependencies**
```bash
pnpm install
# or
npm install
```

3. **Set up environment variables**
Create a `.env` file in the root directory:
```env
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

4. **Set up Supabase database**
```bash
# Push database migrations
supabase db push

# Or run migrations manually in Supabase dashboard
```

5. **Run development server**
```bash
pnpm dev
# or
npm run dev
```

Visit `http://localhost:5173`

## 🚀 Deployment

### GitHub Pages Deployment (Automatic)

The site automatically deploys to GitHub Pages when you push to the `main` branch.

### Manual Deployment Setup

1. **Enable GitHub Pages**
   - Go to Settings → Pages
   - Source: Deploy from a branch
   - Branch: gh-pages (will be created automatically)

2. **Add GitHub Secrets**
   - Go to Settings → Secrets and variables → Actions
   - Add the following secrets:
     - `VITE_SUPABASE_URL`: Your Supabase project URL
     - `VITE_SUPABASE_ANON_KEY`: Your Supabase anon key

3. **Push to main branch**
   ```bash
   git add .
   git commit -m "Deploy website"
   git push origin main
   ```

4. **Check deployment**
   - Go to Actions tab to monitor build
   - Once complete, visit your GitHub Pages URL

## 📁 Project Structure

```
niyali-travel-site/
├── src/
│   ├── components/     # Reusable UI components
│   ├── pages/          # Page components
│   ├── services/       # API services
│   ├── contexts/       # React contexts
│   ├── types/          # TypeScript types
│   └── lib/           # Utilities
├── supabase/
│   └── migrations/    # Database migrations
├── docs/              # Documentation
├── public/            # Static assets
└── .github/
    └── workflows/     # CI/CD pipelines
```

## 🔑 Key Features Implementation

### Referral Program System
- Database schema with 5 tables
- Referral service for code generation and validation
- User dashboard for tracking referrals
- Admin panel for management
- Integration with registration flow
- Comprehensive reward calculation

### Authentication System
- Role-based access control
- Protected routes
- Session management
- Social login support (configurable)

### Booking System
- Real-time availability
- Payment integration ready
- Commission tracking for agents
- Automated confirmation emails

## 📊 Database Schema

Key tables include:
- `travelers` - User profiles
- `agents` - Agent accounts
- `bookings` - Booking records
- `referral_codes` - Referral program codes
- `referral_rewards` - Reward tracking
- `destinations` - Location data
- `experiences` - Activity listings
- `resorts` - Resort information

## 🧪 Testing

```bash
# Run tests
pnpm test

# Run tests with coverage
pnpm test:coverage
```

## 📝 Documentation

- [Implementation Phases](docs/implementation-phases.md)
- [Referral Program Guide](docs/referral-program-implementation.md)
- [UI/UX Specifications](docs/ui-ux-design-specifications.md)
- [API Integration Plan](docs/api-integrations-plan.md)

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is proprietary software for NiyaliTravel.

## 🆘 Support

For support, email support@niyalitravel.com or open an issue in the repository.

## 🙏 Acknowledgments

- Maldives Tourism Board
- Supabase Team
- shadcn/ui Components
- React Community

---

**Built with ❤️ for travelers exploring the Maldives**
