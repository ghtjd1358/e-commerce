import { useEffect, useState } from "react";
import { useScroll } from "framer-motion";

export const useScrollThreshold = (threshold: number = 60) => {
  const { scrollY } = useScroll(); 
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const unsubscribe = scrollY.on("change", (latest) => {
      setIsScrolled(latest > threshold); 
    });

    return () => unsubscribe(); 
  }, [scrollY, threshold]);

  return isScrolled;
};
