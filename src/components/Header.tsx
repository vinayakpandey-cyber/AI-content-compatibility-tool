import React from 'react';
import { Sparkles, FileText, Download, Share2, Compass, Layers } from 'lucide-react';
import { ContentPreset, AuditResult } from '../types';
import { PRESETS } from '../data/presets';

interface HeaderProps {
  onSelectPreset: (preset: ContentPreset) => void;
  auditResult: AuditResult | null;
  onExportReport: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  onSelectPreset,
  auditResult,
  onExportReport,
}) => {
  return (
    <header className="sticky top-0 z-40 border-b border-slate-800/80 bg-slate-950/80 backdrop-blur-md px-4 lg:px-8 py-3.5 transition-all">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
        {/* Brand identity */}
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-xl bg-gradient-to-tr from-cyan-500 via-indigo-500 to-purple-500 p-0.5 shadow-lg shadow-indigo-500/20">
            <div className="h-full w-full bg-slate-950 rounded-[10px] flex items-center justify-center">
              <Sparkles className="h-5 w-5 text-cyan-400" />
            </div>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl font-bold tracking-tight text-white flex items-center gap-2">
                AuditPulse
                <span className="text-[10px] uppercase tracking-wider font-semibold px-2 py-0.5 rounded-full bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
                  GEO & Sentiment
                </span>
              </h1>
            </div>
            <p className="text-xs text-slate-400">
              Audience Reach • Keyword Optimization • Sentiment • AI Engine Citation Visibility
            </p>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2.5 flex-wrap justify-end">
          {/* Preset Selector */}
          <div className="relative group">
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-700/60 hover:border-slate-600 text-xs text-slate-300 transition-colors cursor-pointer">
              <Layers className="h-3.5 w-3.5 text-cyan-400" />
              <span>Load Preset Sample</span>
              <span className="text-[10px] bg-slate-800 px-1.5 py-0.5 rounded text-slate-400">
                {PRESETS.length}
              </span>
            </div>
            <div className="absolute right-0 mt-1 w-64 rounded-xl bg-slate-900 border border-slate-700 shadow-2xl p-2 hidden group-hover:block z-50 animate-in fade-in slide-in-from-top-2">
              <div className="text-[11px] font-semibold text-slate-400 px-2 py-1 uppercase tracking-wider">
                Select Benchmark Sample
              </div>
              {PRESETS.map((p) => (
                <button
                  key={p.id}
                  onClick={() => onSelectPreset(p)}
                  className="w-full text-left px-2.5 py-2 rounded-lg text-xs hover:bg-slate-800 transition-colors text-slate-200 group/btn"
                >
                  <div className="font-medium text-white group-hover/btn:text-cyan-300">
                    {p.title}
                  </div>
                  <div className="text-[11px] text-slate-400">{p.category}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Export Report Button */}
          {auditResult && (
            <button
              onClick={onExportReport}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs font-medium text-slate-200 border border-slate-700 transition-colors"
              title="Download full JSON audit report"
            >
              <Download className="h-3.5 w-3.5 text-slate-300" />
              <span>Export Audit</span>
            </button>
          )}

          {/* Live badge */}
          <div className="hidden md:flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-[11px] text-emerald-400">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
            <span>Gemini 3.8 GEO Engine Ready</span>
          </div>
        </div>
      </div>
    </header>
  );
};
