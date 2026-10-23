import React from 'react';
import { SentimentAnalysis } from '../types';
import { HeartPulse, ShieldCheck, Flame, Smile, AlertTriangle, ArrowRight, Gauge } from 'lucide-react';

interface SentimentTabProps {
  sentimentAnalysis: SentimentAnalysis;
}

export const SentimentTab: React.FC<SentimentTabProps> = ({ sentimentAnalysis }) => {
  const {
    score,
    primarySentiment,
    polarity,
    sentimentScoreRaw,
    emotionalVectors,
    toneArc,
    riskFlags,
  } = sentimentAnalysis;

  // Raw score is from -1.0 to 1.0, map to 0% to 100% for slider
  const polarityPercent = Math.min(100, Math.max(0, ((sentimentScoreRaw + 1) / 2) * 100));

  const emotionList = [
    { label: 'Trust & Authority', value: emotionalVectors.trustAndAuthority, icon: ShieldCheck, color: 'text-emerald-400', bar: 'bg-emerald-500' },
    { label: 'Persuasiveness', value: emotionalVectors.persuasiveness, icon: Flame, color: 'text-amber-400', bar: 'bg-amber-500' },
    { label: 'Urgency & Drive', value: emotionalVectors.urgency, icon: Gauge, color: 'text-rose-400', bar: 'bg-rose-500' },
    { label: 'Empathy & Warmth', value: emotionalVectors.empathyAndWarmth, icon: Smile, color: 'text-cyan-400', bar: 'bg-cyan-500' },
    { label: 'Clarity vs Jargon', value: emotionalVectors.clarityVersusJargon, icon: HeartPulse, color: 'text-purple-400', bar: 'bg-purple-500' },
  ];

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Polarity & Primary Sentiment Hero Banner */}
      <div className="p-5 rounded-xl bg-slate-900/60 border border-slate-800 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <div className="text-xs uppercase tracking-wider font-semibold text-slate-400">
              Primary Emotional Signature
            </div>
            <div className="flex items-center gap-3 mt-1">
              <span className="text-xl font-bold text-white">{primarySentiment}</span>
              <span
                className={`text-xs px-2.5 py-0.5 rounded-full font-semibold border ${
                  polarity.toLowerCase() === 'positive'
                    ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30'
                    : polarity.toLowerCase() === 'negative'
                    ? 'bg-rose-500/10 text-rose-400 border-rose-500/30'
                    : 'bg-slate-500/10 text-slate-300 border-slate-500/30'
                }`}
              >
                {polarity} Polarity
              </span>
            </div>
          </div>

          <div className="flex items-baseline gap-1 self-end sm:self-center">
            <span className="text-xs text-slate-400">Sentiment Resonance:</span>
            <span className="font-mono text-lg font-bold text-cyan-400">{score}/100</span>
          </div>
        </div>

        {/* Polarity Scale Meter */}
        <div className="pt-2">
          <div className="flex justify-between text-[11px] text-slate-400 font-medium mb-1">
            <span className="text-rose-400">Critical / Skeptical (-1.0)</span>
            <span className="text-slate-400">Objective Neutral (0.0)</span>
            <span className="text-emerald-400">Inspiring / Affirmative (+1.0)</span>
          </div>
          <div className="relative w-full h-3 rounded-full bg-slate-950 border border-slate-800 overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-rose-500/30 via-slate-600/30 to-emerald-500/30" />
            <div
              className="absolute top-0 bottom-0 w-2.5 bg-white rounded-full shadow-lg shadow-white/50 -translate-x-1/2 transition-all duration-700"
              style={{ left: `${polarityPercent}%` }}
            />
          </div>
          <div className="text-right text-[11px] font-mono text-slate-400 mt-1">
            Raw Polarity Index: {sentimentScoreRaw > 0 ? `+${sentimentScoreRaw.toFixed(2)}` : sentimentScoreRaw.toFixed(2)}
          </div>
        </div>
      </div>

      {/* 5 Emotional Vectors Breakdown */}
      <div className="bg-slate-900/50 border border-slate-800 rounded-xl p-5 space-y-4">
        <h4 className="text-xs uppercase tracking-wider font-semibold text-slate-400">
          Multi-Vector Emotional Breakdown
        </h4>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {emotionList.map((item) => {
            const Icon = item.icon;
            return (
              <div key={item.label} className="p-3.5 rounded-lg bg-slate-950/60 border border-slate-800/80">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <Icon className={`h-4 w-4 ${item.color}`} />
                    <span className="text-xs font-semibold text-slate-200">{item.label}</span>
                  </div>
                  <span className="font-mono text-xs font-bold text-slate-200">{item.value}%</span>
                </div>
                <div className="w-full h-2 rounded-full bg-slate-800 overflow-hidden">
                  <div
                    className={`h-full rounded-full ${item.bar} transition-all duration-700`}
                    style={{ width: `${item.value}%` }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Narrative Tone Arc */}
      <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-5 space-y-4">
        <h4 className="text-xs uppercase tracking-wider font-semibold text-slate-300 flex items-center gap-2">
          <HeartPulse className="h-4 w-4 text-cyan-400" />
          Narrative Tone Progression Arc
        </h4>
        <p className="text-xs text-slate-400">
          Tracks the emotional tone and psychological temperature from start to finish:
        </p>

        <div className="space-y-3 pt-1">
          {toneArc.map((arc, idx) => (
            <div
              key={idx}
              className="p-3.5 rounded-lg bg-slate-950/60 border border-slate-800/80 flex flex-col sm:flex-row sm:items-center justify-between gap-2"
            >
              <div className="flex items-center gap-3">
                <div className="h-6 w-6 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center font-mono text-[11px] font-bold text-cyan-400 shrink-0">
                  {idx + 1}
                </div>
                <div>
                  <div className="text-xs font-bold text-slate-200 flex items-center gap-2">
                    {arc.section}
                    <span className="text-[11px] font-medium text-slate-400">({arc.detectedTone})</span>
                  </div>
                  <p className="text-xs text-slate-400 mt-0.5">{arc.note}</p>
                </div>
              </div>

              <div className="self-end sm:self-center shrink-0">
                <span
                  className={`text-[10px] font-semibold px-2 py-0.5 rounded border ${
                    arc.impact.toLowerCase() === 'positive'
                      ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30'
                      : arc.impact.toLowerCase() === 'warning'
                      ? 'bg-amber-500/10 text-amber-400 border-amber-500/30'
                      : 'bg-slate-500/10 text-slate-400 border-slate-500/30'
                  }`}
                >
                  {arc.impact}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Tonal Risk Flags */}
      {riskFlags && riskFlags.length > 0 && (
        <div className="p-4 rounded-xl bg-amber-950/20 border border-amber-800/30 space-y-2">
          <div className="flex items-center gap-2 text-amber-400 text-xs font-semibold uppercase tracking-wider">
            <AlertTriangle className="h-4 w-4" />
            Linguistic Tone Risk Flags ({riskFlags.length})
          </div>
          <ul className="space-y-1.5 pt-1">
            {riskFlags.map((risk, idx) => (
              <li key={idx} className="text-xs text-amber-200/90 flex items-start gap-2">
                <span className="text-amber-400 font-bold">•</span>
                <span>{risk}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};
