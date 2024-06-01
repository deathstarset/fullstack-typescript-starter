import React from "react";

interface IconProps {
  children: React.ReactNode;
}

export const Icon = ({ children }: IconProps) => {
  return (
    <div className="cursor-pointer h-[40px] w-[40px] rounded-[100%] flex items-center justify-center hover:bg-slate-200">
      {children}
    </div>
  );
};
