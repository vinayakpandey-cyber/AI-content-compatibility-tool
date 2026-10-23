import React, { useState } from 'react';
import { KeywordOptimization, DetectedKeyword } from '../types';
import { Search, Hash, AlertOctagon, CheckCircle2, Sparkles, Filter, ExternalLink } from 'lucide-react';

interface KeywordTabProps {
  keywordOptimization: KeywordOptimization;
  onHighlightTerm?: (term: string) => void;
  activeHighlightedTerm?: string;
}

export const KeywordTab: React.FC<KeywordTabProps> = ({
  keywordOptimization,
  onHighlightTerm,
  activeHighlightedTerm,
}) => {
  const { score, summary, detectedKeywords, missingSemanticEntities, placementAudit } =
    keywordOptimization;

  const [intentFilter, setIntentFilter] = useState<string>('all');

  const filteredKeywords = detectedKeywords.filter((k) => {
    if (intentFilter === 'all') return true;
    return k.searchIntent.toLowerCase() === intentFilter.toLowerCase();
  });

  const getIntentBadgeColor = (intent: string) => {
    switch (intent.toLowerCase()) {
      case 'informational':
        return 'bg-blue-500/10 text-blue-400 border-blue-500/20';
      case 'commercial':
        return 'bg-amber-500/10 text-amber-400 border-amber-500/20';
      case 'transactional':
        return 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20';
      case 'navigational':
        return 'bg-purple-500/10 text-purple-400 border-purple-500/20';
      default:
        return 'bg-slate-500/10 text-slate-400 border-slate-500/20';
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status.toLowerCase()) {
      case 'optimal':
        return 'text-emerald-400 bg-emerald-500/10 border-emerald-500/30';
      case 'underused':
        return 'text-amber-400 bg-amber-500/10 border-amber-500/30';
      case 'overused':
        return 'text-rose-400 bg-rose-500/10 border-rose-500/30';
      default:
        return 'text-slate-300 bg-slate-800 border-slate-700';
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Placement Audit & Quick Health Banner */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {/* Placement Checklist */}
        <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 space-y-2">
          <div className="text-[11px] uppercase tracking-wider font-semibold text-slate-400">
            Hook / Intro Placement
          </div>
          <div className="flex items-center gap-2">
            {placementAudit.hookPresence ? (
              <span className="flex items-center gap-1.5 text-xs font-semibold text-emerald-400">
                <CheckCircle2 className="h-4 w-4" /> Present in Hook
              </span>
            ) : (
              <span className="flex items-center gap-1.5 text-xs font-semibold text-amber-400">
                <AlertOctagon className="h-4 w-4" /> Missing in Hook
              </span>
            )}
          </div>
          <p className="text-[11px] text-slate-400">Target terms in the opening 100 words.</p>
        </div>

        <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 space-y-2">
          <div className="text-[11px] uppercase tracking-wider font-semibold text-slate-400">
            Headers / Subheadings
          </div>
          <div className="flex items-center gap-2">
            {placementAudit.headerPresence ? (
              <span className="flex items-center gap-1.5 text-xs font-semibold text-emerald-400">
                <CheckCircle2 className="h-4 w-4" /> Integrated in Headers
              </span>
            ) : (
              <span className="flex items-center gap-1.5 text-xs font-semibold text-amber-400">
                <AlertOctagon className="h-4 w-4" /> None in Subheadings
              </span>
            )}
          </div>
          <p className="text-[11px] text-slate-400">Essential for structural search indexing.</p>
        </div>

        <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 space-y-2">
          <div className="text-[11px] uppercase tracking-wider font-semibold text-slate-400">
            Conclusion & CTA Anchor
          </div>
          <div className="flex items-center gap-2">
            {placementAudit.conclusionPresence ? (
              <span className="flex items-center gap-1.5 text-xs font-semibold text-emerald-400">
                <CheckCircle2 className="h-4 w-4" /> Anchored at Closing
              </span>
            ) : (
              <span className="flex items-center gap-1.5 text-xs font-semibold text-slate-400">
                Weak Closing Presence
              </span>
            )}
          </div>
          <p className="text-[11px] text-slate-400">Reinforces search intent before user exit.</p>
        </div>

        <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 space-y-2">
          <div className="text-[11px] uppercase tracking-wider font-semibold text-slate-400">
            Stuffing / Over-Optimization
          </div>
          <div className="flex items-center gap-2">
            <span
              className={`px-2 py-0.5 rounded text-xs font-bold border ${
                placementAudit.keywordStuffingRisk.toLowerCase() === 'low'
                  ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30'
                  : 'bg-rose-500/10 text-rose-400 border-rose-500/30'
              }`}
            >
              {placementAudit.keywordStuffingRisk} Risk
            </span>
          </div>
          <p className="text-[11px] text-slate-400">Natural linguistic variation maintained.</p>
        </div>
      </div>

      {/* Summary Note */}
      <div className="p-4 rounded-xl bg-slate-900/50 border border-slate-800 text-sm text-slate-300 leading-relaxed">
        <span className="text-cyan-400 font-semibold mr-1">Semantic Assessment:</span>
        {summary}
      </div>

      {/* Detected Keywords Table */}
      <div className="bg-slate-900/60 border border-slate-800 rounded-xl overflow-hidden shadow-sm">
        <div className="p-4 border-b border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-slate-900/80">
          <div>
            <h3 className="text-sm font-semibold text-slate-200 flex items-center gap-2">
              <Hash className="h-4 w-4 text-cyan-400" />
              Detected Keywords & Frequency Analysis ({detectedKeywords.length})
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">
              Click any term to highlight occurrences in your content editor
            </p>
          </div>

          {/* Filter Pills */}
          <div className="flex items-center gap-1.5 flex-wrap">
            <span className="text-xs text-slate-500 mr-1 flex items-center gap-1">
              <Filter className="h-3 w-3" /> Intent:
            </span>
            {['all', 'informational', 'commercial', 'transactional'].map((intent) => (
              <button
                key={intent}
                onClick={() => setIntentFilter(intent)}
                className={`px-2.5 py-1 rounded-md text-xs font-medium capitalize transition-colors ${
                  intentFilter === intent
                    ? 'bg-cyan-500 text-slate-950 font-bold'
                    : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                }`}
              >
                {intent}
              </button>
            ))}
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-950/80 text-slate-400 uppercase tracking-wider text-[10px] border-b border-slate-800">
              <tr>
                <th className="py-3 px-4">Keyword / Concept</th>
                <th className="py-3 px-3 text-center">Count</th>
                <th className="py-3 px-3 text-center">Density</th>
                <th className="py-3 px-3">Search Intent</th>
                <th className="py-3 px-3">Status</th>
                <th className="py-3 px-4">Actionable Guidance</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {filteredKeywords.map((kw, idx) => {
                const isHighlighted =
                  activeHighlightedTerm?.toLowerCase() === kw.term.toLowerCase();

                return (
                  <tr
                    key={idx}
                    onClick={() => onHighlightTerm?.(kw.term)}
                    className={`hover:bg-slate-800/40 cursor-pointer transition-colors ${
                      isHighlighted ? 'bg-cyan-500/10' : ''
                    }`}
                  >
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-2">
                        <span className="font-semibold text-slate-200">{kw.term}</span>
                        {isHighlighted && (
                          <span className="text-[10px] px-1.5 py-0.2 bg-cyan-500 text-slate-950 font-bold rounded">
                            Active
                          </span>
                        )}
                      </div>
                    </td>
                    <td className="py-3 px-3 text-center font-mono text-slate-300">
                      {kw.count}x
                    </td>
                    <td className="py-3 px-3 text-center font-mono font-bold text-slate-200">
                      {kw.densityPercent}%
                    </td>
                    <td className="py-3 px-3">
                      <span
                        className={`px-2 py-0.5 rounded text-[11px] font-medium border ${getIntentBadgeColor(
                          kw.searchIntent
                        )}`}
                      >
                        {kw.searchIntent}
                      </span>
                    </td>
                    <td className="py-3 px-3">
                      <span
                        className={`px-2 py-0.5 rounded text-[11px] font-semibold border ${getStatusBadge(
                          kw.status
                        )}`}
                      >
                        {kw.status}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-slate-300">
                      {kw.recommendation}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Missing Semantic Entities / Topical Gaps */}
      <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-5 space-y-4">
        <div className="flex items-center gap-2">
          <Sparkles className="h-4 w-4 text-amber-400" />
          <h3 className="text-sm font-semibold text-slate-200">
            Missing High-Value Semantic Entities (Topical Gaps)
          </h3>
        </div>
        <p className="text-xs text-slate-400">
          Search engines and AI algorithms compare your content against comprehensive knowledge graphs.
          Adding these missing entities will build topical authority and improve ranking depth:
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-1">
          {missingSemanticEntities.map((item, idx) => (
            <div
              key={idx}
              className="p-3.5 rounded-xl bg-slate-950/60 border border-slate-800/80 hover:border-slate-700 transition-colors"
            >
              <div className="flex items-center justify-between gap-2 mb-1.5">
                <span className="text-xs font-bold text-slate-100 flex items-center gap-1.5">
                  <span className="h-1.5 w-1.5 rounded-full bg-amber-400" />
                  {item.entity}
                </span>
                <span
                  className={`text-[10px] font-semibold px-2 py-0.5 rounded border ${
                    item.importance.toLowerCase() === 'critical'
                      ? 'bg-rose-500/10 text-rose-400 border-rose-500/30'
                      : item.importance.toLowerCase() === 'recommended'
                      ? 'bg-amber-500/10 text-amber-400 border-amber-500/30'
                      : 'bg-slate-500/10 text-slate-400 border-slate-500/30'
                  }`}
                >
                  {item.importance}
                </span>
              </div>
              <p className="text-xs text-slate-400 leading-normal">{item.contextSuggestion}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
