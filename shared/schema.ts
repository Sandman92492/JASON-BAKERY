/**
 * Shared Database Schema and Validators
 * 
 * Defines database tables using Drizzle ORM and Zod validation schemas.
 * Shared between client and server for type safety.
 */

import { sql } from "drizzle-orm";
import { pgTable, text, varchar, timestamp, integer } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

/**
 * Analytics table - stores individual page view events
 */
export const analytics = pgTable("analytics", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  sessionId: text("session_id").notNull(),
  path: text("path").notNull(),
  userAgent: text("user_agent"),
  referrer: text("referrer"),
  timestamp: timestamp("timestamp").notNull().defaultNow(),
});

/**
 * Daily statistics table - stores aggregated daily metrics
 */
export const dailyStats = pgTable("daily_stats", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  date: text("date").notNull().unique(),
  uniqueVisitors: integer("unique_visitors").notNull().default(0),
  pageViews: integer("page_views").notNull().default(0),
});

/**
 * Zod schema for validating analytics insert data
 * Omits auto-generated fields (id, timestamp)
 */
export const insertAnalyticsSchema = createInsertSchema(analytics).pick({
  sessionId: true,
  path: true,
  userAgent: true,
  referrer: true,
});

/** Type for inserting new analytics records */
export type InsertAnalytics = z.infer<typeof insertAnalyticsSchema>;

/** Type for complete analytics records from database */
export type Analytics = typeof analytics.$inferSelect;

/** Type for daily statistics records */
export type DailyStats = typeof dailyStats.$inferSelect;
