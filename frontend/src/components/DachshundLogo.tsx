import dachshundImage from '../assets/dachshund.png';

/**
 * Props for the DachshundLogo component
 */
interface DachshundLogoProps {
  /** Size of the logo in pixels */
  size?: number;
  /** Additional CSS classes to apply */
  className?: string;
}

/**
 * Customizable logo component featuring the Dachshund mascot
 * Supports configurable size and CSS classes for flexible integration
 */

export function DachshundLogo({ size = 48, className = '' }: DachshundLogoProps) {
  return (
    <div className={`dachshund-logo ${className}`} style={{ width: size, height: size }}>
      <img
        src={dachshundImage}
        alt="Dachshund dog mascot"
        width={size}
        height={size}
        style={{ 
          width: size, 
          height: size,
          objectFit: 'contain'
        }}
      />
    </div>
  );
}