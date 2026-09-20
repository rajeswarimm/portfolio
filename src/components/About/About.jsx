import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import experience from "../../data/experience.js";
import "./About.css";

export default function About() {
  const sectionRef = useRef(null);
  const timelineRef = useRef(null);
  const trackRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(experience.length - 1);

  const [touchStart, setTouchStart] = useState(null);
  const [touchEnd, setTouchEnd] = useState(null);

  const minSwipeDistance = 50;

  const onTouchStart = (e) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e) => setTouchEnd(e.targetTouches[0].clientX);

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;

    if (isLeftSwipe && activeIndex < experience.length - 1) {
      setActiveIndex(activeIndex + 1);
    }
    if (isRightSwipe && activeIndex > 0) {
      setActiveIndex(activeIndex - 1);
    }
  };

  useEffect(() => {
    // Auto-scroll to active timeline step for mobile overflow when activeIndex changes
    if (trackRef.current) {
      const activeStep = trackRef.current.querySelector('.timeline-step.active');
      if (activeStep) {
        setTimeout(() => {
          const container = trackRef.current;
          const scrollLeft = activeStep.offsetLeft - (container.clientWidth / 2) + (activeStep.clientWidth / 2);
          // Use 'instant' for reliability on mobile load, since smooth scroll sometimes gets interrupted by scroll-snap
          container.scrollTo({ left: scrollLeft, behavior: 'instant' });
        }, 150);
      }
    }
  }, [activeIndex]);

  useEffect(() => {
    const reduce = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (reduce) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry, index) => {
          if (entry.isIntersecting) {
            gsap.to(entry.target, {
              opacity: 1,
              y: 0,
              scale: 1,
              duration: 0.8,
              ease: "back.out(1.4)",
              delay: index * 0.15 // Stagger effect based on intersection batch
            });
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.2 }
    );

    [timelineRef.current].forEach((el) => {
      if (!el) return;
      gsap.set(el, { opacity: 0, y: 50, scale: 0.95 });
      observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <section id="about" className="about-section" ref={sectionRef}>
      <div className="about-inner">
        <h2 className="section-title">Experience</h2>

        <div className="horizontal-timeline" ref={timelineRef}>
          <div className="timeline-track-container" ref={trackRef}>
            <div className="timeline-track">
              <div className="timeline-line"></div>
              <div className="timeline-steps">
              {experience.map((job, index) => (
                <div
                  key={job.company}
                  className={`timeline-step ${activeIndex === index ? "active" : ""}`}
                  onClick={() => setActiveIndex(index)}
                >
                  <div className="timeline-dot"></div>
                  <div className="timeline-step-label">
                    <span className="step-role">{job.shortRole || job.role.split(" ")[0]}</span>
                    <span className="step-year">{job.shortPeriod || job.period.split(" ")[0]}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
          </div>

          <div 
            className="timeline-content-area"
            onTouchStart={onTouchStart}
            onTouchMove={onTouchMove}
            onTouchEnd={onTouchEnd}
          >
            {experience.map((job, index) => (
              <div
                key={job.company}
                className={`timeline-card horizontal-card ${
                  activeIndex === index ? "active" : ""
                }`}
              >
                <div className="timeline-card-head">
                  <h4>{job.role}</h4>
                  <span className="timeline-period">{job.period}</span>
                </div>
                <p className="timeline-company">{job.company}</p>

                <div className="timeline-details">
                  <ul>
                    {job.points.map((point) => (
                      <li key={point}>{point}</li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
