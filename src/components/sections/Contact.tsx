import { motion } from 'framer-motion'
import { Mail, Phone } from 'lucide-react'
import { GithubIcon, LinkedinIcon, XIcon, InstagramIcon } from '../icons/Brand'
import { profile } from '../../data/content'
import MagneticButton from '../ui/MagneticButton'
import ContactForm from '../ContactForm'

const socials = [
  { icon: GithubIcon, href: profile.socials.github, label: 'GitHub' },
  { icon: LinkedinIcon, href: profile.socials.linkedin, label: 'LinkedIn' },
  { icon: XIcon, href: profile.socials.twitter, label: 'Twitter / X' },
  { icon: InstagramIcon, href: profile.socials.instagram, label: 'Instagram' },
]

const ease = [0.16, 1, 0.3, 1] as const

export default function Contact() {
  return (
    <section id="contact" className="relative overflow-hidden bg-paper px-5 py-28 md:px-10 md:py-36">
      <div className="mx-auto max-w-7xl">
        <div className="mb-5 flex items-center justify-between text-[11px] font-semibold uppercase tracking-[0.18em] text-muted">
          <span className="flex items-center gap-2">
            <span className="h-1.5 w-1.5 rounded-full bg-[#2fbf71] animate-pulse-dot" />
            Available for work
          </span>
          <span>(06)</span>
        </div>

        <h2 className="font-display text-[15vw] font-black leading-[0.85] tracking-[-0.06em] text-ink md:text-[9vw]">
          {["Let's build", 'something.'].map((line, i) => (
            <span key={line} className="block overflow-hidden pb-[0.1em] -mb-[0.1em]">
              <motion.span
                className="block"
                initial={{ y: '100%' }}
                whileInView={{ y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 1, delay: i * 0.12, ease }}
              >
                {i === 1 ? (
                  <>
                    something<span className="text-accent">.</span>
                  </>
                ) : (
                  line
                )}
              </motion.span>
            </span>
          ))}
        </h2>

        <div className="mt-16 grid gap-16 border-t border-line pt-12 md:grid-cols-[1fr_1.4fr] md:gap-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <p className="max-w-sm text-lg leading-relaxed text-muted">
              Open to full-time, freelance and collaborations — on products, on TechyznCode content, or on whatever you're
              stuck on at 1am.
            </p>

            <div className="mt-10 space-y-4">
              <a href={`mailto:${profile.email}`} data-cursor="hover" className="group flex items-center gap-3 text-ink">
                <Mail size={18} className="text-muted" />
                <span className="bg-[linear-gradient(currentColor,currentColor)] bg-[length:0%_1px] bg-left-bottom bg-no-repeat pb-0.5 text-lg font-medium transition-[background-size] duration-300 group-hover:bg-[length:100%_1px]">
                  {profile.email}
                </span>
              </a>
              <a href={`tel:${profile.phone.replace(/\s/g, '')}`} data-cursor="hover" className="group flex items-center gap-3 text-ink">
                <Phone size={18} className="text-muted" />
                <span className="bg-[linear-gradient(currentColor,currentColor)] bg-[length:0%_1px] bg-left-bottom bg-no-repeat pb-0.5 text-lg font-medium transition-[background-size] duration-300 group-hover:bg-[length:100%_1px]">
                  {profile.phone}
                </span>
              </a>
            </div>

            <div className="mt-10 flex items-center gap-3">
              {socials.map((s) => (
                <MagneticButton
                  key={s.label}
                  href={s.href}
                  className="h-12 w-12 border border-line bg-card text-ink transition-colors hover:bg-ink hover:text-paper"
                >
                  <s.icon size={18} />
                  <span className="sr-only">{s.label}</span>
                </MagneticButton>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.1 }}
          >
            <ContactForm />
          </motion.div>
        </div>
      </div>
    </section>
  )
}
