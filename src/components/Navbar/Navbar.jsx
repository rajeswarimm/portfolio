import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { FiMenu, FiX } from "react-icons/fi";
import "./Navbar.css";

const LINKS = [
  { id: "home", label: "About Me" },
  { id: "about", label: "Experience" },
  { id: "projects", label: "Projects" },
  { id: "skills", label: "Skills" },
  { id: "contact", label: "Contact" },
];

export default function Navbar() {
  const [active, setActive] = useState("home");
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const navRef = useRef(null);

  // entrance animation
  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;
    gsap.fromTo(
      navRef.current,
      { y: -32, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.7, ease: "power3.out", delay: 0.15 }
    );
  }, []);

  // scroll shadow + active section tracking
  useEffect(() => {
    const sections = LINKS.map((l) => document.getElementById(l.id)).filter(
      Boolean
    );

    const onScroll = () => setScrolled(window.scrollY > 12);
    window.addEventListener("scroll", onScroll, { passive: true });

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id);
        });
      },
      { rootMargin: "-45% 0px -50% 0px", threshold: 0 }
    );
    sections.forEach((s) => observer.observe(s));

    return () => {
      window.removeEventListener("scroll", onScroll);
      observer.disconnect();
    };
  }, []);

  const handleNavClick = (id) => {
    setOpen(false);
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <header
      ref={navRef}
      className={`nav-shell ${scrolled ? "nav-shell--scrolled" : ""}`}
    >
      <nav className="nav-inner">
        <button
          className="nav-brand"
          onClick={() => handleNavClick("home")}
          aria-label="Go to home"
        >
          Rajeswari<span className="nav-brand-dot">.</span>
        </button>

        <ul className="nav-links">
          {LINKS.map((link) => (
            <li key={link.id}>
              <button
                className={`nav-link ${
                  active === link.id ? "nav-link--active" : ""
                }`}
                onClick={() => handleNavClick(link.id)}
              >
                {link.label}
              </button>
            </li>
          ))}
        </ul>

        <button
          className="nav-burger"
          onClick={() => setOpen((v) => !v)}
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
        >
          {open ? <FiX size={22} /> : <FiMenu size={22} />}
        </button>
      </nav>

      <div className={`nav-mobile ${open ? "nav-mobile--open" : ""}`}>
        <ul>
          {LINKS.map((link) => (
            <li key={link.id}>
              <button
                className={`nav-mobile-link ${
                  active === link.id ? "nav-mobile-link--active" : ""
                }`}
                onClick={() => handleNavClick(link.id)}
              >
                {link.label}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </header>
  );
}
