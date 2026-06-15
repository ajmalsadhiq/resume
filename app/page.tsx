import Navbar from "./components/navbar"
import Hero from "./components/hero"
import About from "./components/about"
import TechStack from "./components/tech-stack"
import Projects from "./components/projects"
import Education from "./components/education"
import Contact from "./components/contact"
import Footer from "./components/footer"

export default function Page() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <Navbar />
      <Hero />
      <About />
      <TechStack />
      <Projects />
      <Education />
      <Contact />
      <Footer />
    </main>
  )
}
