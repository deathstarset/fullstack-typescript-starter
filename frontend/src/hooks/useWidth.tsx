import { useState, useEffect } from "react";
import { useNavStore } from "@/store/navStore";
export function useWidth() {
  const [width, setWidth] = useState(window.innerWidth);
  const openSideBar = useNavStore((state) => state.openSide);

  useEffect(() => {
    const handleResize = () => {
      setWidth(window.innerWidth);
      if (window.innerWidth < 700) {
        openSideBar();
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  return width;
}
