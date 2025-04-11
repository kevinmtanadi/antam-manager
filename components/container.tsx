import React from "react";

const sizeClasses = {
  sm: "max-w-sm",
  md: "max-w-md",
  lg: "max-w-lg",
  xl: "max-w-xl",
  "2xl": "max-w-2xl",
  "3xl": "max-w-3xl",
  "4xl": "max-w-4xl",
  "5xl": "max-w-5xl",
  "6xl": "max-w-6xl",
  "7xl": "max-w-7xl",
};

const Container = ({
  children,
  size = "4xl",
}: {
  children: React.ReactNode;
  size?: keyof typeof sizeClasses;
}) => {
  return (
    <div className="w-full flex justify-center my-8 px-8">
      <div className={`${sizeClasses[size]} w-full flex flex-col gap-4`}>
        {children}
      </div>
    </div>
  );
};

export default Container;
