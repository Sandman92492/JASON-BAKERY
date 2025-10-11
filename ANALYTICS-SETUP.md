# Analytics Dashboard - Setup & Production Guide

## 🎯 What Was Implemented

A complete analytics tracking system for the Jason Bakery PWA that tracks:
- **Unique visitors** (by session ID)
- **Page views** (total visits)
- **Daily statistics** (visitors and views per day)
- **Recent activity** (live feed of page views)

### Key Features
- ✅ Automatic page view tracking on all pages
- ✅ Password-protected analytics dashboard at `/analytics`
- ✅ Real-time stats with auto-refresh
- ✅ In-memory storage (no database required for demo)
- ✅ Clean, minimalist black & white dashboard design

## 📁 Files Created/Modified

### New Files
- `client/src/pages/Analytics.tsx` - Analytics dashboard UI
- `client/src/hooks/use-analytics.ts` - Auto page view tracking
- `client/src/hooks/use-auth.ts` - Password authentication
- `client/src/components/ProtectedRoute.tsx` - Login screen wrapper
- `shared/schema.ts` - Analytics data schemas (replaced user auth)
- `server/storage.ts` - In-memory analytics storage
- `server/routes.ts` - API endpoints for analytics

### Modified Files
- `client/src/App.tsx` - Added analytics tracking & route
- `client/src/components/Header.tsx` - Added analytics link
- `server/index.ts` - Fixed port binding issue
- `.env` - Added `ANALYTICS_PASSWORD` configuration

## 🔧 Configuration

### Environment Variables (`.env`)

```env
# Session Secret (generate a random string for production)
SESSION_SECRET=your-secret-key-change-this-in-production

# Analytics Dashboard Password
ANALYTICS_PASSWORD=admin123

# Note: Analytics data is stored in-memory for this demo
# For production, configure DATABASE_URL and update storage.ts to use Drizzle ORM
```

### Default Password
- **Username**: None required
- **Password**: `admin123` (change this in production!)

## 🚀 How to Use

### Development
```bash
# Install dependencies
npm install

# Start dev server (runs on port 3000 by default)
PORT=3000 npm run dev
```

### Access Analytics Dashboard
1. Navigate to `http://localhost:3000/analytics`
2. Enter password (default: `admin123`)
3. View visitor statistics in real-time

### Access Main Site
- Home page: `http://localhost:3000/`
- Analytics are tracked automatically on all pages

## 📊 API Endpoints

All endpoints are prefixed with `/api`:

- `POST /api/auth/login` - Authenticate for analytics dashboard
  ```json
  { "password": "admin123" }
  ```

- `POST /api/analytics/track` - Track page view (automatic)
  ```json
  {
    "sessionId": "unique-session-id",
    "path": "/",
    "userAgent": "Mozilla/5.0...",
    "referrer": "https://google.com"
  }
  ```

- `GET /api/analytics/total` - Get total visitors and page views
- `GET /api/analytics/daily` - Get daily breakdown
- `GET /api/analytics/recent?limit=50` - Get recent page views

## 🔒 Security Considerations

### Current Setup (Development)
- ✅ Password protection on dashboard
- ✅ Session persistence in browser
- ⚠️ Password stored in environment variable
- ⚠️ No rate limiting on login attempts
- ⚠️ HTTP only (no encryption)

### For Production - CRITICAL UPDATES

#### 1. **Change Default Password**
```env
# Use a strong password (20+ characters, random)
ANALYTICS_PASSWORD=your-very-secure-random-password-here
```

