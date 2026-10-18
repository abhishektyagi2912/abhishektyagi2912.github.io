export const profile = {
  name: 'Abhishek Tyagi',
  handle: 'abhishektyagi2912',
  role: 'Software Developer',
  tagline: 'Keep cALM and code On.',
  location: 'India',
  blurb:
    "I build products end to end — backend systems, interfaces, and the 3D/animation layer most teams skip. By day I ship at Culture Holidays. Outside that, I run TechyznCode and build Zenhabicto, turning 'I should learn that' and 'I should build that habit' into things people actually do.",
  email: 'abhishektyagi2912@gmail.com',
  phone: '+91 8306946482',
  socials: {
    github: 'https://github.com/abhishektyagi2912',
    linkedin: 'https://www.linkedin.com/in/abhityagi2912/',
    twitter: 'https://twitter.com/abhishektyagi2912',
    instagram: 'https://instagram.com/abhityagi2912',
  },
}

export const experience = [
  {
    id: 'culture-holidays',
    role: 'Software Developer',
    org: 'Culture Holidays',
    period: '2024 — Present',
    kind: 'Full-time',
    description:
      'Building and maintaining travel-tech systems — from real-time chat/query tooling with auth middleware and Socket.io, to the backend plumbing that keeps bookings and customer ops running.',
    tags: ['Node.js', 'Express', 'Socket.io', 'REST APIs', 'MongoDB'],
  },
  {
    id: 'techyzncode',
    role: 'Founder & Instructor',
    org: 'TechyznCode',
    period: '2023 — Present',
    kind: 'Own company',
    description:
      'Precision training for the next generation of builders. Teaches Full-Stack Engineering, AI Engineering, and System Design & Strategy — the systems thinking behind real products, not just API calls. Runs a technical blog covering frontend vs backend tradeoffs, injection-proofing SQL/NoSQL, CDNs, React performance, Kubernetes health checks, and more.',
    tags: ['Full-Stack', 'AI Engineering', 'System Design', 'Content'],
    link: 'https://techyzncode.com',
  },
  {
    id: 'zenhabicto',
    role: 'Creator',
    org: 'Zenhabicto',
    period: '2024 — Present',
    kind: 'Product, under TechyznCode',
    description:
      "Small habits. Infinite zen. A gamified habit tracker — daily quests across 5 classes (Athlete, Developer, Scholar, Creative, Mindful), XP and 10 progression tiers from Iron to Ascendant, an opt-in Hard Mode that resets your streak on a missed quest, guided no-equipment workout plans, and global/friend leaderboards. 60% of every Premium subscription funds the Game Development Foundation for underprivileged youth.",
    tags: ['React Native / Mobile', 'Gamification', 'Product', 'Android — live'],
    link: 'https://zenhabicto.com',
  },
]

export const flagshipProjects = [
  {
    id: 'techyzncode',
    name: 'TechyznCode',
    tagline: 'Precision training for the next generation of builders.',
    description:
      'My own platform for teaching technology in plain language — Full-Stack Engineering, AI Engineering, and System Design & Strategy, backed by a technical blog that goes deep on the stuff tutorials skip: injection-proofing, CDNs, graceful shutdowns, React performance budgets.',
    link: 'https://techyzncode.com',
    tags: ['Education', 'Full-Stack', 'AI Engineering', 'Blog'],
    accent: 'cyan',
  },
  {
    id: 'zenhabicto',
    name: 'Zenhabicto',
    tagline: 'Small habits. Infinite zen.',
    description:
      'A gamified habit & fitness app — quests, XP, 10 tiers, Hard Mode, guided workouts, form guides, leaderboards. Live on Google Play, iOS coming soon. Built and shipped under TechyznCode.',
    link: 'https://zenhabicto.com',
    tags: ['Product', 'Gamification', 'Android', 'Growth'],
    accent: 'violet',
  },
]

