/**
 * metricsService.js
 * 
 * Orchestrates fetching from GitHub and LeetCode services.
 * Normalizes data into a consistent UI-consumable format.
 * Manages caching and handles the "Live/Cached" state logic.
 */

import * as githubService from "./githubService";
import * as leetcodeService from "./leetcodeService";

const CACHE_KEY_GH = "portfolio_metrics_gh_v1";
const CACHE_KEY_LC = "portfolio_metrics_lc_v1";
const CACHE_TTL = 30 * 60 * 1000; // 30 minutes

function readCache(key) {
  try {
    const raw = localStorage.getItem(key);
    if (!raw) return null;
    const { ts, data } = JSON.parse(raw);
    if (Date.now() - ts < CACHE_TTL) {
      return { data, ts };
    }
  } catch { /* ignore */ }
  return null;
}

function writeCache(key, data) {
  try {
    localStorage.setItem(key, JSON.stringify({ ts: Date.now(), data }));
  } catch { /* ignore */ }
}

function getRelativeTime(timestamp) {
  const diffInMinutes = Math.floor((Date.now() - timestamp) / 60000);
  if (diffInMinutes < 1) return "just now";
  if (diffInMinutes === 1) return "1 minute ago";
  return `${diffInMinutes} minutes ago`;
}

function buildHeatmapGrid(contributions) {
  // Convert 1D array of contributions into 2D grid: 7 rows by N cols.
  // We assume the contributions array represents contiguous days ending today.
  // If we want 20 weeks, that's 140 days.
  const weeks = 20;
  const tail = contributions.slice(-(weeks * 7));
  const grid = [];
  for (let i = 0; i < tail.length; i += 7) {
    grid.push(tail.slice(i, i + 7)); // push entire cell objects
  }
  return grid;
}

export async function getGitHubMetrics() {
  const cached = readCache(CACHE_KEY_GH);
  if (cached) {
    return {
      status: "success",
      data: cached.data,
      isLive: false,
      lastSyncedText: getRelativeTime(cached.ts),
    };
  }

  try {
    const [profile, heatmap] = await Promise.all([
      githubService.fetchProfile(),
      githubService.fetchHeatmap(),
    ]);

    const data = {
      ...profile,
      stats: {
        ...profile.stats,
        totalContributions: heatmap.totalContributions,
        streak: heatmap.streak,
        longestStreak: heatmap.longestStreak,
      },
      heatmap: buildHeatmapGrid(heatmap.contributions),
    };

    writeCache(CACHE_KEY_GH, data);
    
    return {
      status: "success",
      data,
      isLive: true,
      lastSyncedText: "just now",
    };
  } catch (error) {
    console.error("GitHub metrics failed:", error);
    // If live fails, check if we have an expired cache as fallback
    try {
      const raw = localStorage.getItem(CACHE_KEY_GH);
      if (raw) {
        const { ts, data } = JSON.parse(raw);
        return {
          status: "success",
          data,
          isLive: false,
          lastSyncedText: getRelativeTime(ts),
        };
      }
    } catch {}
    
    return { status: "error" };
  }
}

export async function getLeetCodeMetrics() {
  const cached = readCache(CACHE_KEY_LC);
  if (cached) {
    return {
      status: "success",
      data: cached.data,
      isLive: false,
      lastSyncedText: getRelativeTime(cached.ts),
    };
  }

  try {
    const [profile, heatmap] = await Promise.all([
      leetcodeService.fetchProfile(),
      leetcodeService.fetchHeatmap(),
    ]);

    const data = {
      ...profile,
      heatmap: buildHeatmapGrid(heatmap.contributions),
    };

    writeCache(CACHE_KEY_LC, data);
    
    return {
      status: "success",
      data,
      isLive: true,
      lastSyncedText: "just now",
    };
  } catch (error) {
    console.error("LeetCode metrics failed:", error);
    // If live fails, check expired cache
    try {
      const raw = localStorage.getItem(CACHE_KEY_LC);
      if (raw) {
        const { ts, data } = JSON.parse(raw);
        return {
          status: "success",
          data,
          isLive: false,
          lastSyncedText: getRelativeTime(ts),
        };
      }
    } catch {}
    
    return { status: "error" };
  }
}

export function clearMetricsCache() {
  try {
    localStorage.removeItem(CACHE_KEY_GH);
    localStorage.removeItem(CACHE_KEY_LC);
  } catch {}
}
