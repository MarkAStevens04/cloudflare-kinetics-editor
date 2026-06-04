import React, { createContext, useContext, useState } from "react";
import { DEFAULT_ALIASES } from "../config/wordAliases";

// Shape of our context
type AliasMap = Record<string, string>;

interface AliasContextType {
  aliases: AliasMap;
  updateAlias: (key: string, value: string) => void;
  resetAliases: () => void;
}

const AliasContext = createContext<AliasContextType | undefined>(undefined);

// Provider — wrap your app with this
export function AliasProvider({ children }: { children: React.ReactNode }) {
  const [aliases, setAliases] = useState<AliasMap>(() => {
    // Load from localStorage if previously saved
    const saved = localStorage.getItem("wordAliases");
    return saved ? JSON.parse(saved) : DEFAULT_ALIASES;
  });

  const updateAlias = (key: string, value: string) => {
    const updated = { ...aliases, [key]: value };
    setAliases(updated);
    localStorage.setItem("wordAliases", JSON.stringify(updated));
  };

  const resetAliases = () => {
    setAliases(DEFAULT_ALIASES);
    localStorage.removeItem("wordAliases");
  };

  return (
    <AliasContext.Provider value={{ aliases, updateAlias, resetAliases }}>
      {children}
    </AliasContext.Provider>
  );
}

// Custom hook — use this anywhere in the app
export function useAliases() {
  const ctx = useContext(AliasContext);
  if (!ctx) throw new Error("useAliases must be used inside AliasProvider");
  return ctx;
}
