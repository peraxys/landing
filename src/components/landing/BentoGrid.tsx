import type { ReactNode } from 'react'
import { motion } from 'framer-motion'
import { Check, Languages, ListChecks, Scale, UserRound, Wallet } from 'lucide-react'
import { Container, Reveal, SectionHeading } from './ui'

function Card({ className = '', children }: { className?: string; children: ReactNode }) {
  return (
    <motion.article
      whileHover={{ y: -4 }}
      transition={{ type: 'spring', stiffness: 300, damping: 24 }}
      className={`flex flex-col overflow-hidden rounded-3xl border border-line bg-white p-6 sm:p-7 ${className}`}
    >
      {children}
    </motion.article>
  )
}

function CardText({ icon: Icon, title, body }: { icon: typeof Check; title: string; body: string }) {
  return (
    <div>
      <Icon size={20} className="text-rani" aria-hidden />
      <h3 className="mt-3 font-display text-2xl font-semibold leading-tight tracking-tight">{title}</h3>
      <p className="mt-2 leading-relaxed text-ink-soft">{body}</p>
    </div>
  )
}

export function BentoGrid() {
  return (
    <section id="features" className="py-20 sm:py-28">
      <Container>
        <Reveal>
          <SectionHeading
            title="Built for shops that have stock, not a catalogue"
            lead="Most saree and jewellery shops have nothing searchable online. Peraxys builds the catalogue from your photos, then puts a shopkeeper in front of it."
          />
        </Reveal>

        <div className="mt-14 grid gap-4 lg:grid-cols-6">
          <Card className="lg:col-span-2 bg-mist/60">
            <CardText
              icon={Check}
              title="It can’t invent stock"
              body="The AI only turns a customer’s sentence into filters. Your catalogue answers, so every piece shown really exists."
            />
            <p className="mt-5 rounded-xl bg-white px-4 py-3 font-mono text-xs leading-relaxed">
              “red saree, gold border”
              <br />
              <span className="text-ink-soft">→ saree · red body · gold zari</span>
              <br />
              <span className="text-peacock">→ 5 pieces from your catalogue</span>
            </p>
          </Card>

          <Card className="lg:col-span-2">
            <CardText
              icon={Languages}
              title="Understands how customers really type"
              body="Tamil, English and everything in between. The reply comes back in the language the customer used."
            />
            <div className="mt-5 space-y-2 text-sm">
              <p className="w-fit rounded-2xl rounded-bl-sm bg-[#d6f0dd] px-3.5 py-2">Lakshmi necklace green kallu vecha maari</p>
              <div className="flex flex-wrap gap-1.5">
                {['necklace', 'deity: Lakshmi', 'stones: green'].map((t) => (
                  <span key={t} className="rounded-md bg-mist px-2 py-1 font-mono text-[11px]">
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </Card>

          <Card className="lg:col-span-2">
            <CardText
              icon={Wallet}
              title="Today’s price on every piece"
              body="Your own price wins. For gold with only a tag, we use today’s rate, so customers see a range that moves when you update the rate."
            />
            <div className="mt-5 rounded-xl bg-peacock-deep px-4 py-3 text-sm text-white">
              <p className="font-mono text-xs text-white/70">4.2 g × ₹13,590 (example 22K rate)</p>
              <p className="mt-1 font-medium">About ₹61,600 to ₹65,100</p>
            </div>
          </Card>

          <Card className="lg:col-span-2">
            <CardText
              icon={Scale}
              title="Too many matches? One good question"
              body="With a long list, it shows four very different pieces and asks one question, so customers pick from pictures."
            />
          </Card>

          <Card className="lg:col-span-2">
            <CardText
              icon={ListChecks}
              title="You only check what’s unsure"
              body="Items go live on their own. A short list, like “3 items need a look”, holds anything uncertain."
            />
          </Card>

          <Card className="lg:col-span-2">
            <CardText
              icon={UserRound}
              title="A person is one tap away"
              body="When a customer is ready to buy, they tap once to talk to someone at the shop, on the same WhatsApp chat."
            />
          </Card>
        </div>
      </Container>
    </section>
  )
}
