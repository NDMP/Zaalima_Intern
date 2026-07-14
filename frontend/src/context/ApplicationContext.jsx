import { createContext, useState, useEffect } from "react";

export const ApplicationContext = createContext();

export function ApplicationProvider({ children }) {
  const [applications, setApplications] = useState(() => {
    const saved = localStorage.getItem("applications");
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem(
      "applications",
      JSON.stringify(applications)
    );
  }, [applications]);

  return (
    <ApplicationContext.Provider
      value={{
        applications,
        setApplications,
      }}
    >
      {children}
    </ApplicationContext.Provider>
  );
}