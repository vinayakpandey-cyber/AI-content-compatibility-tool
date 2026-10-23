import React from 'react';
import { LlmVisibilityAndGEO } from '../types';
import { Bot, Sparkles, Quote, Search, ShieldAlert, CheckCircle, Database, FileText, Share2, Layers } from 'lucide-react';

interface GeoTabProps {
  llmVisibility: LlmVisibilityAndGEO;
}

export const GeoTab: React.FC<GeoTabProps> = ({ llmVisibility }) => {
  const {
    citationProbabilityScore,
    verdict,
    metrics,
    simulatedAiSearchCard,
    topTriggerQueries,
    goldenCitationSnippets,
    aiVisibilityBlockers,
  } = llmVisibility;

  const geoMetricsList = [
    { label: 'Fact & Data Density', value: metrics.factAndDataDensity, description: 'Empirical stats, benchmarks & quantifiable claims' },
    { label: 'Information Gain', value: metrics.informationGain, description: 'Novel insights vs generic AI-regurgitated consensus' },
    { label: 'Snippet Quotability', value: metrics.snippetQuotability, description: 'Crisp declarative sentences easily extracted as answers' },
    { label: 'Semantic Structure', value: metrics.semanticStructure, description: 'H2/H3 hierarchy, bulleted lists & schema-ready layout' },
    { label: 'Hallucination Resistance', value: metrics.hallucinationResistance, description: 'Unambiguous entity naming, explicit subjects vs vague pronouns' },
  ];

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Top Banner: AI Citation Probability */}
      <div className="p-5 rounded-xl bg-gradient-to-r from-cyan-950/40 via-slate-900 to-indigo-950/30 border border-cyan-800/40 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3.5">
          <div className="p-2.5 rounded-xl bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
            <Bot className="h-6 w-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs uppercase tracking-wider font-semibold text-cyan-400">
                Generative Engine Optimization (GEO)
              </span>
              <span className="text-[10px] bg-cyan-500/20 text-cyan-300 px-2 py-0.5 rounded-full font-mono">
                Perplexity • ChatGPT Search • Google AI Overviews
              </span>
            </div>
            <div className="text-lg font-bold text-white mt-0.5">
              Citation Probability: {verdict}
            </div>
          </div>
        </div>

        <div className="flex items-baseline gap-1 self-end sm:self-center px-4 py-2 rounded-xl bg-slate-950/80 border border-cyan-500/30">
          <span className="font-mono text-2xl font-black text-cyan-300">{citationProbabilityScore}</span>
          <span className="text-xs text-slate-400">/100</span>
        </div>
      </div>

      {/* Simulated AI Search Card (The Perplexity / ChatGPT Answer Mockup) */}
      <div className="bg-slate-900/80 border border-cyan-500/30 rounded-2xl p-5 shadow-2xl relative overflow-hidden">
        <div className="flex items-center justify-between pb-3 border-b border-slate-800 mb-4">
          <div className="flex items-center gap-2">
            <div className="h-3 w-3 rounded-full bg-rose-500/80" />
            <div className="h-3 w-3 rounded-full bg-amber-500/80" />
            <div className="h-3 w-3 rounded-full bg-emerald-500/80" />
            <span className="text-xs font-mono text-slate-400 ml-2">
              Simulated AI Engine Search Synthesis
            </span>
          </div>
          <span className="text-[11px] px-2.5 py-0.5 rounded-full bg-indigo-500/10 text-indigo-300 border border-indigo-500/20 font-medium">
            Status: {simulatedAiSearchCard.citationMentionType}
          </span>
        </div>

        {/* User Query Simulation */}
        <div className="mb-4 flex items-start gap-2.5 bg-slate-950/60 p-3 rounded-xl border border-slate-800">
          <Search className="h-4 w-4 text-cyan-400 shrink-0 mt-0.5" />
          <div>
            <div className="text-[10px] uppercase font-semibold text-slate-500">User Prompt Asked to AI</div>
            <div className="text-xs font-semibold text-slate-200">
              "{simulatedAiSearchCard.query}"
            </div>
          </div>
        </div>

        {/* AI Answer with Citation */}
        <div className="p-4 rounded-xl bg-slate-950/90 border border-slate-800 space-y-3">
          <div className="flex items-center gap-2 text-xs font-semibold text-cyan-400">
            <Sparkles className="h-4 w-4" />
            <span>AI Synthesized Answer:</span>
          </div>
          <p className="text-sm text-slate-200 leading-relaxed font-sans">
            {simulatedAiSearchCard.aiAnswerSummary}
            <span className="inline-flex items-center justify-center ml-1.5 px-1.5 py-0.2 bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 rounded text-[10px] font-mono font-bold cursor-pointer hover:bg-cyan-500 hover:text-slate-950 transition-colors">
              [1]
            </span>
          </p>

          {/* Citation Footnote */}
          <div className="pt-2 border-t border-slate-800/80 flex items-center justify-between text-xs text-slate-400">
            <div className="flex items-center gap-2">
              <span className="font-mono text-cyan-400 font-bold">[1]</span>
              <span className="text-slate-300">Your Content</span>
              <span className="text-[10px] text-emerald-400 bg-emerald-500/10 px-1.5 rounded">
                Direct Citation Verified
              </span>
            </div>
            <span className="text-[11px] text-slate-500">Calculated via semantic chunk matching</span>
          </div>
        </div>
      </div>

      {/* 5 GEO Metrics Breakdown */}
      <div className="bg-slate-900/50 border border-slate-800 rounded-xl p-5 space-y-4">
        <h4 className="text-xs uppercase tracking-wider font-semibold text-slate-400">
          5 Core Generative Engine Optimization (GEO) Vectors
        </h4>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {geoMetricsList.map((m) => (
            <div key={m.label} className="p-3.5 rounded-lg bg-slate-950/60 border border-slate-800/80">
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-xs font-semibold text-slate-200">{m.label}</span>
                <span className="font-mono text-xs font-bold text-cyan-400">{m.value}%</span>
              </div>
              <div className="w-full h-2 rounded-full bg-slate-800 overflow-hidden mb-1.5">
                <div
                  className={`h-full rounded-full transition-all duration-700 ${
                    m.value >= 80
                      ? 'bg-emerald-500'
                      : m.value >= 60
                      ? 'bg-cyan-500'
                      : 'bg-amber-500'
                  }`}
                  style={{ width: `${m.value}%` }}
                />
              </div>
              <p className="text-[11px] text-slate-400 leading-snug">{m.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Golden Citation Snippets & Trigger Queries */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        {/* Golden Citation Snippets */}
        <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-5 space-y-3">
          <div className="flex items-center gap-2 text-cyan-400">
            <Quote className="h-4 w-4" />
            <h4 className="text-xs uppercase tracking-wider font-semibold text-slate-200">
              Extracted Golden Citation Snippets ({goldenCitationSnippets.length})
            </h4>
          </div>
          <p className="text-xs text-slate-400">
            These are the exact passages in your text formatted optimally for an LLM to quote verbatim:
          </p>

          <div className="space-y-3 pt-1">
            {goldenCitationSnippets.map((snippet, idx) => (
              <div
                key={idx}
                className="p-3 rounded-lg bg-slate-950/80 border border-cyan-900/30 space-y-2"
              >
                <div className="text-xs text-slate-200 italic border-l-2 border-cyan-400 pl-2.5">
                  "{snippet.quoteText}"
                </div>
                <div className="text-[11px] text-cyan-300/80 flex items-center gap-1.5 pt-0.5">
                  <CheckCircle className="h-3 w-3 text-cyan-400 shrink-0" />
                  <span>Why LLMs cite this: {snippet.whyCitable}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Top Trigger Search Queries */}
        <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-5 space-y-3">
          <div className="flex items-center gap-2 text-indigo-400">
            <Search className="h-4 w-4" />
            <h4 className="text-xs uppercase tracking-wider font-semibold text-slate-200">
              High-Probability AI Trigger Queries ({topTriggerQueries.length})
            </h4>
          </div>
          <p className="text-xs text-slate-400">
            Search prompts in ChatGPT Search or Perplexity where this content will be pulled into the context window:
          </p>

          <div className="space-y-2 pt-1">
            {topTriggerQueries.map((query, idx) => (
              <div
                key={idx}
                className="p-2.5 rounded-lg bg-indigo-950/20 border border-indigo-900/30 text-xs text-indigo-200 flex items-center gap-2"
              >
                <span className="font-mono text-[10px] text-indigo-400 font-bold shrink-0">
                  #{idx + 1}
                </span>
                <span>{query}</span>
              </div>
            ))}
          </div>

          {/* AI Visibility Blockers */}
          {aiVisibilityBlockers && aiVisibilityBlockers.length > 0 && (
            <div className="pt-3 border-t border-slate-800/80 space-y-2">
              <div className="text-xs font-semibold text-amber-400 flex items-center gap-1.5">
                <ShieldAlert className="h-3.5 w-3.5" />
                Citation Vulnerabilities & Blockers:
              </div>
              <ul className="space-y-1">
                {aiVisibilityBlockers.map((blocker, idx) => (
                  <li key={idx} className="text-xs text-slate-300 flex items-start gap-2">
                    <span className="text-amber-400 font-bold">×</span>
                    <span>{blocker}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
