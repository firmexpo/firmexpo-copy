"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronLeft, ChevronRight, Sparkles, Radio, Users, ExternalLink } from 'lucide-react';
import { BoothData } from './pavilionData';

interface ExhibitorDeckProps {
  booths: BoothData[];
  onSelectBooth: (booth: BoothData) => void;
}

export const ExhibitorDeck: React.FC<ExhibitorDeckProps> = ({
  booths,
  onSelectBooth,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  if (booths.length === 0) return null;

  const current = booths[currentIndex % booths.length];

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? booths.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % booths.length);
  };

  return (
    <div className="relative w-full h-[440px] sm:h-[490px] rounded-2xl bg-[#090e15] border border-[#202f40] p-5 flex flex-col justify-between overflow-hidden shadow-2xl select-none">
      {/* Top Deck Navigation Header */}
      <div className="flex items-center justify-between text-xs font-mono text-slate-400 border-b border-[#1b2836] pb-3">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-[#f5810f]" />
          <span className="text-slate-200 font-semibold tracking-wider">EXHIBITOR SHOWCASE DECK</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-[#ffb454] font-bold">
            {currentIndex + 1} / {booths.length}
          </span>
          <div className="flex items-center gap-1 ml-2">
            <button
              type="button"
              onClick={handlePrev}
              className="p-1 rounded-md bg-[#141f2d] hover:bg-[#1f3044] border border-[#24374b] text-slate-300 transition-colors"
              aria-label="Previous exhibitor"
            >
              <ChevronLeft className="w-3.5 h-3.5" />
            </button>
            <button
              type="button"
              onClick={handleNext}
              className="p-1 rounded-md bg-[#141f2d] hover:bg-[#1f3044] border border-[#24374b] text-slate-300 transition-colors"
              aria-label="Next exhibitor"
            >
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* Main Animated Showcase Card */}
      <div className="relative flex-1 my-3 flex items-center justify-center">
        <AnimatePresence mode="wait">
          <motion.div
            key={current.id}
            initial={{ opacity: 0, y: 12, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -12, scale: 0.98 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="w-full h-full rounded-xl bg-[#0f1824] border border-[#24374c] overflow-hidden flex flex-col shadow-xl"
          >
            {/* Card Image Banner */}
            <div className="relative h-36 sm:h-40 w-full overflow-hidden bg-slate-900">
              <img
                src={current.imageUrl}
                alt={current.name}
                className="w-full h-full object-cover brightness-75 hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0f1824] via-transparent to-transparent" />

              {/* Badges */}
              <div className="absolute top-3 left-3 flex items-center gap-2">
                <span className="px-2 py-0.5 rounded bg-black/70 backdrop-blur-md border border-white/10 font-mono text-[11px] font-bold text-[#ffb454]">
                  BOOTH {current.code}
                </span>
                <span className="flex items-center gap-1 px-2 py-0.5 rounded bg-emerald-950/80 backdrop-blur-md border border-emerald-500/40 font-mono text-[10px] text-emerald-400">
                  <Radio className="w-2.5 h-2.5 animate-pulse" />
                  {current.status}
                </span>
              </div>

              <div className="absolute bottom-2 left-3 right-3 flex items-center justify-between text-[11px] font-mono text-slate-300">
                <span className="text-[#f5810f] uppercase tracking-wider">{current.sectorLabel}</span>
                <span className="flex items-center gap-1">
                  <Users className="w-3 h-3 text-[#ffb454]" />
                  {current.attendees} Watching
                </span>
              </div>
            </div>

            {/* Card Content Body */}
            <div className="p-4 flex-1 flex flex-col justify-between">
              <div>
                <h3 className="text-base sm:text-lg font-bold text-white tracking-tight leading-snug">
                  {current.name}
                </h3>
                <p className="text-xs text-slate-400 font-medium mt-0.5">
                  {current.company}
                </p>

                {/* Key Innovation Pill */}
                <div className="mt-3 p-2.5 rounded-lg bg-[#14202e] border border-[#203247] flex items-center gap-2 text-xs text-slate-300">
                  <Sparkles className="w-4 h-4 text-[#ffb454] shrink-0" />
                  <span className="truncate">{current.featuredInnovation}</span>
                </div>
              </div>

              {/* Action Button */}
              <div className="mt-3 pt-3 border-t border-[#1b2b3b] flex items-center justify-between gap-3">
                <div className="text-[11px] font-mono text-slate-400">
                  {current.specs[0].label}: <span className="text-white font-semibold">{current.specs[0].value}</span>
                </div>

                <button
                  type="button"
                  onClick={() => onSelectBooth(current)}
                  className="flex items-center gap-1.5 px-4 py-2 rounded-lg bg-[#f5810f] hover:bg-[#e0750a] text-slate-950 font-semibold text-xs transition-colors shadow-md shadow-[#f5810f]/20"
                >
                  <span>Explore Pavilion</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Indicator Dots */}
      <div className="flex items-center justify-center gap-1.5 pt-2">
        {booths.map((b, idx) => (
          <button
            key={b.id}
            onClick={() => setCurrentIndex(idx)}
            className={`h-1.5 rounded-full transition-all ${
              idx === currentIndex % booths.length
                ? 'w-6 bg-[#f5810f]'
                : 'w-1.5 bg-[#1f2f40] hover:bg-[#2e455d]'
            }`}
            aria-label={`Go to slide ${idx + 1}`}
          />
        ))}
      </div>
    </div>
  );
};
