export type SectionMeta = {
  id: string
  label: string
  title: string
  icon: string
  achievement: string
}

export const SECTIONS: SectionMeta[] = [
  { id: 'top', label: 'Spawn', title: 'Hero', icon: '◆', achievement: 'Entered the simulation' },
  { id: 'about', label: 'About', title: 'The Archive', icon: '◇', achievement: 'Explored the archive' },
  { id: 'experience', label: 'Exp', title: 'Experience', icon: '▲', achievement: 'Traced the timeline' },
  { id: 'stack', label: 'Stack', title: 'Stack', icon: '◈', achievement: 'Inspected the stack' },
  { id: 'work', label: 'Work', title: 'Flagship', icon: '★', achievement: 'Found the flagship builds' },
  { id: 'projects', label: 'Projects', title: 'Projects', icon: '⬡', achievement: 'Raided the GitHub vault' },
  { id: 'contact', label: 'Contact', title: 'Contact', icon: '✦', achievement: 'Reached the final boss' },
]
