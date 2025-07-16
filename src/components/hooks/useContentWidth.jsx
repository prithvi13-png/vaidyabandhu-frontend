import { useState, useEffect } from "react";

/**
 * Custom hook to get the screen width and update it on window resize.
 */
const useContentWidth = () => {
  const [width, setWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => setWidth(window.innerWidth);

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return width;
};

export default useContentWidth;
