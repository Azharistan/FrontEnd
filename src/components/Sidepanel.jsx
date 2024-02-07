import  { useState } from 'react';
import "./Style/SidePanel.css";

const SidePanel = () => {
  const [isOpen, setIsOpen] = useState(false);

  const togglePanel = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className={`side-panel ${isOpen ? 'open' : ''}`}>
      <button onClick={togglePanel}>Toggle Panel</button>
      {isOpen && (
        <div className="options">
          <p>Option 1</p>
          <p>Option 2</p>
          <p>Option 3</p>
        </div>
      )}
    </div>
  );
};

export default SidePanel;