import React from "react";

// SVG templates as JSX with plain paths (no className on them)
const icons = {
  first: () => (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg">
      <path d="M4 4h16v16H4z" />
      <path d="M8 8h8v8H8z" />
    </svg>
  ),
  second: () => (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      xmlns="http://www.w3.org/2000/svg">
      <path d="M12 2v20" />
      <path d="M2 12h20" />
      <path d="M4 4l16 16" />
    </svg>
  ),
};

const Icons = ({ name, className = "", ...rest }) => {
  const SvgIcon = icons[name];
  if (!SvgIcon) return null;

  // clone the SVG and add className to it + className to each <path>
  const rawSvg = SvgIcon();
  const clonedPaths = React.Children.map(
    rawSvg.props.children,
    (child, index) => {
      if (React.isValidElement(child) && child.type === "path") {
        return React.cloneElement(child, {
          className: `path_${index + 1}`,
        });
      }
      return child;
    }
  );

  return React.cloneElement(rawSvg, {
    className,
    ...rest,
    children: clonedPaths,
  });
};

export default Icons;
