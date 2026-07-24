/**
 * leetcodeService.js
 * Fetches and normalizes LeetCode profile + calendar data.
 */

const USERNAME = "shrivardhanmohite";
const TIMEOUT = 8000;

function fetchT(url) {
  const ctrl = new AbortController();
  const id = setTimeout(() => ctrl.abort(), TIMEOUT);
  return fetch(url, { signal: ctrl.signal }).finally(() => clearTimeout(id));
}

export async function fetchProfile() {
  const [statsRes, alfaRes] = await Promise.allSettled([
    fetchT(`https://leetcode-stats-api.herokuapp.com/${USERNAME}`),
    fetchT(`https://alfa-leetcode-api.onrender.com/${USERNAME}/solved`),
  ]);

  let stats = null;
  
  if (statsRes.status === "fulfilled" && statsRes.value.ok) {
    const d = await statsRes.value.json();
    if (d.status !== "error") {
      stats = {
        totalSolved: d.totalSolved ?? null,
        easy: d.easySolved != null ? { solved: d.easySolved, total: d.totalEasy } : null,
        medium: d.mediumSolved != null ? { solved: d.mediumSolved, total: d.totalMedium } : null,
        hard: d.hardSolved != null ? { solved: d.hardSolved, total: d.totalHard } : null,
        acceptanceRate: typeof d.acceptanceRate === "number" ? d.acceptanceRate : null,
        globalRanking: d.ranking && d.ranking !== 0 ? d.ranking : null,
        contestRating: null,
      };
    }
  }

  if (!stats && alfaRes.status === "fulfilled" && alfaRes.value.ok) {
    const d = await alfaRes.value.json();
    stats = {
      totalSolved: d.solvedProblem ?? null,
      easy: d.easySolved != null ? { solved: d.easySolved, total: null } : null,
      medium: d.mediumSolved != null ? { solved: d.mediumSolved, total: null } : null,
      hard: d.hardSolved != null ? { solved: d.hardSolved, total: null } : null,
      acceptanceRate: null,
      globalRanking: null,
      contestRating: null,
    };
  }

  if (!stats) throw new Error("Both LeetCode profile APIs failed.");

  return {
    username: USERNAME,
    profileUrl: `https://leetcode.com/u/${USERNAME}/`,
    stats,
  };
}

export async function fetchHeatmap() {
  const res = await fetchT(`https://alfa-leetcode-api.onrender.com/${USERNAME}/calendar`);
  if (!res.ok) throw new Error(`LeetCode calendar error: ${res.status}`);
  
  const data = await res.json();
  let submissionMap = {};
  
  try {
    submissionMap = JSON.parse(data.submissionCalendar || "{}");
  } catch (e) {
    // ignore
  }

  // Convert Unix timestamps to YYYY-MM-DD map
  const dateMap = {};
  for (const [timestamp, count] of Object.entries(submissionMap)) {
    const dateObj = new Date(parseInt(timestamp) * 1000);
    const dateStr = dateObj.toISOString().split("T")[0];
    dateMap[dateStr] = count;
  }

  // Build the last 20 weeks (140 days) continuously
  const days = 140;
  const todayObj = new Date();
  const todayStr = todayObj.toISOString().split("T")[0];
  const contributions = [];

  for (let i = days - 1; i >= 0; i--) {
    const d = new Date(todayObj);
    d.setDate(d.getDate() - i);
    const dateStr = d.toISOString().split("T")[0];
    const count = dateMap[dateStr] || 0;
    
    // Determine level (0-4) similar to GitHub
    let level = 0;
    if (count === 1) level = 1;
    else if (count >= 2 && count <= 3) level = 2;
    else if (count >= 4 && count <= 6) level = 3;
    else if (count >= 7) level = 4;

    contributions.push({
      date: dateStr,
      count,
      level,
      isToday: dateStr === todayStr,
    });
  }

  return {
    contributions,
  };
}
