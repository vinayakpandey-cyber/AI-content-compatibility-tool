import React, { useState } from 'react';
import { ActionableRecommendation, RewriteResult } from '../types';
import {
  Wand2,
  Check,
  Copy,
  ArrowRight,
  Sparkles,
  RefreshCw,
  Sliders,
  Filter,
  CheckCircle,
  FileText,
  TrendingUp,
} from 'lucide-react';

interface RecommendationsAndRewriteProps {
  recommendations: ActionableRecommendation[];
  originalContent: string;
  audience: string;
  keywords: string;
  onApplyOptimizedText: (newText: string) => void;
}

export const RecommendationsAndRewrite: React.FC<RecommendationsAndRewriteProps> = ({
  recommendations,
  originalContent,
  audience,
  keywords,
  onApplyOptimizedText,
}) => {
  const [priorityFilter, setPriorityFilter] = useState<string>('all');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');
  const [rewriteMode, setRewriteMode] = useState<string>('Comprehensive Master Optimization');
  const [isRewriting, setIsRewriting] = useState<boolean>(false);
  const [rewriteResult, setRewriteResult] = useState<RewriteResult | null>(null);
  const [copied, setCopied] = useState<boolean>(false);
  const [diffViewMode, setDiffViewMode] = useState<'split' | 'optimized'>('split');

  const filteredRecs = recommendations.filter((r) => {
    if (priorityFilter !== 'all' && r.priority.toLowerCase() !== priorityFilter.toLowerCase()) {
      return false;
    }
    if (categoryFilter !== 'all' && r.category.toLowerCase() !== categoryFilter.toLowerCase()) {
      return false;
    }
    return true;
  });

  const handleRewrite = async () => {
    setIsRewriting(true);
    try {
      const response = await fetch('/api/rewrite', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          content: originalContent,
          mode: rewriteMode,
          audience,
          keywords,
          auditRecommendations: recommendations.slice(0, 5),
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to optimize content.');
      }

      const data: RewriteResult = await response.json();
      setRewriteResult(data);
    } catch (err: any) {
      console.error(err);
    } finally {
      setIsRewriting(false);
    }
  };

  const handleCopy = () => {
    if (!rewriteResult) return;
    navigator.clipboard.writeText(rewriteResult.optimizedContent);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {/* SECTION 1: AI REWRITE & OPTIMIZATION STUDIO */}
      <div className="p-6 rounded-2xl bg-gradient-to-b from-indigo-950/40 to-slate-900 border border-indigo-500/30 shadow-2xl space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
              <Wand2 className="h-6 w-6" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                1-Click Content Optimizer & Rewriter
                <span className="text-[10px] bg-indigo-500/20 text-indigo-300 px-2 py-0.5 rounded-full font-mono">
                  Autonomous Fixer
                </span>
              </h3>
              <p className="text-xs text-slate-400">
                Transform this draft automatically according to the audit findings.
              </p>
            </div>
          </div>

          <button
            onClick={handleRewrite}
            disabled={isRewriting}
            className="flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-indigo-600 via-cyan-600 to-indigo-600 text-white font-semibold text-xs shadow-lg shadow-indigo-600/30 hover:opacity-95 disabled:opacity-50 transition-all self-start sm:self-auto cursor-pointer"
          >
            {isRewriting ? (
              <>
                <RefreshCw className="h-4 w-4 animate-spin" />
                <span>Optimizing Content...</span>
              </>
            ) : (
              <>
                <Sparkles className="h-4 w-4" />
                <span>Generate Optimized Draft</span>
              </>
            )}
          </button>
        </div>

        {/* Strategy Selector Pills */}
        <div className="space-y-2 pt-1">
          <label className="text-xs font-semibold text-slate-300 flex items-center gap-1.5">
            <Sliders className="h-3.5 w-3.5 text-cyan-400" />
            Select Primary Optimization Strategy:
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
            {[
              {
                id: 'Comprehensive Master Optimization',
                label: 'Master Optimization (All Pillars)',
                desc: 'Audience + Keywords + Sentiment + GEO',
              },
              {
                id: 'Maximize LLM Citation & Snippet Friendliness',
                label: 'Maximize AI Engine Citation (GEO)',
                desc: 'Declarative facts, stats, quotable blocks',
              },
              {
                id: 'Strengthen Target Audience Resonance & Tone',
                label: 'Audience Pain Points & CTAs',
                desc: 'Deeper empathy & objection resolution',
              },
              {
                id: 'Inject Missing High-Value Semantic Keywords',
                label: 'Inject Missing Semantic Entities',
                desc: 'Fill topical knowledge gaps',
              },
              {
                id: 'Balance Emotional Sentiment & Build Authority',
                label: 'Tone & Authority Balancing',
                desc: 'Eliminate friction & passive phrasing',
              },
            ].map((strat) => (
              <button
                key={strat.id}
                onClick={() => setRewriteMode(strat.id)}
                className={`p-2.5 rounded-xl text-left border text-xs transition-all ${
                  rewriteMode === strat.id
                    ? 'bg-indigo-600/20 border-cyan-400 text-white shadow-md shadow-indigo-500/10'
                    : 'bg-slate-950/60 border-slate-800 text-slate-300 hover:border-slate-700'
                }`}
              >
                <div className="font-semibold">{strat.label}</div>
                <div className="text-[11px] text-slate-400 mt-0.5">{strat.desc}</div>
              </button>
            ))}
          </div>
        </div>

        {/* REWRITE RESULTS DISPLAY */}
        {rewriteResult && (
          <div className="pt-4 border-t border-slate-800 space-y-4 animate-in fade-in">
            {/* Top Bar with score delta and actions */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-3.5 rounded-xl bg-emerald-950/20 border border-emerald-500/30">
              <div className="flex items-center gap-2 text-emerald-300 text-xs font-semibold">
                <TrendingUp className="h-4 w-4 text-emerald-400" />
                <span>Projected Score Impact: {rewriteResult.projectedScoreImprovement}</span>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setDiffViewMode(diffViewMode === 'split' ? 'optimized' : 'split')}
                  className="px-3 py-1 rounded-lg bg-slate-800 text-xs font-medium text-slate-200 border border-slate-700 hover:bg-slate-700 transition-colors"
                >
                  {diffViewMode === 'split' ? 'View Optimized Only' : 'Compare Side-by-Side'}
                </button>
                <button
                  onClick={handleCopy}
                  className="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs font-medium text-slate-200 border border-slate-700 transition-colors"
                >
                  {copied ? <Check className="h-3.5 w-3.5 text-emerald-400" /> : <Copy className="h-3.5 w-3.5" />}
                  <span>{copied ? 'Copied' : 'Copy'}</span>
                </button>
                <button
                  onClick={() => onApplyOptimizedText(rewriteResult.optimizedContent)}
                  className="flex items-center gap-1.5 px-3.5 py-1 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-xs font-bold text-slate-950 shadow transition-colors cursor-pointer"
                >
                  <CheckCircle className="h-3.5 w-3.5" />
                  <span>Apply to Editor & Re-Audit</span>
                </button>
              </div>
            </div>

            {/* Changes Made Pills */}
            <div className="space-y-1.5">
              <div className="text-[11px] uppercase font-bold text-slate-400">
                Key Optimizations Applied:
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {rewriteResult.changesMade.map((change, idx) => (
                  <div
                    key={idx}
                    className="p-2 rounded-lg bg-slate-950/60 border border-slate-800 text-xs text-slate-200 flex items-start gap-2"
                  >
                    <span className="text-cyan-400 font-bold shrink-0">✓</span>
                    <span>{change}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Content Display: Split vs Full */}
            {diffViewMode === 'split' ? (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 pt-2">
                <div className="space-y-1.5">
                  <div className="text-xs font-semibold text-slate-400 flex items-center justify-between">
                    <span>Original Draft</span>
                    <span className="text-[10px] bg-slate-800 px-2 py-0.5 rounded">Before</span>
                  </div>
                  <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800/80 text-xs text-slate-400 font-mono whitespace-pre-wrap leading-relaxed max-h-96 overflow-y-auto">
                    {originalContent}
                  </div>
                </div>

                <div className="space-y-1.5">
                  <div className="text-xs font-semibold text-cyan-300 flex items-center justify-between">
                    <span>Optimized AI Revision</span>
                    <span className="text-[10px] bg-cyan-500/20 text-cyan-300 px-2 py-0.5 rounded font-bold">
                      Enhanced
                    </span>
                  </div>
                  <div className="p-4 rounded-xl bg-slate-950/90 border border-cyan-500/40 text-xs text-slate-100 font-mono whitespace-pre-wrap leading-relaxed max-h-96 overflow-y-auto shadow-inner">
                    {rewriteResult.optimizedContent}
                  </div>
                </div>
              </div>
            ) : (
              <div className="space-y-1.5 pt-2">
                <div className="text-xs font-semibold text-cyan-300">Optimized Revision:</div>
                <div className="p-4 rounded-xl bg-slate-950/90 border border-cyan-500/40 text-xs text-slate-100 font-mono whitespace-pre-wrap leading-relaxed max-h-96 overflow-y-auto">
                  {rewriteResult.optimizedContent}
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {/* SECTION 2: PRIORITIZED RECOMMENDATIONS CATALOG */}
      <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h3 className="text-sm font-bold text-slate-100 flex items-center gap-2">
              <CheckCircle className="h-4 w-4 text-cyan-400" />
              Prioritized Action Items ({recommendations.length})
            </h3>
            <p className="text-xs text-slate-400">
              Specific issues identified in the audit with concrete before & after recommendations.
            </p>
          </div>

          {/* Filters */}
          <div className="flex items-center gap-2 flex-wrap">
            <div className="flex items-center gap-1 bg-slate-950 px-2 py-1 rounded-lg border border-slate-800 text-xs text-slate-300">
              <span className="text-[10px] text-slate-500 uppercase font-semibold">Priority:</span>
              {['all', 'high', 'medium'].map((p) => (
                <button
                  key={p}
                  onClick={() => setPriorityFilter(p)}
                  className={`px-2 py-0.5 rounded capitalize ${
                    priorityFilter === p
                      ? 'bg-cyan-500 text-slate-950 font-bold'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  {p}
                </button>
              ))}
            </div>

            <div className="flex items-center gap-1 bg-slate-950 px-2 py-1 rounded-lg border border-slate-800 text-xs text-slate-300">
              <span className="text-[10px] text-slate-500 uppercase font-semibold">Category:</span>
              {['all', 'Audience', 'Keyword', 'Sentiment', 'AI Citation'].map((c) => (
                <button
                  key={c}
                  onClick={() => setCategoryFilter(c)}
                  className={`px-2 py-0.5 rounded ${
                    categoryFilter === c
                      ? 'bg-cyan-500 text-slate-950 font-bold'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  {c}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Recommendations Cards */}
        <div className="space-y-4">
          {filteredRecs.map((rec) => (
            <div
              key={rec.id}
              className="p-4 rounded-xl bg-slate-950/70 border border-slate-800/80 space-y-3 hover:border-slate-700 transition-colors"
            >
              <div className="flex items-center justify-between gap-3">
                <div className="flex items-center gap-2">
                  <span
                    className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full border ${
                      rec.priority.toLowerCase() === 'high'
                        ? 'bg-rose-500/10 text-rose-400 border-rose-500/30'
                        : rec.priority.toLowerCase() === 'medium'
                        ? 'bg-amber-500/10 text-amber-400 border-amber-500/30'
                        : 'bg-slate-500/10 text-slate-400 border-slate-500/30'
                    }`}
                  >
                    {rec.priority} Priority
                  </span>
                  <span className="text-xs px-2 py-0.5 rounded bg-slate-900 text-slate-300 border border-slate-800">
                    {rec.category}
                  </span>
                  <span className="text-sm font-semibold text-slate-100">{rec.title}</span>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
                <div className="space-y-1">
                  <span className="text-[10px] uppercase font-bold text-rose-400">Current Issue:</span>
                  <p className="text-slate-300 leading-relaxed">{rec.issue}</p>
                </div>
                <div className="space-y-1">
                  <span className="text-[10px] uppercase font-bold text-emerald-400">
                    Recommended Fix:
                  </span>
                  <p className="text-slate-300 leading-relaxed">{rec.recommendation}</p>
                </div>
              </div>

              {/* Before vs After Snippet Box */}
              {(rec.currentSnippet || rec.suggestedSnippet) && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 border-t border-slate-800/80">
                  {rec.currentSnippet && (
                    <div className="p-2.5 rounded-lg bg-rose-950/10 border border-rose-900/30 text-xs">
                      <div className="text-[10px] font-mono text-rose-400 font-bold mb-1">
                        Current Phrasing:
                      </div>
                      <div className="text-slate-300 italic">"{rec.currentSnippet}"</div>
                    </div>
                  )}

                  {rec.suggestedSnippet && (
                    <div className="p-2.5 rounded-lg bg-emerald-950/10 border border-emerald-900/30 text-xs">
                      <div className="text-[10px] font-mono text-emerald-400 font-bold mb-1">
                        Suggested Replacement:
                      </div>
                      <div className="text-slate-200 font-medium">"{rec.suggestedSnippet}"</div>
                    </div>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
