"use client";
import React from "react";
const Cta = ({
  as = "button", // default to button
  children,
  className = "",
  variant = "base",
  onClick = (e) => {
    e.preventDefault();
  }, // optional click handler
  ...rest // collect all other props
}) => {
  const allowedTags = ["button", "a"];
  const Tag = allowedTags.includes(as) ? as : "button";

  const variants = {
    base: "border border-solid border-white px-6 py-3",
  };

  return (
    <Tag
      onClick={onClick}
      className={`text-white rounded-xl inline-block ${
        variants[variant] || variants.base
      } ${className}`}
      {...rest}>
      {children}
    </Tag>
  );
};

export default Cta;
