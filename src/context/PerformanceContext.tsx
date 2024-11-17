import { createContext, useContext, useCallback, ReactNode } from "react";

interface PerformanceContextType {
  markComponentRender: (componentName: string) => void;
}

const PerformanceContext = createContext<PerformanceContextType | null>(null);

export const PerformanceProvider = ({ children }: { children: ReactNode }) => {
  const markComponentRender = useCallback((componentName: string) => {
    performance.mark(`${componentName}-rendered`);
    console.log(`${componentName} rendered at:`, performance.now());
  }, []);

  return (
    <PerformanceContext.Provider value={{ markComponentRender }}>
      {children}
    </PerformanceContext.Provider>
  );
};

export const usePerformance = () => {
  const context = useContext(PerformanceContext);
  if (!context) {
    throw new Error("usePerformance must be used within a PerformanceProvider");
  }
  return context;
};
