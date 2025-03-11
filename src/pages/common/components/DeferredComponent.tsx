import { useState, useEffect } from "react";

export const DeferredComponent = ({ children, delay = 200 }) => {
  const [isDeferred, setIsDeferred] = useState(false);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setIsDeferred(true);
    }, delay);
    return () => clearTimeout(timeoutId);
  }, [delay]);

  if (!isDeferred) {
    return null;
  }

  return <>{children}</>;
};

 
