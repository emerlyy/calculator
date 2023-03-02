import React from "react";

import './Display.css';

function Display({ type, children, ...props }) {
  return (
    <div {...props} className={type === 'small' ? "small" : "display"} >
      {children}
    </div>
  );
}

export default Display;