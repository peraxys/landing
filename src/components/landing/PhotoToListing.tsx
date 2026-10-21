import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion, useInView, useReducedMotion } from 'framer-motion'
import { Camera, CheckCircle2, MessageCircle, RotateCcw, ScanLine, Tag } from 'lucide-react'
import { PHOTOS, type PhotoId } from './photos'
import { Container, Reveal, SectionHeading } from './ui'

/** A trait the AI found, pinned to where it saw it. x/y is the spot, lx/ly the label, both in % of the photo. */
type Spot = { key: string; value: string; conf: number; x: number; y: number; lx: number; ly: number }

type Example = {
  id: PhotoId
  tab: string
  spots: Spot[]
  whole: { key: string; value: string; conf: number }[]
  ask: string
}

const examples: Example[] = [
  {
    id: 'lakshmi',
    tab: 'Lakshmi necklace',
    spots: [
      { key: 'Deity', value: 'Lakshmi', conf: 0.98, x: 51, y: 45, lx: 50, ly: 8 },
      { key: 'Motif', value: 'Peacock', conf: 0.91, x: 20, y: 46, lx: 17, ly: 26 },
      { key: 'Stones', value: 'Ruby', conf: 0.93, x: 83, y: 35, lx: 82, ly: 20 },
      { key: 'Drops', value: 'Green beads', conf: 0.95, x: 23, y: 62, lx: 16, ly: 80 },
      { key: 'Drop', value: 'Pearl', conf: 0.96, x: 50, y: 87, lx: 80, ly: 80 },
    ],
    whole: [
      { key: 'Category', value: 'Necklace with pendant', conf: 0.99 },
      { key: 'Finish', value: 'Antique, temple', conf: 0.94 },
      { key: 'Occasion', value: 'Wedding, festival', conf: 0.88 },
    ],
    ask: 'Lakshmi necklace green kallu vecha maari',
  },
  {
    id: 'emerald',
    tab: 'Emerald necklace',
    spots: [
      { key: 'Stones', value: 'Emerald', conf: 0.96, x: 50, y: 51, lx: 82, ly: 62 },
      { key: 'Motif', value: 'Mango (paisley)', conf: 0.9, x: 22, y: 19, lx: 42, ly: 9 },
      { key: 'Drops', value: 'Pearl, green beads', conf: 0.94, x: 32, y: 36, lx: 16, ly: 52 },
      { key: 'Work', value: 'Nakshi', conf: 0.89, x: 68, y: 56, lx: 82, ly: 40 },
      { key: 'Pendant', value: 'Two-tier', conf: 0.92, x: 50, y: 75, lx: 20, ly: 90 },
    ],
    whole: [
      { key: 'Category', value: 'Necklace with pendant', conf: 0.99 },
      { key: 'Finish', value: 'Antique', conf: 0.95 },
      { key: 'Occasion', value: 'Wedding, reception', conf: 0.87 },
    ],
    ask: 'emerald necklace for a wedding',
  },
  {
    id: 'peacock',
    tab: 'Peacock choker',
    spots: [
      { key: 'Motif', value: 'Peacock', conf: 0.97, x: 37, y: 36, lx: 22, ly: 12 },
      { key: 'Stones', value: 'Ruby', conf: 0.92, x: 56, y: 41, lx: 80, ly: 12 },
      { key: 'Stones', value: 'Emerald', conf: 0.94, x: 51, y: 74, lx: 82, ly: 62 },
      { key: 'Drops', value: 'Green beads', conf: 0.93, x: 13, y: 71, lx: 16, ly: 88 },
      { key: 'Drop', value: 'Pearl', conf: 0.96, x: 51, y: 95, lx: 80, ly: 88 },
    ],
    whole: [
      { key: 'Category', value: 'Choker', conf: 0.97 },
      { key: 'Finish', value: 'Antique', conf: 0.95 },
      { key: 'Occasion', value: 'Bridal, wedding', conf: 0.9 },
    ],
    ask: 'peacock design choker with green stones',
  },
]

const STEP_MS = 520

