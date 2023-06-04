import React, { useEffect, useRef } from "react";

function useOutsideAlerter(ref: any, handleOutside: () => void) {
  const handleOutsideRef = useRef<() => void>();
  handleOutsideRef.current = handleOutside;

  useEffect(() => {
    const handleOutsideClick = (event: any) => {
      if (ref.current && !ref.current.contains(event.target)) {
        handleOutsideRef.current?.();
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [ref]);
}

interface IProps {
  children: React.ReactNode;
  handleOutside: () => void;
}

function OutsideAlerter({ children, handleOutside }: IProps) {
  const wrapperRef = useRef(null);
  useOutsideAlerter(wrapperRef, handleOutside);

  return <div ref={wrapperRef}>{children}</div>;
}

export default OutsideAlerter;
