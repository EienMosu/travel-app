import { createContext, useContext, ReactNode, useState } from "react";

export interface TravelData {
  cityOfOrigin: string;
  destination: string;
  intermediateCities: string[];
  date: Date;
  passengers: number;
}

interface TravelContextProps {
  travelData: TravelData | null;
  setTravelData: (data: TravelData) => void;
}

const TravelDataContext = createContext<TravelContextProps | undefined>(undefined);

export const useTravelData = () => {
  const context = useContext(TravelDataContext);
  if (!context) {
    throw new Error("TravelDataProvider error");
  }
  return context;
};

interface ProviderProps {
  children: ReactNode;
}

export const TravelDataProvider: React.FC<ProviderProps> = ({ children }) => {
  const [travelData, setTravelData] = useState<TravelData | null>(null);

  return (
    <TravelDataContext.Provider value={{ travelData, setTravelData }}>
      {children}
    </TravelDataContext.Provider>
  );
};
