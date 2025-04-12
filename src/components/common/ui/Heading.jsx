"use client";
import React from "react";
const Heading = ({
  as = "h2", // default to h2
  children,
  className = "",
  variant = "base",
  ...rest // dummy click handler
}) => {
  const allowedTags = ["h1", "h2", "h3", "h4", "h5", "h6"];

  // fallback to h2 if invalid tag
  const Tag = allowedTags.includes(as) ? as : "h2";

  // customize style variants
  const variants = {
    primary: "text-5xl font-bold",
    secondary: "text-3xl font-semibold",
    base: "text-2xl font-medium",
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

export default Heading;