export function PhotoToListing() {
  const reduce = useReducedMotion()
  const [idx, setIdx] = useState(0)
  const [count, setShown] = useState(0)
  const [run, setRun] = useState(0)
  const [hover, setHover] = useState<number | null>(null)
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-120px' })
  const ex = examples[idx]
  const total = ex.spots.length + ex.whole.length
  const shown = reduce ? total : count
  const scanning = shown === 0 && !reduce
  const done = shown >= total

  useEffect(() => {
    if (!inView || reduce) return
    const timers = Array.from({ length: total }, (_, i) => window.setTimeout(() => setShown(i + 1), 1300 + i * STEP_MS))
    return () => timers.forEach(window.clearTimeout)
  }, [idx, run, inView, reduce, total])

  const rows = [
    ...ex.spots.map((s, i) => ({ ...s, n: i + 1 })),
    ...ex.whole.map((w) => ({ ...w, n: 0 })),
  ]

  return (
    <section id="listing" className="py-20 sm:py-28">
      <Container>
        <Reveal>
          <SectionHeading
            title="Take a photo. The listing writes itself."
            lead="The AI looks at the piece the way your best salesperson would: the deity, the stones, the motifs, the drops, the finish. You never fill in a form."
          />
        </Reveal>

        <div ref={ref} className="mt-12 flex flex-wrap gap-2" role="tablist" aria-label="Example photos">
          {examples.map((e, i) => (
            <button
              key={e.id}
              role="tab"
              aria-selected={i === idx}
              onClick={() => {
                setIdx(i)
                setShown(0)
                setHover(null)
              }}
              className="relative flex items-center gap-2 rounded-full border border-line py-1.5 pl-1.5 pr-4 text-sm font-medium transition-colors aria-selected:border-ink aria-selected:bg-ink aria-selected:text-paper"
            >
              <img src={PHOTOS[e.id]} alt="" className="h-7 w-7 rounded-full object-cover" />
              {e.tab}
            </button>
          ))}
          <button
            onClick={() => {
              setShown(0)
              setRun((r) => r + 1)
            }}
            className="ml-auto inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-sm font-medium text-ink-soft hover:bg-mist hover:text-ink"
          >
            <RotateCcw size={14} aria-hidden /> Run again
          </button>
        </div>

        <div className="mt-6 grid gap-6 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)]">
          {/* Photo with the AI's reading pinned on it */}
          <div className="relative aspect-[4/5] overflow-hidden rounded-3xl bg-white">
            <AnimatePresence mode="wait">
              <motion.img
                key={ex.id}
                src={PHOTOS[ex.id]}
                alt={`${ex.tab}, with the traits the AI found marked on it`}
                initial={{ opacity: 0, scale: 1.03 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.4 }}
                className="absolute inset-0 h-full w-full object-cover"
              />
            </AnimatePresence>

            {scanning && inView && (
              <motion.div
                key={`scan-${idx}-${run}`}
                aria-hidden
                initial={{ top: '-10%' }}
                animate={{ top: '105%' }}
                transition={{ duration: 1.2, ease: 'easeInOut' }}
                className="absolute inset-x-0 h-16 bg-gradient-to-b from-transparent via-rani/25 to-rani/0"
              >
                <div className="absolute inset-x-0 bottom-1/2 h-0.5 bg-rani shadow-[0_0_12px_2px_rgba(199,37,95,0.6)]" />
              </motion.div>
            )}

            <svg className="pointer-events-none absolute inset-0 h-full w-full" aria-hidden>
              {ex.spots.map((s, i) =>
                i < shown ? (
                  <motion.line
                    key={`${ex.id}-${run}-${i}`}
                    x1={`${s.x}%`}
                    y1={`${s.y}%`}
                    x2={`${s.lx}%`}
                    y2={`${s.ly}%`}
                    stroke={hover === i ? '#c7255f' : '#25101f'}
                    strokeWidth={hover === i ? 2 : 1.25}
                    strokeDasharray="4 3"
                    initial={{ pathLength: 0, opacity: 0 }}
                    animate={{ pathLength: 1, opacity: 0.85 }}
                    transition={{ duration: 0.35 }}
                  />
                ) : null,
              )}
            </svg>

            {ex.spots.map((s, i) =>
              i < shown ? (
                <div key={`${ex.id}-${run}-${i}`}>
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute grid h-6 w-6 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full border-2 border-white bg-rani text-[11px] font-semibold text-white shadow-md"
                    style={{ left: `${s.x}%`, top: `${s.y}%` }}
                  >
                    {i + 1}
                    {hover === i && <span className="absolute inset-0 animate-ping rounded-full bg-rani/60" />}
                  </motion.span>
                  <motion.span
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.25 }}
                    className={`absolute hidden -translate-x-1/2 -translate-y-1/2 whitespace-nowrap rounded-full px-3 py-1 text-xs font-medium shadow-lg sm:block ${hover === i ? 'bg-rani text-white' : 'bg-white/95 text-ink'}`}
                    style={{ left: `${s.lx}%`, top: `${s.ly}%` }}
                  >
                    <span className={hover === i ? 'text-white/75' : 'text-ink-soft'}>{s.key}:</span> {s.value}
                  </motion.span>
                </div>
              ) : null,
            )}

            <div className="absolute left-3 top-3 flex items-center gap-1.5 rounded-full bg-ink/80 px-3 py-1 text-xs font-medium text-white backdrop-blur">
              {scanning ? (
                <>
                  <ScanLine size={13} aria-hidden /> Reading the photo…
                </>
              ) : (
                <>
                  <Camera size={13} aria-hidden /> One photo, no typing
                </>
              )}
            </div>
          </div>

          {/* What the AI wrote */}
          <div className="flex flex-col rounded-3xl border border-line bg-white p-5 sm:p-7">
            <div className="flex items-center justify-between">
              <h3 className="font-display text-2xl font-semibold">The listing it wrote</h3>
              <AnimatePresence>
                {done && (
                  <motion.span
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="inline-flex items-center gap-1.5 rounded-full bg-peacock px-3 py-1 text-xs font-medium text-white"
                  >
                    <CheckCircle2 size={13} aria-hidden /> Live
                  </motion.span>
                )}
              </AnimatePresence>
            </div>
            <p className="mt-1 text-sm text-ink-soft">Hover a row to see where the AI saw it.</p>

            <ul className="mt-5 space-y-1">
              {rows.map((r, i) => {
                const visible = i < shown
                const spot = r.n > 0 ? r.n - 1 : null
                return (
                  <li
                    key={`${ex.id}-${i}`}
                    onMouseEnter={() => spot !== null && setHover(spot)}
                    onMouseLeave={() => setHover(null)}
                    className={`grid grid-cols-[1.5rem_6rem_1fr_3.5rem] items-center gap-2 rounded-lg px-2 py-2 text-sm transition-colors ${
                      spot !== null && hover === spot ? 'bg-rani/10' : ''
                    } ${visible ? '' : 'opacity-30'}`}
                  >
                    <span className={`grid h-5 w-5 place-items-center rounded-full text-[10px] font-semibold ${r.n ? 'bg-rani text-white' : 'bg-mist text-ink-soft'}`}>
                      {r.n || '·'}
                    </span>
                    <span className="text-ink-soft">{r.key}</span>
                    <span className="font-medium">
                      {visible ? (
                        <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                          {r.value}
                        </motion.span>
                      ) : (
                        <span className="inline-block h-3 w-24 animate-pulse rounded bg-mist align-middle" />
                      )}
                    </span>
                    <span className="h-1.5 overflow-hidden rounded-full bg-mist" title={`Confidence ${Math.round(r.conf * 100)}%`}>
                      {visible && (
                        <motion.span
                          className="block h-full rounded-full bg-peacock"
                          initial={{ width: 0 }}
                          animate={{ width: `${r.conf * 100}%` }}
                          transition={{ duration: 0.5 }}
                        />
                      )}
                    </span>
                  </li>
                )
              })}
            </ul>

            <div className="mt-5 rounded-2xl border border-dashed border-ink/25 p-4">
              <p className="flex items-center gap-2 text-sm font-medium">
                <Tag size={15} className="text-zari" aria-hidden /> From the price tag photo
              </p>
              <dl className="mt-2 grid grid-cols-3 gap-2 text-sm">
                {[
                  ['Net weight', 'read off tag'],
                  ['Purity', 'read off tag'],
                  ['Making', 'read off tag'],
                ].map(([k, v]) => (
                  <div key={k}>
                    <dt className="text-xs text-ink-soft">{k}</dt>
                    <dd className="font-medium">{v}</dd>
                  </div>
                ))}
              </dl>
              <p className="mt-2 text-xs text-ink-soft">Weight and purity are never guessed from the photo. No readable tag means “ask for today’s price”.</p>
            </div>

            <AnimatePresence>
              {done && (
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-auto flex items-start gap-3 rounded-2xl bg-[#d9fdd3] p-4 text-sm"
                  style={{ marginTop: '1.25rem' }}
                >
                  <MessageCircle size={18} className="mt-0.5 shrink-0 text-[#008069]" aria-hidden />
                  <p>
                    Customers can now find it by asking <strong>“{ex.ask}”</strong> on WhatsApp.
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
        <p className="mt-4 text-xs text-ink-soft">Sample reading. Confidence bars show how sure the AI was; anything unsure goes to your short review list.</p>
      </Container>
    </section>
  )
}
