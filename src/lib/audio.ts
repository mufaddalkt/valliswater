// Web Audio API procedural luxury sound synthesizer
class SoundManager {
  private ctx: AudioContext | null = null;
  private isMuted: boolean = true;
  private ambientGain: GainNode | null = null;
  private ambientOsc1: OscillatorNode | null = null;
  private ambientOsc2: OscillatorNode | null = null;

  private initCtx() {
    if (typeof window === "undefined") return null;
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
    if (this.ctx && this.ctx.state === "suspended") {
      this.ctx.resume();
    }
    return this.ctx;
  }

  public getMuted(): boolean {
    return this.isMuted;
  }

  public toggleMute(): boolean {
    this.isMuted = !this.isMuted;
    if (!this.isMuted) {
      this.initCtx();
      this.startAmbient();
      this.playWaterDrop();
    } else {
      this.stopAmbient();
    }
    return this.isMuted;
  }

  // Subtle crystal glass chime on button interaction
  public playChime(freq = 1200) {
    if (this.isMuted) return;
    const ctx = this.initCtx();
    if (!ctx) return;

    try {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      const now = ctx.currentTime;

      osc.type = "sine";
      osc.frequency.setValueAtTime(freq, now);
      osc.frequency.exponentialRampToValueAtTime(freq * 0.5, now + 0.35);

      gain.gain.setValueAtTime(0.04, now);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.35);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(now);
      osc.stop(now + 0.35);
    } catch {
      // safe fallback
    }
  }

  // Resonant water droplet ripple sound
  public playWaterDrop() {
    if (this.isMuted) return;
    const ctx = this.initCtx();
    if (!ctx) return;

    try {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      const now = ctx.currentTime;

      osc.type = "sine";
      osc.frequency.setValueAtTime(700, now);
      osc.frequency.exponentialRampToValueAtTime(1450, now + 0.08);
      osc.frequency.exponentialRampToValueAtTime(600, now + 0.25);

      gain.gain.setValueAtTime(0.06, now);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.25);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(now);
      osc.stop(now + 0.25);
    } catch {
      // safe fallback
    }
  }

  // Subtle low-pass ambient air & glacial resonance
  private startAmbient() {
    if (this.isMuted) return;
    const ctx = this.initCtx();
    if (!ctx) return;

    try {
      if (this.ambientOsc1) return;

      const now = ctx.currentTime;
      const gain = ctx.createGain();
      gain.gain.setValueAtTime(0.001, now);
      gain.gain.linearRampToValueAtTime(0.015, now + 3.0);

      const filter = ctx.createBiquadFilter();
      filter.type = "lowpass";
      filter.frequency.setValueAtTime(320, now);

      const osc1 = ctx.createOscillator();
      osc1.type = "sine";
      osc1.frequency.setValueAtTime(108, now);

      const osc2 = ctx.createOscillator();
      osc2.type = "sine";
      osc2.frequency.setValueAtTime(162, now);

      osc1.connect(filter);
      osc2.connect(filter);
      filter.connect(gain);
      gain.connect(ctx.destination);

      osc1.start();
      osc2.start();

      this.ambientGain = gain;
      this.ambientOsc1 = osc1;
      this.ambientOsc2 = osc2;
    } catch {
      // safe fallback
    }
  }

  private stopAmbient() {
    if (!this.ctx || !this.ambientGain) return;
    try {
      const now = this.ctx.currentTime;
      this.ambientGain.gain.linearRampToValueAtTime(0.0001, now + 0.8);
      setTimeout(() => {
        this.ambientOsc1?.stop();
        this.ambientOsc2?.stop();
        this.ambientOsc1?.disconnect();
        this.ambientOsc2?.disconnect();
        this.ambientOsc1 = null;
        this.ambientOsc2 = null;
        this.ambientGain = null;
      }, 850);
    } catch {
      this.ambientOsc1 = null;
      this.ambientOsc2 = null;
      this.ambientGain = null;
    }
  }
}

export const soundManager = new SoundManager();
