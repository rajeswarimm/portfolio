import { useEffect, useRef } from "react";
import gsap from "gsap";
import education from "../../data/education.js";
import "./Education.css";

export default function Education() {
  const itemRefs = useRef([]);
  const sectionRef = useRef(null);

  useEffect(() => {
    const reduce = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (reduce) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            gsap.to(entry.target, {
              opacity: 1,
              y: 0,
              scale: 1,
              duration: 0.7,
              ease: "back.out(1.2)",
            });
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.2 }
    );

    itemRefs.current.forEach((el, index) => {
      if (!el) return;
      // Added a slight scale and delay based on index for a cascading effect
      gsap.set(el, { opacity: 0, y: 40, scale: 0.95 });
      // We can use a small delay directly if we unobserve together, but intersection observer is per-element.
      // We will let Intersection Observer handle the trigger, and GSAP handle the animation.
      observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <section id="education" className="education-section" ref={sectionRef}>
      <div className="education-inner">
        <h2 className="section-title">Education</h2>

        <div className="education-grid">
          {education.map((item, i) => (
            <div
              key={item.degree}
              className="education-item"
              ref={(el) => (itemRefs.current[i] = el)}
            >
              <div className="education-card-content">
                <span className="education-year">{item.year}</span>
                <h3>{item.degree}</h3>
                <p className="education-school">{item.school}</p>
                <div className="education-score-wrapper">
                    <span className="education-score">{item.score}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
