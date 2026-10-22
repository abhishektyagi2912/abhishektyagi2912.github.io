import { useCallback, useState } from 'react'
import Loader from './components/Loader'
import SmoothScroll from './components/SmoothScroll'
import Cursor from './components/Cursor'
import Nav from './components/Nav'
import Footer from './components/Footer'
import Hero from './components/sections/Hero'
import Marquee from './components/sections/Marquee'
import About from './components/sections/About'
import Experience from './components/sections/Experience'
import Skills from './components/sections/Skills'
import Flagship from './components/sections/Flagship'
import Projects from './components/sections/Projects'
import Contact from './components/sections/Contact'

export default function App() {
  const [loaded, setLoaded] = useState(false)
  const onLoaded = useCallback(() => setLoaded(true), [])

  return (
    <>
      <Loader onDone={onLoaded} />
      {loaded && (
        <SmoothScroll>
          <Cursor />
          <Nav />
          <main>
            <Hero />
            <Marquee />
            <About />
            <Experience />
            <Skills />
            <Flagship />
            <Projects />
            <Contact />
          </main>
          <Footer />
        </SmoothScroll>
      )}
    </>
  )
}
