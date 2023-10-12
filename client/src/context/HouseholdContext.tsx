import { createContext, useContext, useState, ReactNode } from "react";

type HouseholdData = {
  id: number;
  name: string;
};

type HouseholdContextType = {
  householdData: HouseholdData | null;
  setHouseholdData: (data: HouseholdData | null) => void;
};

const HouseholdContext = createContext<HouseholdContextType | undefined>(
  undefined
);

export function useHousehold() {
  const context = useContext(HouseholdContext);
  if (!context) {
    throw new Error("useHousehold must be used within a HouseholdProvider");
  }
  return context;
}

type HouseholdProviderProps = {
  children: ReactNode;
};

export function HouseholdProvider({ children }: HouseholdProviderProps) {
  const [householdData, setHouseholdData] = useState<HouseholdData | null>(
    null
  );

  return (
    <HouseholdContext.Provider value={{ householdData, setHouseholdData }}>
      {children}
    </HouseholdContext.Provider>
  );
}
