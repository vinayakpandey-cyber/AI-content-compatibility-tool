import React from 'react';
import { ScoreGauge } from './ScoreGauge';
import { AuditResult } from '../types';
import { Users, Search, HeartPulse, Bot, Clock, BookOpen, FileCheck, CheckCircle2 } from 'lucide-react';

interface AuditSummaryHeroProps {
  audit: AuditResult;
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export const AuditSummaryHero: React.FC<AuditSummaryHeroProps> = ({
  audit,
  activeTab,
  setActiveTab,
}) => {
  const { overallScore, letterGrade, executiveSummary, readingStats } = audit;

  const categories = [
    {
      id: 'audience',
      name: 'Audience Reach',
      score: audit.audienceAlignment.score,
      icon: Users,
      color: 'from-blue-500/20 to-indigo-500/10 border-blue-500/30 text-blue-400',
      description: audit.audienceAlignment.personaVerdict,
    },
    {
      id: 'keywords',
      name: 'Keyword & Semantics',
      score: audit.keywordOptimization.score,
      icon: Search,
      color: 'from-purple-500/20 to-pink-500/10 border-purple-500/30 text-purple-400',
      description: `${audit.keywordOptimization.detectedKeywords.length} terms extracted, ${audit.keywordOptimization.missingSemanticEntities.length} topical gaps`,
    },
    {
      id: 'sentiment',
      name: 'Sentiment & Tone',
      score: audit.sentimentAnalysis.score,
      icon: HeartPulse,
      color: 'from-amber-500/20 to-rose-500/10 border-amber-500/30 text-amber-400',
      description: `${audit.sentimentAnalysis.primarySentiment} (${audit.sentimentAnalysis.polarity})`,
    },
    {
      id: 'llm',
      name: 'LLM Citation & GEO',
      score: audit.llmVisibilityAndGEO.citationProbabilityScore,
      icon: Bot,
      color: 'from-cyan-500/20 to-emerald-500/10 border-cyan-500/30 text-cyan-400',
      description: audit.llmVisibilityAndGEO.verdict,
    },
  ];

  return (
    <div className="bg-slate-900/70 border border-slate-800 rounded-2xl p-6 shadow-xl backdrop-blur-sm space-y-6">
      {/* Top row: Overall Score & Executive Verdict */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
        {/* Radial gauge */}
        <div className="md:col-span-3 flex justify-center border-b md:border-b-0 md:border-r border-slate-800/80 pb-6 md:pb-0 md:pr-6">
          <ScoreGauge
            score={overallScore}
            size={135}
            strokeWidth={11}
            label="Overall Content Health"
            showGrade={letterGrade}
          />
        </div>

        {/* Executive summary & reading stats */}
        <div className="md:col-span-9 space-y-4">
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold uppercase tracking-wider bg-indigo-500/10 text-indigo-300 border border-indigo-500/30 flex items-center gap-1.5">
              <FileCheck className="h-3.5 w-3.5" />
              Executive Audit Verdict
            </span>
            <span className="text-xs text-slate-400">
              Evaluated against Target Persona & Generative AI Indexing
            </span>
          </div>

          <p className="text-base font-medium text-slate-100 leading-relaxed">
            {executiveSummary}
          </p>

          {/* Reading Stats Pills */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
            <div className="flex items-center gap-2.5 px-3 py-2 rounded-xl bg-slate-950/60 border border-slate-800/70">
              <BookOpen className="h-4 w-4 text-slate-400" />
              <div>
                <div className="text-[11px] text-slate-400 uppercase font-semibold">Word Count</div>
                <div className="text-sm font-bold text-slate-200">
                  {readingStats.wordCount.toLocaleString()} words
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2.5 px-3 py-2 rounded-xl bg-slate-950/60 border border-slate-800/70">
              <Clock className="h-4 w-4 text-slate-400" />
              <div>
                <div className="text-[11px] text-slate-400 uppercase font-semibold">Reading Time</div>
                <div className="text-sm font-bold text-slate-200">
                  {readingStats.readingTimeMinutes} min read
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2.5 px-3 py-2 rounded-xl bg-slate-950/60 border border-slate-800/70">
              <CheckCircle2 className="h-4 w-4 text-cyan-400" />
              <div>
                <div className="text-[11px] text-slate-400 uppercase font-semibold">Readability</div>
                <div className="text-xs font-bold text-slate-200 truncate max-w-[120px]" title={readingStats.readabilityLevel}>
                  {readingStats.readabilityLevel}
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2.5 px-3 py-2 rounded-xl bg-slate-950/60 border border-slate-800/70">
              <div className="h-2 w-2 rounded-full bg-indigo-400" />
              <div>
                <div className="text-[11px] text-slate-400 uppercase font-semibold">Syntax Style</div>
                <div className="text-xs font-bold text-slate-200">{readingStats.sentenceComplexity}</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 4 Pillars Interactive Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-2">
        {categories.map((cat) => {
          const Icon = cat.icon;
          const isActive = activeTab === cat.id;

          return (
            <button
              key={cat.id}
              onClick={() => setActiveTab(cat.id)}
              className={`p-4 rounded-xl text-left border transition-all relative overflow-hidden group ${
                isActive
                  ? 'bg-slate-800/90 border-cyan-500 shadow-lg shadow-cyan-500/10'
                  : 'bg-slate-950/50 hover:bg-slate-800/50 border-slate-800 hover:border-slate-700'
              }`}
            >
              <div className="flex items-center justify-between mb-3">
                <div className={`p-2 rounded-lg bg-slate-900 border ${cat.color} flex items-center justify-center`}>
                  <Icon className="h-4 w-4" />
                </div>
                <div className="flex items-baseline gap-1">
                  <span className="font-mono text-xl font-extrabold text-white">
                    {cat.score}
                  </span>
                  <span className="text-xs text-slate-400">/100</span>
                </div>
              </div>

              <div className="font-semibold text-sm text-slate-100 group-hover:text-cyan-300 transition-colors">
                {cat.name}
              </div>
              <div className="text-xs text-slate-400 mt-1 line-clamp-2">
                {cat.description}
              </div>

              {/* Active bottom indicator */}
              {isActive && (
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-cyan-500 to-indigo-500" />
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
};
