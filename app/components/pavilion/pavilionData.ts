export interface BoothData {
  id: string;
  code: string;
  name: string;
  company: string;
  sector: 'robotics' | 'machining' | 'energy' | 'metrology';
  sectorLabel: string;
  status: 'Live Demo' | 'Keynote Stream' | '3D Twin Ready' | 'B2B Open';
  attendees: number;
  featuredInnovation: string;
  specs: {
    label: string;
    value: string;
  }[];
  isoX: number; // Isometric X coordinate (0-100)
  isoY: number; // Isometric Y coordinate (0-100)
  radarAngle: number; // 0-360 degrees
  radarDistance: number; // 20-90%
  imageUrl: string;
  description: string;
}

export const PAVILIONS_DATA: BoothData[] = [
  {
    id: 'booth-1',
    code: 'A-101',
    name: 'Autonomous Precision Robotics',
    company: 'NexGen Robotics AG',
    sector: 'robotics',
    sectorLabel: 'Robotics & Automation',
    status: 'Live Demo',
    attendees: 284,
    featuredInnovation: 'Sub-millimeter 6-axis robotic arm with optical seam-tracking vision',
    specs: [
      { label: 'Payload Capacity', value: '35 kg' },
      { label: 'Repeatability', value: '±0.02 mm' },
      { label: 'Vision Latency', value: '3.4 ms' },
      { label: 'Drive Protocol', value: 'EtherCAT / TSN' },
    ],
    isoX: 22,
    isoY: 30,
    radarAngle: 42,
    radarDistance: 55,
    imageUrl: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?q=80&w=800&auto=format&fit=crop',
    description: 'Pioneering collaborative automation systems for high-cadence aerospace and automotive assembly lines.',
  },
  {
    id: 'booth-2',
    code: 'A-108',
    name: '5-Axis Titanium Milling Center',
    company: 'Apex Machining Labs',
    sector: 'machining',
    sectorLabel: 'Advanced Machining',
    status: 'Live Demo',
    attendees: 196,
    featuredInnovation: 'Cryogenic-cooled spindle with active vibration feedback at 36,000 RPM',
    specs: [
      { label: 'Spindle Speed', value: '36,000 RPM' },
      { label: 'Axis Travel (X/Y/Z)', value: '800 / 700 / 650 mm' },
      { label: 'Positioning Precision', value: '±1.2 µm' },
      { label: 'Thermal Compensation', value: 'Continuous AI Sensor' },
    ],
    isoX: 74,
    isoY: 26,
    radarAngle: 125,
    radarDistance: 68,
    imageUrl: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=800&auto=format&fit=crop',
    description: 'Next-generation subtractive manufacturing machine tools engineered for inconel, titanium, and medical implants.',
  },
  {
    id: 'booth-3',
    code: 'B-204',
    name: 'Laser Powder Bed Additive System',
    company: 'Additive3D Works',
    sector: 'machining',
    sectorLabel: 'Advanced Machining',
    status: '3D Twin Ready',
    attendees: 167,
    featuredInnovation: 'Quad-laser 1000W metal 3D printing with real-time melt pool pyrometry',
    specs: [
      { label: 'Build Envelope', value: '400 × 400 × 450 mm' },
      { label: 'Laser Configuration', value: '4 × 1000W Fiber' },
      { label: 'Layer Thickness', value: '20 - 100 µm' },
      { label: 'Inert Atmosphere', value: 'Argon < 100 ppm O₂' },
    ],
    isoX: 35,
    isoY: 72,
    radarAngle: 215,
    radarDistance: 74,
    imageUrl: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=800&auto=format&fit=crop',
    description: 'Industrial metal additive manufacturing pushing the boundaries of generative internal cooling channels.',
  },
  {
    id: 'booth-4',
    code: 'B-215',
    name: 'Solid-State Clean Grid Inverter',
    company: 'VoltGrid Systems',
    sector: 'energy',
    sectorLabel: 'Clean Energy',
    status: 'B2B Open',
    attendees: 142,
    featuredInnovation: 'Silicon Carbide (SiC) high-density multi-megawatt power converter',
    specs: [
      { label: 'Efficiency', value: '99.42% CEC' },
      { label: 'Rated Capacity', value: '3.2 MVA' },
      { label: 'Grid Response Time', value: '< 15 ms' },
      { label: 'Cooling Topology', value: 'Direct Liquid Immersion' },
    ],
    isoX: 82,
    isoY: 65,
    radarAngle: 310,
    radarDistance: 60,
    imageUrl: 'https://images.unsplash.com/photo-1581092334651-ddf26d9a09d0?q=80&w=800&auto=format&fit=crop',
    description: 'Utility-scale energy storage and grid-tie infrastructure for industrial solar and offshore wind farms.',
  },
  {
    id: 'booth-5',
    code: 'C-302',
    name: '3D Laser Surface Interferometer',
    company: 'OptiScan Metrology Lab',
    sector: 'metrology',
    sectorLabel: 'Metrology & QA',
    status: 'Live Demo',
    attendees: 215,
    featuredInnovation: 'Picometer-resolution non-contact optical inspection in 1.4 seconds',
    specs: [
      { label: 'Vertical Resolution', value: '0.01 nm' },
      { label: 'Field of View', value: '12 × 12 mm' },
      { label: 'Acquisition Rate', value: '1,200,000 pts/sec' },
      { label: 'Laser Wavelength', value: '405 nm True Blue' },
    ],
    isoX: 18,
    isoY: 52,
    radarAngle: 185,
    radarDistance: 45,
    imageUrl: 'https://images.unsplash.com/photo-1581093588401-fbb62a02f120?q=80&w=800&auto=format&fit=crop',
    description: 'Nanoscale quality verification station for semiconductor lithography masks and diamond-turned optics.',
  },
  {
    id: 'booth-6',
    code: 'C-311',
    name: 'High-Cadence Cleanroom Packaging',
    company: 'CleanFlow Automation',
    sector: 'robotics',
    sectorLabel: 'Robotics & Automation',
    status: 'Keynote Stream',
    attendees: 310,
    featuredInnovation: 'Magnetic levitation transfer track eliminating friction and cleanroom particulate',
    specs: [
      { label: 'Transfer Velocity', value: '4.5 m/s' },
      { label: 'ISO Cleanliness', value: 'ISO Class 1' },
      { label: 'Wear Particles', value: '0.00 ppm' },
      { label: 'Synchronization', value: 'Sub-microsecond' },
    ],
    isoX: 58,
    isoY: 18,
    radarAngle: 80,
    radarDistance: 70,
    imageUrl: 'https://images.unsplash.com/photo-1581091215367-9b6c00b3035a?q=80&w=800&auto=format&fit=crop',
    description: 'Sterile automated filling and secondary packaging solutions for pharmaceutical and medical injectables.',
  },
  {
    id: 'booth-7',
    code: 'D-401',
    name: 'Industrial Micro-Hydraulics & Turbines',
    company: 'PowerDrive Dynamics',
    sector: 'energy',
    sectorLabel: 'Clean Energy',
    status: '3D Twin Ready',
    attendees: 128,
    featuredInnovation: 'Variable-geometry micro-turbine producing hydro-electric recovery from factory effluents',
    specs: [
      { label: 'Turbine Rating', value: '450 kW' },
      { label: 'Operating Pressure', value: '35 Bar' },
      { label: 'Fluid Compatibility', value: 'High Viscosity Slurries' },
      { label: 'Lifecycle MTBF', value: '80,000 Hours' },
    ],
    isoX: 48,
    isoY: 86,
    radarAngle: 250,
    radarDistance: 82,
    imageUrl: 'https://images.unsplash.com/photo-1581092162384-8987c1d64718?q=80&w=800&auto=format&fit=crop',
    description: 'Heavy industrial power generation and closed-loop hydraulic recovery for zero-emission factories.',
  },
  {
    id: 'booth-8',
    code: 'D-410',
    name: 'Autonomous Agritech Sensing Canopy',
    company: 'AgroTech Futures',
    sector: 'energy',
    sectorLabel: 'Clean Energy',
    status: 'B2B Open',
    attendees: 94,
    featuredInnovation: 'Solar-tethered hyperspectral imaging robot assessing crop hydration & photosynthetic rates',
    specs: [
      { label: 'Coverage Rate', value: '120 Hectares / day' },
      { label: 'Spectral Bands', value: '224 Channels' },
      { label: 'Battery Reserve', value: 'Solar Assisted (Continuous)' },
      { label: 'AI Edge Model', value: 'On-board Tensor Core' },
    ],
    isoX: 70,
    isoY: 48,
    radarAngle: 345,
    radarDistance: 78,
    imageUrl: 'https://images.unsplash.com/photo-1586771107445-d3ca888129ff?q=80&w=800&auto=format&fit=crop',
    description: 'Agricultural robotics leveraging machine vision to cut irrigation waste by 42% in arid farming zones.',
  },
];

export const SECTORS = [
  { id: 'all', label: 'All Pavilions' },
  { id: 'robotics', label: 'Robotics' },
  { id: 'machining', label: 'Advanced CNC' },
  { id: 'energy', label: 'Clean Energy' },
  { id: 'metrology', label: 'Metrology & QA' },
] as const;
