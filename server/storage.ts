/**
 * Storage Layer Abstraction
 * 
 * Provides interface-based storage for analytics data.
 * Current implementation uses in-memory storage (MemStorage).
 * Future implementations can add database persistence (DbStorage).
 */

import { type Analytics, type InsertAnalytics, type DailyStats } from "@shared/schema";
import { randomUUID } from "crypto";

/**
 * Storage interface for analytics data operations.
 * Implementations can use in-memory storage, databases, or external services.
 */
export interface IStorage {
  /** Track a new page view event */
  trackPageView(analytics: InsertAnalytics): Promise<Analytics>;
  /** Get daily aggregated statistics */
  getDailyStats(): Promise<DailyStats[]>;
  /** Get total statistics across all time */
  getTotalStats(): Promise<{ totalVisitors: number; totalPageViews: number }>;
  /** Get recent page view events, limited by count */
  getRecentPageViews(limit?: number): Promise<Analytics[]>;
}

/**
 * In-Memory Storage Implementation
 * 
 * Stores analytics data in process memory.
 * Data is lost on server restart - suitable for development and testing.
 * 
 * For production persistence, implement DbStorage using PostgreSQL via Drizzle.
 */
export class MemStorage implements IStorage {
  private analytics: Analytics[];
  private sessions: Set<string>;

  constructor() {
    this.analytics = [];
    this.sessions = new Set();
  }

  /**
   * Tracks a new page view event
   * @param insertAnalytics - Page view data to store
   * @returns The stored analytics record with generated ID and timestamp
   */
  async trackPageView(insertAnalytics: InsertAnalytics): Promise<Analytics> {
    const id = randomUUID();
    const analytics: Analytics = {
      id,
      sessionId: insertAnalytics.sessionId,
      path: insertAnalytics.path,
      userAgent: insertAnalytics.userAgent ?? null,
      referrer: insertAnalytics.referrer ?? null,
      timestamp: new Date(),
    };
    this.analytics.push(analytics);
    this.sessions.add(insertAnalytics.sessionId);
    return analytics;
  }

  /**
   * Aggregates page views by day
   * @returns Array of daily statistics sorted by date (descending)
   */
  async getDailyStats(): Promise<DailyStats[]> {
    const statsMap = new Map<string, { uniqueVisitors: Set<string>; pageViews: number }>();
    
    this.analytics.forEach((entry) => {
      const date = entry.timestamp.toISOString().split('T')[0];
      if (!statsMap.has(date)) {
        statsMap.set(date, { uniqueVisitors: new Set(), pageViews: 0 });
      }
      const stats = statsMap.get(date)!;
      stats.uniqueVisitors.add(entry.sessionId);
      stats.pageViews++;
    });

    return Array.from(statsMap.entries()).map(([date, stats]) => ({
      id: randomUUID(),
      date,
      uniqueVisitors: stats.uniqueVisitors.size,
      pageViews: stats.pageViews,
    })).sort((a, b) => b.date.localeCompare(a.date));
  }

  /**
   * Calculates total statistics across all time
   * @returns Total unique visitors (sessions) and total page views
   */
  async getTotalStats(): Promise<{ totalVisitors: number; totalPageViews: number }> {
    return {
      totalVisitors: this.sessions.size,
      totalPageViews: this.analytics.length,
    };
  }

  /**
   * Retrieves the most recent page view events
   * @param limit - Maximum number of records to return (default: 50)
   * @returns Array of recent page views sorted by timestamp (descending)
   */
  async getRecentPageViews(limit: number = 50): Promise<Analytics[]> {
    return this.analytics.slice(-limit).reverse();
  }
}

/**
 * Storage instance used by the application.
 * Currently uses MemStorage (in-memory).
 * 
 * To use PostgreSQL:
 * 1. Implement DbStorage class
 * 2. Toggle based on DATABASE_URL: 
 *    export const storage = process.env.DATABASE_URL ? new DbStorage(db) : new MemStorage();
 */
export const storage = new MemStorage();
