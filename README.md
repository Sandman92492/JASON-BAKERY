# Jason Bakery PWA

A modern Progressive Web Application (PWA) for a bakery business with integrated analytics tracking. Built with React, TypeScript, Express, and PostgreSQL.

## Overview

This is a full-stack TypeScript application featuring:
- **Frontend**: React 18 + Wouter routing + shadcn/ui components + TanStack Query
- **Backend**: Express.js REST API with session management and analytics tracking
- **Database**: PostgreSQL via Neon with Drizzle ORM
- **PWA**: Service worker for offline capability and app-like experience
- **Analytics**: Custom analytics tracking system for visitor insights

## Quick Start

### Prerequisites

- Node.js 18+ and npm
- PostgreSQL database (optional - uses in-memory storage by default)

### Installation

```bash
npm install
```

### Environment Setup

Create a `.env` file in the root directory (see `.env.example`):

```env
NODE_ENV=development
PORT=5000
ANALYTICS_PASSWORD=your-secure-password
DATABASE_URL=postgresql://... # Optional - for persistent storage
```

### Development

Start the development server with hot-reload:

```bash
npm run dev
```

The application will be available at `http://localhost:5000`

### Build

Build both frontend and backend for production:

```bash
npm run build
```

### Production

Run the production build:

```bash
npm start
```

## Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server with tsx and Vite HMR |
| `npm run build` | Build frontend (Vite) and backend (esbuild) |
| `npm start` | Run production build |
| `npm run check` | Run TypeScript compiler checks |
| `npm run db:push` | Push Drizzle schema to PostgreSQL database |

## Tech Stack

### Frontend
- **React 18**: Modern React with hooks
- **TypeScript**: Type-safe JavaScript
- **Wouter**: Lightweight routing (alternative to React Router)
- **shadcn/ui**: High-quality accessible UI components
- **TanStack Query**: Server state management
- **Framer Motion**: Animation library
- **Tailwind CSS**: Utility-first CSS framework

### Backend
- **Express.js**: Web framework for Node.js
- **TypeScript**: Type-safe server code
- **Drizzle ORM**: Type-safe database toolkit
- **Zod**: Schema validation
- **Passport.js**: Authentication middleware

### Database
- **PostgreSQL**: Primary database (via Neon serverless)
- **In-memory storage**: Fallback for development without database

### Build Tools
- **Vite**: Frontend build tool and dev server
- **esbuild**: Fast backend bundler
- **tsx**: TypeScript execution for development

## Project Structure

```
jasonbakerypwa/
├── client/                 # React frontend
│   ├── src/
│   │   ├── components/    # React components
│   │   │   └── ui/       # shadcn/ui components
│   │   ├── hooks/        # Custom React hooks
│   │   ├── lib/          # Utilities and configuration
│   │   ├── pages/        # Page components
│   │   ├── App.tsx       # Root application component
│   │   └── main.tsx      # Application entry point
│   └── index.html        # HTML template
├── server/                # Express backend
│   ├── index.ts          # Server entry point
│   ├── routes.ts         # API route definitions
│   ├── storage.ts        # Data storage abstraction
│   └── vite.ts           # Vite integration for dev/prod
├── shared/                # Shared code between client/server
│   └── schema.ts         # Database schema and Zod validators
├── public/               # Static assets
├── docs/                 # Documentation
│   ├── api.md           # API documentation
│   └── architecture.md  # Architecture overview
├── package.json
├── tsconfig.json
├── vite.config.ts
└── drizzle.config.ts
```

## Architecture

### Vite Integration

The application uses a custom Express + Vite integration:

- **Development**: Vite middleware provides HMR (Hot Module Replacement) and serves the React app
- **Production**: Express serves pre-built static files from the `dist` folder

This is handled in `server/vite.ts`:
- `setupVite()`: Configures Vite middleware for development
- `serveStatic()`: Serves static files in production

### Storage Layer

The storage layer uses an interface-based design to support multiple backends:

- **IStorage Interface**: Defines all storage operations
- **MemStorage**: In-memory storage (default, for development)
- **Future**: PostgreSQL storage via Drizzle ORM

Toggle between storage implementations via environment variables.

### Analytics Flow

1. Client hooks (`use-analytics.ts`) track page views
2. Data sent to `/api/analytics/track` endpoint
3. Server validates with Zod schemas from `shared/schema.ts`
4. Storage layer persists to memory or database
5. Analytics dashboard queries aggregated statistics

### PWA Features

- Service worker registration for offline support
- Manifest for app-like installation on mobile devices
- Cached assets for improved performance

## API Documentation

See [docs/api.md](docs/api.md) for detailed API endpoint documentation.

## Deployment

### Environment Variables

Required in production:
- `NODE_ENV=production`
- `PORT=5000` (or your desired port)
- `ANALYTICS_PASSWORD`: Secure password for analytics dashboard
- `DATABASE_URL`: PostgreSQL connection string (optional)

### Build and Deploy

1. Build the application:
   ```bash
   npm run build
   ```

2. Set environment variables

3. Start the server:
   ```bash
   npm start
   ```

### Important Notes

- The application serves both API and frontend on the same port
- Only the `PORT` environment variable is accessible (others are firewalled in some environments)
- Static assets are served from the `dist` folder in production
- Service worker is registered for PWA functionality

## PWA Installation

The application can be installed as a Progressive Web App:

1. Visit the site in a modern browser (Chrome, Edge, Safari)
2. Look for the "Install App" prompt or option in the browser menu
3. Click install to add the app to your home screen/desktop

The service worker will cache assets for offline access.

## Design Guidelines

The application follows a minimalist black & white aesthetic:
- Pure black backgrounds (#000)
- White cards and content areas
- Poppins and Inter fonts
- Clean, modern design

See [design_guidelines.md](design_guidelines.md) for detailed design specifications.

### Custom Logo

The header displays "JASON BAKERY" text by default, but you can easily add your own logo:

1. **Add your logo file** to `client/src/assets/` folder (e.g., `logo.png` or `logo.svg`)
   - Recommended: SVG for best scaling, or PNG with transparent background
   - Suggested dimensions: 200-400px wide

2. **Update Header component** in `client/src/components/Header.tsx`:
   - Uncomment line 8: `import logo from "@/assets/logo.png";`
   - Update the filename to match your logo file
   - Remove line 9: `const logo = null;`

3. **Logo will auto-display** with proper sizing, or fallback to text if not set

The logo is responsive and adjusts size automatically (h-8 sm:h-10).

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Run type checks: `npm run check`
5. Build to verify: `npm run build`
6. Submit a pull request

## License

MIT
