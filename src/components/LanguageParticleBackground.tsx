import React, { useEffect, useRef, useMemo } from 'react';
import { AudioPipelineStatus, IndicLanguageCode } from '../types';

interface LanguageParticleBackgroundProps {
  voiceState?: AudioPipelineStatus;
  isDark: boolean;
  page?: 'home' | 'live-demo';
  activeLanguage?: IndicLanguageCode;
}

interface ScriptGlyphDef {
  char: string;
  script: 'devanagari' | 'bengali' | 'tamil';
  language: string;
  isWordFragment?: boolean;
}

// Curated Indic Glyphs across the supported languages: Hindi, Marathi, Bengali, Tamil
const INDIC_GLYPHS: ScriptGlyphDef[] = [
  // Devanagari (Hindi & Marathi)
  { char: 'अ', script: 'devanagari', language: 'Hindi/Marathi' },
  { char: 'आ', script: 'devanagari', language: 'Hindi/Marathi' },
  { char: 'इ', script: 'devanagari', language: 'Hindi/Marathi' },
  { char: 'उ', script: 'devanagari', language: 'Hindi/Marathi' },
  { char: 'क', script: 'devanagari', language: 'Hindi/Marathi' },
  { char: 'म', script: 'devanagari', language: 'Hindi/Marathi' },
  { char: 'व', script: 'devanagari', language: 'Hindi/Marathi' },
  { char: 'स', script: 'devanagari', language: 'Hindi/Marathi' },
  { char: 'र', script: 'devanagari', language: 'Hindi/Marathi' },
  { char: 'त', script: 'devanagari', language: 'Hindi/Marathi' },
  { char: 'न', script: 'devanagari', language: 'Hindi/Marathi' },
  { char: 'द', script: 'devanagari', language: 'Hindi/Marathi' },
  { char: 'य', script: 'devanagari', language: 'Hindi/Marathi' },
  { char: 'भ', script: 'devanagari', language: 'Hindi/Marathi' },
  { char: 'ळ', script: 'devanagari', language: 'Marathi' },
  { char: 'ज्ञ', script: 'devanagari', language: 'Marathi/Hindi' },
  { char: 'स्व', script: 'devanagari', language: 'Hindi', isWordFragment: true },
  { char: 'सेतु', script: 'devanagari', language: 'Hindi', isWordFragment: true },
  { char: 'ज्ञान', script: 'devanagari', language: 'Hindi/Marathi', isWordFragment: true },

  // Bengali
  { char: 'অ', script: 'bengali', language: 'Bengali' },
  { char: 'আ', script: 'bengali', language: 'Bengali' },
  { char: 'ই', script: 'bengali', language: 'Bengali' },
  { char: 'ক', script: 'bengali', language: 'Bengali' },
  { char: 'ম', script: 'bengali', language: 'Bengali' },
  { char: 'ব', script: 'bengali', language: 'Bengali' },
  { char: 'স', script: 'bengali', language: 'Bengali' },
  { char: 'র', script: 'bengali', language: 'Bengali' },
  { char: 'ল', script: 'bengali', language: 'Bengali' },
  { char: 'ত', script: 'bengali', language: 'Bengali' },
  { char: 'ন', script: 'bengali', language: 'Bengali' },
  { char: 'দ', script: 'bengali', language: 'Bengali' },
  { char: 'ভাষা', script: 'bengali', language: 'Bengali', isWordFragment: true },
  { char: 'সেতু', script: 'bengali', language: 'Bengali', isWordFragment: true },
  { char: 'কথা', script: 'bengali', language: 'Bengali', isWordFragment: true },

  // Tamil
  { char: 'அ', script: 'tamil', language: 'Tamil' },
  { char: 'ஆ', script: 'tamil', language: 'Tamil' },
  { char: 'இ', script: 'tamil', language: 'Tamil' },
  { char: 'உ', script: 'tamil', language: 'Tamil' },
  { char: 'க', script: 'tamil', language: 'Tamil' },
  { char: 'ம', script: 'tamil', language: 'Tamil' },
  { char: 'வ', script: 'tamil', language: 'Tamil' },
  { char: 'ன', script: 'tamil', language: 'Tamil' },
  { char: 'த', script: 'tamil', language: 'Tamil' },
  { char: 'ந', script: 'tamil', language: 'Tamil' },
  { char: 'ய', script: 'tamil', language: 'Tamil' },
  { char: 'ர', script: 'tamil', language: 'Tamil' },
  { char: 'ல', script: 'tamil', language: 'Tamil' },
  { char: 'ழ', script: 'tamil', language: 'Tamil' },
  { char: 'ள', script: 'tamil', language: 'Tamil' },
  { char: 'மொழி', script: 'tamil', language: 'Tamil', isWordFragment: true },
  { char: 'சேது', script: 'tamil', language: 'Tamil', isWordFragment: true }
];

