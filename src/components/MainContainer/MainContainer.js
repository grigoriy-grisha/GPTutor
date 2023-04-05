import classes from "./MainContainer.module.css";

function MainContainer({ offsetHeight, style, children }) {
  return (
    <div
      className={classes.container}
      style={{
        height: `calc(100vh - ${offsetHeight || 0}px)`,
        maxHeight: `calc(100vh - ${offsetHeight || 0}px)`,
        ...style,
      }}
    >
      {children}
    </div>
  );
}

export default MainContainer;
