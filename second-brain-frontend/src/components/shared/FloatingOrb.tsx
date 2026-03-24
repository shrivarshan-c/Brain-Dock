interface FloatingOrbProps {
  size?: number;
  x?: string;
  y?: string;
  color?: string;
  opacity?: number;
  animationClass?: string;
  delay?: string;
}

export function FloatingOrb({
  size = 400,
  x = '50%',
  y = '50%',
  color,
  opacity = 1,
  animationClass = 'orb-1',
  delay = '0s',
}: FloatingOrbProps) {
  return (
    <div
      className={`orb ${animationClass}`}
      style={{
        width: size,
        height: size,
        left: x,
        top: y,
        transform: 'translate(-50%, -50%)',
        background: color || 'var(--orb-color-1)',
        opacity,
        animationDelay: delay,
      }}
    />
  );
}
