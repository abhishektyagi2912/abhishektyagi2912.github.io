import { useState } from 'react'
import Loader from './components/Loader'
import SmoothScroll from './components/SmoothScroll'
import Cursor from './components/Cursor'
import Nav from './components/Nav'
import Footer from './components/Footer'
import { AchievementProvider } from './context/AchievementContext'
import ProgressHUD from './components/hud/ProgressHUD'
import CommandPalette from './components/CommandPalette'
import KonamiEgg from './components/KonamiEgg'
import FloatingGlyphs from './components/FloatingGlyphs'
import Hero from './components/sections/Hero'
import About from './components/sections/About'
import Experience from './components/sections/Experience'
import Skills from './components/sections/Skills'
import Flagship from './components/sections/Flagship'
import Projects from './components/sections/Projects'
import Contact from './components/sections/Contact'

export default function App() {
  const [loaded, setLoaded] = useState(false)

  return (
    <>
      <Loader onDone={() => setLoaded(true)} />
      {loaded && (
        <AchievementProvider>
          <SmoothScroll>
            <Cursor />
            <Nav />
            <ProgressHUD />
            <CommandPalette />
            <KonamiEgg />
            <FloatingGlyphs />
            <main>
              <Hero />
              <About />
              <Experience />
              <Skills />
              <Flagship />
              <Projects />
              <Contact />
            </main>
            <Footer />
            <div className="grain" />
            <div className="scanlines" />
          </SmoothScroll>
        </AchievementProvider>
      )}
    </>
  )
}
