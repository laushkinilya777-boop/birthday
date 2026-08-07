declare module 'canvas-confetti' {
  interface ConfettiOptions {
    particleCount?: number;
    spread?: number;
    startVelocity?: number;
    ticks?: number;
    gravity?: number;
    scalar?: number;
    drift?: number;
    origin?: {
      x?: number;
      y?: number;
    };
    colors?: string[];
    angle?: number;
    disableForReducedMotion?: boolean;
    shapes?: string[];
    zIndex?: number;
  }

  interface ConfettiFunction {
    (options?: ConfettiOptions): Promise<unknown>;
  }

  const confetti: ConfettiFunction;
  export default confetti;
}