export const projects = [
  {
    id: 'cyberex-secure',
    name: 'Cyberex Secure',
    description:
      'A security suite combining phishing detection, AI face recognition for payment gateways, auto-generated passwords, and automatic sign-in — with built-in reporting of phishing sites to a government portal.',
    tags: ['Python', 'AI', 'Security', 'Face Recognition'],
    stars: 15,
    link: 'https://github.com/abhishektyagi2912/Cyberex-Secure',
  },
  {
    id: 'web-vision',
    name: 'Web Vision',
    description:
      'A complete web solution for the visually impaired — making the web legible to screen readers and assistive tech where it usually fails.',
    tags: ['JavaScript', 'Python', 'Accessibility'],
    stars: 2,
    link: 'https://github.com/abhishektyagi2912/Web_Vision',
  },
  {
    id: 'phytogenic',
    name: 'Phytogenic',
    description:
      'Full-stack Next.js application backed by MongoDB, deployed on Vercel.',
    tags: ['Next.js', 'TypeScript', 'MongoDB'],
    stars: 0,
    link: 'https://github.com/abhishektyagi2912/phytogenic',
    live: 'https://phytogenic-9cch.vercel.app',
  },
  {
    id: 'itemvault',
    name: 'Itemvault',
    description:
      'Inventory/item management backend engineered for scale — AWS EC2 and S3, Dockerized services, Redis caching, Socket.io for live updates.',
    tags: ['Node.js', 'AWS', 'Docker', 'Redis', 'Socket.io'],
    stars: 0,
    link: 'https://github.com/abhishektyagi2912/Itemvault',
  },
  {
    id: 'doubt-hub',
    name: 'Doubt Hub',
    description:
      'An Android app that lets students ask doubts anonymously instead of freezing up in front of a class — with ChatGPT-assisted answers.',
    tags: ['Java', 'Android', 'ChatGPT API'],
    stars: 0,
    link: 'https://github.com/abhishektyagi2912/Doubt-Hub',
  },
  {
    id: 'contact-list-app',
    name: 'Contact List App',
    description:
      "A private contacts manager that keeps numbers off the device's shared contact list — Firebase auth and realtime database under the hood.",
    tags: ['Flutter', 'Dart', 'Firebase'],
    stars: 1,
    link: 'https://github.com/abhishektyagi2912/Contact_List_App',
  },
  {
    id: 'disease-detection',
    name: 'Plant Disease Detection',
    description:
      'A deep-learning model trained on a Kaggle leaf-image dataset to identify plant diseases from photos.',
    tags: ['Python', 'Deep Learning', 'Jupyter'],
    stars: 0,
    link: 'https://github.com/abhishektyagi2912/Disease-Detection-in-plant',
  },
  {
    id: 'portfolio-dev',
    name: 'Portfolio v1',
    description:
      'The previous version of this site — GSAP-driven page animation with Locomotive Scroll for that buttery scroll-jacked feel.',
    tags: ['GSAP', 'Locomotive Scroll', 'JavaScript'],
    stars: 0,
    link: 'https://github.com/abhishektyagi2912/portfolio.dev',
    live: 'https://abhishektyagi2912.github.io/portfolio.dev/',
  },
]

export const skills = [
  {
    category: 'Frontend',
    items: ['React', 'Next.js', 'TypeScript', 'JavaScript', 'Tailwind CSS', 'Three.js', 'GSAP', 'Framer Motion'],
  },
  {
    category: 'Backend',
    items: ['Node.js', 'Express.js', 'REST APIs', 'Socket.io', 'JWT Auth', 'MongoDB'],
  },
  {
    category: 'Mobile',
    items: ['Flutter', 'Dart', 'Android (Java)'],
  },
  {
    category: 'AI / Data',
    items: ['Python', 'TensorFlow', 'scikit-learn', 'Computer Vision', 'Jupyter'],
  },
  {
    category: 'Cloud & Infra',
    items: ['AWS (EC2, S3)', 'Docker', 'Redis', 'Firebase', 'Vercel'],
  },
]

export const stats = [
  { label: 'Public repos', value: '90+' },
  { label: 'Years shipping', value: '4+' },
  { label: 'Products live', value: '2' },
  { label: 'GitHub stars', value: '20+' },
]
