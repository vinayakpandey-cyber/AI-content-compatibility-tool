import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { ContentEditor } from './components/ContentEditor';
import { AuditSummaryHero } from './components/AuditSummaryHero';
import { AudienceTab } from './components/AudienceTab';
import { KeywordTab } from './components/KeywordTab';
import { SentimentTab } from './components/SentimentTab';
import { GeoTab } from './components/GeoTab';
import { RecommendationsAndRewrite } from './components/RecommendationsAndRewrite';
import { PRESETS } from './data/presets';
import { ContentPreset, AuditResult } from './types';
import {
  Users,
  Search,
  HeartPulse,
  Bot,
  Wand2,
  AlertCircle,
  RefreshCw,
  Sparkles,
  CheckCircle2,
  Cpu,
} from 'lucide-react';

export default function App() {
  // Initial state with default preset
  const defaultPreset = PRESETS[0];

  const [content, setContent] = useState<string>(defaultPreset.content);
  const [audience, setAudience] = useState<string>(defaultPreset.audience);
  const [keywords, setKeywords] = useState<string>(defaultPreset.keywords);
  const [brandTone, setBrandTone] = useState<string>(defaultPreset.brandTone);
  const [contentType, setContentType] = useState<string>(defaultPreset.contentType);

  const [activeTab, setActiveTab] = useState<string>('llm'); // Default focus on LLM / GEO
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [auditResult, setAuditResult] = useState<AuditResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loadingStep, setLoadingStep] = useState<string>('Analyzing audience alignment...');
  const [activeHighlightedTerm, setActiveHighlightedTerm] = useState<string | undefined>(undefined);

  // Trigger initial audit automatically on mount for instant delight
  useEffect(() => {
    runAudit();
  }, []);

  const handleSelectPreset = (preset: ContentPreset) => {
    setContent(preset.content);
    setAudience(preset.audience);
    setKeywords(preset.keywords);
    setBrandTone(preset.brandTone);
    setContentType(preset.contentType);
    setActiveHighlightedTerm(undefined);
    // Run audit for selected preset
    runAuditWithData(preset.content, preset.audience, preset.keywords, preset.brandTone, preset.contentType);
  };

  const runAuditWithData = async (
    c: string,
    aud: string,
    kw: string,
    tone: string,
    type: string
  ) => {
    if (!c.trim() || c.trim().length < 20) {
      setError('Please provide at least 20 characters of content to audit.');
      return;
    }

    setIsLoading(true);
    setError(null);

    // Simulate multi-step progress indicators
    const steps = [
      'Mapping audience persona & intent...',
      'Computing keyword density & semantic knowledge gaps...',
      'Analyzing multi-vector emotional sentiment & tone arc...',
      'Simulating AI Engine visibility (ChatGPT & Perplexity GEO)...',
      'Synthesizing actionable recommendations...',
    ];

    let stepIdx = 0;
    const interval = setInterval(() => {
      stepIdx = (stepIdx + 1) % steps.length;
      setLoadingStep(steps[stepIdx]);
    }, 1200);

    try {
      const response = await fetch('/api/audit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          content: c,
          audience: aud,
          keywords: kw,
          brandTone: tone,
          contentType: type,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || `Server responded with status ${response.status}`);
      }

      const data: AuditResult = await response.json();
      setAuditResult(data);
    } catch (err: any) {
      console.error('Audit failed:', err);
      setError(err?.message || 'Audit failed. Please check your network and try again.');
    } finally {
      clearInterval(interval);
      setIsLoading(false);
    }
  };

  const runAudit = () => {
    runAuditWithData(content, audience, keywords, brandTone, contentType);
  };

  // Export report
  const handleExportReport = () => {
    if (!auditResult) return;
    const exportData = {
      exportDate: new Date().toISOString(),
      contentPreview: content.slice(0, 300) + '...',
      targetAudience: audience,
      targetKeywords: keywords,
      brandTone,
      auditReport: auditResult,
    };

    const blob = new Blob([JSON.stringify(exportData, null, 2)], {
      type: 'application/json',
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `auditpulse-report-${Date.now()}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleApplyOptimizedText = (newText: string) => {
    setContent(newText);
    runAuditWithData(newText, audience, keywords, brandTone, contentType);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-cyan-500/30 selection:text-cyan-200">
      {/* Top Header */}
      <Header
        onSelectPreset={handleSelectPreset}
        auditResult={auditResult}
        onExportReport={handleExportReport}
      />

      {/* Main Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 lg:px-8 py-6 space-y-8">
        {/* Error notification */}
        {error && (
          <div className="p-4 rounded-xl bg-rose-950/40 border border-rose-500/40 flex items-center justify-between text-xs text-rose-200 animate-in fade-in">
            <div className="flex items-center gap-2">
              <AlertCircle className="h-4 w-4 text-rose-400 shrink-0" />
              <span>{error}</span>
            </div>
            <button
              onClick={() => setError(null)}
              className="text-xs px-2 py-1 rounded bg-rose-900/50 hover:bg-rose-800 text-white font-medium"
            >
              Dismiss
            </button>
          </div>
        )}

        {/* Content Editor & Target Configuration */}
        <section>
          <ContentEditor
            content={content}
            setContent={setContent}
            audience={audience}
            setAudience={setAudience}
            keywords={keywords}
            setKeywords={setKeywords}
            brandTone={brandTone}
            setBrandTone={setBrandTone}
            contentType={contentType}
            setContentType={setContentType}
            onRunAudit={runAudit}
            isLoading={isLoading}
            activeHighlightedTerm={activeHighlightedTerm}
            onClearHighlight={() => setActiveHighlightedTerm(undefined)}
          />
        </section>

        {/* Loading Spinner with Multi-Step status */}
        {isLoading && (
          <div className="p-10 rounded-2xl bg-slate-900/50 border border-slate-800 flex flex-col items-center justify-center space-y-4 animate-in fade-in">
            <div className="relative">
              <div className="h-14 w-14 rounded-full border-4 border-slate-800 border-t-cyan-400 animate-spin" />
              <Cpu className="h-6 w-6 text-cyan-400 absolute inset-0 m-auto" />
            </div>
            <div className="text-center space-y-1">
              <div className="text-sm font-bold text-white flex items-center justify-center gap-2">
                <span>Auditing Content with Gemini 3.8 Flash</span>
                <span className="h-2 w-2 rounded-full bg-cyan-400 animate-ping" />
              </div>
              <p className="text-xs font-mono text-cyan-400">{loadingStep}</p>
            </div>
          </div>
        )}

        {/* Audit Results Dashboard */}
        {!isLoading && auditResult && (
          <div className="space-y-6">
            {/* Top Overview Hero (Radial Gauge, Letter Grade, Executive Summary, 4 Category Cards) */}
            <AuditSummaryHero
              audit={auditResult}
              activeTab={activeTab}
              setActiveTab={setActiveTab}
            />

            {/* Navigation Tab Bar */}
            <div className="flex items-center gap-1.5 p-1 rounded-xl bg-slate-900/80 border border-slate-800 overflow-x-auto">
              {[
                {
                  id: 'audience',
                  label: 'Audience Reach & Resonance',
                  icon: Users,
                  score: auditResult.audienceAlignment.score,
                },
                {
                  id: 'keywords',
                  label: 'Keywords & Semantics',
                  icon: Search,
                  score: auditResult.keywordOptimization.score,
                },
                {
                  id: 'sentiment',
                  label: 'Sentiment & Emotional Tone',
                  icon: HeartPulse,
                  score: auditResult.sentimentAnalysis.score,
                },
                {
                  id: 'llm',
                  label: 'LLM Citation & GEO',
                  icon: Bot,
                  score: auditResult.llmVisibilityAndGEO.citationProbabilityScore,
                  badge: 'Core Focus',
                },
                {
                  id: 'recommendations',
                  label: 'Action Items & AI Optimizer',
                  icon: Wand2,
                  count: auditResult.actionableRecommendations.length,
                },
              ].map((tab) => {
                const Icon = tab.icon;
                const isActive = activeTab === tab.id;

                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center gap-2 px-3.5 py-2.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                      isActive
                        ? 'bg-cyan-500 text-slate-950 font-bold shadow-md shadow-cyan-500/20'
                        : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
                    }`}
                  >
                    <Icon className="h-4 w-4" />
                    <span>{tab.label}</span>

                    {tab.score !== undefined && (
                      <span
                        className={`font-mono text-[11px] px-1.5 py-0.2 rounded font-bold ${
                          isActive
                            ? 'bg-slate-950/30 text-slate-950'
                            : 'bg-slate-800 text-slate-300'
                        }`}
                      >
                        {tab.score}%
                      </span>
                    )}

                    {tab.count !== undefined && (
                      <span
                        className={`text-[11px] px-1.5 py-0.2 rounded font-bold ${
                          isActive
                            ? 'bg-slate-950/30 text-slate-950'
                            : 'bg-indigo-500/20 text-indigo-300'
                        }`}
                      >
                        {tab.count}
                      </span>
                    )}

                    {tab.badge && !isActive && (
                      <span className="text-[9px] uppercase px-1 py-0.2 rounded bg-cyan-500/20 text-cyan-300 font-bold">
                        {tab.badge}
                      </span>
                    )}
                  </button>
                );
              })}
            </div>

            {/* TAB CONTENTS */}
            <div className="pt-2">
              {activeTab === 'audience' && (
                <AudienceTab
                  audienceAlignment={auditResult.audienceAlignment}
                  targetAudiencePrompt={audience}
                />
              )}

              {activeTab === 'keywords' && (
                <KeywordTab
                  keywordOptimization={auditResult.keywordOptimization}
                  onHighlightTerm={(term) => setActiveHighlightedTerm(term)}
                  activeHighlightedTerm={activeHighlightedTerm}
                />
              )}

              {activeTab === 'sentiment' && (
                <SentimentTab sentimentAnalysis={auditResult.sentimentAnalysis} />
              )}

              {activeTab === 'llm' && (
                <GeoTab llmVisibility={auditResult.llmVisibilityAndGEO} />
              )}

              {activeTab === 'recommendations' && (
                <RecommendationsAndRewrite
                  recommendations={auditResult.actionableRecommendations}
                  originalContent={content}
                  audience={audience}
                  keywords={keywords}
                  onApplyOptimizedText={handleApplyOptimizedText}
                />
              )}
            </div>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-800/80 bg-slate-950/60 py-4 px-4 text-center text-xs text-slate-500">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2">
          <div>AuditPulse • Content, Sentiment & Generative Engine Optimization (GEO) Auditor</div>
          <div className="flex items-center gap-1.5 text-slate-400">
            <span>Powered by Gemini 3.8 Intelligence</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
