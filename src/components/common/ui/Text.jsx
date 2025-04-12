"use client";
import React from "react";
const Text = ({
  as = "p", // default to <p>
  children,
  className = "",
  variant = "base",
  ...rest // collect all other props
}) => {
  const allowedTags = ["p", "span", "a"];
  const Tag = allowedTags.includes(as) ? as : "p";

  const variants = {
    primary: "text-xl font-bold",
    secondary: "text-lg font-semibold",
    base: "text-base font-medium",
  };

  return (
    <Tag
      className={`text-white ${
        variants[variant] || variants.base
      } ${className}`}
      {...rest}>
      {children}
    </Tag>
  );
};

export default Text;
