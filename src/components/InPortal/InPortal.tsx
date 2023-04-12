import React from "react";
import ReactDOM from "react-dom";

interface IProps {
  id: string;
  children: React.ReactNode;
}

// todo поправить querySelector
function InPortal({ id, children }: IProps) {
  const [hasMounted, setHasMounted] = React.useState(false);

  React.useEffect(() => setHasMounted(true), []);

  if (!hasMounted) return null;

  return ReactDOM.createPortal(
    children,
    document.querySelector(`#${id}`) as HTMLElement
  );
}

export default InPortal;
