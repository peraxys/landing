import { motion } from 'framer-motion'
import { ShieldCheck } from 'lucide-react'
import { CONTACT_HREF, Container } from './ui'
import { WhatsAppDemo } from './WhatsAppDemo'

export function Hero() {
  return (
    <section id="top" className="relative overflow-hidden pt-14 pb-20 sm:pt-20 sm:pb-28">
      <Container className="grid items-center gap-14 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)]">
        <div>
          <motion.a
            href="#goals"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 rounded-full border border-line bg-white px-3.5 py-1.5 text-sm text-ink"
          >
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-peacock opacity-60" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-peacock" />
            </span>
            Early access for saree and jewellery shops
          </motion.a>

          <motion.h1
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="mt-7 font-display text-5xl font-semibold leading-[1.02] tracking-tight text-ink sm:text-6xl xl:text-7xl"
          >
            Photograph your stock once. Customers find it on WhatsApp.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.25, duration: 0.6 }}
            className="mt-6 max-w-xl text-lg leading-relaxed text-ink-soft"
          >
            Peraxys turns photos of your sarees and jewellery into a searchable catalogue, then answers your customers on WhatsApp with real pieces and today’s price. Nothing is invented, and nothing needs typing in by hand.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="mt-9 flex flex-wrap items-center gap-3"
          >
            <motion.a
              href={CONTACT_HREF}
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.97 }}
              className="rounded-full bg-rani px-6 py-3 text-base font-medium text-white shadow-[0_10px_24px_-10px_rgba(199,37,95,0.8)]"
            >
              Request early access
            </motion.a>
            <motion.a
              href="#listing"
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.97 }}
              className="rounded-full border border-ink/25 px-6 py-3 text-base font-medium text-ink hover:bg-mist"
            >
              See how it works
            </motion.a>
          </motion.div>

          <p className="mt-8 flex items-center gap-2 text-sm text-ink-soft">
            <ShieldCheck size={16} className="text-peacock" aria-hidden />
            Every piece shown is in your catalogue. Prices come from your tags, never from a guess.
          </p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          <WhatsAppDemo />
        </motion.div>
      </Container>
    </section>
  )
}
