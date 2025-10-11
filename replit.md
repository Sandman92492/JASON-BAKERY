# Jason Bakery PWA

## Overview

Jason Bakery is a Progressive Web App (PWA) for an iconic artisanal bakery in Cape Town, South Africa. The application showcases the bakery's menu, services, location, and contact information in a clean, minimalist black-and-white design. Built as a single-page application, it provides an elegant digital presence for customers to explore the bakery's offerings, including their legendary croissants, specialty coffee, and artisanal breads.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture

**React SPA with TypeScript**: The application is built as a single-page React application using TypeScript for type safety. The frontend uses Vite as the build tool for fast development and optimized production builds.

**Component Structure**: The UI follows a modular component architecture with reusable components organized under `/client/src/components`. Page-level components are in `/client/src/pages`, with the main Home page assembling Header, Hero, MenuSection, AboutSection, ContactSection, and Footer components.

**UI Framework**: The application uses Shadcn UI components (based on Radix UI primitives) with Tailwind CSS for styling. The design system implements a minimalist black-and-white aesthetic with high contrast, using the "New York" style variant.

**Design System**: 
- **Color Palette**: Monochromatic theme with pure black backgrounds (#000000), white text and cards (#FFFFFF), and subtle gray accents
- **Typography**: Poppins for headings, Inter for body text (imported via Google Fonts)
- **Border Radius**: Minimal 6px corners throughout
- **Spacing**: Container-based layouts with generous whitespace

**State Management**: React Query (@tanstack/react-query) is used for server state management, with a custom query client configured for API requests and caching.

**Routing**: Client-side routing implemented with Wouter, a lightweight routing solution. Currently configured with Home (/) and 404 routes.

**PWA Implementation**: 
- Service Worker with cache-first strategy for offline functionality
- Web App Manifest configured for standalone display mode
- Theme color and icons defined for native app-like experience

### Backend Architecture

**Express.js Server**: Node.js backend using Express.js framework with TypeScript. The server is configured to:
- Serve the Vite-built React application in production
- Provide HMR (Hot Module Replacement) in development via Vite middleware
- Handle API routes (prefixed with `/api`)
- Implement request/response logging

**Storage Layer**: Currently uses an in-memory storage implementation (`MemStorage` class) that implements the `IStorage` interface. This provides basic CRUD operations for users with methods like `getUser`, `getUserByUsername`, and `createUser`. The architecture is designed to be easily swapped with a database-backed implementation.

**Schema Definition**: Database schema defined using Drizzle ORM with Zod validation. Currently includes a users table with username/password fields. The schema is shared between client and server via the `/shared` directory.

**Build Process**: 
- Development: TSX for running TypeScript server files
- Production: Vite builds the frontend, esbuild bundles the backend as ESM modules

### External Dependencies

**Database (Planned)**: 
- Drizzle ORM configured for PostgreSQL dialect
- Connection via Neon Database serverless driver (@neondatabase/serverless)
- Database URL expected via environment variable `DATABASE_URL`
- Migration files output to `/migrations` directory

**UI Component Libraries**:
- Radix UI primitives for accessible, unstyled components (accordion, dialog, dropdown, select, tabs, toast, etc.)
- Shadcn UI component system built on Radix UI
- Tailwind CSS for utility-first styling with custom theme configuration

**Form Handling**:
- React Hook Form for form state management
- @hookform/resolvers for validation integration
- Drizzle-Zod for schema-to-validation conversion

**Additional Libraries**:
- date-fns for date formatting
- class-variance-authority for component variants
- cmdk for command palette functionality
- embla-carousel-react for carousel components
- Lucide React for icons
- Wouter for routing

**Development Tools**:
- Replit plugins for runtime error overlay, cartographer, and dev banner
- Vite for development server and production builds
- ESBuild for server-side bundling

**PWA Assets**:
- Service Worker for offline caching
- Web App Manifest for installability
- Google Fonts (Poppins and Inter)