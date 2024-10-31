import React, { useEffect, useRef, useState } from 'react';

const CustomContextMenu = () => {
  const [menuStyle, setMenuStyle] = useState({ display: 'none' });
  const menuRef = useRef(null);
  useEffect(() => {
    const handleContextMenu = (e) => {
      e.preventDefault();
      setMenuStyle({
        display: 'block',
        left: `${e.pageX}px`,
        top: `${e.pageY}px`,
      });
    };

    const handleClick = () => {
      setMenuStyle({ display: 'none' });
    };

    document.addEventListener('contextmenu', handleContextMenu);
    document.addEventListener('click', handleClick);

    return () => {
      document.removeEventListener('contextmenu', handleContextMenu);
      document.removeEventListener('click', handleClick);
    };
  }, []);

  const handleOptionClick = (option) => {
    alert(`${option} clicked!`);
  };

  return (
    <div
      ref={menuRef}
      className="custom-menu"
      style={{ ...menuStyle, position: 'absolute', backgroundColor: '#fff', border: '1px solid #ccc' }}
    >
      <div id="option1" onClick={() => handleOptionClick('Option 1')}>Option 1</div>
      <div id="option2" onClick={() => handleOptionClick('Option 2')}>Option 2</div>
      <div id="option3" onClick={() => handleOptionClick('Option 3')}>Option 3</div>
    </div>
  );
};

export default CustomContextMenu;
