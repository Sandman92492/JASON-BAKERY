/**
 * API Route Registration
 * 
 * Defines all API endpoints for the application:
 * - Authentication (simple password-based)
 * - Analytics tracking and statistics
 */

import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertAnalyticsSchema } from "@shared/schema";

/**
 * Registers all API routes on the Express app
 * @param app - Express application instance
 * @returns HTTP server instance for WebSocket upgrade support
 */
export async function registerRoutes(app: Express): Promise<Server> {
  /**
   * POST /api/auth/login
   * 
   * Simple password authentication for analytics dashboard access.
   * Compares provided password with ANALYTICS_PASSWORD env var.
   */
  app.post("/api/auth/login", async (req, res) => {
    const { password } = req.body;
    const correctPassword = process.env.ANALYTICS_PASSWORD || "admin123";
    
    if (password === correctPassword) {
      res.json({ success: true });
    } else {
      res.status(401).json({ error: "Invalid password" });
    }
  });

  /**
   * POST /api/analytics/track
   * 
   * Tracks a page view event with session information.
   * Validates request body against insertAnalyticsSchema.
   */
  app.post("/api/analytics/track", async (req, res) => {
    try {
      const data = insertAnalyticsSchema.parse(req.body);
      const result = await storage.trackPageView(data);
      res.json(result);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  });

  /**
   * GET /api/analytics/daily
   * 
   * Returns daily aggregated statistics (unique visitors and page views per day).
   * Results are sorted by date in descending order.
   */
  app.get("/api/analytics/daily", async (req, res) => {
    try {
      const stats = await storage.getDailyStats();
      res.json(stats);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  });

  /**
   * GET /api/analytics/total
   * 
   * Returns overall statistics across all time (total unique visitors and total page views).
   */
  app.get("/api/analytics/total", async (req, res) => {
    try {
      const stats = await storage.getTotalStats();
      res.json(stats);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  });

  /**
   * GET /api/analytics/recent
   * 
   * Returns the most recent page view events.
   * Accepts optional 'limit' query parameter (default: 50).
   */
  app.get("/api/analytics/recent", async (req, res) => {
    try {
      const limit = req.query.limit ? parseInt(req.query.limit as string) : 50;
      const recent = await storage.getRecentPageViews(limit);
      res.json(recent);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  });

  const httpServer = createServer(app);

  return httpServer;
}
