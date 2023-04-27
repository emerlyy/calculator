import { forwardRef, LegacyRef } from "react";

import './Display.css';

type DisplayTypes = 'small' | 'display';

interface DisplayProps {
  children: string,
  type?: DisplayTypes,
  [key: string]: any,
}

const Display = forwardRef(({ type, children, ...props }: DisplayProps, ref: LegacyRef<HTMLDivElement> | undefined) => {
  return (
    <div {...props} ref={ref} className={type === 'small' ? "small" : "display"} >
      {children}
    </div>
  );
})

export default Display;