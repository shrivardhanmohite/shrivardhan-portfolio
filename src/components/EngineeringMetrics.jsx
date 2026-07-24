/**
 * EngineeringMetrics.jsx
 *
 * Real-time engineering dashboard showcasing live GitHub and LeetCode activity.
 * Built with custom Heatmap components and a unified metrics service.
 */

import { motion, useInView } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import { FiGithub, FiExternalLink, FiArrowRight, FiRefreshCw, FiAlertCircle } from "react-icons/fi";
import { SiLeetcode } from "react-icons/si";
import { getGitHubMetrics, getLeetCodeMetrics, clearMetricsCache } from "../services/metricsService";
import HeatmapGrid from "./HeatmapGrid";

/* ═══════════════════════════════════════════
   Animated counter hook
═══════════════════════════════════════════ */
function useCountUp(target, active, duration = 1.5, delay = 0) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!active || target == null) return;
    let raf;
    const t = setTimeout(() => {
      let start = null;
      const step = (ts) => {
        if (!start) start = ts;
        const p = Math.min((ts - start) / (duration * 1000), 1);
        const eased = 1 - Math.pow(1 - p, 3);
        setCount(Math.round(eased * target));
        if (p < 1) raf = requestAnimationFrame(step);
      };
      raf = requestAnimationFrame(step);
    }, delay * 1000);
    return () => { clearTimeout(t); cancelAnimationFrame(raf); };
  }, [active, target, duration, delay]);
  return count;
}

/* ═══════════════════════════════════════════
   Shimmer skeleton block
═══════════════════════════════════════════ */
function Sk({ className = "" }) {
  return (
    <div
      className={`rounded-lg bg-white/[0.05] overflow-hidden relative ${className}`}
      aria-hidden="true"
    >
      <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.6s_infinite] bg-gradient-to-r from-transparent via-white/[0.07] to-transparent" />
    </div>
  );
}

/* ═══════════════════════════════════════════
   Heatmap Themes
═══════════════════════════════════════════ */
const THEME_GH = [
  "bg-white/[0.04]",
  "bg-cyan-900/50",
  "bg-cyan-700/60",
  "bg-cyan-500/75",
  "bg-cyan-400",
];

const THEME_LC = [
  "bg-white/[0.04]",
  "bg-amber-900/50",
  "bg-amber-700/60",
  "bg-amber-500/75",
  "bg-amber-400",
];