#### 2. **Use HTTPS**
- Analytics dashboard sends passwords over the network
- Deploy with SSL/TLS certificate (free via Let's Encrypt)
- Most hosting platforms (Vercel, Railway, Render) provide HTTPS automatically

#### 3. **Hide Analytics Link from Regular Users**
Remove or comment out the analytics link in `client/src/components/Header.tsx`:
```tsx
// Remove or comment these lines (around line 48-53):
// <Link href="/analytics">
//   <Button variant="ghost" size="sm" className="gap-2">
//     <BarChart3 className="h-4 w-4" />
//     ANALYTICS
//   </Button>
// </Link>
```
Access dashboard by typing `/analytics` directly in browser

#### 4. **Add Rate Limiting**
Install express-rate-limit:
```bash
npm install express-rate-limit
```

Add to `server/routes.ts`:
```typescript
import rateLimit from 'express-rate-limit';

const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5, // 5 attempts per window
  message: 'Too many login attempts, please try again later'
});

app.post("/api/auth/login", loginLimiter, async (req, res) => {
  // ... existing code
});
```

#### 5. **Persistent Database Storage**

Current setup uses **in-memory storage** - data is lost on server restart!

**For Production, switch to PostgreSQL:**

Update `.env`:
```env
DATABASE_URL=postgresql://user:password@host:5432/database
```

Update `server/storage.ts` to use Drizzle ORM:
```typescript
import { drizzle } from 'drizzle-orm/neon-http';
import { neon } from '@neondatabase/serverless';
import { analytics, dailyStats } from '@shared/schema';

const sql = neon(process.env.DATABASE_URL!);
const db = drizzle(sql);

export class DbStorage implements IStorage {
  async trackPageView(data: InsertAnalytics): Promise<Analytics> {
    const [result] = await db.insert(analytics).values(data).returning();
    return result;
  }
  // ... implement other methods using db queries
}

export const storage = new DbStorage();
```

Run migration:
```bash
npm run db:push
```

#### 6. **Environment Variables Security**
- Never commit `.env` to git (already in `.gitignore`)
- Use platform-specific secret management (Vercel Secrets, Railway Variables, etc.)
- Rotate passwords regularly

#### 7. **Additional Security (Optional)**
- Add IP whitelisting for analytics dashboard
- Implement 2FA or OAuth
- Add CSRF protection
- Set up session expiration

## 📦 Deployment Checklist

- [ ] Change `ANALYTICS_PASSWORD` to strong password
- [ ] Set up PostgreSQL database (Neon, Supabase, or Railway)
- [ ] Add `DATABASE_URL` to environment variables
- [ ] Update `server/storage.ts` to use database
- [ ] Run `npm run db:push` to create tables
- [ ] Remove/hide analytics link from header
- [ ] Add rate limiting to login endpoint
- [ ] Enable HTTPS on hosting platform
- [ ] Test login and data persistence
- [ ] Set `SESSION_SECRET` to random string
- [ ] Verify analytics tracking works
- [ ] Test logout functionality

## 🏗️ Deployment Platforms

### Recommended: Railway
```bash
# Install Railway CLI
npm install -g @railway/cli

# Login and deploy
railway login
railway init
railway up
```
Add environment variables in Railway dashboard.

### Vercel (Frontend + Serverless)
```bash
npm install -g vercel
vercel
```
Add environment variables in Vercel dashboard.

### Render (Full Stack)
- Connect GitHub repository
- Set build command: `npm run build`
- Set start command: `npm start`
- Add environment variables in dashboard

## 🐛 Troubleshooting

### Analytics not tracking
- Check browser console for errors
- Verify `/api/analytics/track` endpoint is reachable
- Check network tab for failed requests

### Login not working
- Verify `ANALYTICS_PASSWORD` in `.env` matches
- Restart server after changing `.env`
- Clear browser cache/localStorage

### Data lost after restart
- Expected behavior with in-memory storage
- Implement database storage for production (see above)

### Port already in use
```bash
# Kill process on port 5000
lsof -ti:5000 | xargs kill -9

# Or use different port
PORT=3000 npm run dev
```

## 📈 Future Enhancements

- [ ] Export analytics to CSV/Excel
- [ ] Chart visualizations (line graphs, pie charts)
- [ ] Geographic location tracking
- [ ] Device/browser breakdown
- [ ] Custom date range filtering
- [ ] Email reports (daily/weekly summaries)
- [ ] A/B testing support
- [ ] Conversion funnel tracking

## 📝 Notes

- Analytics link appears in header for easy access (remove for production)
- Session ID persists in `sessionStorage` (resets when browser tab closes)
- Auto-refresh: Total stats every 30s, recent activity every 10s
- In-memory storage: Fast but temporary - use database for production
- Mobile responsive design following black & white aesthetic

## 🆘 Support

For issues or questions:
1. Check browser console for errors
2. Verify environment variables are set
3. Ensure dependencies are installed (`npm install`)
4. Check server logs for API errors

---

**Last Updated**: January 2025  
**Version**: 1.0.0
