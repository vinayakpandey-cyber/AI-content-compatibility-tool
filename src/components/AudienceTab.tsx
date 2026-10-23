import React from 'react';
import { AudienceAlignment } from '../types';
import { Users, CheckCircle, AlertTriangle, HelpCircle, Target, ArrowRight } from 'lucide-react';

interface AudienceTabProps {
  audienceAlignment: AudienceAlignment;
  targetAudiencePrompt: string;
}

export const AudienceTab: React.FC<AudienceTabProps> = ({
  audienceAlignment,
  targetAudiencePrompt,
}) => {
  const { score, personaVerdict, breakdown, keyStrengths, frictionPoints, unaddressedQuestions } =
    audienceAlignment;

  const breakdownMetrics = [
    { label: 'Pain Point Coverage', value: breakdown.painPointCoverage, description: 'Directly addresses reader frustrations' },
    { label: 'Vocabulary Suitability', value: breakdown.vocabularySuitability, description: 'Tone & language level matches persona expertise' },
    { label: 'Value Proposition Clarity', value: breakdown.valuePropositionClarity, description: 'Clear expression of benefit and differentiation' },
    { label: 'Call to Action (CTA)', value: breakdown.callToActionEffectiveness, description: 'Clear, compelling, friction-free next step' },
    { label: 'Empathy & Relatability', value: breakdown.empathyRelatability, description: 'Demonstrates authentic understanding of the reader' },
  ];

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Target Persona Context Bar */}
      <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-blue-500/10 text-blue-400 border border-blue-500/20">
            <Target className="h-5 w-5" />
          </div>
          <div>
            <div className="text-xs uppercase font-semibold text-slate-400">Target Persona Defined</div>
            <div className="text-sm font-medium text-slate-200 line-clamp-2">
              {targetAudiencePrompt || 'General Professional Decision-Maker'}
            </div>
          </div>
        </div>
        <div className="flex items-center gap-2 self-end sm:self-center">
          <span className="text-xs text-slate-400">Persona Fit:</span>
          <span
            className={`px-3 py-1 rounded-full text-xs font-bold border ${
              score >= 80
                ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30'
                : score >= 60
                ? 'bg-amber-500/10 text-amber-400 border-amber-500/30'
                : 'bg-rose-500/10 text-rose-400 border-rose-500/30'
            }`}
          >
            {score}/100 • {score >= 80 ? 'High Fit' : score >= 60 ? 'Moderate Fit' : 'Poor Fit'}
          </span>
        </div>
      </div>

      {/* Persona Verdict Callout */}
      <div className="p-5 rounded-xl bg-gradient-to-r from-blue-950/30 via-slate-900/80 to-slate-900/80 border border-blue-900/40">
        <h3 className="text-sm font-semibold text-blue-300 mb-1 flex items-center gap-2">
          <Users className="h-4 w-4" />
          Audience Resonance Analysis
        </h3>
        <p className="text-sm text-slate-200 leading-relaxed">{personaVerdict}</p>
      </div>

      {/* Breakdown Bar Gauges */}
      <div className="bg-slate-900/50 border border-slate-800 rounded-xl p-5 space-y-4">
        <h4 className="text-xs uppercase tracking-wider font-semibold text-slate-400">
          Core Audience Alignment Vectors
        </h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {breakdownMetrics.map((metric) => (
            <div key={metric.label} className="p-3 rounded-lg bg-slate-950/50 border border-slate-800/80">
              <div className="flex justify-between items-center mb-1.5">
                <span className="text-xs font-semibold text-slate-200">{metric.label}</span>
                <span className="font-mono text-xs font-bold text-cyan-400">{metric.value}%</span>
              </div>
              <div className="w-full h-2 rounded-full bg-slate-800 overflow-hidden mb-1">
                <div
                  className={`h-full rounded-full transition-all duration-700 ${
                    metric.value >= 80
                      ? 'bg-emerald-500'
                      : metric.value >= 60
                      ? 'bg-amber-500'
                      : 'bg-rose-500'
                  }`}
                  style={{ width: `${metric.value}%` }}
                />
              </div>
              <p className="text-[11px] text-slate-400">{metric.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Two Column: Strengths vs Friction Points */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {/* Strengths */}
        <div className="p-5 rounded-xl bg-slate-900/50 border border-slate-800 space-y-3">
          <h4 className="text-xs uppercase tracking-wider font-semibold text-emerald-400 flex items-center gap-2">
            <CheckCircle className="h-4 w-4 text-emerald-400" />
            Audience Connection Strengths ({keyStrengths.length})
          </h4>
          <ul className="space-y-2">
            {keyStrengths.map((str, idx) => (
              <li
                key={idx}
                className="text-xs text-slate-200 flex items-start gap-2 bg-emerald-500/5 p-2.5 rounded-lg border border-emerald-500/10"
              >
                <span className="text-emerald-400 font-bold shrink-0">✓</span>
                <span>{str}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Friction Points */}
        <div className="p-5 rounded-xl bg-slate-900/50 border border-slate-800 space-y-3">
          <h4 className="text-xs uppercase tracking-wider font-semibold text-amber-400 flex items-center gap-2">
            <AlertTriangle className="h-4 w-4 text-amber-400" />
            Cognitive Friction Points ({frictionPoints.length})
          </h4>
          <ul className="space-y-2">
            {frictionPoints.map((fric, idx) => (
              <li
                key={idx}
                className="text-xs text-slate-200 flex items-start gap-2 bg-amber-500/5 p-2.5 rounded-lg border border-amber-500/10"
              >
                <span className="text-amber-400 font-bold shrink-0">!</span>
                <span>{fric}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Unaddressed Reader Questions */}
      <div className="p-5 rounded-xl bg-slate-900/60 border border-slate-800 space-y-3">
        <div className="flex items-center gap-2 text-purple-400">
          <HelpCircle className="h-4 w-4" />
          <h4 className="text-xs uppercase tracking-wider font-semibold">
            Unaddressed Reader Objections & Questions
          </h4>
        </div>
        <p className="text-xs text-slate-400">
          These are the natural questions your target reader asks themselves after reading, which your current copy leaves unresolved:
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
          {unaddressedQuestions.map((q, idx) => (
            <div
              key={idx}
              className="p-3 rounded-lg bg-purple-950/20 border border-purple-800/30 text-xs text-purple-200 flex items-start gap-2"
            >
              <ArrowRight className="h-3.5 w-3.5 text-purple-400 shrink-0 mt-0.5" />
              <span>{q}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
