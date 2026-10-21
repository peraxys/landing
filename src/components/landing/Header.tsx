import { motion, useScroll, useSpring } from 'framer-motion'
import { Mail } from 'lucide-react'
import { Logo } from './Logo'
import { CONTACT_HREF, Container } from './ui'

const links = [
  { href: '#listing', label: 'Photo to listing' },
  { href: '#features', label: 'Features' },
  { href: '#how', label: 'How it works' },
  { href: '#goals', label: 'Our goals' },
  { href: '#faq', label: 'FAQ' },
]

export function Header() {
  const { scrollYProgress } = useScroll()
  const progress = useSpring(scrollYProgress, { stiffness: 140, damping: 24, mass: 0.3 })

  return (
    <header className="sticky top-0 z-50 border-b border-line bg-paper/85 backdrop-blur-md">
      <Container className="flex h-16 items-center justify-between gap-6">
        <a href="#top" aria-label="Peraxys home">
          <Logo />
        </a>

        <nav aria-label="Primary" className="hidden items-center gap-6 lg:flex">
          {links.map((l) => (
            <a key={l.href} href={l.href} className="whitespace-nowrap text-sm text-ink-soft transition-colors hover:text-ink">
              {l.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <motion.a
            href={CONTACT_HREF}
            whileHover={{ y: -1 }}
            whileTap={{ scale: 0.97 }}
            className="inline-flex items-center gap-2 rounded-full bg-ink px-4 py-2 text-sm font-medium text-paper"
          >
            <Mail size={15} aria-hidden /> Contact us
          </motion.a>
        </div>
      </Container>
      <motion.div aria-hidden style={{ scaleX: progress }} className="absolute inset-x-0 -bottom-px h-0.5 origin-left bg-rani" />
    </header>
  )
}
