import React from "react";

const DividerWithLogo = ({ logoSrc, altText }) => {
  return (
    <div className="flex items-center mx-10  lg:mx-40 my-8">
      <div className="flex-grow border-t border-primary"></div>
      <img
        src={logoSrc}
        alt={altText}
        className="mx-4 w-8 h-8 object-contain"
      />
      <div className="flex-grow border-t border-primary"></div>
    </div>
  );
};

export default DividerWithLogo;
