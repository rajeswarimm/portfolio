import { FiArrowUpRight } from "react-icons/fi";
import projects from "../../data/projects.js";
import "./Projects.css";

export default function Projects() {
  return (
    <section id="projects" className="projects-section">
      <div className="projects-inner">
        <h2 className="section-title">Projects</h2>
        <p className="projects-subtitle">
          A few modern web applications and sites I&apos;ve built and shipped.
        </p>

        <div className="projects-grid">
          {projects.map((project) => (
            <a
              key={project.number}
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              className="project-card"
              aria-label={`View the ${project.name} project (opens in a new tab)`}
            >
              <div className="project-card-header">
                <span className="project-number">{project.number}</span>
              </div>
              <h3 className="project-name">{project.name}</h3>
              <p className="project-card-desc">{project.description}</p>
              
              <div className="project-card-footer">
                <div className="project-card-tech">
                  {project.tech.map((t) => (
                    <span key={t} className="tech-chip">
                      {t}
                    </span>
                  ))}
                </div>
                <span className="project-card-view">View Project</span>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
