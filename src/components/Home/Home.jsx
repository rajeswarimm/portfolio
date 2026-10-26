import { useEffect, useRef } from "react";
import gsap from "gsap";
import profileImg from "../../assets/profile.webp";
import resumePdf from "../../assets/Resume.pdf";
import "./Home.css";

export default function Home() {
  const nameRef = useRef(null);
  const roleRef = useRef(null);
  const lineOneRef = useRef(null);
  const lineTwoRef = useRef(null);
  const orbRef1 = useRef(null);
  const orbRef2 = useRef(null);
  const orbRef3 = useRef(null);
  const particlesRef = useRef(null);
  const ctasRef = useRef(null);
  const imageRef = useRef(null);
  const wrapperRef = useRef(null);

  useEffect(() => {
    const reduce = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (reduce) {
      gsap.set(
        [nameRef.current, roleRef.current, lineOneRef.current, lineTwoRef.current, ctasRef.current, imageRef.current],
        { opacity: 1, y: 0, x: 0, scale: 1 }
      );
      return;
    }

    const tl = gsap.timeline({ delay: 0.2, defaults: { ease: "power3.out" } });

    // Staggered text reveal with slight scaling
    tl.fromTo(
      nameRef.current,
      { y: 40, opacity: 0, scale: 0.95 },
      { y: 0, opacity: 1, scale: 1, duration: 1 }
    )
      .fromTo(
        roleRef.current,
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8 },
        "-=0.6"
      )
      .fromTo(
        [lineOneRef.current, lineTwoRef.current],
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.7, stagger: 0.15 },
        "-=0.4"
      )
      .fromTo(
        ctasRef.current,
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.7 },
        "-=0.5"
      )
      .fromTo(
        imageRef.current,
        { x: 40, opacity: 0, scale: 0.9 },
        { x: 0, opacity: 1, scale: 1, duration: 1 },
        "-=1"
      );

    // Continuous Background Animations (Moving Orbs)
    gsap.to(orbRef1.current, {
      y: "random(-30, 30)",
      x: "random(-30, 30)",
      rotation: "random(-15, 15)",
      duration: "random(4, 7)",
      ease: "sine.inOut",
      yoyo: true,
      repeat: -1,
    });

    gsap.to(orbRef2.current, {
      y: "random(-40, 40)",
      x: "random(-40, 40)",
      scale: "random(0.8, 1.2)",
      duration: "random(5, 8)",
      ease: "sine.inOut",
      yoyo: true,
      repeat: -1,
    });

    gsap.to(orbRef3.current, {
      y: "random(-50, 50)",
      x: "random(-50, 50)",
      duration: "random(6, 9)",
      ease: "sine.inOut",
      yoyo: true,
      repeat: -1,
    });

    // Animate floating particles
    if (particlesRef.current) {
      const particles = particlesRef.current.children;
      gsap.to(particles, {
        y: "random(-80, 80)",
        x: "random(-80, 80)",
        rotation: "random(-180, 180)",
        duration: "random(10, 20)",
        ease: "sine.inOut",
        yoyo: true,
        repeat: -1,
        stagger: {
          amount: 5,
          from: "random"
        }
      });
    }

    if (wrapperRef.current) {
      gsap.to(wrapperRef.current, {
        y: -15,
        duration: 3,
        ease: "sine.inOut",
        yoyo: true,
        repeat: -1,
      });
    }
  }, []);

  return (
    <section id="home" className="home-section">
      {/* Background Elements */}
      <div className="bg-elements">
        <div className="home-orb orb-1" ref={orbRef1} aria-hidden="true" />
        <div className="home-orb orb-2" ref={orbRef2} aria-hidden="true" />
        <div className="home-orb orb-3" ref={orbRef3} aria-hidden="true" />

        <div className="particles" ref={particlesRef} aria-hidden="true">
          <span className="particle">✦</span>
          <span className="particle">✧</span>
          <span className="particle">✦</span>
          <span className="particle">+</span>
          <span className="particle">✧</span>
        </div>
      </div>

      <div className="home-container">
        <div className="home-content">
          <h1 className="home-name" ref={nameRef}>
            Rajeswari MM
          </h1>
          <p className="home-role" ref={roleRef}>
            React Frontend Developer
          </p>
          <p className="home-line" ref={lineOneRef}>
            I&apos;m a React Front-End Developer with 1+ year of professional experience building responsive, user-friendly web interfaces.
          </p>
          <p className="home-line" ref={lineTwoRef}>
            I focus on creating clean, modern UIs using React.js, JavaScript, HTML, CSS, Bootstrap, and Tailwind CSS. I enjoy building reusable components, integrating REST APIs, and creating smooth user experiences across devices.
          </p>

          <div className="home-ctas" ref={ctasRef}>
            <button
              className="home-cta-btn"
              onClick={() => {
                const el = document.getElementById("projects");
                if (el) el.scrollIntoView({ behavior: "smooth" });
              }}
            >
              View Projects
            </button>
            <a
              href={resumePdf}
              download="Rajeswari_MM_Resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="home-cta-btn home-cta-btn--outline"
            >
              Download Resume
            </a>
          </div>
        </div>

        <div className="home-image-container" ref={imageRef}>
          <div className="home-image-wrapper" ref={wrapperRef}>
            <img src={profileImg} alt="Rajeswari MM" className="home-profile-img" />
          </div>
        </div>
      </div>
    </section>
  );
}