/* ═══════════════════════════════════════════
   Loading skeleton panels
═══════════════════════════════════════════ */
function SkeletonPanel() {
  return (
    <div className="flex flex-col rounded-2xl bg-white/[0.04] border border-white/10 backdrop-blur-md p-6 gap-5 h-full">
      <div className="flex items-center gap-4 mb-4">
        <Sk className="w-11 h-11 rounded-full" />
        <div className="flex flex-col gap-2 flex-1">
          <Sk className="h-4 w-32" />
          <Sk className="h-2 w-24" />
        </div>
      </div>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 mb-4">
        {[...Array(4)].map((_, i) => <Sk key={i} className="h-16 rounded-xl" />)}
      </div>
      <Sk className="h-28 rounded-lg mb-4" />
      <div className="mt-auto">
        <Sk className="h-10 w-40 rounded-lg" />
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════
   Live Status Indicator
═══════════════════════════════════════════ */
function LiveStatus({ isLive, lastSyncedText, colorClass }) {
  return (
    <div className="flex flex-col items-end text-right">
      <div className={`flex items-center gap-1.5 text-[9px] font-bold tracking-widest uppercase ${colorClass}`}>
        <span className={`w-1.5 h-1.5 rounded-full ${isLive ? "animate-pulse" : ""} bg-current`} />
        {isLive ? "LIVE" : "CACHED"}
      </div>
      <span className="text-[9px] text-white/30 uppercase tracking-wider font-mono mt-0.5">
        Synced {lastSyncedText}
      </span>
    </div>
  );
}

/* ═══════════════════════════════════════════
   Error Panel
═══════════════════════════════════════════ */
function ErrorPanel({ label, onRetry }) {
  return (
    <div className="flex flex-col items-center justify-center rounded-2xl bg-white/[0.04] border border-white/10 backdrop-blur-md p-10 gap-4 text-center h-full min-h-[400px]">
      <FiAlertCircle className="text-white/40 text-4xl" />
      <p className="text-sm text-white/60">Live statistics are temporarily unavailable.</p>
      <button
        onClick={onRetry}
        className="flex items-center gap-2 text-sm font-medium px-5 py-2.5 rounded-lg border border-white/10 text-white/70 hover:text-white hover:border-white/30 transition-all mt-2"
      >
        <FiRefreshCw size={13} /> Retry Connection
      </button>
    </div>
  );
}

/* ═══════════════════════════════════════════
   GitHub Panel
═══════════════════════════════════════════ */
function GitHubPanel({ metric, countersActive }) {
  const { data, isLive, lastSyncedText } = metric;
  
  const repos     = useCountUp(data.stats.totalRepos,         countersActive, 1.2, 0.5);
  const followers = useCountUp(data.stats.followers,          countersActive, 1.0, 0.55);
  const commits   = useCountUp(data.stats.totalContributions, countersActive, 1.5, 0.6);
  const streak    = useCountUp(data.stats.longestStreak,      countersActive, 1.0, 0.65);

  return (
    <motion.div
      initial={{ opacity: 0, x: -30 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
      className="group relative flex flex-col rounded-2xl bg-white/[0.04] border border-white/10 backdrop-blur-md p-6 lg:p-8 hover:shadow-[0_0_50px_rgba(6,182,212,0.12)] hover:border-cyan-500/25 transition-all duration-500 hover:-translate-y-1 h-full"
    >
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-cyan-500/[0.03] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

      {/* Header */}
      <div className="flex items-start justify-between mb-8">
        <div className="flex items-center gap-4">
          <img src={data.avatar} alt={data.username} loading="lazy"
            className="w-12 h-12 rounded-full border-2 border-white/10 group-hover:border-cyan-500/40 transition-colors duration-300"
          />
          <div>
            <div className="flex items-center gap-2 font-semibold text-lg">
              <FiGithub className="opacity-70" />
              <span>{data.username}</span>
            </div>
            <p className="text-[10px] text-white/40 font-mono mt-1 uppercase tracking-widest">GitHub Activity</p>
          </div>
        </div>
        <LiveStatus isLive={isLive} lastSyncedText={lastSyncedText} colorClass="text-cyan-400" />
      </div>

      {/* Stats chips */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-8">
        {[
          { label: "Commits",       value: commits },
          { label: "Followers",     value: followers },
          { label: "Repos",         value: repos },
          { label: "Max Streak",    value: `${streak}d` },
        ].map(({ label, value }) => (
          <div key={label} className="flex flex-col items-center py-4 px-2 rounded-xl bg-white/[0.03] border border-white/[0.05]">
            <span className="text-xl font-bold text-cyan-400 tabular-nums leading-none mb-1.5">{value}</span>
            <span className="text-[9px] text-white/40 uppercase tracking-widest text-center leading-tight">{label}</span>
          </div>
        ))}
      </div>

      {/* Heatmap */}
      <div className="mb-8">
        <p className="text-[10px] text-white/40 uppercase tracking-widest mb-3 font-mono">Contribution History</p>
        <HeatmapGrid heatmapData={data.heatmap} theme={THEME_GH} />
      </div>

      {/* Language bars */}
      <div className="mb-8 flex-1">
        <p className="text-[10px] text-white/40 uppercase tracking-widest mb-4 font-mono">Top Languages</p>
        <div className="space-y-3">
          {data.languages.map((lang) => (
            <div key={lang.name}>
              <div className="flex justify-between text-xs mb-1.5">
                <span className="text-white/70">{lang.name}</span>
                <span className="text-white/40 tabular-nums">{lang.percent}%</span>
              </div>
              <div className="h-1.5 rounded-full bg-white/[0.06] overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${lang.percent}%` }}
                  transition={{ duration: 1.3, delay: 0.8, ease: [0.16, 1, 0.3, 1] }}
                  className="h-full rounded-full"
                  style={{ backgroundColor: lang.color }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* CTAs */}
      <div className="mt-auto flex flex-wrap gap-3">
        <a href={data.profileUrl} target="_blank" rel="noopener noreferrer"
          className="flex items-center gap-2 text-sm font-medium text-white bg-white/[0.07] border border-white/10 rounded-lg px-4 py-2.5 hover:bg-cyan-500/15 hover:border-cyan-500/40 hover:text-cyan-300 transition-all duration-300"
        >
          <FiGithub size={14} /> View GitHub Profile
        </a>
        <a href={data.reposUrl} target="_blank" rel="noopener noreferrer"
          className="flex items-center gap-2 text-sm font-medium text-white/50 border border-white/[0.08] rounded-lg px-4 py-2.5 hover:text-white hover:border-white/20 transition-all duration-300"
        >
          Explore Repos <FiArrowRight size={13} />
        </a>
      </div>
    </motion.div>
  );
}

/* ═══════════════════════════════════════════
   LeetCode Panel
═══════════════════════════════════════════ */
function LeetCodePanel({ metric, countersActive }) {
  const { data, isLive, lastSyncedText } = metric;

  const solved = useCountUp(data.stats.totalSolved ?? 0, countersActive, 1.5, 0.5);

  const chips = [
    data.stats.globalRanking  != null && { label: "Global Rank",   value: `#${data.stats.globalRanking.toLocaleString()}` },
    data.stats.acceptanceRate != null && { label: "Acceptance",    value: `${data.stats.acceptanceRate}%` },
    data.stats.contestRating  != null && { label: "Contest Rating", value: data.stats.contestRating },
  ].filter(Boolean);

  return (
    <motion.div
      initial={{ opacity: 0, x: 30 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
      className="group relative flex flex-col rounded-2xl bg-white/[0.04] border border-white/10 backdrop-blur-md p-6 lg:p-8 hover:shadow-[0_0_50px_rgba(255,161,22,0.08)] hover:border-[#FFA116]/25 transition-all duration-500 hover:-translate-y-1 h-full"
    >
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-[#FFA116]/[0.03] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

      {/* Header */}
      <div className="flex items-start justify-between mb-8">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-[#FFA116]/10 border-2 border-[#FFA116]/20 group-hover:border-[#FFA116]/40 transition-colors duration-300 flex items-center justify-center flex-shrink-0">
            <SiLeetcode className="text-[#FFA116] text-xl" />
          </div>
          <div>
            <div className="flex items-center gap-2 font-semibold text-lg">
              <span>{data.username}</span>
            </div>
            <p className="text-[10px] text-white/40 font-mono mt-1 uppercase tracking-widest">LeetCode Activity</p>
          </div>
        </div>
        <LiveStatus isLive={isLive} lastSyncedText={lastSyncedText} colorClass="text-[#FFA116]" />
      </div>

      {/* Primary Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-8">
        <div className="flex flex-col items-center py-4 px-2 rounded-xl bg-[#FFA116]/[0.05] border border-[#FFA116]/10 lg:col-span-2">
          <span className="text-2xl font-bold text-[#FFA116] tabular-nums leading-none mb-1.5">{solved}</span>
          <span className="text-[9px] text-[#FFA116]/60 uppercase tracking-widest text-center">Problems Solved</span>
        </div>
        {chips.map(({ label, value }) => (
          <div key={label} className="flex flex-col items-center py-4 px-2 rounded-xl bg-white/[0.03] border border-white/[0.05]">
            <span className="text-lg font-bold text-white/80 tabular-nums leading-none mb-1.5">{value}</span>
            <span className="text-[9px] text-white/40 uppercase tracking-widest text-center">{label}</span>
          </div>
        ))}
      </div>

      {/* Difficulty Breakdown (if available) */}
      {(data.stats.easy || data.stats.medium || data.stats.hard) && (
        <div className="mb-8">
          <p className="text-[10px] text-white/40 uppercase tracking-widest mb-4 font-mono">Difficulty Breakdown</p>
          <div className="space-y-4">
            {[
              { label: "Easy",   data: data.stats.easy,   color: "#22c55e", bg: "bg-green-500" },
              { label: "Medium", data: data.stats.medium, color: "#f59e0b", bg: "bg-amber-500" },
              { label: "Hard",   data: data.stats.hard,   color: "#ef4444", bg: "bg-red-500" },
            ]
              .filter(d => d.data != null)
              .map(({ label, data: diff, color, bg }) => (
                <div key={label}>
                  <div className="flex justify-between text-xs mb-1.5">
                    <span style={{ color }} className="font-medium">{label}</span>
                    <span className="text-white/50 tabular-nums">
                      {diff.solved} {diff.total != null && <span className="text-white/20">/ {diff.total}</span>}
                    </span>
                  </div>
                  <div className="h-1.5 rounded-full bg-white/[0.06] overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: diff.total ? `${(diff.solved / diff.total) * 100}%` : "0%" }}
                      transition={{ duration: 1.3, delay: 0.8, ease: [0.16, 1, 0.3, 1] }}
                      className={`h-full rounded-full ${bg}`}
                    />
                  </div>
                </div>
              ))}
          </div>
        </div>
      )}

      {/* Custom Heatmap */}
      <div className="mb-8 flex-1">
        <p className="text-[10px] text-white/40 uppercase tracking-widest mb-3 font-mono">Submission History</p>
        <HeatmapGrid heatmapData={data.heatmap} theme={THEME_LC} />
      </div>

      {/* CTAs */}
      <div className="mt-auto pt-2">
        <a
          href={data.profileUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 text-sm font-medium text-[#FFA116] bg-[#FFA116]/10 border border-[#FFA116]/20 rounded-lg px-4 py-2.5 hover:bg-[#FFA116]/20 hover:border-[#FFA116]/40 transition-all duration-300"
        >
          <SiLeetcode size={14} /> View LeetCode Profile <FiExternalLink size={12} />
        </a>
      </div>
    </motion.div>
  );
}

/* ═══════════════════════════════════════════
   Root Dashboard Component
═══════════════════════════════════════════ */
export default function EngineeringMetrics() {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.15 });

  const [ghMetric, setGhMetric] = useState({ status: "idle" });
  const [lcMetric, setLcMetric] = useState({ status: "idle" });

  const loadGitHub = async () => {
    setGhMetric({ status: "loading" });
    const metric = await getGitHubMetrics();
    setGhMetric(metric);
  };

  const loadLeetCode = async () => {
    setLcMetric({ status: "loading" });
    const metric = await getLeetCodeMetrics();
    setLcMetric(metric);
  };

  useEffect(() => {
    if (!isInView) return;
    if (ghMetric.status === "idle") loadGitHub();
    if (lcMetric.status === "idle") loadLeetCode();
  }, [isInView]);

  const retryGitHub = () => { clearMetricsCache(); loadGitHub(); };
  const retryLeetCode = () => { clearMetricsCache(); loadLeetCode(); };

  const countersActive = ghMetric.status === "success" && lcMetric.status === "success";

  return (
    <section
      id="metrics"
      ref={sectionRef}
      className="snap-start min-h-screen flex flex-col justify-center px-6 sm:px-8 md:px-12 lg:px-16 max-w-[1400px] mx-auto py-24"
      aria-label="Engineering Metrics"
    >
      {/* Header */}
      <div className="mb-14">
        <motion.h3
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 tracking-tight"
        >
          Engineering Metrics
        </motion.h3>
        <motion.p
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="opacity-70 text-sm sm:text-base md:text-lg max-w-2xl font-light"
        >
          Real-time insights into my coding consistency, open-source contributions, and problem-solving journey.
        </motion.p>
      </div>

      {/* Panels Grid */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
        
        {/* GitHub Column */}
        <div>
          {ghMetric.status === "loading" && <SkeletonPanel />}
          {ghMetric.status === "error" && <ErrorPanel label="GitHub" onRetry={retryGitHub} />}
          {ghMetric.status === "success" && <GitHubPanel metric={ghMetric} countersActive={countersActive} />}
        </div>

        {/* LeetCode Column */}
        <div>
          {lcMetric.status === "loading" && <SkeletonPanel />}
          {lcMetric.status === "error" && <ErrorPanel label="LeetCode" onRetry={retryLeetCode} />}
          {lcMetric.status === "success" && <LeetCodePanel metric={lcMetric} countersActive={countersActive} />}
        </div>

      </div>

      {/* Shimmer keyframe */}
      <style>{`
        @keyframes shimmer {
          0%   { transform: translateX(-100%); }
          100% { transform: translateX(200%);  }
        }
      `}</style>
    </section>
  );
}
