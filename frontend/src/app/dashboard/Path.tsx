"use client";
import { usePathname } from "next/navigation";
import { capitalize } from "@/util/text";

export const Path = () => {
  const pathname = usePathname();
  const cleanPath = pathname.split("/").slice(2);
  const dashboardItem = cleanPath[0];
  const dashboardItemLast = cleanPath[cleanPath.length - 1];
  const dashboardItemMiddle = cleanPath[1];
  return (
    <>
      <h3 className="font-bold text-xl">{capitalize(dashboardItemLast)}</h3>
      <div className="flex items-center gap-3">
        <span>Dashboard</span>
        <span className="h-1 w-1 rounded-[100%] bg-black"></span>
        <span>{capitalize(dashboardItem)}</span>
        <span className="h-1 w-1 rounded-[100%] bg-black"></span>
        <span>{capitalize(dashboardItemMiddle)}</span>
      </div>
    </>
  );
};
