import React, { createContext, useContext, useState } from "react";
import type { Meal } from "../types/meal";

type Ctx = {
  list: Meal[];
  setList: (arr: Meal[]) => void;
};

const SelectionContext = createContext<Ctx | null>(null);

export const SelectionProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [list, setList] = useState<Meal[]>([]);
  return (
    <SelectionContext.Provider value={{ list, setList }}>
      {children}
    </SelectionContext.Provider>
  );
};

export function useSelection() {
  const ctx = useContext(SelectionContext);
  if (!ctx) throw new Error("useSelection must be used inside provider");
  return ctx;
}
