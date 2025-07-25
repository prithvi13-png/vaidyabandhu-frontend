import { useState, useEffect } from "react";

/**
 * Custom hook to get the screen height and update it on window resize.
 */
const useContentHeight = () => {
  const [height, setHeight] = useState(window.innerHeight);

  useEffect(() => {
    const handleResize = () => setHeight(window.innerHeight);

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return height;
};

export default useContentHeight;
