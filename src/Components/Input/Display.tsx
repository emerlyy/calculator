import React from "react";

import './Display.css';

type DisplayTypes = 'small' | 'display';

interface DisplayProps {
  children: string,
  type?: DisplayTypes,
  [key: string]: any
}

function Display({ type, children, ...props }: DisplayProps) {
  return (
    <div {...props} className={type === 'small' ? "small" : "display"} >
      {children}
    </div>
  );
}

export default Display;