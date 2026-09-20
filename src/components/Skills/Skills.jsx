import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import skills from "../../data/skills.js";
import "./Skills.css";

export default function Skills() {
  const [activeKey, setActiveKey] = useState(skills[0].key);
  const panelRef = useRef(null);
  const sectionRef = useRef(null);

  const active = skills.find((s) => s.key === activeKey);

  const handleTab = (key) => {
    if (key === activeKey) return;

    const reduce = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (reduce) {
      setActiveKey(key);
      return;
    }

    const items = panelRef.current.querySelectorAll('.skill-item');
    
    if (items.length > 0) {
      gsap.to(items, {
        opacity: 0,
        scale: 0.9,
        y: 10,
        duration: 0.2,
        stagger: 0.02,
        onComplete: () => {
          setActiveKey(key);
          setTimeout(() => {
            const newItems = panelRef.current.querySelectorAll('.skill-item');
            gsap.fromTo(
              newItems,
              { opacity: 0, y: 15, scale: 0.8 },
              { opacity: 1, y: 0, scale: 1, duration: 0.4, ease: "back.out(1.5)", stagger: 0.03 }
            );
          }, 10);
        },
      });
    } else {
        setActiveKey(key);
    }
  };

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const items = entry.target.querySelectorAll('.skill-item');
          gsap.fromTo(items,
            { opacity: 0, y: 20, scale: 0.8 },
            { opacity: 1, y: 0, scale: 1, duration: 0.5, ease: "back.out(1.5)", stagger: 0.1 }
          );
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.2 });

    if (panelRef.current) {
      const items = panelRef.current.querySelectorAll('.skill-item');
      gsap.set(items, { opacity: 0 }); // hide initially for animation
      observer.observe(panelRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section id="skills" className="skills-section" ref={sectionRef}>
      <div className="skills-inner">
        <h2 className="section-title">Skills</h2>

        <div className="skills-tabs" role="tablist" aria-label="Skill categories">
          {skills.map((skill) => {
            const Icon = skill.icon;
            return (
              <button
                key={skill.key}
                role="tab"
                aria-selected={activeKey === skill.key}
                className={`skills-tab ${
                  activeKey === skill.key ? "skills-tab--active" : ""
                }`}
                onClick={() => handleTab(skill.key)}
              >
                <Icon size={16} />
                {skill.label}
              </button>
            );
          })}
        </div>

        <div className="skills-panel" ref={panelRef} role="tabpanel">
          <div className="skills-list">
            {active.items.map((item) => (
              <span key={item} className="skill-item">
                {item}
              </span>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
