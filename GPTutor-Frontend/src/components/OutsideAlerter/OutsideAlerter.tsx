import React, { useEffect, useRef } from "react";

function useOutsideAlerter(
  ref: any,
  tooltipRef: any,
  handleOutside: () => void
) {
  const handleOutsideRef = useRef<() => void>();
  handleOutsideRef.current = handleOutside;

  useEffect(() => {
    const handleOutsideClick = (event: any) => {
      if (
        ref.current &&
        !ref.current.contains(event.target) &&
        !tooltipRef.current?.contains(event.target)
      ) {
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
  children: (getRef: React.Ref<HTMLDivElement>) => JSX.Element;
  handleOutside: () => void;
}

function OutsideAlerter({ children, handleOutside }: IProps) {
  const wrapperRef = useRef(null);
  const tooltipRef = useRef<any>(null);

  useOutsideAlerter(wrapperRef, tooltipRef, handleOutside);

  return (
    <div ref={wrapperRef}>{children((ref) => (tooltipRef.current = ref))}</div>
  );
}

export default OutsideAlerter;
