import { MotionConfig } from 'framer-motion'
import { ArchitectureFlow } from './components/landing/ArchitectureFlow'
import { Benchmarks } from './components/landing/Benchmarks'
import { BentoGrid } from './components/landing/BentoGrid'
import { Faq } from './components/landing/Faq'
import { Footer } from './components/landing/Footer'
import { Header } from './components/landing/Header'
import { Hero } from './components/landing/Hero'
import { PhotoToListing } from './components/landing/PhotoToListing'

function App() {
  return (
    <MotionConfig reducedMotion="user">
      <Header />
      <main>
        <Hero />
        <PhotoToListing />
        <BentoGrid />
        <ArchitectureFlow />
        <Benchmarks />
        <Faq />
      </main>
      <Footer />
    </MotionConfig>
  )
}

export default App
