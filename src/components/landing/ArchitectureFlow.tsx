import { motion } from 'framer-motion'
import { Camera, MessageCircleReply, Search, ShieldCheck } from 'lucide-react'
import { Container, Pattu, Reveal, SectionHeading } from './ui'

const steps = [
  {
    icon: Camera,
    title: 'Send photos',
    body: 'On a phone or computer, add one or two photos of a piece and one of its price tag. A voice note is optional. Tap Save. That is all the work on your side.',
    guard: 'You never tag by hand',
  },
  {
    icon: Search,
    title: 'We build the listing',
    body: 'The AI writes the record: colours, border, motif, occasion, plus the weight and purity read off the tag. Most items go live on their own. Anything unsure waits in a short list for a quick look.',
    guard: 'Weights and prices are never guessed',
  },
  {
    icon: MessageCircleReply,
    title: 'Customers ask, you sell',
    body: 'Customers message in plain language, in Tamil, English or both. They get three to five real pieces with photos and today’s price, and can reach a person in one tap.',
    guard: 'Only pieces from your catalogue',
  },
]

const stack = [
  ['Customers use', 'WhatsApp and your website'],
  ['You use', 'A simple upload page'],
  ['Your stock sheet', 'Optional CSV upload'],
  ['Prices', 'Follow your daily rate'],
  ['Products', 'Sarees, jewellery, coins and more'],
]

export function ArchitectureFlow() {
  return (
    <section id="how" className="bg-peacock-deep py-20 text-white sm:py-28">
      <Container>
        <Reveal>
          <SectionHeading
            title="From a voice note to a shortlist in three steps"
            lead="The AI reads photos and customer messages. Everything a customer sees comes from your own catalogue."
            className="[&_h2]:text-white [&_p]:text-white/70"
          />
        </Reveal>

        <div className="relative mt-16 grid gap-10 md:grid-cols-3 md:gap-6">
          <motion.div
            aria-hidden
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 1.4, ease: 'easeInOut' }}
            className="absolute left-[8%] right-[8%] top-7 hidden h-px origin-left bg-zari md:block"
          />
          {steps.map((s, i) => (
            <motion.div
              key={s.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ delay: i * 0.18, duration: 0.55 }}
              className="relative"
            >
              <div className="relative grid h-14 w-14 place-items-center rounded-full border border-zari bg-peacock-deep">
                <s.icon size={22} className="text-zari" aria-hidden />
                <span className="absolute -right-1 -top-1 grid h-6 w-6 place-items-center rounded-full bg-rani text-xs font-semibold">{i + 1}</span>
              </div>
              <h3 className="mt-6 font-display text-2xl font-semibold">{s.title}</h3>
              <p className="mt-3 leading-relaxed text-white/75">{s.body}</p>
              <p className="mt-4 inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1.5 text-sm">
                <ShieldCheck size={15} className="text-zari" aria-hidden /> {s.guard}
              </p>
            </motion.div>
          ))}
        </div>

        <Reveal className="mt-16">
          <dl className="grid grid-cols-2 gap-px overflow-hidden rounded-2xl bg-white/15 sm:grid-cols-5">
            {stack.map(([k, v]) => (
              <div key={k} className="bg-peacock-deep p-4">
                <dt className="text-sm text-white/55">{k}</dt>
                <dd className="mt-1 font-medium">{v}</dd>
              </div>
            ))}
          </dl>
        </Reveal>
      </Container>
      <Pattu className="mt-20 -mb-20 sm:-mb-28" />
    </section>
  )
}
