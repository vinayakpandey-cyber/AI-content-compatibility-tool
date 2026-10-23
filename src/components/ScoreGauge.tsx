import React from 'react';

interface ScoreGaugeProps {
  score: number;
  size?: number;
  strokeWidth?: number;
  label?: string;
  sublabel?: string;
  showGrade?: string;
}

export const ScoreGauge: React.FC<ScoreGaugeProps> = ({
  score,
  size = 120,
  strokeWidth = 10,
  label,
  sublabel,
  showGrade,
}) => {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const safeScore = Math.min(100, Math.max(0, score || 0));
  const strokeDashoffset = circumference - (safeScore / 100) * circumference;

  // Determine color scheme
  let strokeColor = '#10B981'; // green-500
  let textColor = 'text-emerald-400';
  let badgeBg = 'bg-emerald-500/10 text-emerald-300 border-emerald-500/30';

  if (safeScore < 50) {
    strokeColor = '#F43F5E'; // rose-500
    textColor = 'text-rose-400';
    badgeBg = 'bg-rose-500/10 text-rose-300 border-rose-500/30';
  } else if (safeScore < 75) {
    strokeColor = '#F59E0B'; // amber-500
    textColor = 'text-amber-400';
    badgeBg = 'bg-amber-500/10 text-amber-300 border-amber-500/30';
  } else if (safeScore >= 90) {
    strokeColor = '#06B6D4'; // cyan-500
    textColor = 'text-cyan-400';
    badgeBg = 'bg-cyan-500/10 text-cyan-300 border-cyan-500/30';
  }

  return (
    <div className="flex flex-col items-center justify-center">
      <div className="relative flex items-center justify-center" style={{ width: size, height: size }}>
        <svg width={size} height={size} className="transform -rotate-90">
          {/* Background track */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke="currentColor"
            strokeWidth={strokeWidth}
            className="text-slate-800"
            fill="transparent"
          />
          {/* Animated score track */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke={strokeColor}
            strokeWidth={strokeWidth}
            fill="transparent"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            className="transition-all duration-1000 ease-out"
          />
        </svg>

        {/* Center content */}
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
          <div className="flex items-baseline justify-center">
            <span className={`font-mono text-3xl font-extrabold tracking-tight ${textColor}`}>
              {Math.round(safeScore)}
            </span>
            <span className="text-xs text-slate-400 ml-0.5">%</span>
          </div>

          {showGrade && (
            <span
              className={`mt-0.5 px-2 py-0.5 rounded-full text-xs font-bold border ${badgeBg}`}
            >
              Grade {showGrade}
            </span>
          )}
        </div>
      </div>

      {label && <span className="mt-2 text-sm font-semibold text-slate-200">{label}</span>}
      {sublabel && <span className="text-xs text-slate-400 text-center max-w-[120px]">{sublabel}</span>}
    </div>
  );
};
