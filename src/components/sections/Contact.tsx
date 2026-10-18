import { motion } from 'framer-motion'
import { Mail, Phone } from 'lucide-react'
import { GithubIcon, LinkedinIcon, XIcon, InstagramIcon } from '../icons/Brand'
import { profile } from '../../data/content'
import MagneticButton from '../ui/MagneticButton'

const socials = [
  { icon: GithubIcon, href: profile.socials.github, label: 'GitHub' },
  { icon: LinkedinIcon, href: profile.socials.linkedin, label: 'LinkedIn' },
  { icon: XIcon, href: profile.socials.twitter, label: 'Twitter / X' },
  { icon: InstagramIcon, href: profile.socials.instagram, label: 'Instagram' },
]

export default function Contact() {
  return (
    <section id="contact" className="relative overflow-hidden bg-void px-6 py-32 md:px-12">
      <div className="absolute left-1/2 top-0 h-[600px] w-[600px] -translate-x-1/2 rounded-full bg-cyan/10 blur-[140px]" />

      <div className="relative mx-auto max-w-5xl text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="font-mono text-xs uppercase tracking-[0.3em] text-cyan"
        >
          06 — Let's talk
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="mt-4 font-display text-5xl font-semibold text-white md:text-7xl"
        >
          Got something <span className="text-gradient">worth building?</span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mx-auto mt-6 max-w-xl text-base text-mist md:text-lg"
        >
          Open to full-time, freelance, and collaborations — on products, on TechyznCode content, or on
          whatever you're stuck on at 1am.
        </motion.p>

        <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
          <MagneticButton
            href={`mailto:${profile.email}`}
            className="gap-2 bg-gradient-to-r from-cyan to-violet px-8 py-4 font-mono text-sm uppercase tracking-[0.15em] text-void"
          >
            <Mail size={16} /> {profile.email}
          </MagneticButton>
          <MagneticButton
            href={`tel:${profile.phone.replace(/\s/g, '')}`}
            className="gap-2 border border-line px-8 py-4 font-mono text-sm text-white hover:border-cyan hover:text-cyan"
          >
            <Phone size={16} /> {profile.phone}
          </MagneticButton>
        </div>

        <div className="mt-14 flex items-center justify-center gap-5">
          {socials.map((s) => (
            <MagneticButton
              key={s.label}
              href={s.href}
              className="h-14 w-14 border border-line text-mist hover:border-cyan hover:text-cyan"
            >
              <s.icon size={20} />
            </MagneticButton>
          ))}
        </div>
      </div>
    </section>
  )
}
