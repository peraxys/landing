import { useCallback, useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import {
  ArrowLeft,
  Camera,
  CheckCheck,
  EllipsisVertical,
  Mic,
  Paperclip,
  Phone,
  Reply,
  RotateCcw,
  Smile,
  Video,
} from 'lucide-react'
import { LogoMark } from './Logo'
import { PHOTOS, type PhotoId } from './photos'

type StepId = 'start' | 'p1' | 'p2' | 'p3' | 'shop' | 'visit'
type Button = { label: string; go: StepId }

type Msg = {
  id: number
  from: 'customer' | 'shop' | 'staff' | 'system'
  text?: string
  grid?: PhotoId[]
  photo?: PhotoId
  buttons?: Button[]
  time: string
}

type Draft = Omit<Msg, 'id' | 'time'>

const pieceButtons: Button[] = [
  { label: 'Talk to the shop', go: 'shop' },
  { label: 'Book a visit', go: 'visit' },
]

const script: Record<StepId, { customer: string; replies: Draft[] }> = {
  start: {
    customer: 'Lakshmi necklace green kallu vecha maari irukka?',
    replies: [
      { from: 'shop', text: 'Irukku! Pacha kallu vecha Lakshmi necklaces, moonu design irukku:' },
      {
        from: 'shop',
        grid: ['lakshmi', 'emerald', 'peacock'],
        text: '1. Goddess Lakshmi necklace\n2. Antique emerald necklace\n3. Antique peacock choker\n\nEdhu pidichirukku?',
        buttons: [
          { label: 'Show 1', go: 'p1' },
          { label: 'Show 2', go: 'p2' },
          { label: 'Show 3', go: 'p3' },
        ],
      },
    ],
  },
  p1: {
    customer: 'Show 1',
    replies: [
      {
        from: 'shop',
        photo: 'lakshmi',
        text: '*Goddess Lakshmi necklace*\nAntique finish · green beads, rubies, pearl drop\nToday’s price: the shop will confirm',
        buttons: pieceButtons,
      },
    ],
  },
  p2: {
    customer: 'Show 2',
    replies: [
      {
        from: 'shop',
        photo: 'emerald',
        text: '*Antique emerald necklace*\nNakshi work · emerald stones, pearl and green bead drops\nToday’s price: the shop will confirm',
        buttons: pieceButtons,
      },
    ],
  },
  p3: {
    customer: 'Show 3',
    replies: [
      {
        from: 'shop',
        photo: 'peacock',
        text: '*Antique peacock choker*\nPeacock motifs · emerald centre, rubies, pearl drop\nToday’s price: the shop will confirm',
        buttons: pieceButtons,
      },
    ],
  },
  shop: {
    customer: 'Talk to the shop',
    replies: [
      { from: 'system', text: 'Meena from the shop joined the chat' },
      { from: 'staff', text: 'Vanakkam! Naan Meena. Indha necklace-oda today’s price-um oru video-um ippo anuppuren.' },
    ],
  },
  visit: {
    customer: 'Book a visit',
    replies: [
      {
        from: 'shop',
        text: 'Done. We’ll keep it ready for you. Show this message at the counter.\n\nVisit code: *PX-4821*',
      },
    ],
  },
}

const WALLPAPER =
  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='80' height='80'%3E%3Cg fill='none' stroke='%23d8cfc3' stroke-width='1.2'%3E%3Cpath d='M14 18c4-6 10-6 14 0s-4 12-7 14c-3-2-11-8-7-14z'/%3E%3Ccircle cx='58' cy='22' r='6'/%3E%3Cpath d='M48 58l8-8 8 8-8 8z'/%3E%3Cpath d='M12 60c6 0 6 8 12 8'/%3E%3C/g%3E%3C/svg%3E\")"

/** Renders WhatsApp-style *bold* inside a line. */
function Rich({ text }: { text: string }) {
  return (
    <>
      {text.split('\n').map((line, i) => (
        <span key={i} className="block min-h-[1em]">
          {line.split(/(\*[^*]+\*)/).map((part, j) =>
            part.startsWith('*') ? <strong key={j}>{part.slice(1, -1)}</strong> : <span key={j}>{part}</span>,
          )}
        </span>
      ))}
    </>
  )
}

function Grid({ ids }: { ids: PhotoId[] }) {
  return (
    <div className="grid grid-cols-2 grid-rows-2 gap-0.5 overflow-hidden rounded-md">
      {ids.map((id, i) => (
        <div key={id} className={`relative bg-white ${i === 0 ? 'row-span-2' : ''}`}>
          <img src={PHOTOS[id]} alt="" className="h-full w-full object-cover" />
          <span className="absolute left-1.5 top-1.5 grid h-5 w-5 place-items-center rounded-full bg-[#111b21]/75 text-[11px] font-semibold text-white">
            {i + 1}
          </span>
        </div>
      ))}
    </div>
  )
}

function Bubble({ m, pressed, active, onPress }: { m: Msg; pressed: string | null; active: boolean; onPress: (b: Button) => void }) {
  if (m.from === 'system') {
    return (
      <div className="flex justify-center">
        <span className="rounded-lg bg-[#fff5c4] px-3 py-1 text-[11.5px] text-[#54656f] shadow-sm">{m.text}</span>
      </div>
    )
  }
  const mine = m.from === 'customer'
  return (
    <div className={`flex flex-col ${mine ? 'items-end' : 'items-start'}`}>
      <div
        className={`relative max-w-[82%] rounded-lg px-2 pb-1.5 pt-1.5 text-[13.5px] leading-snug text-[#111b21] shadow-[0_1px_0.5px_rgba(11,20,26,0.13)] ${
          mine ? 'rounded-tr-none bg-[#d9fdd3]' : 'rounded-tl-none bg-white'
        } ${m.grid || m.photo ? 'w-[82%]' : ''}`}
      >
        <span
          aria-hidden
          className={`absolute top-0 h-3 w-2 ${mine ? '-right-2 bg-[#d9fdd3] [clip-path:polygon(0_0,100%_0,0_100%)]' : '-left-2 bg-white [clip-path:polygon(0_0,100%_0,100%_100%)]'}`}
        />
        {m.from === 'staff' && <p className="px-1 text-[12px] font-semibold text-[#c7255f]">Meena · Shop</p>}
        {m.grid && <Grid ids={m.grid} />}
        {m.photo && <img src={PHOTOS[m.photo]} alt="" className="aspect-[4/5] w-full rounded-md object-cover" />}
        {m.text && (
          <div className={`px-1 ${m.grid || m.photo ? 'pt-1.5' : ''}`}>
            <Rich text={m.text} />
          </div>
        )}
        <span className="float-right -mb-0.5 ml-3 mt-0.5 flex items-center gap-1 px-1 text-[10.5px] text-[#667781]">
          {m.time}
          {mine && <CheckCheck size={14} className="text-[#53bdeb]" aria-hidden />}
        </span>
        <span className="clear-both block" />
      </div>
      {m.buttons && (
        <div className="mt-0.5 flex w-[82%] flex-col gap-0.5">
          {m.buttons.map((b) => (
            <motion.button
              key={b.label}
              disabled={!active}
              onClick={() => onPress(b)}
              animate={pressed === b.label ? { scale: 0.96, backgroundColor: '#e7f6ef' } : { scale: 1, backgroundColor: '#ffffff' }}
              className="flex items-center justify-center gap-1.5 rounded-lg py-2 text-[13.5px] font-medium text-[#008069] shadow-[0_1px_0.5px_rgba(11,20,26,0.13)] enabled:hover:bg-[#f5f6f6] disabled:text-[#8696a0]"
            >
              <Reply size={14} aria-hidden /> {b.label}
            </motion.button>
          ))}
        </div>
      )}
    </div>
  )
}

export function WhatsAppDemo() {
  const reduce = useReducedMotion()
  const [msgs, setMsgs] = useState<Msg[]>([])
  const [typing, setTyping] = useState(false)
  const [pressed, setPressed] = useState<string | null>(null)
  const [manual, setManual] = useState(false)
  const [run, setRun] = useState(0)
  const manualRef = useRef(false)
  const live = useRef({ token: 0 })
  const nextId = useRef(0)
  const clock = useRef(42)
  const scroller = useRef<HTMLDivElement>(null)

  const restart = useCallback(() => {
    nextId.current = 0
    clock.current = 41
    setMsgs([])
    setTyping(false)
    setPressed(null)
    setRun((r) => r + 1)
  }, [])

  const play = useCallback(
    async (first: StepId, t: number) => {
      const wait = (ms: number) =>
        new Promise<boolean>((res) => window.setTimeout(() => res(live.current.token === t), reduce ? 0 : ms))
      const stamp = () => `10:${String(clock.current).padStart(2, '0')}`
      const push = (d: Draft) => setMsgs((list) => [...list, { ...d, id: nextId.current++, time: stamp() }])

      let step: StepId | null = first
      while (step) {
        const s: (typeof script)[StepId] = script[step]
        push({ from: 'customer', text: s.customer })
        for (const r of s.replies) {
          if (!(await wait(400))) return
          setTyping(true)
          if (!(await wait(r.grid || r.photo ? 1500 : 1100))) return
          setTyping(false)
          clock.current += 1
          push(r)
        }
        step = null
        const last = s.replies[s.replies.length - 1]
        if (reduce || manualRef.current) return
        if (last.buttons) {
          if (!(await wait(2400))) return
          setPressed(last.buttons[0].label)
          if (!(await wait(500))) return
          setPressed(null)
          step = last.buttons[0].go
        } else {
          if (!(await wait(7000))) return
          restart()
        }
      }
    },
    [reduce, restart],
  )

  useEffect(() => {
    const state = live.current
    const t = ++state.token
    const start = window.setTimeout(() => play('start', t), reduce ? 0 : 600)
    return () => {
      window.clearTimeout(start)
      if (state.token === t) state.token++
    }
  }, [run, play, reduce])

  useEffect(() => {
    const el = scroller.current
    el?.scrollTo({ top: el.scrollHeight, behavior: reduce ? 'auto' : 'smooth' })
  }, [msgs.length, typing, reduce])

  const press = (b: Button) => {
    manualRef.current = true
    setManual(true)
    const t = ++live.current.token
    setTyping(false)
    setPressed(null)
    play(b.go, t)
  }

  const replay = () => {
    manualRef.current = false
    setManual(false)
    restart()
  }

  const lastWithButtons = [...msgs].reverse().find((m) => m.buttons)?.id
  const lastId = msgs[msgs.length - 1]?.id

  return (
    <div className="mx-auto w-full max-w-[380px]">
      <div className="overflow-hidden rounded-[2.25rem] border-[7px] border-[#1d1418] bg-[#1d1418] shadow-[0_40px_80px_-30px_rgba(37,16,31,0.55)]">
        <div className="flex items-center gap-2 bg-[#008069] px-2.5 py-2.5 text-white">
          <ArrowLeft size={20} aria-hidden />
          <div className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-paper">
            <LogoMark size={22} />
          </div>
          <div className="min-w-0 flex-1 leading-tight">
            <p className="truncate text-[15px] font-medium">Your Jewellers</p>
            <p className="text-[12px] text-white/80">{typing ? 'typing…' : 'online'}</p>
          </div>
          <Video size={19} aria-hidden />
          <Phone size={17} className="ml-3" aria-hidden />
          <EllipsisVertical size={18} className="ml-2" aria-hidden />
        </div>

        <div
          ref={scroller}
          className="h-[30rem] space-y-1.5 overflow-y-auto bg-[#efeae2] px-3 py-3"
          style={{ backgroundImage: WALLPAPER }}
          aria-live="polite"
        >
          <div className="flex justify-center pb-1">
            <span className="rounded-lg bg-white px-2.5 py-1 text-[11.5px] text-[#54656f] shadow-sm">Today</span>
          </div>
          <AnimatePresence initial={false}>
            {msgs.map((m) => (
              <motion.div
                key={`${run}-${m.id}`}
                initial={{ opacity: 0, y: 10, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.25 }}
              >
                <Bubble m={m} pressed={pressed} active={m.id === lastWithButtons && m.id === lastId} onPress={press} />
              </motion.div>
            ))}
          </AnimatePresence>
          {typing && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex">
              <span className="flex gap-1 rounded-lg rounded-tl-none bg-white px-3 py-2.5 shadow-sm" aria-label="Shop is typing">
                {[0, 1, 2].map((i) => (
                  <motion.span
                    key={i}
                    className="h-1.5 w-1.5 rounded-full bg-[#8696a0]"
                    animate={{ y: [0, -3, 0] }}
                    transition={{ repeat: Infinity, duration: 0.8, delay: i * 0.15 }}
                  />
                ))}
              </span>
            </motion.div>
          )}
        </div>

        <div className="flex items-center gap-1.5 bg-[#efeae2] px-1.5 pb-2 pt-1">
          <div className="flex flex-1 items-center gap-2.5 rounded-full bg-white px-3 py-2 text-[#8696a0]">
            <Smile size={19} aria-hidden />
            <span className="flex-1 text-[14px]">Message</span>
            <Paperclip size={17} aria-hidden />
            <Camera size={18} aria-hidden />
          </div>
          <span className="grid h-10 w-10 place-items-center rounded-full bg-[#00a884] text-white">
            <Mic size={18} aria-hidden />
          </span>
        </div>
      </div>

      <div className="mt-3 flex items-center justify-between px-2 text-xs text-ink-soft">
        <span>{manual ? 'Your turn: tap the buttons in the chat.' : 'Playing a sample chat. Tap a button to take over.'}</span>
        <button onClick={replay} className="inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 font-medium text-ink hover:bg-mist">
          <RotateCcw size={12} aria-hidden /> Replay
        </button>
      </div>
    </div>
  )
}
