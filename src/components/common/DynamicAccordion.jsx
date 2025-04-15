import React, { useEffect, useRef, useState } from "react";
export const DynamicAccordion = ({ children, open = false, speed = 300 }) => {
  const [maxHeight, setMaxHeight] = useState(0);
  const [isOpen, setIsOpen] = useState(open);
  const itemRef = useRef();
  useEffect(() => {
    setMaxHeight(itemRef.current.scrollHeight || 0);
  }, []);
  useEffect(() => {
    setIsOpen(open);
  }, [open]);
  return (
    <div
      style={{
        maxHeight: isOpen ? `${maxHeight}px` : "0px",
        transitionDuration: `${speed}ms`,
      }}
      className="overflow-hidden transition-all ease-linear">
      <div ref={itemRef} className="">
        {children}
      </div>
    </div>
  );
};
