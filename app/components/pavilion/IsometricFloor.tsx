"use client";

import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Sparkles, ChevronRight, Eye } from 'lucide-react';
import { BoothData } from './pavilionData';

interface IsometricFloorProps {
  booths: BoothData[];
  selectedBooth: BoothData | null;
  onSelectBooth: (booth: BoothData) => void;
  isScanning: boolean;
}

export const IsometricFloor: React.FC<IsometricFloorProps> = ({
  booths,
  selectedBooth,
  onSelectBooth,
  isScanning,
}) => {
  const [hoveredBooth, setHoveredBooth] = useState<BoothData | null>(null);

  return (
    <div className="relative w-full h-[440px] sm:h-[490px] rounded-2xl bg-[#090e15] border border-[#202f40] p-4 flex flex-col justify-between overflow-hidden shadow-2xl select-none">
      {/* Background Architectural Grid Lines */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-20"
        style={{
          backgroundImage: `
            linear-gradient(to right, #2c4257 1px, transparent 1px),
            linear-gradient(to bottom, #2c4257 1px, transparent 1px)
          `,
          backgroundSize: '24px 24px',
        }}
      />

      {/* Radial Ambient Center Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 rounded-full bg-[#f5810f]/10 blur-3xl pointer-events-none" />

      {/* Top HUD Status Bar */}
      <div className="relative z-10 flex items-center justify-between text-xs font-mono text-slate-400 border-b border-[#1c2a38] pb-3">
        <div className="flex items-center gap-2">
          <span className="inline-block w-2 h-2 rounded-full bg-[#f5810f] animate-ping" />
          <span className="text-slate-200 font-semibold tracking-wider">EXPO FLOORPLAN // 3D ISOMETRIC</span>
        </div>
        <div className="flex items-center gap-3 text-[11px]">
          <span className="text-slate-400 hidden sm:inline">SECTORS: A-D</span>
          <span className="px-2 py-0.5 rounded bg-[#162330] border border-[#25394d] text-[#ffb454]">
            LIVE NODES: {booths.length}
          </span>
        </div>
      </div>

      {/* Isometric 3D Projection Canvas Container */}
      <div className="relative flex-1 w-full flex items-center justify-center overflow-hidden my-1">
        {/* Isometric Rotated Plane */}
        <div 
          className="relative w-[340px] h-[340px] sm:w-[390px] sm:h-[390px] transition-transform duration-700 ease-out"
          style={{
            transform: 'rotateX(58deg) rotateZ(-38deg)',
            transformStyle: 'preserve-3d',
          }}
        >
          {/* Floor Base Slab */}
          <div className="absolute inset-0 rounded-3xl bg-[#0d1622] border-2 border-[#2b3e52] shadow-[0_20px_50px_rgba(0,0,0,0.8)]">
            {/* Sector Division Crosshairs */}
            <div className="absolute top-1/2 left-0 right-0 h-[1px] bg-[#223344] -translate-y-1/2" />
            <div className="absolute left-1/2 top-0 bottom-0 w-[1px] bg-[#223344] -translate-x-1/2" />
            
            {/* Concentric Guide Circles */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 rounded-full border border-[#1e2f42]/70" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-24 h-24 rounded-full border border-[#f5810f]/30" />

            {/* Scanning Radar Wave Sweep */}
            {isScanning && (
              <motion.div
                initial={{ top: '-20%' }}
                animate={{ top: '120%' }}
                transition={{ duration: 1.8, ease: "easeInOut", repeat: 1 }}
                className="absolute left-0 right-0 h-10 bg-gradient-to-b from-transparent via-[#f5810f]/40 to-transparent pointer-events-none border-b border-[#ffb454]"
              />
            )}
          </div>

          {/* Central Mainstage Pillar */}
          <div 
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-14 h-14 rounded-2xl bg-gradient-to-tr from-[#1b2b3d] to-[#25394d] border border-[#ffb454]/60 flex items-center justify-center shadow-lg"
            style={{ transform: 'translateZ(18px)' }}
          >
            <Sparkles className="w-5 h-5 text-[#ffb454] animate-pulse" />
            {/* Beacon beam upwards */}
            <div className="absolute -top-16 left-1/2 -translate-x-1/2 w-[2px] h-16 bg-gradient-to-t from-[#f5810f] to-transparent pointer-events-none" />
          </div>

          {/* Interactive Booth Pavilions */}
          {booths.map((booth) => {
            const isHovered = hoveredBooth?.id === booth.id;
            const isSelected = selectedBooth?.id === booth.id;
            const elevation = isSelected ? 28 : isHovered ? 24 : 12;

            return (
              <div
                key={booth.id}
                className="absolute cursor-pointer transition-all duration-300"
                style={{
                  left: `${booth.isoX}%`,
                  top: `${booth.isoY}%`,
                  transform: 'translate(-50%, -50%)',
                }}
                onMouseEnter={() => setHoveredBooth(booth)}
                onMouseLeave={() => setHoveredBooth(null)}
                onClick={() => onSelectBooth(booth)}
              >
                {/* Ground Shadow & Active Beacon Ring */}
                <div 
                  className={`w-12 h-12 rounded-xl transition-all duration-300 flex items-center justify-center ${
                    isSelected
                      ? 'bg-[#f5810f]/30 ring-4 ring-[#f5810f]/50'
                      : isHovered
                      ? 'bg-[#ffb454]/20 ring-2 ring-[#ffb454]/40'
                      : 'bg-[#15202c]'
                  }`}
                >
                  {/* Extruded 3D Block Container */}
                  <motion.div
                    animate={{ z: elevation }}
                    transition={{ type: "spring", stiffness: 350, damping: 25 }}
                    style={{ transform: `translateZ(${elevation}px)` }}
                    className={`relative w-11 h-11 rounded-lg border flex flex-col items-center justify-center transition-all ${
                      isSelected
                        ? 'bg-[#f5810f] border-white text-slate-950 shadow-[0_0_20px_#f5810f]'
                        : isHovered
                        ? 'bg-[#223348] border-[#ffb454] text-white shadow-[0_0_15px_rgba(255,180,84,0.4)]'
                        : 'bg-[#182535] border-[#2c4054] text-slate-300'
                    }`}
                  >
                    {/* Booth Code Label */}
                    <span className="text-[10px] font-mono font-bold tracking-tight">
                      {booth.code}
                    </span>

                    {/* Status Dot */}
                    <span 
                      className={`w-1.5 h-1.5 rounded-full mt-0.5 ${
                        isSelected 
                          ? 'bg-slate-950' 
                          : booth.status === 'Live Demo'
                          ? 'bg-emerald-400 animate-ping'
                          : 'bg-[#ffb454]'
                      }`} 
                    />

                    {/* Antenna Beacon Pin */}
                    <div 
                      className={`absolute -top-3 left-1/2 -translate-x-1/2 w-[1.5px] h-3 ${
                        isSelected || isHovered ? 'bg-[#ffb454]' : 'bg-slate-500'
                      }`}
                    >
                      <div className="w-1.5 h-1.5 -ml-[2px] rounded-full bg-[#ffb454]" />
                    </div>
                  </motion.div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Bottom Interactive Hover Inspector Bar */}
      <div className="relative z-10 pt-2 border-t border-[#1a2736] flex items-center justify-between min-h-[46px]">
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
                      {active.company} · <span className="text-[#ffb454]">{active.sectorLabel}</span>
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
              <span>Hover over any booth to preview · Click to inspect specs</span>
            </div>
            <span className="hidden sm:inline font-mono text-[11px] text-slate-500">
              ROT: 58° / -38°
            </span>
          </div>
        )}
      </div>
    </div>
  );
};
