import { motion } from "framer-motion";
import { memo } from "react";

/**
 * Reusable contribution heatmap component.
 * 
 * @param {Array} heatmapData - 2D array of weeks x 7 days, each cell is { date, count, level, isToday }
 * @param {Array} theme - Array of 5 color classes (Gray -> Accent)
 */
export default memo(function HeatmapGrid({ heatmapData, theme }) {
  if (!heatmapData || heatmapData.length === 0) {
    return (
      <div className="h-24 rounded-lg bg-white/[0.03] border border-white/[0.05] flex items-center justify-center">
        <span className="text-xs text-white/30">Heatmap unavailable</span>
      </div>
    );
  }

  return (
    <div>
      <div className="relative flex gap-[3px] overflow-hidden py-1" aria-label="Contribution heatmap">
        {heatmapData.map((week, wi) => (
          <div key={wi} className="flex flex-col gap-[3px]">
            {week.map((cell, di) => {
              if (!cell) return null;
              return <HeatmapCell key={di} cell={cell} theme={theme} wi={wi} />;
            })}
          </div>
        ))}
      </div>
      
      {/* Legend */}
      <div className="flex items-center gap-1.5 mt-3">
        <span className="text-[9px] text-white/30 uppercase tracking-widest font-mono mr-1">Less</span>
        {theme.map((c, i) => <div key={i} className={`w-[10px] h-[10px] rounded-[2px] ${c}`} />)}
        <span className="text-[9px] text-white/30 uppercase tracking-widest font-mono ml-1">More</span>
      </div>
    </div>
  );
});

const HeatmapCell = memo(({ cell, theme, wi }) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4, delay: 0.6 + wi * 0.025 }}
      className={`group w-[11px] h-[11px] rounded-[2px] transition-transform duration-200 hover:scale-125 hover:z-10 relative cursor-crosshair
        ${theme[Math.min(cell.level, 4)]}
        ${cell.isToday ? "ring-1 ring-white/40 ring-offset-1 ring-offset-transparent shadow-[0_0_8px_rgba(255,255,255,0.3)]" : ""}
      `}
    >
      {/* CSS Tooltip */}
      <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 bg-gray-900 border border-white/10 rounded text-[10px] whitespace-nowrap text-white/90 z-20 pointer-events-none shadow-xl flex flex-col items-center opacity-0 group-hover:opacity-100 transition-opacity duration-200">
        <span className="font-medium text-white">
          {cell.count} {cell.count === 1 ? "contribution" : "contributions"}
        </span>
        <span className="text-white/50">{cell.date}</span>
      </div>
    </motion.div>
  );
});
