import React from "react";
import classNames from "classnames";

const Button = ({ children, className, variant = "", ...props }) => {
  const classes = classNames([className, "nes-btn", `is-${variant}`]);
  return <button className={classes} {...props}>{children}</button>;
};

export default Button;