interface Particle {
  glyph: ScriptGlyphDef;
  x: number;
  y: number;
  baseX: number;
  baseY: number;
  depth: number; // 0 (far background) to 1 (near foreground)
  layer: 'background' | 'midground' | 'foreground';
  fontSize: number;
  baseOpacity: number;
  currentOpacity: number;
  rotation: number;
  rotationSpeed: number;
  vx: number;
  vy: number;
  baseVx: number;
  baseVy: number;
  phase: number;
  phaseSpeed: number;
  waveAmpX: number;
  waveAmpY: number;
  blur: number;
  colorIndex: number;
  // Interaction physics
  dispX: number;
  dispY: number;
  glowBoost: number;
}

interface StardustSpeck {
  x: number;
  y: number;
  radius: number;
  alpha: number;
  baseAlpha: number;
  vx: number;
  vy: number;
  phase: number;
}

export const LanguageParticleBackground: React.FC<LanguageParticleBackgroundProps> = ({
  voiceState = 'idle',
  isDark,
  page = 'home',
  activeLanguage
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  // References for animation state
  const animFrameIdRef = useRef<number | null>(null);
  const particlesRef = useRef<Particle[]>([]);
  const stardustRef = useRef<StardustSpeck[]>([]);
  const mousePosRef = useRef<{ x: number; y: number; active: boolean; lastActive: number }>({
    x: -1000,
    y: -1000,
    active: false,
    lastActive: 0
  });

  // Smooth voice reaction transition values
  const voiceEnergyRef = useRef<number>(0);
  const voiceWavePhaseRef = useRef<number>(0);
  const burstProgressRef = useRef<number>(0); // for success outward bloom

  // Check prefers-reduced-motion
  const prefersReducedMotion = useMemo(() => {
    if (typeof window !== 'undefined' && window.matchMedia) {
      return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    }
    return false;
  }, []);

  // Theme palettes: Soft indigos, blues, violets and neutrals
  const themeColors = useMemo(() => {
    if (isDark) {
      return {
        // Dark Mode: Deep cosmic navy universe with subtle luminous glow
        glyphs: [
          'rgba(165, 180, 252, ', // Indigo 300
          'rgba(129, 140, 248, ', // Indigo 400
          'rgba(147, 197, 253, ', // Blue 300
          'rgba(196, 181, 253, ', // Violet 300
          'rgba(167, 139, 250, ', // Violet 400
          'rgba(224, 231, 255, '  // Indigo 100
        ],
        glow: 'rgba(99, 102, 241, 0.45)',
        stardust: 'rgba(255, 255, 255, '
      };
    } else {
      return {
        // Light Mode: Very soft indigo, blue, violet and neutral tones, low opacity
        glyphs: [
          'rgba(67, 56, 202, ',   // Indigo 700
          'rgba(79, 70, 229, ',   // Indigo 600
          'rgba(37, 99, 235, ',   // Blue 600
          'rgba(109, 40, 217, ',  // Violet 700
          'rgba(71, 85, 105, '    // Slate 600
        ],
        glow: 'rgba(79, 70, 229, 0.20)',
        stardust: 'rgba(79, 70, 229, '
      };
    }
  }, [isDark]);

  // Initialize Particles based on screen dimensions
  const initParticles = (width: number, height: number) => {
    // Determine particle count based on screen width
    let glyphCount = 42;
    let stardustCount = 28;

    if (width < 640) {
      // Mobile
      glyphCount = 18;
      stardustCount = 12;
    } else if (width < 1024) {
      // Tablet
      glyphCount = 28;
      stardustCount = 20;
    }

    const particles: Particle[] = [];
    const usedGlyphs = [...INDIC_GLYPHS];

    for (let i = 0; i < glyphCount; i++) {
      // Pick glyph with balanced script representation
      const glyphDef = usedGlyphs[i % usedGlyphs.length];

      // Depth distribution:
      // ~50% background (0.15 - 0.45)
      // ~35% midground (0.45 - 0.78)
      // ~15% foreground (0.78 - 1.0)
      const rand = Math.random();
      let depth: number;
      let layer: 'background' | 'midground' | 'foreground';
      let fontSize: number;
      let baseOpacity: number;
      let blur: number;

      if (rand < 0.50) {
        layer = 'background';
        depth = 0.15 + Math.random() * 0.30;
        fontSize = Math.floor(13 + Math.random() * 6); // 13 - 19px
        baseOpacity = isDark
          ? 0.12 + Math.random() * 0.07 // 0.12 - 0.19
          : 0.07 + Math.random() * 0.05; // 0.07 - 0.12
        blur = 0.8 + Math.random() * 0.6; // 0.8 - 1.4px
      } else if (rand < 0.85) {
        layer = 'midground';
        depth = 0.46 + Math.random() * 0.32;
        fontSize = Math.floor(21 + Math.random() * 10); // 21 - 31px
        baseOpacity = isDark
          ? 0.20 + Math.random() * 0.11 // 0.20 - 0.31
          : 0.10 + Math.random() * 0.08; // 0.10 - 0.18
        blur = 0.2 + Math.random() * 0.3; // 0.2 - 0.5px
      } else {
        layer = 'foreground';
        depth = 0.80 + Math.random() * 0.20;
        fontSize = Math.floor(34 + Math.random() * 14); // 34 - 48px
        baseOpacity = isDark
          ? 0.28 + Math.random() * 0.12 // 0.28 - 0.40
          : 0.14 + Math.random() * 0.09; // 0.14 - 0.23
        blur = 0; // Crisp with soft glow
      }

      // Spread evenly across canvas with some margin
      const x = Math.random() * width;
      const y = Math.random() * height;

      // Organic drift velocity: upward / diagonal / sideways
      // 15 - 40 seconds per cycle across screen (0.15 - 0.5 px/frame)
      const speedMagnitude = (0.15 + depth * 0.35) * (Math.random() * 0.4 + 0.8);
      const angle = (Math.random() * 0.8 - 0.4) - Math.PI / 2; // mostly upward/diagonal drift
      const vx = Math.cos(angle) * speedMagnitude;
      const vy = Math.sin(angle) * speedMagnitude;

      particles.push({
        glyph: glyphDef,
        x,
        y,
        baseX: x,
        baseY: y,
        depth,
        layer,
        fontSize,
        baseOpacity,
        currentOpacity: baseOpacity,
        rotation: (Math.random() - 0.5) * 0.3, // -8 to +8 degrees
        rotationSpeed: (Math.random() - 0.5) * 0.002, // very slow micro-rotation
        vx,
        vy,
        baseVx: vx,
        baseVy: vy,
        phase: Math.random() * Math.PI * 2,
        phaseSpeed: 0.008 + Math.random() * 0.015,
        waveAmpX: 12 + Math.random() * 20,
        waveAmpY: 8 + Math.random() * 16,
        blur,
        colorIndex: Math.floor(Math.random() * 6),
        dispX: 0,
        dispY: 0,
        glowBoost: 0
      });
    }

    particlesRef.current = particles;

    // Atmospheric Stardust Specks
    const stardust: StardustSpeck[] = [];
    for (let j = 0; j < stardustCount; j++) {
      stardust.push({
        x: Math.random() * width,
        y: Math.random() * height,
        radius: 0.75 + Math.random() * 1.5,
        alpha: isDark ? 0.24 + Math.random() * 0.30 : 0.10 + Math.random() * 0.16,
        baseAlpha: isDark ? 0.24 + Math.random() * 0.30 : 0.10 + Math.random() * 0.16,
        vx: (Math.random() - 0.5) * 0.2,
        vy: -0.15 - Math.random() * 0.25,
        phase: Math.random() * Math.PI * 2
      });
    }
    stardustRef.current = stardust;
  };

  // Main Canvas Setup & Animation Loop
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = width * dpr;
    canvas.height = height * dpr;
    ctx.scale(dpr, dpr);

    initParticles(width, height);

    // Handle Window Resize
    const handleResize = () => {
      if (!canvas) return;
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.scale(dpr, dpr);
      initParticles(width, height);
    };

    window.addEventListener('resize', handleResize);

    // Subtle Mouse Tracking for gentle reaction
    const handleMouseMove = (e: MouseEvent) => {
      mousePosRef.current = {
        x: e.clientX,
        y: e.clientY,
        active: true,
        lastActive: performance.now()
      };
    };

    const handleMouseLeave = () => {
      mousePosRef.current.active = false;
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseleave', handleMouseLeave);

    // Trigger burst on success
    if (voiceState === 'form_ready' || voiceState === 'success') {
      burstProgressRef.current = 1.0;
    }

    // Animation Loop
    let lastTime = performance.now();

    const render = (time: number) => {
      const dt = Math.min(time - lastTime, 40) / 16.666; // normalized delta frame
      lastTime = time;

      ctx.clearRect(0, 0, width, height);

      // Target Voice Energy interpolation
      let targetEnergy = 0;
      if (voiceState === 'recording') {
        targetEnergy = 0.85; // High energy, particles gently converge and accelerate
      } else if (voiceState === 'transcribing' || voiceState === 'extracting') {
        targetEnergy = 0.65; // Intelligent harmonic convergence
      } else if (voiceState === 'form_ready' || voiceState === 'success') {
        targetEnergy = 0.4;
      }
      voiceEnergyRef.current += (targetEnergy - voiceEnergyRef.current) * (0.05 * dt);

      // Voice Wave Phase
      voiceWavePhaseRef.current += (0.03 + voiceEnergyRef.current * 0.05) * dt;

      // Burst fade out
      if (burstProgressRef.current > 0.01) {
        burstProgressRef.current = Math.max(0, burstProgressRef.current - 0.02 * dt);
      }

      // Voice Center Target Coordinates
      // In live-demo, mic is approximately at (width * 0.28, height * 0.42) on desktop
      // In mobile or home, around center
      const voiceTargetX = page === 'live-demo' && width > 1024 ? width * 0.30 : width * 0.5;
      const voiceTargetY = page === 'live-demo' && width > 1024 ? height * 0.42 : height * 0.38;

      // Form Quiet Zone Box (VoiceFormView form card area on desktop)
      // When page === 'live-demo', form sits on the right half (width * 0.45 to width * 0.95)
      const hasQuietZone = page === 'live-demo';
      const quietZoneX1 = width * 0.42;
      const quietZoneX2 = width * 0.94;
      const quietZoneY1 = height * 0.15;
      const quietZoneY2 = height * 0.90;

      // Mouse State
      const mouse = mousePosRef.current;
      const isMouseActive = mouse.active && performance.now() - mouse.lastActive < 2500;

      // If reduced motion is requested, render static frame and halt loop
      if (prefersReducedMotion) {
        renderStaticFrame(ctx, width, height);
        return;
      }

      // 1. Render Stardust Specks
      ctx.save();
      const stardustList = stardustRef.current;
      for (let j = 0; j < stardustList.length; j++) {
        const speck = stardustList[j];
        speck.phase += 0.015 * dt;
        speck.y += speck.vy * dt;
        speck.x += speck.vx * dt;

        // Wrap around
        if (speck.y < -10) speck.y = height + 10;
        if (speck.y > height + 10) speck.y = -10;
        if (speck.x < -10) speck.x = width + 10;
        if (speck.x > width + 10) speck.x = -10;

        const pulse = Math.sin(speck.phase) * 0.3 + 0.7;
        const alpha = speck.baseAlpha * pulse;

        ctx.fillStyle = `${themeColors.stardust}${alpha})`;
        ctx.beginPath();
        ctx.arc(speck.x, speck.y, speck.radius, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.restore();

      // 2. Render Indic Language Characters
      const particles = particlesRef.current;
      const glyphColors = themeColors.glyphs;

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        // Organic Sine Wave Bobbing
        p.phase += p.phaseSpeed * dt;
        const waveX = Math.sin(p.phase) * p.waveAmpX;
        const waveY = Math.cos(p.phase * 0.7) * p.waveAmpY;

        // Micro-rotation
        p.rotation += p.rotationSpeed * dt;

        // Natural Drift Motion
        p.x += (p.baseVx + waveX * 0.03) * dt;
        p.y += (p.baseVy + waveY * 0.03) * dt;

        // Voice Interaction Dynamics
        let voicePullX = 0;
        let voicePullY = 0;
        let voiceGlow = 0;

        if (voiceEnergyRef.current > 0.05) {
          const dx = voiceTargetX - p.x;
          const dy = voiceTargetY - p.y;
          const dist = Math.sqrt(dx * dx + dy * dy) || 1;

          if (voiceState === 'recording') {
            // Gentle acceleration & gravitational pull toward the voice epicenter
            const pullStrength = Math.min(120, 3500 / (dist + 80)) * voiceEnergyRef.current * 0.012;
            voicePullX = (dx / dist) * pullStrength;
            voicePullY = (dy / dist) * pullStrength;

            // Rhythmic breathing glow synchronized with voice wave
            voiceGlow = Math.sin(voiceWavePhaseRef.current + p.phase) * 0.08 + 0.05;
          } else if (voiceState === 'transcribing' || voiceState === 'extracting') {
            // Harmonic intelligent convergence (swirling gently inward)
            const angle = Math.atan2(dy, dx) + Math.PI / 2; // tangential swirl
            const swirlStrength = 0.6 * voiceEnergyRef.current;
            voicePullX = (dx / dist) * 0.4 * voiceEnergyRef.current + Math.cos(angle) * swirlStrength;
            voicePullY = (dy / dist) * 0.4 * voiceEnergyRef.current + Math.sin(angle) * swirlStrength;
            voiceGlow = 0.10 + Math.sin(voiceWavePhaseRef.current * 2) * 0.05;
          }
        }

        // Success Outward Bloom Wave
        let burstX = 0;
        let burstY = 0;
        if (burstProgressRef.current > 0) {
          const dx = p.x - voiceTargetX;
          const dy = p.y - voiceTargetY;
          const dist = Math.sqrt(dx * dx + dy * dy) || 1;
          const burstFactor = burstProgressRef.current * (1 - Math.min(1, dist / (width * 0.6)));
          burstX = (dx / dist) * burstFactor * 2.5;
          burstY = (dy / dist) * burstFactor * 2.5;
          voiceGlow += burstFactor * 0.22;
        }

        p.x += (voicePullX + burstX) * dt;
        p.y += (voicePullY + burstY) * dt;

        // Cursor Interaction (Subtle repulsive fluid wake, never chasing)
        if (isMouseActive) {
          const mdx = p.x - mouse.x;
          const mdy = p.y - mouse.y;
          const mDist = Math.sqrt(mdx * mdx + mdy * mdy);
          const influenceRadius = 150;

          if (mDist < influenceRadius && mDist > 0) {
            const force = (1 - mDist / influenceRadius) * 24 * (p.depth * 0.8 + 0.2);
            p.dispX += ((mdx / mDist) * force - p.dispX) * (0.08 * dt);
            p.dispY += ((mdy / mDist) * force - p.dispY) * (0.08 * dt);
            p.glowBoost = Math.min(0.12, (1 - mDist / influenceRadius) * 0.08);
          } else {
            p.dispX += (0 - p.dispX) * (0.05 * dt);
            p.dispY += (0 - p.dispY) * (0.05 * dt);
            p.glowBoost += (0 - p.glowBoost) * (0.05 * dt);
          }
        } else {
          p.dispX += (0 - p.dispX) * (0.05 * dt);
          p.dispY += (0 - p.dispY) * (0.05 * dt);
          p.glowBoost += (0 - p.glowBoost) * (0.05 * dt);
        }

        // Screen Boundary Wrap Around (Continuous majestic universe)
        const margin = 60;
        if (p.y < -margin) {
          p.y = height + margin;
          p.x = Math.random() * width;
        } else if (p.y > height + margin) {
          p.y = -margin;
          p.x = Math.random() * width;
        }
        if (p.x < -margin) {
          p.x = width + margin;
        } else if (p.x > width + margin) {
          p.x = -margin;
        }

        // Quiet Zone on Voice Form Page
        // Attenuate opacity to ~25% if particle drifts directly inside the form card area
        let quietAttenuation = 1.0;
        if (hasQuietZone && width > 1024) {
          const effectiveX = p.x + p.dispX;
          const effectiveY = p.y + p.dispY;
          if (
            effectiveX >= quietZoneX1 &&
            effectiveX <= quietZoneX2 &&
            effectiveY >= quietZoneY1 &&
            effectiveY <= quietZoneY2
          ) {
            // Smooth edge falloff
            const edgeDistX = Math.min(effectiveX - quietZoneX1, quietZoneX2 - effectiveX);
            const edgeDistY = Math.min(effectiveY - quietZoneY1, quietZoneY2 - effectiveY);
            const minEdgeDist = Math.min(edgeDistX, edgeDistY);
            const falloff = Math.max(0.20, Math.min(1.0, minEdgeDist / 120));
            quietAttenuation = 0.20 + 0.80 * (1.0 - falloff);
          }
        }

        // Final Opacity Calculation
        const breathing = Math.sin(p.phase * 0.8) * 0.03;
        const totalOpacity = Math.max(
          0.02,
          Math.min(
            0.72,
            (p.baseOpacity + breathing + p.glowBoost + voiceGlow) * quietAttenuation
          )
        );

        // Color
        const colorPrefix = glyphColors[p.colorIndex % glyphColors.length];
        const fontColor = `${colorPrefix}${totalOpacity.toFixed(3)})`;

        // Render Glyph
        ctx.save();
        ctx.translate(p.x + p.dispX, p.y + p.dispY);
        ctx.rotate(p.rotation);

        // Font Family Selection based on script
        let fontFamily = "'Plus Jakarta Sans', sans-serif";
        if (p.glyph.script === 'devanagari') {
          fontFamily = "'Noto Sans Devanagari', 'Space Grotesk', sans-serif";
        } else if (p.glyph.script === 'bengali') {
          fontFamily = "'Noto Sans Bengali', 'Space Grotesk', sans-serif";
        } else if (p.glyph.script === 'tamil') {
          fontFamily = "'Noto Sans Tamil', 'Space Grotesk', sans-serif";
        }

        ctx.font = `${p.layer === 'foreground' ? '600' : '500'} ${p.fontSize}px ${fontFamily}`;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';

        // Foreground Layer Soft Glow
        if (p.layer === 'foreground' || p.glowBoost > 0.03 || voiceGlow > 0.05) {
          ctx.shadowColor = themeColors.glow;
          ctx.shadowBlur = isDark ? 12 : 6;
        }

        ctx.fillStyle = fontColor;
        ctx.fillText(p.glyph.char, 0, 0);

        ctx.restore();
      }

      animFrameIdRef.current = requestAnimationFrame(render);
    };

    // Static fallback for reduced motion
    const renderStaticFrame = (
      context: CanvasRenderingContext2D,
      w: number,
      h: number
    ) => {
      context.clearRect(0, 0, w, h);
      const particles = particlesRef.current;
      const glyphColors = themeColors.glyphs;

      for (const p of particles) {
        const colorPrefix = glyphColors[p.colorIndex % glyphColors.length];
        const fontColor = `${colorPrefix}${p.baseOpacity.toFixed(3)})`;

        context.save();
        context.translate(p.x, p.y);
        context.rotate(p.rotation);

        let fontFamily = "'Plus Jakarta Sans', sans-serif";
        if (p.glyph.script === 'devanagari') {
          fontFamily = "'Noto Sans Devanagari', sans-serif";
        } else if (p.glyph.script === 'bengali') {
          fontFamily = "'Noto Sans Bengali', sans-serif";
        } else if (p.glyph.script === 'tamil') {
          fontFamily = "'Noto Sans Tamil', sans-serif";
        }

        context.font = `500 ${p.fontSize}px ${fontFamily}`;
        context.textAlign = 'center';
        context.textBaseline = 'middle';
        context.fillStyle = fontColor;
        context.fillText(p.glyph.char, 0, 0);
        context.restore();
      }
    };

    animFrameIdRef.current = requestAnimationFrame(render);

    return () => {
      if (animFrameIdRef.current) {
        cancelAnimationFrame(animFrameIdRef.current);
      }
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [isDark, page, voiceState, prefersReducedMotion, themeColors]);

  return (
    <div
      ref={containerRef}
      aria-hidden="true"
      className="fixed inset-0 pointer-events-none overflow-hidden z-0 select-none transition-colors duration-700"
    >
      {/* 1. Atmospheric Ambient Radial Meshes (Deep Cinematic Lighting) */}
      {isDark ? (
        <>
          {/* Deep Navy Dark Theme Ambient Atmosphere */}
          <div className="absolute -top-32 -left-32 w-[650px] h-[650px] rounded-full bg-indigo-800/25 blur-[120px] pointer-events-none" />
          <div className="absolute top-1/3 right-[-100px] w-[600px] h-[600px] rounded-full bg-violet-800/22 blur-[140px] pointer-events-none" />
          <div className="absolute -bottom-40 left-1/4 w-[750px] h-[750px] rounded-full bg-blue-900/30 blur-[150px] pointer-events-none" />
          {/* Voice State Lighting Pulse in Dark Mode */}
          {voiceState === 'recording' && (
            <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[700px] rounded-full bg-primary/10 blur-[130px] animate-pulse pointer-events-none transition-opacity duration-500" />
          )}
        </>
      ) : (
        <>
          {/* Light Theme Ethereal Atmosphere */}
          <div className="absolute -top-32 -left-32 w-[600px] h-[600px] rounded-full bg-indigo-200/38 blur-[120px] pointer-events-none" />
          <div className="absolute top-1/3 right-[-100px] w-[550px] h-[550px] rounded-full bg-violet-200/32 blur-[130px] pointer-events-none" />
          <div className="absolute -bottom-40 left-1/3 w-[700px] h-[700px] rounded-full bg-blue-100/45 blur-[140px] pointer-events-none" />
          {/* Voice State Lighting Pulse in Light Mode */}
          {voiceState === 'recording' && (
            <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full bg-primary/5 blur-[120px] animate-pulse pointer-events-none transition-opacity duration-500" />
          )}
        </>
      )}

      {/* 2. High-Performance Multilingual Particle Canvas */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full block"
      />

      {/* 3. Subtle Peripheral Cinematic Vignette Overlay */}
      <div
        className={`absolute inset-0 pointer-events-none ${
          isDark
            ? 'bg-[radial-gradient(ellipse_at_center,transparent_62%,rgba(7,10,19,0.38)_100%)]'
            : 'bg-[radial-gradient(ellipse_at_center,transparent_78%,rgba(240,243,255,0.26)_100%)]'
        }`}
      />
    </div>
  );
};
