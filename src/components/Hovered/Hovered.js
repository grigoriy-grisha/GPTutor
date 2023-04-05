import classes from "./Hovered.module.css";

function Hovered({ children, style }) {
  return (
    <div className={classes.hovered} style={style}>
      {children}
    </div>
  );
}

export default Hovered;
