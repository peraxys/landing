import { Logo } from './Logo'
import { CONTACT_EMAIL, CONTACT_HREF, Container, Pattu } from './ui'

const columns = [
  {
    title: 'Product',
    links: [
      { label: 'Features', href: '#features' },
      { label: 'How it works', href: '#how' },
      { label: 'Our goals', href: '#goals' },
    ],
  },
  {
    title: 'Help',
    links: [
      { label: 'FAQ', href: '#faq' },
      { label: 'Contact us', href: CONTACT_HREF },
    ],
  },
]

export function Footer() {
  return (
    <footer>
      <Pattu />
      <Container className="grid gap-10 py-14 sm:grid-cols-[1.5fr_1fr_1fr]">
        <div>
          <Logo />
          <p className="mt-2 max-w-xs text-sm leading-relaxed text-ink-soft">
            A searchable catalogue and a WhatsApp shopkeeper for saree and jewellery shops.
          </p>
          <a href={CONTACT_HREF} className="mt-4 inline-block text-sm font-medium text-rani underline underline-offset-4">
            {CONTACT_EMAIL}
          </a>
        </div>
        {columns.map((c) => (
          <nav key={c.title} aria-label={c.title}>
            <p className="text-sm font-medium">{c.title}</p>
            <ul className="mt-3 space-y-2">
              {c.links.map((l) => (
                <li key={l.label}>
                  <a href={l.href} className="text-sm text-ink-soft transition-colors hover:text-ink">
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        ))}
      </Container>
      <Container className="flex flex-wrap items-center justify-between gap-3 border-t border-line py-5 text-sm text-ink-soft">
        <p>© 2026 Peraxys</p>
        <p className="flex items-center gap-2">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-zari opacity-60" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-zari" />
          </span>
          Early access open
        </p>
      </Container>
    </footer>
  )
}
