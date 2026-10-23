import React, { useState } from 'react';
import {
  FileText,
  Users,
  Search,
  Sparkles,
  ArrowRight,
  RefreshCw,
  Wand2,
  SlidersHorizontal,
  ChevronDown,
  ChevronUp,
  Lightbulb,
} from 'lucide-react';

interface ContentEditorProps {
  content: string;
  setContent: (val: string) => void;
  audience: string;
  setAudience: (val: string) => void;
  keywords: string;
  setKeywords: (val: string) => void;
  brandTone: string;
  setBrandTone: (val: string) => void;
  contentType: string;
  setContentType: (val: string) => void;
  onRunAudit: () => void;
  isLoading: boolean;
  activeHighlightedTerm?: string;
  onClearHighlight?: () => void;
}

export const ContentEditor: React.FC<ContentEditorProps> = ({
  content,
  setContent,
  audience,
  setAudience,
  keywords,
  setKeywords,
  brandTone,
  setBrandTone,
  contentType,
  setContentType,
  onRunAudit,
  isLoading,
  activeHighlightedTerm,
  onClearHighlight,
}) => {
  const [showConfig, setShowConfig] = useState<boolean>(true);
  const [isSuggesting, setIsSuggesting] = useState<boolean>(false);

  // Compute live basic stats
  const wordCount = content.trim() ? content.trim().split(/\s+/).length : 0;
  const charCount = content.length;
  const readingTime = Math.ceil(wordCount / 200);

  // AI Context suggester
  const handleSuggestContext = async () => {
    if (!content.trim()) return;
    setIsSuggesting(true);
    try {
      const res = await fetch('/api/suggest-context', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ topicOrSnippet: content.slice(0, 500) }),
      });
      if (res.ok) {
        const data = await res.json();
        if (data.personas && data.personas.length > 0) {
          const p = data.personas[0];
          setAudience(`${p.title} (${p.role}) - Key pain point: ${p.painPoints}. Intent: ${p.intent}`);
        }
        if (data.suggestedKeywords && data.suggestedKeywords.length > 0) {
          setKeywords(data.suggestedKeywords.join(', '));
        }
        if (data.recommendedTone) {
          setBrandTone(data.recommendedTone);
        }
      }
    } catch (e) {
      console.error(e);
    } finally {
      setIsSuggesting(false);
    }
  };

  // Highlight keywords renderer helper
  const renderHighlightedContent = () => {
    if (!activeHighlightedTerm) return null;
    const escapedTerm = activeHighlightedTerm.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const regex = new RegExp(`(${escapedTerm})`, 'gi');
    const parts = content.split(regex);

    return (
      <div className="absolute inset-0 p-4 font-mono text-xs leading-relaxed pointer-events-none overflow-y-auto whitespace-pre-wrap text-transparent">
        {parts.map((part, i) =>
          regex.test(part) ? (
            <span key={i} className="bg-yellow-400/40 text-transparent rounded px-0.5">
              {part}
            </span>
          ) : (
            <span key={i}>{part}</span>
          )
        )}
      </div>
    );
  };

  return (
    <div className="bg-slate-900/70 border border-slate-800 rounded-2xl p-5 shadow-xl space-y-4">
      {/* Top Bar with Mode & Stats */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-2 border-b border-slate-800/80">
        <div className="flex items-center gap-2">
          <FileText className="h-4 w-4 text-cyan-400" />
          <span className="text-xs font-bold uppercase tracking-wider text-slate-200">
            Content Draft & Target Parameters
          </span>
          {activeHighlightedTerm && (
            <div className="flex items-center gap-1.5 ml-2 px-2 py-0.5 rounded bg-yellow-500/20 text-yellow-300 text-[11px] border border-yellow-500/30">
              <span>Highlighting: "{activeHighlightedTerm}"</span>
              <button
                onClick={onClearHighlight}
                className="text-xs hover:text-white font-bold ml-1"
                title="Clear highlight"
              >
                ×
              </button>
            </div>
          )}
        </div>

        <div className="flex items-center gap-3 text-[11px] text-slate-400 font-mono">
          <span>{wordCount} words</span>
          <span>•</span>
          <span>{charCount} chars</span>
          <span>•</span>
          <span>~{readingTime} min read</span>
        </div>
      </div>

      {/* Main Textarea */}
      <div className="relative rounded-xl border border-slate-700/80 bg-slate-950 focus-within:border-cyan-500/80 transition-colors">
        {renderHighlightedContent()}
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Paste or type your article, landing page copy, whitepaper, or product announcement here (minimum 20 characters)..."
          rows={11}
          className="w-full bg-transparent p-4 text-xs font-mono text-slate-200 placeholder:text-slate-500 focus:outline-none resize-y leading-relaxed"
        />
      </div>

      {/* Target Audience & Configuration Drawer */}
      <div className="rounded-xl bg-slate-950/60 border border-slate-800/80 overflow-hidden">
        <div
          onClick={() => setShowConfig(!showConfig)}
          className="p-3 bg-slate-900/60 flex items-center justify-between cursor-pointer hover:bg-slate-800/40 transition-colors"
        >
          <div className="flex items-center gap-2 text-xs font-semibold text-slate-300">
            <SlidersHorizontal className="h-3.5 w-3.5 text-cyan-400" />
            <span>Audit Target Profile (Audience, Keywords, Brand Tone, Content Type)</span>
          </div>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                handleSuggestContext();
              }}
              disabled={isSuggesting || !content.trim()}
              className="flex items-center gap-1 px-2.5 py-1 rounded bg-indigo-600/20 hover:bg-indigo-600/30 border border-indigo-500/30 text-[11px] text-indigo-300 font-medium transition-colors disabled:opacity-40 cursor-pointer"
              title="Automatically extract and recommend persona and keywords using Gemini"
            >
              {isSuggesting ? (
                <RefreshCw className="h-3 w-3 animate-spin" />
              ) : (
                <Sparkles className="h-3 w-3 text-cyan-400" />
              )}
              <span>AI Auto-Detect Context</span>
            </button>
            {showConfig ? (
              <ChevronUp className="h-4 w-4 text-slate-400" />
            ) : (
              <ChevronDown className="h-4 w-4 text-slate-400" />
            )}
          </div>
        </div>

        {showConfig && (
          <div className="p-4 space-y-3.5 border-t border-slate-800 text-xs">
            {/* Target Audience Persona */}
            <div className="space-y-1">
              <label className="text-[11px] font-semibold text-slate-300 flex items-center gap-1.5">
                <Users className="h-3.5 w-3.5 text-blue-400" />
                Target Audience Persona & Intent:
              </label>
              <input
                type="text"
                value={audience}
                onChange={(e) => setAudience(e.target.value)}
                placeholder="e.g., Enterprise CTOs seeking LLM inference security and predictable cloud costs"
                className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-slate-700/80 text-slate-200 placeholder:text-slate-500 focus:outline-none focus:border-cyan-500"
              />
            </div>

            {/* Target Focus Keywords */}
            <div className="space-y-1">
              <label className="text-[11px] font-semibold text-slate-300 flex items-center gap-1.5">
                <Search className="h-3.5 w-3.5 text-purple-400" />
                Target Keywords & Entities (comma-separated):
              </label>
              <input
                type="text"
                value={keywords}
                onChange={(e) => setKeywords(e.target.value)}
                placeholder="e.g., enterprise AI infrastructure, inference latency, semantic caching, token optimization"
                className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-slate-700/80 text-slate-200 placeholder:text-slate-500 focus:outline-none focus:border-cyan-500"
              />
            </div>

            {/* Content Type & Brand Tone */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="space-y-1">
                <label className="text-[11px] font-semibold text-slate-300">Content Type:</label>
                <select
                  value={contentType}
                  onChange={(e) => setContentType(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-slate-700/80 text-slate-200 focus:outline-none focus:border-cyan-500"
                >
                  <option value="Product Announcement & Technical Whitepaper">
                    Product Announcement & Technical Whitepaper
                  </option>
                  <option value="Educational / How-To Guide">Educational / How-To Guide</option>
                  <option value="Thought Leadership / Opinion Editorial">
                    Thought Leadership / Opinion Editorial
                  </option>
                  <option value="B2B Commercial Landing Page">B2B Commercial Landing Page</option>
                  <option value="Consumer Health & Wellness Advice">
                    Consumer Health & Wellness Advice
                  </option>
                  <option value="Financial & Investment Advisory">
                    Financial & Investment Advisory
                  </option>
                  <option value="Email Newsletter / Nurture Sequence">
                    Email Newsletter / Nurture Sequence
                  </option>
                </select>
              </div>

              <div className="space-y-1">
                <label className="text-[11px] font-semibold text-slate-300">
                  Desired Brand Tone & Voice:
                </label>
                <input
                  type="text"
                  value={brandTone}
                  onChange={(e) => setBrandTone(e.target.value)}
                  placeholder="e.g., Authoritative, technical yet engaging, high-trust"
                  className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-slate-700/80 text-slate-200 placeholder:text-slate-500 focus:outline-none focus:border-cyan-500"
                />
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Main Audit Trigger Button */}
      <button
        onClick={onRunAudit}
        disabled={isLoading || !content.trim() || content.trim().length < 20}
        className="w-full py-3.5 px-6 rounded-xl bg-gradient-to-r from-cyan-500 via-indigo-600 to-purple-600 text-white font-bold text-sm shadow-xl shadow-indigo-600/25 hover:shadow-cyan-500/30 hover:opacity-95 disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center justify-center gap-2 cursor-pointer"
      >
        {isLoading ? (
          <>
            <RefreshCw className="h-4 w-4 animate-spin text-white" />
            <span>Executing Multi-Dimensional Content & GEO Audit...</span>
          </>
        ) : (
          <>
            <Sparkles className="h-4 w-4 text-cyan-300" />
            <span>Audit Content (Audience, Keywords, Sentiment & AI Citation)</span>
            <ArrowRight className="h-4 w-4 ml-1" />
          </>
        )}
      </button>
    </div>
  );
};
