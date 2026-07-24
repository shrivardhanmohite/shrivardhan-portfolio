/**
 * githubService.js
 * Fetches and normalizes GitHub profile + contribution data.
 */

const USERNAME = "shrivardhanmohite";
const TIMEOUT = 8000;

const LANG_COLORS = {
  JavaScript: "#f7df1e",
  TypeScript: "#3178c6",
  Python: "#3572A5",
  Java: "#b07219",
  "C++": "#f34b7d",
  C: "#555555",
  CSS: "#7c3aed",
  HTML: "#e34c26",
  Go: "#00ADD8",
  Rust: "#dea584",
  Ruby: "#701516",
  Swift: "#F05138",
  Kotlin: "#7F52FF",
  PHP: "#4F5D95",
  Shell: "#89e051",
};

function fetchT(url) {
  const ctrl = new AbortController();
  const id = setTimeout(() => ctrl.abort(), TIMEOUT);
  return fetch(url, { signal: ctrl.signal }).finally(() => clearTimeout(id));
}

function calcCurrentStreak(contribs) {
  let streak = 0;
  for (let i = contribs.length - 1; i >= 0; i--) {
    if (contribs[i].count > 0) streak++;
    else break;
  }
  return streak;
}

function calcBestStreak(contribs) {
  let best = 0, run = 0;
  for (const c of contribs) {
    run = c.count > 0 ? run + 1 : 0;
    if (run > best) best = run;
  }
  return best;
}

export async function fetchProfile() {
  const [profileRes, reposRes] = await Promise.all([
    fetchT(`https://api.github.com/users/${USERNAME}`),
    fetchT(`https://api.github.com/users/${USERNAME}/repos?per_page=100&sort=updated`),
  ]);

  if (!profileRes.ok) throw new Error(`GitHub profile error: ${profileRes.status}`);

  const profile = await profileRes.json();
  const repos = reposRes.ok ? await reposRes.json() : [];

  const langCounts = {};
  repos.forEach((r) => {
    if (r.language) langCounts[r.language] = (langCounts[r.language] || 0) + 1;
  });
  const totalLangRepos = Object.values(langCounts).reduce((a, b) => a + b, 0) || 1;
  const languages = Object.entries(langCounts)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5)
    .map(([name, count]) => ({
      name,
      percent: Math.round((count / totalLangRepos) * 100),
      color: LANG_COLORS[name] || "#6e7681",
    }));

  const totalStars = repos.reduce((s, r) => s + (r.stargazers_count || 0), 0);

  return {
    username: profile.login,
    avatar: profile.avatar_url,
    name: profile.name,
    profileUrl: profile.html_url,
    reposUrl: `${profile.html_url}?tab=repositories`,
    stats: {
      totalRepos: profile.public_repos,
      followers: profile.followers,
      following: profile.following,
      totalStars,
    },
    languages,
  };
}

export async function fetchHeatmap() {
  const res = await fetchT(`https://github-contributions-api.jogruber.de/v4/${USERNAME}?y=last`);
  if (!res.ok) throw new Error(`GitHub heatmap error: ${res.status}`);
  
  const data = await res.json();
  const contribs = data.contributions || [];
  
  const today = new Date().toISOString().split("T")[0];
  
  const normalized = contribs.map((c) => ({
    date: c.date,
    count: c.count,
    level: c.level,
    isToday: c.date === today,
  }));
  
  const totalContributions = Object.values(data.total || {}).reduce((a, b) => a + b, 0);

  return {
    contributions: normalized,
    totalContributions,
    streak: calcCurrentStreak(normalized),
    longestStreak: calcBestStreak(normalized),
  };
}
