# AGENTS.md

## Commands
- **Dev**: `npm run dev` - Start development server with tsx
- **Build**: `npm run build` - Build frontend (Vite) and backend (esbuild)
- **Typecheck**: `npm run check` - Run TypeScript compiler checks
- **Database**: `npm run db:push` - Push Drizzle schema to PostgreSQL database
- **Production**: `npm start` - Run production build
- **No tests configured** - No test framework or scripts in package.json

## Architecture
- **Stack**: React 18 + TypeScript + Express + PostgreSQL + Drizzle ORM + Vite
- **Structure**: Monorepo with `client/`, `server/`, and `shared/` directories
- **Client**: React SPA using Wouter for routing, shadcn/ui components, TanStack Query, Framer Motion
- **Server**: Express.js with Passport authentication, WebSocket support (ws), session management
- **Database**: PostgreSQL via Neon (@neondatabase/serverless), managed by Drizzle ORM
- **Shared**: Database schema and Zod validation schemas in `shared/schema.ts`
- **PWA**: Single-page application with service worker for offline capability

## Code Style
- **Imports**: Use path aliases `@/*` for client code, `@shared/*` for shared code
- **Components**: Place UI components in `client/src/components/ui/`, page components in `client/src/components/`
- **Conventions**: ESM modules, strict TypeScript, use `cn()` utility from `@/lib/utils` for className merging
- **Design**: Black & white minimalist aesthetic per design_guidelines.md - pure black backgrounds (#000), white cards, Poppins/Inter fonts
- **Types**: Use Zod schemas for validation, Drizzle schema types for DB models
- **Error Handling**: Use zod-validation-error for user-friendly validation messages
