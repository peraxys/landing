import { useEffect, useRef } from 'react'
import { animate, motion, useInView, useReducedMotion } from 'framer-motion'
import { Container, Reveal, SectionHeading } from './ui'

function Count({ to, prefix = '', suffix = '' }: { to: number; prefix?: string; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true })
  const reduce = useReducedMotion()

  useEffect(() => {
    const el = ref.current
    if (!el) return
    if (!inView || reduce) {
      el.textContent = `${prefix}${to}${suffix}`
      return
    }
    const controls = animate(0, to, {
      duration: 1.2,
      ease: 'easeOut',
      onUpdate: (v) => (el.textContent = `${prefix}${Math.round(v)}${suffix}`),
    })
    return () => controls.stop()
  }, [inView, reduce, to, prefix, suffix])

  return <span ref={ref}>{`${prefix}0${suffix}`}</span>
}

const rows: { label: string; how: string; bar?: number; value: [number, string, string] }[] = [
  { label: 'Tags that are right', how: 'Share of fields correct before anyone edits them', bar: 80, value: [80, 'at least ', '%'] },
  { label: 'Printed price tags', how: 'Weight, purity and SKU read correctly from the tag photo', bar: 100, value: [100, '', '%'] },
  { label: 'Pieces per reply', how: 'Never one, never ten', value: [5, 'up to ', ' pieces'] },
  { label: 'Spot checks', how: 'Auto-published items sampled into your review list', bar: 5, value: [5, '', '%'] },
]

export function Benchmarks() {
  return (
    <section id="goals" className="pt-32 pb-20 sm:pt-40 sm:pb-28">
      <Container>
        <Reveal>
          <SectionHeading
            title="How we judge our own work"
            lead="These are goals we test against our own sets of saree and jewellery photos and real customer questions. They are not guarantees."
          />
        </Reveal>

        <div className="mt-14 grid gap-6 lg:grid-cols-[0.8fr_1.2fr]">
          <Reveal>
            <div className="h-full rounded-3xl bg-ink p-7 text-paper sm:p-9">
              <h3 className="font-display text-2xl font-semibold">The right piece in the top five</h3>
              <p className="mt-2 text-paper/70">Customers ask in plain language, including Tamil and Tanglish. Our goal is that at least 4 in 5 searches show the right piece in the first five results.</p>
              <div className="mt-8 grid grid-cols-10 gap-2" role="img" aria-label="At least 16 of 20 searches show the right piece in the top five">
                {Array.from({ length: 20 }).map((_, i) => (
                  <motion.span
                    key={i}
                    initial={{ scale: 0, opacity: 0 }}
                    whileInView={{ scale: 1, opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.04, type: 'spring', stiffness: 400, damping: 18 }}
                    className={`aspect-square rounded-full ${i < 16 ? 'bg-zari' : 'border border-paper/30'}`}
                  />
                ))}
              </div>
              <p className="mt-6 font-display text-5xl font-semibold">
                <Count to={16} /> <span className="text-2xl text-paper/60">of 20</span>
              </p>
            </div>
          </Reveal>

          <div className="flex flex-col gap-3">
            {rows.map((r, i) => (
              <Reveal key={r.label} delay={i * 0.08}>
                <div className="rounded-2xl border border-line bg-white p-5">
                  <div className="flex items-baseline justify-between gap-4">
                    <div className="min-w-0">
                      <h3 className="font-medium">{r.label}</h3>
                      <p className="text-sm text-ink-soft">{r.how}</p>
                    </div>
                    <p className="shrink-0 font-display text-2xl font-semibold text-peacock">
                      <Count to={r.value[0]} prefix={r.value[1]} suffix={r.value[2]} />
                    </p>
                  </div>
                  {r.bar && (
                    <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-mist">
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: `${r.bar}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, ease: 'easeOut' }}
                        className="h-full rounded-full bg-rani"
                      />
                    </div>
                  )}
                </div>
              </Reveal>
            ))}
            <Reveal delay={0.35}>
              <div className="rounded-2xl border border-dashed border-ink/30 p-5">
                <h3 className="font-medium">Guessed weights, purity or stock</h3>
                <p className="text-sm text-ink-soft">Zero, by design. If the tag can’t be read, the AI leaves it blank and the reply says “ask for today’s price”.</p>
              </div>
            </Reveal>
          </div>
        </div>
      </Container>
    </section>
  )
}
