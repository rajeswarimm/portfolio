import Navbar from "./components/Navbar/Navbar.jsx";
import Home from "./components/Home/Home.jsx";
import About from "./components/About/About.jsx";
import Education from "./components/Education/Education.jsx";
import Projects from "./components/Projects/Projects.jsx";
import Skills from "./components/Skills/Skills.jsx";
import Contact from "./components/Contact/Contact.jsx";
import MobileContactBar from "./components/MobileContactBar/MobileContactBar.jsx";

export default function App() {
  return (
    <>
      <Navbar />
      <main>
        <Home />
        <About />
        <Education />
        <Projects />
        <Skills />
        <Contact />
      </main>
      <footer className="site-footer">
        <p>© 2026 Rajeswari MM. All Rights Reserved.</p>
      </footer>
      <MobileContactBar />
    </>
  );
}
