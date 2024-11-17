import { createContext, useContext, useState } from "react";

const TipContext = createContext();

export const TipProvider = ({ children }) => {
  const [tipData, setTipData] = useState({});

  return (
    <TipContext.Provider value={{ tipData, setTipData }}>
      {children}
    </TipContext.Provider>
  );
};
export const useTipContext = () => useContext(TipContext);