"use client";

import React, { useState } from 'react';
import { X, Calendar, Download, Sparkles, CheckCircle2, Users, Radio, ShieldCheck } from 'lucide-react';
import { BoothData } from './pavilionData';

interface BoothModalProps {
  booth: BoothData | null;
  onClose: () => void;
}

export const BoothModal: React.FC<BoothModalProps> = ({ booth, onClose }) => {
  const [scheduled, setScheduled] = useState(false);
  const [downloaded, setDownloaded] = useState(false);
  const [attendeeCount, setAttendeeCount] = useState<number>(booth ? booth.attendees : 100);

  if (!booth) return null;

  const handleSchedule = (e: React.FormEvent) => {
    e.preventDefault();
    setScheduled(true);
    setAttendeeCount((prev) => prev + 1);
  };

  const handleDownload = () => {
    setDownloaded(true);
    setTimeout(() => setDownloaded(false), 3500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-2xl bg-[#0e1622] border border-[#2a3c50] rounded-2xl shadow-2xl overflow-hidden text-[#f2f5f8]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Header Glow Banner */}
        <div className="relative h-44 sm:h-52 w-full overflow-hidden bg-gradient-to-t from-[#0e1622] to-transparent">
          {/* Background Image with Overlay */}
          <img 
            src={booth.imageUrl} 
            alt={booth.name} 
            className="w-full h-full object-cover opacity-40 brightness-75 scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0e1622] via-[#0e1622]/60 to-transparent" />

          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-xl bg-black/40 hover:bg-black/70 border border-white/10 text-slate-300 hover:text-white transition-colors"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Header Badges */}
          <div className="absolute top-4 left-4 flex items-center gap-2 text-xs">
            <span className="px-2.5 py-1 rounded-md bg-[#f5810f]/20 border border-[#f5810f]/50 text-[#ffb454] font-mono font-semibold tracking-wider">
              BOOTH {booth.code}
            </span>
            <span className="flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-emerald-950/60 border border-emerald-500/40 text-emerald-400 font-mono text-[11px]">
              <Radio className="w-3 h-3 animate-pulse" />
              {booth.status}
            </span>
          </div>

          {/* Title & Company */}
          <div className="absolute bottom-4 left-5 right-5">
            <p className="text-xs font-mono uppercase tracking-widest text-[#f5810f]">
              {booth.sectorLabel}
            </p>
            <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-white mt-1 drop-shadow-sm">
              {booth.name}
            </h3>
            <p className="text-xs sm:text-sm text-slate-400 mt-0.5">
              Presented by <span className="text-slate-200 font-medium">{booth.company}</span>
            </p>
          </div>
        </div>

        {/* Content Body */}
        <div className="p-6 space-y-6 max-h-[70vh] overflow-y-auto">
          {/* Overview */}
          <div>
            <h4 className="text-xs font-mono uppercase tracking-wider text-slate-400 mb-2">
              Exposition Focus
            </h4>
            <p className="text-sm leading-relaxed text-slate-300">
              {booth.description}
            </p>
          </div>

          {/* Key Innovation Callout */}
          <div className="p-4 rounded-xl bg-[#141f2d] border border-[#233547] flex items-start gap-3">
            <div className="p-2 rounded-lg bg-[#f5810f]/15 text-[#ffb454] shrink-0 mt-0.5">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <p className="text-xs font-mono text-[#ffb454] uppercase tracking-wide">
                Key Industrial Innovation
              </p>
              <p className="text-sm text-slate-200 mt-0.5 font-medium">
                {booth.featuredInnovation}
              </p>
            </div>
          </div>

          {/* Technical Specs Grid */}
          <div>
            <h4 className="text-xs font-mono uppercase tracking-wider text-slate-400 mb-3 flex items-center justify-between">
              <span>Verified Machine Specifications</span>
              <span className="flex items-center gap-1 text-[11px] text-emerald-400 font-normal">
                <ShieldCheck className="w-3.5 h-3.5" /> ISO Certified
              </span>
            </h4>
            <div className="grid grid-cols-2 gap-2.5">
              {booth.specs.map((spec, i) => (
                <div key={i} className="p-3 rounded-lg bg-[#121b27] border border-[#1e2e3f]">
                  <p className="text-[11px] font-mono text-slate-400">{spec.label}</p>
                  <p className="text-sm font-semibold text-slate-100 mt-0.5 font-mono">{spec.value}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Live Visitor Meter & Interaction Actions */}
          <div className="pt-2 border-t border-[#1e2e3f] flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2 text-xs text-slate-400 w-full sm:w-auto">
              <Users className="w-4 h-4 text-[#ffb454]" />
              <span>
                <strong className="text-slate-100 font-mono">{attendeeCount}</strong> attendees exploring booth
              </span>
            </div>

            <div className="flex items-center gap-2.5 w-full sm:w-auto">
              <button
                type="button"
                onClick={handleDownload}
                className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 px-3.5 py-2 rounded-xl bg-[#182434] hover:bg-[#203144] border border-[#2b3e54] text-xs font-medium text-slate-200 transition-colors"
              >
                {downloaded ? (
                  <>
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Spec Sheet Sent</span>
                  </>
                ) : (
                  <>
                    <Download className="w-3.5 h-3.5 text-slate-300" />
                    <span>Download Specs</span>
                  </>
                )}
              </button>

              {scheduled ? (
                <div className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-emerald-950/70 border border-emerald-500/50 text-emerald-300 text-xs font-medium">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  Tour Scheduled
                </div>
              ) : (
                <button
                  type="button"
                  onClick={handleSchedule}
                  className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 px-4 py-2 rounded-xl bg-[#f5810f] hover:bg-[#e0750a] text-slate-950 font-semibold text-xs transition-colors shadow-lg shadow-[#f5810f]/20"
                >
                  <Calendar className="w-3.5 h-3.5" />
                  <span>Reserve Booth Tour</span>
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
