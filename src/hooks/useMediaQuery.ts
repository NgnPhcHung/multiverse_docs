import { useState, useEffect } from "react";

const useMediaQuery = (query: string) => {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    const mediaQueryList = window.matchMedia(query);
    const documentChangeHandler = () => setMatches(mediaQueryList.matches);

    // Set the initial state
    documentChangeHandler();

    // Listen for changes
    mediaQueryList.addListener(documentChangeHandler);

    return () => {
      // Cleanup the listener on component unmount
      mediaQueryList.removeListener(documentChangeHandler);
    };
  }, [query]);

  return matches;
};

export default useMediaQuery;
