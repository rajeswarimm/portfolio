import { useEffect, useRef } from "react";
import gsap from "gsap";
import {
  FiMail,
  FiPhone,
  FiMessageCircle,
  FiLinkedin,
} from "react-icons/fi";
import "./Contact.css";

const CONTACTS = [
  {
    key: "email",
    label: "Email",
    value: "rajeswari.mm.career@gmail.com",
    href: "mailto:rajeswari.mm.career@gmail.com",
    icon: FiMail,
    external: true,
  },
  {
    key: "phone",
    label: "Phone",
    value: "+91 9789648185",
    href: "tel:+919789648185",
    icon: FiPhone,
    external: false,
  },
  {
    key: "whatsapp",
    label: "WhatsApp",
    value: "Chat on WhatsApp",
    href: "https://wa.me/919789648185",
    icon: FiMessageCircle,
    external: true,
  },
  {
    key: "linkedin",
    label: "LinkedIn",
    value: "LinkedIn Profile",
    href: "https://www.linkedin.com/in/rajeswari-mariappan-038043348",
    icon: FiLinkedin,
    external: true,
  },
];

export default function Contact() {
  const sectionRef = useRef(null);
  const cardRefs = useRef([]);

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
              duration: 0.7,
              ease: "back.out(1.5)",
              delay: index * 0.1, // stagger effect
            });
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.3 }
    );

    cardRefs.current.forEach((el) => {
      if (!el) return;
      gsap.set(el, { opacity: 0, y: 30, scale: 0.95 });
      observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <section id="contact" className="contact-section" ref={sectionRef}>
      <div className="contact-inner">
        <h2 className="section-title contact-title">Let&apos;s Connect</h2>
        <p className="contact-subtitle">
          I'm currently open to React Frontend Developer opportunities. Feel free to connect with me.
        </p>

        <div className="contact-grid">
          {CONTACTS.map((contact, i) => {
            const Icon = contact.icon;
            return (
              <a
                key={contact.key}
                href={contact.href}
                target={contact.external ? "_blank" : undefined}
                rel={contact.external ? "noopener noreferrer" : undefined}
                className="contact-card"
                ref={(el) => (cardRefs.current[i] = el)}
              >
                <span className="contact-icon">
                  <Icon size={19} />
                </span>
                <span className="contact-text">
                  <span className="contact-label">{contact.label}</span>
                  <span className="contact-value">{contact.value}</span>
                </span>
              </a>
            );
          })}
        </div>
      </div>
    </section>
  );
}
