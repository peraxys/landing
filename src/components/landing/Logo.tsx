import { useId } from 'react'

/** Peraxys mark: three gradient axes crossing around an open centre. */
export function LogoMark({ size = 28, className = '' }: { size?: number; className?: string }) {
  const id = useId()
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" className={className} aria-hidden>
      <defs>
        <linearGradient id={`${id}g`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#0fa38a" />
          <stop offset=".55" stopColor="#c7255f" />
          <stop offset="1" stopColor="#f2a93b" />
        </linearGradient>
        <mask id={`${id}m`}>
          <rect width="32" height="32" fill="#fff" />
          <circle cx="16" cy="16" r="3.2" fill="#000" />
        </mask>
      </defs>
      <g fill={`url(#${id}g)`} mask={`url(#${id}m)`}>
        <rect x="14" y="2" width="4" height="28" rx="2" />
        <rect x="14" y="2" width="4" height="28" rx="2" transform="rotate(60 16 16)" />
        <rect x="14" y="2" width="4" height="28" rx="2" transform="rotate(120 16 16)" />
      </g>
    </svg>
  )
}

export function Logo({ className = '' }: { className?: string }) {
  return (
    <span className={`inline-flex items-center gap-2 ${className}`}>
      <LogoMark />
      <span className="font-display text-xl font-semibold tracking-tight">Peraxys</span>
    </span>
  )
}
