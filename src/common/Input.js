import React from "react";
import classNames from "classnames";

const Input = React.forwardRef(({ className, name, ...props }, ref) => {
  const classes = classNames([className, "nes-field"]);
  return (
    <div className={classes}>
      <label for={name}>Your name</label>
      <input
        className="nes-input"
        id={name}
        name={name}
        ref={ref}
        {...props}
      />
    </div>
  );
});

export default Input;
