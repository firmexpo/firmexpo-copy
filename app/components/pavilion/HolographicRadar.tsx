"use client";

import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Radio, Activity, Eye, ChevronRight } from 'lucide-react';
import { BoothData } from './pavilionData';

interface HolographicRadarProps {
  booths: BoothData[];
  selectedBooth: BoothData | null;
  onSelectBooth: (booth: BoothData) => void;
  isScanning: boolean;
}

export const HolographicRadar: React.FC<HolographicRadarProps> = ({
  booths,
  selectedBooth,
  onSelectBooth,
  isScanning,
}) => {
  const [hoveredBooth, setHoveredBooth] = useState<BoothData | null>(null);

  return (
    <div className="relative w-full h-[440px] sm:h-[490px] rounded-2xl bg-[#080d14] border border-[#1f2e3e] p-4 flex flex-col justify-between overflow-hidden shadow-2xl select-none">
      {/* Background Radial Rings */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-40">
        <div className="w-[380px] h-[380px] rounded-full border border-[#233547]" />
        <div className="absolute w-[290px] h-[290px] rounded-full border border-[#233547]/80" />
        <div className="absolute w-[190px] h-[190px] rounded-full border border-[#233547]/60" />
        <div className="absolute w-[90px] h-[90px] rounded-full border border-[#f5810f]/40" />

        {/* Crosshair Cardinal Axes */}
        <div className="absolute w-full h-[1px] bg-[#233547]/80" />
        <div className="absolute h-full w-[1px] bg-[#233547]/80" />
      </div>

      {/* Rotating Radar Sweep Line */}
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ repeat: Infinity, duration: isScanning ? 2.5 : 5, ease: "linear" }}
        className="absolute top-1/2 left-1/2 w-[380px] h-[380px] -translate-x-1/2 -translate-y-1/2 pointer-events-none origin-center"
      >
        <div 
          className="w-1/2 h-full absolute left-1/2 top-0 origin-left"
          style={{
            background: 'conic-gradient(from 180deg at 0% 50%, rgba(245, 129, 15, 0.35) 0deg, rgba(245, 129, 15, 0) 65deg)',
          }}
        />
        {/* Leading Laser Edge */}
        <div className="absolute left-1/2 top-1/2 w-[190px] h-[1.5px] bg-gradient-to-r from-[#ffb454] to-transparent origin-left -translate-y-1/2" />
      </motion.div>

      {/* Top Telemetry Header */}
      <div className="relative z-10 flex items-center justify-between text-xs font-mono text-slate-400 border-b border-[#1b2836] pb-3">
        <div className="flex items-center gap-2">
          <Radio className="w-4 h-4 text-[#f5810f] animate-pulse" />
          <span className="text-slate-200 font-semibold tracking-wider">RADAR MATRIX // TELEMETRY HUD</span>
        </div>
        <div className="flex items-center gap-3 text-[11px]">
          <span className="text-emerald-400 flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
            FREQ: 2.4 GHz
          </span>
          <span className="px-2 py-0.5 rounded bg-[#131e2b] border border-[#223447] text-[#ffb454]">
            SCAN: ACTIVE
          </span>
        </div>
      </div>

      {/* Main Radar Screen Viewport */}
      <div className="relative flex-1 w-full flex items-center justify-center">
        {/* Central Base Terminal */}
        <div className="w-8 h-8 rounded-full bg-[#152332] border border-[#ffb454] flex items-center justify-center shadow-[0_0_15px_rgba(245,129,15,0.4)] z-10">
          <Activity className="w-4 h-4 text-[#ffb454]" />
        </div>

        {/* Angular Cardinal Degree Labels */}
        <span className="absolute top-3 text-[10px] font-mono text-slate-500">000° N</span>
        <span className="absolute right-3 text-[10px] font-mono text-slate-500">090° E</span>
        <span className="absolute bottom-3 text-[10px] font-mono text-slate-500">180° S</span>
        <span className="absolute left-3 text-[10px] font-mono text-slate-500">270° W</span>

        {/* Dynamic Radar Blips */}
        {booths.map((booth) => {
          // Convert polar coordinates to Cartesian percentage
          const rad = (booth.radarAngle * Math.PI) / 180;
          const radiusPixels = (booth.radarDistance / 100) * 140; // max radius ~140px
          const xOffset = Math.sin(rad) * radiusPixels;
          const yOffset = -Math.cos(rad) * radiusPixels;

          const isHovered = hoveredBooth?.id === booth.id;
          const isSelected = selectedBooth?.id === booth.id;

          return (
            <div
              key={booth.id}
              className="absolute z-20 cursor-pointer -translate-x-1/2 -translate-y-1/2 group"
              style={{
                left: `calc(50% + ${xOffset}px)`,
                top: `calc(50% + ${yOffset}px)`,
              }}
              onMouseEnter={() => setHoveredBooth(booth)}
              onMouseLeave={() => setHoveredBooth(null)}
              onClick={() => onSelectBooth(booth)}
            >
              {/* Radar Beacon Pulse */}
              <div 
                className={`relative flex items-center justify-center transition-all ${
                  isSelected
                    ? 'scale-125'
                    : isHovered
                    ? 'scale-115'
                    : 'scale-100'
                }`}
              >
                {/* Ping wave */}
                <div 
                  className={`absolute -inset-2 rounded-full ${
                    isSelected
                      ? 'bg-[#f5810f]/40 animate-ping'
                      : isHovered
                      ? 'bg-[#ffb454]/30 animate-pulse'
                      : 'bg-transparent'
                  }`}
                />

                {/* Node Dot / Badge */}
                <div 
                  className={`w-7 h-7 rounded-lg border flex items-center justify-center text-[10px] font-mono font-bold transition-all shadow-md ${
                    isSelected
                      ? 'bg-[#f5810f] border-white text-slate-950 shadow-[0_0_12px_#f5810f]'
                      : isHovered
                      ? 'bg-[#ffb454] border-white text-slate-950 shadow-[0_0_10px_#ffb454]'
                      : 'bg-[#152230] border-[#2c3f54] text-slate-200'
                  }`}
                >
                  {booth.code.split('-')[1]}
                </div>

                {/* Status Dot */}
                <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-emerald-400 ring-2 ring-[#080d14]" />
              </div>
            </div>
          );
        })}
      </div>

      {/* Bottom Telemetry Bar */}
      <div className="relative z-10 pt-2 border-t border-[#1b2836] flex items-center justify-between min-h-[46px]">
        {hoveredBooth || selectedBooth ? (
          (() => {
            const active = hoveredBooth || selectedBooth!;
            return (
              <div className="w-full flex items-center justify-between gap-3 animate-in fade-in duration-150">
                <div className="flex items-center gap-2.5 overflow-hidden">
                  <div className="w-8 h-8 rounded-lg bg-[#f5810f]/20 border border-[#f5810f]/40 flex items-center justify-center shrink-0">
                    <span className="font-mono text-xs font-bold text-[#ffb454]">
                      {active.code}
                    </span>
                  </div>
                  <div className="truncate">
                    <p className="text-xs font-semibold text-white truncate">
                      {active.name}
                    </p>
                    <p className="text-[11px] text-slate-400 font-mono truncate">
                      {active.company} · {active.attendees} Watching
                    </p>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => onSelectBooth(active)}
                  className="shrink-0 flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#f5810f] hover:bg-[#e0750a] text-slate-950 text-xs font-semibold transition-colors"
                >
                  <span>Inspect</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>
            );
          })()
        ) : (
          <div className="w-full flex items-center justify-between text-xs text-slate-400">
            <div className="flex items-center gap-2">
              <Eye className="w-3.5 h-3.5 text-[#ffb454]" />
              <span>Select any radar blip to inspect live booth transmission</span>
            </div>
            <span className="hidden sm:inline font-mono text-[11px] text-slate-500">
              BEACON: 360° SWEEP
            </span>
          </div>
        )}
      </div>
    </div>
  );
};
