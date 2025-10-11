# Architecture Documentation

This document provides a detailed overview of the Jason Bakery PWA architecture, design decisions, and technical patterns.

## Table of Contents

1. [High-Level Overview](#high-level-overview)
2. [Project Structure](#project-structure)
3. [Tech Stack Decisions](#tech-stack-decisions)
4. [Data Flow](#data-flow)
5. [Storage Architecture](#storage-architecture)
6. [Vite Integration](#vite-integration)
7. [PWA Implementation](#pwa-implementation)
8. [Type Safety](#type-safety)
9. [Future Considerations](#future-considerations)

---

## High-Level Overview

The application is a monorepo full-stack TypeScript application with three main components:

```
┌─────────────────────────────────────────────────────┐
│                   Client (React)                     │
│  ┌──────────┐  ┌──────────┐  ┌─────────────────┐  │
│  │  Pages   │  │Components│  │  Hooks & Utils  │  │
│  └──────────┘  └──────────┘  └─────────────────┘  │
└────────────────────┬────────────────────────────────┘
                     │ HTTP/REST
┌────────────────────▼────────────────────────────────┐
│               Server (Express)                       │
│  ┌──────────┐  ┌──────────┐  ┌─────────────────┐  │
│  │  Routes  │  │Middleware│  │  Storage Layer  │  │
│  └──────────┘  └──────────┘  └─────────────────┘  │
└────────────────────┬────────────────────────────────┘
                     │
┌────────────────────▼────────────────────────────────┐
│             Shared (Types/Schemas)                   │
│  ┌──────────────────────────────────────────────┐  │
│  │  Drizzle Schema + Zod Validators             │  │
│  └──────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────┘
```

---

## Project Structure

### Directory Layout

```
jasonbakerypwa/
├── client/                 # Frontend React application
│   ├── src/
│   │   ├── components/    # React components
│   │   │   ├── ui/       # shadcn/ui primitives
│   │   │   ├── Header.tsx
│   │   │   ├── Hero.tsx
│   │   │   ├── MenuSection.tsx
│   │   │   ├── AboutSection.tsx
│   │   │   ├── ContactSection.tsx
│   │   │   └── Footer.tsx
│   │   ├── hooks/        # Custom React hooks
│   │   │   ├── use-analytics.ts
│   │   │   ├── use-auth.ts
│   │   │   └── use-toast.ts
│   │   ├── lib/          # Utilities
│   │   │   ├── queryClient.ts
│   │   │   └── utils.ts
│   │   ├── pages/        # Page-level components
│   │   │   ├── Home.tsx
│   │   │   ├── Analytics.tsx
│   │   │   └── not-found.tsx
│   │   ├── App.tsx       # Root component
│   │   ├── main.tsx      # Entry point
│   │   └── index.css     # Global styles
│   └── index.html        # HTML template
├── server/                # Backend Express application
│   ├── index.ts          # Server bootstrap
│   ├── routes.ts         # Route definitions
│   ├── storage.ts        # Storage abstraction
│   └── vite.ts           # Vite dev/prod integration
├── shared/                # Shared code
│   └── schema.ts         # Database models + validators
├── public/               # Static assets (served in production)
├── docs/                 # Documentation
│   ├── api.md           # API endpoints
│   └── architecture.md  # This file
└── dist/                 # Build output (gitignored)
```

### Path Aliases

- `@/*` → `client/src/*` (client-side imports)
- `@shared/*` → `shared/*` (shared imports for both client and server)

---

## Tech Stack Decisions

### Why React?

- **Component-based architecture**: Modular, reusable UI components
- **Rich ecosystem**: Large library of packages and tools
- **Type safety**: Excellent TypeScript support
- **Modern hooks API**: Cleaner state management

### Why Wouter Instead of React Router?

- **Lightweight**: ~1KB vs React Router's ~10KB
- **Simple API**: Less boilerplate for basic routing needs
- **Hook-based**: Modern API similar to React Router v6
- **Sufficient**: No advanced routing features needed for this app

### Why shadcn/ui?

- **Customizable**: Copy components into project (not a dependency)
- **Accessible**: Built on Radix UI primitives
- **Tailwind-based**: Integrates seamlessly with utility CSS
- **Type-safe**: Full TypeScript support

### Why TanStack Query?

- **Server state management**: Handles caching, refetching, and synchronization
- **Automatic background updates**: Keeps data fresh
- **DevTools**: Great debugging experience
- **TypeScript**: First-class type inference

### Why Express?

- **Mature**: Battle-tested web framework
- **Flexible**: Minimal opinions, easy to customize
- **Middleware ecosystem**: Rich plugin ecosystem
- **Simple**: Straightforward REST API development

### Why Drizzle ORM?

- **Type-safe**: Inferred types from schema
- **Lightweight**: Smaller bundle than Prisma
- **SQL-like**: Close to raw SQL, less abstraction
- **Schema as code**: TypeScript-first schema definition

### Why In-Memory Storage (Default)?

- **Simplicity**: No database setup required for development
- **Fast iteration**: Instant startup, no migrations
- **Testing**: Easy to reset state
- **Swappable**: Interface-based design allows easy switch to PostgreSQL

---

## Data Flow

### Analytics Tracking Flow

```
┌──────────────┐
│  User visits │
│     page     │
└──────┬───────┘
       │
       ▼
┌──────────────────────────────────┐
│  useAnalytics hook (client)      │
│  - Generates sessionId           │
│  - Tracks route changes          │
└──────┬───────────────────────────┘
       │
       │ POST /api/analytics/track
       ▼
┌──────────────────────────────────┐
│  Analytics endpoint (server)     │
│  - Validates with Zod            │
│  - Passes to storage layer       │
└──────┬───────────────────────────┘
       │
       ▼
┌──────────────────────────────────┐
│  MemStorage.trackPageView()      │
│  - Stores in memory array        │
│  - Adds to sessions set          │
└──────┬───────────────────────────┘
       │
       ▼
┌──────────────────────────────────┐
│  Returns Analytics record         │
└──────────────────────────────────┘
```

### Analytics Dashboard Flow

```
┌──────────────┐
│  User visits │
│  /analytics  │
└──────┬───────┘
       │
       ▼
┌──────────────────────────────────┐
│  Login check (client)            │
│  - Prompts for password          │
└──────┬───────────────────────────┘
       │
       │ POST /api/auth/login
       ▼
┌──────────────────────────────────┐
│  Auth endpoint (server)          │
│  - Validates password            │
└──────┬───────────────────────────┘
       │
       ▼
┌──────────────────────────────────┐
│  TanStack Query fetches stats    │
│  - GET /api/analytics/daily      │
│  - GET /api/analytics/total      │
│  - GET /api/analytics/recent     │
└──────┬───────────────────────────┘
       │
       ▼
┌──────────────────────────────────┐
│  Display charts and tables       │
└──────────────────────────────────┘
```

---

## Storage Architecture

### Interface-Based Design

The storage layer uses the `IStorage` interface to abstract storage implementation:

```typescript
interface IStorage {
  trackPageView(analytics: InsertAnalytics): Promise<Analytics>;
  getDailyStats(): Promise<DailyStats[]>;
  getTotalStats(): Promise<{ totalVisitors: number; totalPageViews: number }>;
  getRecentPageViews(limit?: number): Promise<Analytics[]>;
}
```

### Current Implementation: MemStorage

The `MemStorage` class implements `IStorage` using in-memory arrays and sets:

```typescript
class MemStorage implements IStorage {
  private analytics: Analytics[];      // All page views
  private sessions: Set<string>;       // Unique session IDs
  
  // ... implementation
}
```

**Characteristics**:
- Data stored in process memory
- Lost on server restart
- Fast for development
- No database required

### Future Implementation: DbStorage

A `DbStorage` class can be added to use PostgreSQL via Drizzle:

```typescript
class DbStorage implements IStorage {
  constructor(private db: DrizzleDB) {}
  
  async trackPageView(data: InsertAnalytics): Promise<Analytics> {
    return await db.insert(analytics).values(data).returning();
  }
  
  // ... other methods
}
```

**Toggle via environment**:
```typescript
const storage = process.env.DATABASE_URL 
  ? new DbStorage(db) 
  : new MemStorage();
```

---

## Vite Integration

### Development Mode

In development (`NODE_ENV=development`), the Express server integrates Vite's development server:

```typescript
// server/vite.ts
async function setupVite(app: Express, server: Server) {
  const vite = await createViteServer({
    server: { middlewareMode: true },
    appType: 'spa',
  });
  
  app.use(vite.middlewares);  // Hot Module Replacement
}
```

**Benefits**:
- Hot Module Replacement (HMR)
- Instant feedback on code changes
- Source maps for debugging
- Fast dev server startup

### Production Mode

In production (`NODE_ENV=production`), Express serves pre-built static files:

```typescript
function serveStatic(app: Express) {
  app.use(express.static(path.join(process.cwd(), 'dist')));
  
  // Catch-all route for SPA
  app.get('*', (_req, res) => {
    res.sendFile(path.join(process.cwd(), 'dist', 'index.html'));
  });
}
```

**Build process**:
1. `vite build` → Builds client to `dist/`
2. `esbuild server/index.ts` → Bundles server to `dist/index.js`
3. `node dist/index.js` → Runs production server

---

## PWA Implementation

### Service Worker Registration

Service worker is registered in `App.tsx`:

```typescript
useEffect(() => {
  if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
      navigator.serviceWorker.register('/service-worker.js')
        .then(registration => console.log('SW registered'))
        .catch(error => console.log('SW registration failed'));
    });
  }
}, []);
```

### Progressive Enhancement Strategy

1. **App works without service worker**: Core functionality doesn't depend on PWA features
2. **Offline support**: Cached assets allow viewing previously loaded content
3. **Install prompts**: Users can install app to home screen
4. **Manifest**: Defines app metadata and icons

### Future PWA Enhancements

- Only register service worker in production (`import.meta.env.PROD`)
- Add offline fallback page
- Implement cache-first strategy for static assets
- Add push notifications (optional)

---

## Type Safety

### Shared Types Between Client and Server

The `shared/schema.ts` file defines:

1. **Drizzle schema** (database models)
2. **Zod validators** (runtime validation)
3. **TypeScript types** (compile-time safety)

```typescript
// Database schema (Drizzle)
export const analytics = pgTable("analytics", {
  id: varchar("id").primaryKey(),
  sessionId: text("session_id").notNull(),
  path: text("path").notNull(),
  // ...
});

// Zod validator (runtime)
export const insertAnalyticsSchema = createInsertSchema(analytics).pick({
  sessionId: true,
  path: true,
  // ...
});

// TypeScript types (compile-time)
export type InsertAnalytics = z.infer<typeof insertAnalyticsSchema>;
export type Analytics = typeof analytics.$inferSelect;
```

**Benefits**:
- Single source of truth for data shapes
- Compile-time type checking
- Runtime validation
- Auto-completion in IDE
- Refactoring safety

### Type Flow

```
Drizzle Schema → Zod Schema → TypeScript Types
                     ↓              ↓
                  Server         Client
                 Validation     Type Safety
```

---

## Future Considerations

### Phase 1: Database Persistence

When ready to add PostgreSQL:

1. Implement `DbStorage` class in `server/storage.ts`
2. Add database connection in `server/db.ts`
3. Create factory function to choose storage based on `DATABASE_URL`
4. Run `npm run db:push` to create tables

### Phase 2: Advanced Features

Potential enhancements:

- **Real-time analytics**: WebSocket updates for live dashboard
- **Advanced auth**: Session-based authentication with cookies
- **API rate limiting**: Prevent abuse
- **Request validation middleware**: Centralized Zod validation
- **Structured logging**: Replace `console.log` with pino or winston
- **Error tracking**: Sentry or similar service
- **Performance monitoring**: New Relic or similar

### Phase 3: Scaling

For high-traffic scenarios:

- **Horizontal scaling**: Multiple server instances behind load balancer
- **Database optimizations**: Indexes, materialized views for daily stats
- **Caching**: Redis for session storage and query caching
- **CDN**: CloudFlare or AWS CloudFront for static assets
- **Background jobs**: Aggregate analytics data asynchronously

### Phase 4: Testing & CI/CD

Quality assurance:

- **Unit tests**: Vitest for utilities and hooks
- **Integration tests**: Supertest for API endpoints
- **E2E tests**: Playwright for full user flows
- **CI pipeline**: GitHub Actions for automated testing
- **CD pipeline**: Automated deployment to production

---

## Design Patterns

### Separation of Concerns

- **Client**: UI and user interactions
- **Server**: Business logic and data access
- **Shared**: Type definitions and validation

### Dependency Injection

The `IStorage` interface allows swapping implementations without changing route code.

### Adapter Pattern

`MemStorage` and future `DbStorage` adapt different storage mechanisms to the same interface.

### Repository Pattern

The storage layer acts as a repository, abstracting data access details from the routes.

---

## Security Considerations

### Current Security Measures

- Password-protected analytics dashboard
- Input validation with Zod
- Environment variables for secrets
- HTTPS recommended for production

### Recommendations for Production

1. **Use strong passwords**: Change `ANALYTICS_PASSWORD` from default
2. **Enable HTTPS**: Use TLS/SSL certificates
3. **Add CORS headers**: Restrict cross-origin requests
4. **Implement rate limiting**: Prevent abuse
5. **Sanitize logs**: Don't log sensitive data (passwords, tokens)
6. **Add CSRF protection**: For state-changing requests
7. **Keep dependencies updated**: Regular security patches
8. **Add Content Security Policy**: Prevent XSS attacks

---

## Performance Optimizations

### Current Optimizations

- **Vite HMR**: Fast development experience
- **Code splitting**: Automatic via Vite
- **Tree shaking**: Remove unused code
- **Asset optimization**: Minification and compression
- **In-memory storage**: Fast data access (dev only)

### Future Optimizations

- **Database indexing**: Speed up queries
- **CDN for static assets**: Reduce latency
- **Image optimization**: WebP format, lazy loading
- **Service worker caching**: Faster subsequent loads
- **Bundle analysis**: Identify large dependencies

---

## Monitoring & Observability

### Current Logging

- Request logging: Method, path, status, duration
- Error logging: Stack traces in development
- Analytics tracking: Page views and sessions

### Future Monitoring

- **Application metrics**: Response times, error rates
- **Infrastructure metrics**: CPU, memory, disk usage
- **User analytics**: Detailed behavior tracking
- **Error tracking**: Centralized error reporting
- **Uptime monitoring**: Alert on downtime

---

## Deployment Considerations

### Environment Variables

Required for production:
- `NODE_ENV=production`
- `PORT=5000`
- `ANALYTICS_PASSWORD=<strong-password>`
- `DATABASE_URL=<postgres-url>` (optional)

### Build Process

```bash
npm install          # Install dependencies
npm run build        # Build frontend and backend
npm start           # Start production server
```

### Platform-Specific Notes

- **Replit**: Uses `PORT` env var, others firewalled
- **Heroku**: Set buildpacks for Node.js
- **Vercel**: Requires serverless function adapter
- **AWS/GCP/Azure**: Use Docker container or direct deployment

---

## Conclusion

This architecture prioritizes:

1. **Developer experience**: Fast dev server, type safety, modern tools
2. **Flexibility**: Swappable storage, minimal opinions
3. **Simplicity**: No unnecessary complexity
4. **Scalability**: Clear path to add features incrementally
5. **Maintainability**: Clean separation of concerns, good documentation

The design allows starting simple (in-memory storage) and growing into a production-ready application (PostgreSQL, auth, monitoring) as needs evolve.
