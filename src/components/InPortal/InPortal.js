import React from "react";
import ReactDOM from "react-dom";

function InPortal({ id, children }) {
  const [hasMounted, setHasMounted] = React.useState(false);

  React.useEffect(() => setHasMounted(true), []);

  if (!hasMounted) return null;

  return ReactDOM.createPortal(children, document.querySelector(`#${id}`));
}

export default InPortal;
