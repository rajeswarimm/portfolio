import {
  FiCode,
  FiLayers,
  FiGlobe,
  FiCheckSquare,
  FiTool,
} from "react-icons/fi";

const skills = [
  {
    key: "frontend",
    label: "Frontend",
    icon: FiCode,
    items: [
      "React.js",
      "JavaScript ES6+",
      "HTML5",
      "CSS3",
      "Bootstrap",
      "Tailwind CSS",
      "Responsive Design",
    ],
  },
  {
    key: "react-concepts",
    label: "React Concepts",
    icon: FiLayers,
    items: [
      "Functional Components",
      "React Hooks",
      "Reusable Components",
      "State Management",
    ],
  },
  {
    key: "apis",
    label: "APIs",
    icon: FiGlobe,
    items: [
      "REST API Integration",
      "JSON",
    ],
  },
  {
    key: "testing",
    label: "Testing",
    icon: FiCheckSquare,
    items: [
      "Functional Testing",
      "Regression Testing",
      "Robot Framework",
      "Python",
    ],
  },
  {
    key: "tools",
    label: "Tools",
    icon: FiTool,
    items: [
      "Git",
      "GitHub",
      "Visual Studio Code",
    ],
  },
];

export default skills;
