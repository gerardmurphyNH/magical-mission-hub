import { createContext, useContext, useState, ReactNode } from "react";

interface VirtueContextType {
  virtue: string | null;
  setVirtue: (virtue: string | null) => void;
}

const VirtueContext = createContext<VirtueContextType | undefined>(undefined);

export const VirtueProvider = ({ children }: { children: ReactNode }) => {
  const [virtue, setVirtue] = useState<string | null>(null);

  return (
    <VirtueContext.Provider value={{ virtue, setVirtue }}>
      {children}
    </VirtueContext.Provider>
  );
};

export const useVirtue = (): VirtueContextType => {
  const context = useContext(VirtueContext);
  if (context === undefined) {
    throw new Error("useVirtue must be used within a VirtueProvider");
  }
  return context;
};
