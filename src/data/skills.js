import {
  FiCode,
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
      "JavaScript",
      "HTML5",
      "CSS3",
      "Tailwind CSS",
      "Responsive Design",
      "REST API Integration",
    ],
  },
  {
    key: "testing",
    label: "Testing",
    icon: FiCheckSquare,
    items: [
      "Robot Framework",
      "Python",
      "Test Automation",
      "Functional Testing"
    ],
  },
  {
    key: "tools",
    label: "Tools",
    icon: FiTool,
    items: ["Git", "GitHub", "VS Code"],
  },
];

export default skills;
