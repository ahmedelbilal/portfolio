import { useEffect, useState } from "react";

export default function usePathName() {
  const [pathName, setPathName] = useState("");

  useEffect(() => {
    if (typeof window === "undefined") return;

    const updatePathName = () => setPathName(window.location.pathname);

    updatePathName();

    // React to popstate (browser back/forward)
    window.addEventListener("popstate", updatePathName);

    return () => {
      window.removeEventListener("popstate", updatePathName);
    };
  }, []);

  return pathName;
}
