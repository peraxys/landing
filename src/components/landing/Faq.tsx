import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Plus } from 'lucide-react'
import { CONTACT_EMAIL, CONTACT_HREF, Container, Reveal, SectionHeading } from './ui'

const items = [
  {
    q: 'Do we need inventory software?',
    a: 'No. Most shops don’t have a catalogue at all, so we build one from your photos. If you already export a stock sheet from billing software, you can upload that as a CSV and we match it to your pieces by tag number.',
  },
  {
    q: 'What do we actually have to do?',
    a: 'Photograph each piece, photograph its price tag, and tap Save. Items go live without anyone approving them one by one. We only ask you to look at the few the AI wasn’t sure about, shown as a short list like “3 items need a look”.',
  },
  {
    q: 'Could it show a wrong price or a wrong weight?',
    a: 'Weights and purity are only ever read from the tag, never guessed from the photo. A number goes live only when it’s a clean read or two sources agree. Otherwise the piece still appears, marked “ask for today’s price”. Discounts and schemes stay at your counter.',
  },
  {
    q: 'How does pricing work for gold?',
    a: 'Your own price is used first when you have one. For gold with only a tag, we multiply net weight by today’s rate for that purity and show a range that includes your usual making charges. Update the daily rate and every price follows.',
  },
  {
    q: 'Which languages does it understand?',
    a: 'Customers can write in English, Tamil, or a mix like “pacha saree, border vecha maari”, and the reply follows their language. More languages are planned, and new local words are added as customers use them.',
  },
  {
    q: 'How does it connect to WhatsApp?',
    a: 'Through the official WhatsApp Business platform. Meta’s approval can take a few days, so we start early. We recommend a fresh number so your existing chats aren’t disturbed. A chat widget for your website runs on the same system.',
  },
  {
    q: 'What does it cost?',
    a: 'We’re finalising pricing with our first stores. Email us and we’ll talk about what makes sense for yours.',
  },
]

export function Faq() {
  const [open, setOpen] = useState<number | null>(0)

  return (
    <section id="faq" className="bg-mist/70 py-20 sm:py-28">
      <Container className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr]">
        <Reveal>
          <SectionHeading title="Questions store owners ask" />
          <p className="mt-6 text-ink-soft">
            Something else?{' '}
            <a href={CONTACT_HREF} className="font-medium text-rani underline underline-offset-4">
              {CONTACT_EMAIL}
            </a>
          </p>
        </Reveal>

        <div className="divide-y divide-line border-y border-line">
          {items.map((it, i) => {
            const isOpen = open === i
            return (
              <div key={it.q}>
                <h3>
                  <button
                    id={`faq-btn-${i}`}
                    aria-expanded={isOpen}
                    aria-controls={`faq-panel-${i}`}
                    onClick={() => setOpen(isOpen ? null : i)}
                    className="flex w-full items-center justify-between gap-6 py-5 text-left font-display text-xl font-semibold"
                  >
                    {it.q}
                    <motion.span animate={{ rotate: isOpen ? 45 : 0 }} className="shrink-0 text-rani">
                      <Plus size={22} aria-hidden />
                    </motion.span>
                  </button>
                </h3>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      id={`faq-panel-${i}`}
                      role="region"
                      aria-labelledby={`faq-btn-${i}`}
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                      className="overflow-hidden"
                    >
                      <p className="max-w-xl pb-6 leading-relaxed text-ink-soft">{it.a}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            )
          })}
        </div>
      </Container>
    </section>
  )
}
