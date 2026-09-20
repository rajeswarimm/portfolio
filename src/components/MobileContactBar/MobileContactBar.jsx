import { FiMail, FiMessageCircle } from "react-icons/fi";
import "./MobileContactBar.css";

export default function MobileContactBar() {
  return (
    <div className="mobile-contact-bar">
      <a href="mailto:rajeswari.mm.career@gmail.com" className="mcb-btn mcb-email">
        <FiMail size={20} />
        <span>Email</span>
      </a>
      <div className="mcb-divider" />
      <a 
        href="https://wa.me/919789648185" 
        target="_blank" 
        rel="noopener noreferrer" 
        className="mcb-btn mcb-whatsapp"
      >
        <FiMessageCircle size={20} />
        <span>WhatsApp</span>
      </a>
    </div>
  );
}
