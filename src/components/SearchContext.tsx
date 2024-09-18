"use client";
import React, { createContext, useState } from "react";

interface countProps {
  guestCount: number;
  setGuestCount(): void;
  bedCount: number;
  setBedCount(): void;
  bathCount: number;
  setBathCount(): void;
  locationValue:string
}
export const SearchingContext  = createContext({});
const SearchContext = ({ children }: any) => {
  const [guestCount, setGuestCount] = useState<number>(0);
  const [bathCount, setBathCount] = useState<number>(0);
  const [bedCount, setBedCount] = useState<number>(0);
  const [locationValue, setLocationValue] = useState('');
  
  return (
    <SearchingContext.Provider
      value={
        {
          guestCount,
          bathCount,
          bedCount,
          setGuestCount,
          setBathCount,
          setBedCount,
          locationValue,
          setLocationValue
        } as any
      }
    >
      {children}
    </SearchingContext.Provider>
  );
};

export default SearchContext;
