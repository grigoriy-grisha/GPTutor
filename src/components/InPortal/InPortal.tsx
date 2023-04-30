import React from "react";
import ReactDOM from "react-dom";

interface IProps {
  elem?: HTMLElement;
  id?: string;
  children: React.ReactNode;
}

function InPortal({ elem, id, children }: IProps) {
  const [hasMounted, setHasMounted] = React.useState(false);

  React.useEffect(() => setHasMounted(true), []);

  if (!hasMounted) return null;

  return ReactDOM.createPortal(
    children,
    elem || (document.querySelector(`#${id}`) as HTMLElement)
  );
}

export default InPortal;
