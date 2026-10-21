import type { ReactNode } from 'react'
import { motion } from 'framer-motion'

export const CONTACT_EMAIL = 'hello@peraxys.com'
export const CONTACT_HREF = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent('Peraxys early access')}`

export function Pattu({ className = '' }: { className?: string }) {
  return <div aria-hidden className={`pattu ${className}`} />
}

export function Container({ children, className = '' }: { children: ReactNode; className?: string }) {
  return <div className={`mx-auto w-full max-w-6xl px-5 sm:px-8 ${className}`}>{children}</div>
}

export function SectionHeading({
  title,
  lead,
  className = '',
}: {
  title: string
  lead?: string
  className?: string
}) {
  return (
    <div className={`max-w-2xl ${className}`}>
      <h2 className="font-display text-4xl font-semibold leading-[1.08] tracking-tight text-ink sm:text-5xl">
        {title}
      </h2>
      {lead && <p className="mt-5 text-lg leading-relaxed text-ink-soft">{lead}</p>}
    </div>
  )
}

export function Reveal({ children, className = '', delay = 0 }: { children: ReactNode; className?: string; delay?: number }) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 14 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.5, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  )
}
