/**
 * Express Server Entry Point
 * 
 * Bootstraps the Express application with:
 * - JSON and URL-encoded body parsing
 * - Request/response logging middleware
 * - API route registration
 * - Vite dev server (development) or static file serving (production)
 * - Global error handling
 */

import express, { type Request, Response, NextFunction } from "express";
import { registerRoutes } from "./routes";
import { setupVite, serveStatic, log } from "./vite";

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

/**
 * API Request Logging Middleware
 * 
 * Logs API requests with method, path, status code, and duration.
 * In development, also logs response JSON keys (not full values for privacy).
 * Only logs routes starting with /api to reduce noise.
 */
app.use((req, res, next) => {
  const start = Date.now();
  const path = req.path;
  let capturedJsonResponse: Record<string, any> | undefined = undefined;

  const originalResJson = res.json;
  res.json = function (bodyJson, ...args) {
    capturedJsonResponse = bodyJson;
    return originalResJson.apply(res, [bodyJson, ...args]);
  };

  res.on("finish", () => {
    const duration = Date.now() - start;
    if (path.startsWith("/api")) {
      const isDev = app.get('env') === 'development';
      let logLine = `${req.method} ${path} ${res.statusCode} in ${duration}ms`;
      
      if (isDev && capturedJsonResponse) {
        const keys = Object.keys(capturedJsonResponse).join(',');
        logLine += ` :: keys(${keys})`;
      }

      if (logLine.length > 120) {
        logLine = logLine.slice(0, 119) + "…";
      }

      log(logLine);
    }
  });

  next();
});

/**
 * Bootstrap Application
 * 
 * Initializes the server in the following order:
 * 1. Register API routes
 * 2. Setup global error handler
 * 3. Setup Vite dev server (dev) or static file serving (prod)
 * 4. Start HTTP server on configured port
 */
(async () => {
  try {
    log('Starting server bootstrap...');
    const server = await registerRoutes(app);
    log('Routes registered successfully');

  /**
   * Global Error Handler
   * 
   * Catches all errors from routes and middleware.
   * Logs errors server-side and returns appropriate response to client.
   * In production, hides error details for security.
   */
  app.use((err: any, req: Request, res: Response, _next: NextFunction) => {
    const status = err.status || err.statusCode || 500;
    const message = req.app.get('env') === 'development' ? err.message : "Internal Server Error";

    log(`ERROR ${req.method} ${req.path} -> ${status}: ${err.message || 'Unknown error'}`);
    
    if (!res.headersSent) {
      res.status(status).json({ message });
    }
  });

  // Setup Vite dev server (development) or serve static files (production)
  // Vite must be setup AFTER API routes so the catch-all route doesn't interfere
  if (app.get("env") === "development") {
    await setupVite(app, server);
  } else {
    serveStatic(app);
  }

  // Start server on PORT environment variable (default: 3000)
  // This port serves both the API and the client application
  const port = parseInt(process.env.PORT || '3000', 10);
  server.listen(port, '0.0.0.0', () => {
    log(`serving on port ${port}`);
  });
  } catch (error) {
    console.error('FATAL: Server bootstrap failed:', error);
    process.exit(1);
  }
})();
