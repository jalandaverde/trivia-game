import React from "react";
import classNames from "classnames";

const Container = ({ children, className, centered, rounded, dark, ...props }) => {
  className = classNames([
    className,
    "nes-container",
    "with-title",
    { "is-dark": dark },
    { "is-centered": centered },
    { "is-rounded": rounded },
  ]);
  return (
    <div className={className} {...props}>
      {children}
    </div>
  );
};

export const Title = ({ children }) => <p className="title">{children}</p>;

export default Container;
