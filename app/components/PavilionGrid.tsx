"use client";

import React, { useState } from 'react';
import { Layers, Radio, Grid3X3, RefreshCw } from 'lucide-react';
import { PAVILIONS_DATA, SECTORS, BoothData } from './pavilion/pavilionData';
import { IsometricFloor } from './pavilion/IsometricFloor';
import { HolographicRadar } from './pavilion/HolographicRadar';
import { ExhibitorDeck } from './pavilion/ExhibitorDeck';
import { BoothModal } from './pavilion/BoothModal';

type DisplayMode = 'isometric' | 'radar' | 'deck';

export default function PavilionGrid() {
  const [mode, setMode] = useState<DisplayMode>('isometric');
  const [selectedSector, setSelectedSector] = useState<string>('all');
  const [selectedBooth, setSelectedBooth] = useState<BoothData | null>(null);
  const [isScanning, setIsScanning] = useState<boolean>(false);

  // Filter booths by sector
  const filteredBooths = selectedSector === 'all'
    ? PAVILIONS_DATA
    : PAVILIONS_DATA.filter((b) => b.sector === selectedSector);

  const handleScanFloor = () => {
    setIsScanning(true);
    setTimeout(() => setIsScanning(false), 2400);
  };

  return (
    <div className="w-full max-w-lg mx-auto flex flex-col gap-3">
      {/* Top Controls: Design View Switcher & Scan Action */}
      <div className="flex flex-wrap items-center justify-between gap-2 bg-[#0c131d] border border-[#1e2d3e] p-1.5 rounded-xl shadow-lg">
        {/* Design View Switcher Tabs */}
        <div className="flex items-center gap-1 bg-[#121c29] p-1 rounded-lg">
          <button
            type="button"
            onClick={() => setMode('isometric')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium transition-all ${
              mode === 'isometric'
                ? 'bg-[#f5810f] text-slate-950 font-semibold shadow-sm'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            <span>3D Floor</span>
          </button>

          <button
            type="button"
            onClick={() => setMode('radar')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium transition-all ${
              mode === 'radar'
                ? 'bg-[#f5810f] text-slate-950 font-semibold shadow-sm'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Radio className="w-3.5 h-3.5" />
            <span>Radar Matrix</span>
          </button>

          <button
            type="button"
            onClick={() => setMode('deck')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium transition-all ${
              mode === 'deck'
                ? 'bg-[#f5810f] text-slate-950 font-semibold shadow-sm'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Grid3X3 className="w-3.5 h-3.5" />
            <span>Exhibitors</span>
          </button>
        </div>

        {/* Scan Floor Radar Action */}
        <button
          type="button"
          onClick={handleScanFloor}
          disabled={isScanning}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#142130] hover:bg-[#1c2e42] border border-[#23374d] text-slate-300 hover:text-white text-xs font-medium transition-all disabled:opacity-50"
          title="Send radar pulse through all exhibition pavilions"
        >
          <RefreshCw className={`w-3.5 h-3.5 text-[#ffb454] ${isScanning ? 'animate-spin' : ''}`} />
          <span>{isScanning ? 'Scanning...' : 'Scan Floor'}</span>
        </button>
      </div>

      {/* Sector Filter Bar */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
        {SECTORS.map((sector) => {
          const isActive = selectedSector === sector.id;
          return (
            <button
              key={sector.id}
              onClick={() => setSelectedSector(sector.id)}
              className={`shrink-0 px-2.5 py-1 rounded-lg text-xs font-mono transition-all ${
                isActive
                  ? 'bg-[#f5810f]/20 border border-[#f5810f] text-[#ffb454] font-semibold'
                  : 'bg-[#101824] border border-[#1d2a3a] text-slate-400 hover:text-slate-200 hover:border-[#2a3c50]'
              }`}
            >
              {sector.label}
            </button>
          );
        })}
      </div>

      {/* Main Exhibition Display Area */}
      <div className="relative">
        {mode === 'isometric' && (
          <IsometricFloor
            booths={filteredBooths}
            selectedBooth={selectedBooth}
            onSelectBooth={(booth) => setSelectedBooth(booth)}
            isScanning={isScanning}
          />
        )}

        {mode === 'radar' && (
          <HolographicRadar
            booths={filteredBooths}
            selectedBooth={selectedBooth}
            onSelectBooth={(booth) => setSelectedBooth(booth)}
            isScanning={isScanning}
          />
        )}

        {mode === 'deck' && (
          <ExhibitorDeck
            booths={filteredBooths}
            onSelectBooth={(booth) => setSelectedBooth(booth)}
          />
        )}
      </div>

      {/* Live Exhibition Telemetry Metrics Strip */}
      <div className="flex items-center justify-between px-3 py-2 rounded-xl bg-[#0b111a] border border-[#192634] text-[11px] font-mono text-slate-400">
        <div className="flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
          <span className="text-slate-300">EXPO STAGE LIVE</span>
        </div>
        <div className="flex items-center gap-3">
          <span>OCCUPANCY: <strong className="text-slate-200 font-semibold">96%</strong></span>
          <span className="text-slate-600">|</span>
          <span>ACTIVE ATTENDEES: <strong className="text-[#ffb454] font-semibold">1,420+</strong></span>
        </div>
      </div>

      {/* Interactive Detail Modal */}
      <BoothModal
        booth={selectedBooth}
        onClose={() => setSelectedBooth(null)}
      />
    </div>
  );
}
