# API Documentation

This document describes all available API endpoints for the Jason Bakery PWA backend.

## Base URL

All API endpoints are prefixed with `/api`.

- **Development**: `http://localhost:5000/api`
- **Production**: `https://your-domain.com/api`

## Authentication

### Login

Authenticate to access the analytics dashboard.

**Endpoint**: `POST /api/auth/login`

**Request Body**:
```json
{
  "password": "string"
}
```

**Response (Success - 200)**:
```json
{
  "success": true
}
```

**Response (Error - 401)**:
```json
{
  "error": "Invalid password"
}
```

**Notes**:
- Password is configured via `ANALYTICS_PASSWORD` environment variable
- Default password is `admin123` (change in production!)

---

## Analytics

### Track Page View

Record a page view event for analytics tracking.

**Endpoint**: `POST /api/analytics/track`

**Request Body**:
```json
{
  "sessionId": "string",
  "path": "string",
  "userAgent": "string (optional)",
  "referrer": "string (optional)"
}
```

**Request Body Schema** (Validated with Zod):
```typescript
{
  sessionId: string;      // Required - unique session identifier
  path: string;           // Required - page path (e.g., "/", "/menu")
  userAgent?: string;     // Optional - browser user agent string
  referrer?: string;      // Optional - referrer URL
}
```

**Response (Success - 200)**:
```json
{
  "id": "uuid",
  "sessionId": "string",
  "path": "string",
  "userAgent": "string | null",
  "referrer": "string | null",
  "timestamp": "ISO 8601 date string"
}
```

**Response (Error - 400)**:
```json
{
  "error": "Validation error message"
}
```

**Example Request**:
```bash
curl -X POST http://localhost:5000/api/analytics/track \
  -H "Content-Type: application/json" \
  -d '{
    "sessionId": "abc123",
    "path": "/menu",
    "userAgent": "Mozilla/5.0...",
    "referrer": "https://google.com"
  }'
```

---

### Get Daily Statistics

Retrieve daily aggregated statistics for page views and unique visitors.

**Endpoint**: `GET /api/analytics/daily`

**Request**: No parameters required

**Response (Success - 200)**:
```json
[
  {
    "id": "uuid",
    "date": "YYYY-MM-DD",
    "uniqueVisitors": 42,
    "pageViews": 156
  },
  {
    "id": "uuid",
    "date": "YYYY-MM-DD",
    "uniqueVisitors": 38,
    "pageViews": 142
  }
]
```

**Response (Error - 500)**:
```json
{
  "error": "Error message"
}
```

**Notes**:
- Results are sorted by date in descending order (most recent first)
- `uniqueVisitors` counts unique session IDs per day
- `pageViews` counts total page view events per day

**Example Request**:
```bash
curl http://localhost:5000/api/analytics/daily
```

---

### Get Total Statistics

Retrieve overall statistics across all time.

**Endpoint**: `GET /api/analytics/total`

**Request**: No parameters required

**Response (Success - 200)**:
```json
{
  "totalVisitors": 1234,
  "totalPageViews": 5678
}
```

**Response (Error - 500)**:
```json
{
  "error": "Error message"
}
```

**Notes**:
- `totalVisitors` counts unique session IDs across all time
- `totalPageViews` counts all page view events

**Example Request**:
```bash
curl http://localhost:5000/api/analytics/total
```

---

### Get Recent Page Views

Retrieve the most recent page view events.

**Endpoint**: `GET /api/analytics/recent`

**Query Parameters**:
| Parameter | Type | Required | Default | Description |
|-----------|------|----------|---------|-------------|
| `limit` | integer | No | 50 | Maximum number of records to return |

**Response (Success - 200)**:
```json
[
  {
    "id": "uuid",
    "sessionId": "string",
    "path": "string",
    "userAgent": "string | null",
    "referrer": "string | null",
    "timestamp": "ISO 8601 date string"
  }
]
```

**Response (Error - 500)**:
```json
{
  "error": "Error message"
}
```

**Notes**:
- Results are sorted by timestamp in descending order (most recent first)
- Default limit is 50 records
- Maximum limit is not enforced (use responsibly)

**Example Requests**:
```bash
# Get last 50 page views (default)
curl http://localhost:5000/api/analytics/recent

# Get last 100 page views
curl http://localhost:5000/api/analytics/recent?limit=100
```

---

## Error Handling

All endpoints follow consistent error response patterns:

### HTTP Status Codes

| Code | Description |
|------|-------------|
| 200 | Success |
| 400 | Bad Request (validation error) |
| 401 | Unauthorized (invalid credentials) |
| 500 | Internal Server Error |

### Error Response Format

```json
{
  "error": "Human-readable error message"
}
```

**Development vs Production**:
- Development: Detailed error messages
- Production: Generic error messages for security

---

## Data Types

### Analytics Record

```typescript
{
  id: string;              // UUID
  sessionId: string;       // Session identifier
  path: string;            // Page path
  userAgent: string | null;
  referrer: string | null;
  timestamp: Date;         // ISO 8601 format
}
```

### Daily Statistics

```typescript
{
  id: string;              // UUID
  date: string;            // YYYY-MM-DD format
  uniqueVisitors: number;  // Count of unique sessions
  pageViews: number;       // Count of page views
}
```

---

## Rate Limiting

Currently, no rate limiting is implemented. For production use, consider implementing rate limiting middleware to prevent abuse.

---

## CORS

CORS headers are not currently configured. If you need to access the API from a different origin, you'll need to add CORS middleware to the Express server.

---

## Authentication & Security

- Analytics dashboard access is protected by password authentication
- In production, use a strong `ANALYTICS_PASSWORD`
- No session management or cookies are currently implemented
- Consider adding HTTPS/TLS in production
- User agent and referrer data may contain PII - handle according to privacy regulations

---

## Storage Backend

The API supports two storage backends:

1. **In-Memory Storage** (default)
   - Data is lost on server restart
   - Suitable for development and testing
   - No database required

2. **PostgreSQL Storage** (future)
   - Persistent data storage
   - Requires `DATABASE_URL` environment variable
   - Implements the same `IStorage` interface

Toggle between backends by setting or unsetting the `DATABASE_URL` environment variable.
