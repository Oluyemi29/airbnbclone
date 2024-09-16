"use client";
import { Button } from "@/components/ui/button";
import { Minus, Plus } from "lucide-react";
import React, { useState } from "react";

interface countProps {
  guestCount: number;
  setGuestCount: any;
  bedCount: number;
  setBedCount: any;
  bathCount: number;
  setBathCount: any;
}

const Counter = ({
  guestCount,
  setGuestCount,
  bathCount,
  bedCount,
  setBathCount,
  setBedCount,
}: countProps) => {
  const Guestincrement = () => {
    setGuestCount(guestCount + 1);
  };
  const Guestdecrement = () => {
    setGuestCount(guestCount < 1 ? 0 : guestCount - 1);
  };
  const Bedincrement = () => {
    setBedCount(bedCount + 1);
  };
  const Beddecrement = () => {
    setBedCount(bedCount < 1 ? 0 : bedCount - 1);
  };
  const Bathincrement = () => {
    setBathCount(bathCount + 1);
  };
  const Bathdecrement = () => {
    setBathCount(bathCount < 1 ? 0 : bathCount - 1);
  };
  return (
    <div className="flex flex-col gap-2">
      <div className="flex justify-between gap-2 items-center">
        <div>
          <h1 className="underline underline-offset-1">Room</h1>
          <p>How many Rooms do u want</p>
        </div>
        <div className="flex items-center justify-center gap-2">
          <Button
            type="button"
            onClick={Guestdecrement}
            className="bg-transparent hover:bg-transparent border-2 border-default"
          >
            <Minus className="text-primary" size={15} />
          </Button>
          <p>{guestCount}</p>
          <Button
            type="button"
            onClick={Guestincrement}
            className="bg-transparent hover:bg-transparent border-2 border-default"
          >
            <Plus className="text-primary" size={15} />
          </Button>
        </div>
      </div>
      <div className="flex justify-between gap-2 items-center">
        <div>
          <h1 className="underline underline-offset-1">Bedrooms</h1>
          <p>How many Bedrooms do u want</p>
        </div>
        <div className="flex items-center justify-center gap-2">
          <Button
            type="button"
            onClick={Beddecrement}
            className="bg-transparent hover:bg-transparent border-2 border-default"
          >
            <Minus className="text-primary" size={15} />
          </Button>
          <p>{bedCount}</p>
          <Button
            type="button"
            onClick={Bedincrement}
            className="bg-transparent hover:bg-transparent border-2 border-default"
          >
            <Plus className="text-primary" size={15} />
          </Button>
        </div>
      </div>
      <div className="flex justify-between gap-2 items-center">
        <div>
          <h1 className="underline underline-offset-1">Bathrooms</h1>
          <p>How many Bathrooms do u want</p>
        </div>
        <div className="flex items-center justify-center gap-2">
          <Button
            type="button"
            onClick={Bathdecrement}
            className="bg-transparent hover:bg-transparent border-2 border-default"
          >
            <Minus className="text-primary" size={15} />
          </Button>
          <p>{bathCount}</p>
          <Button
            type="button"
            onClick={Bathincrement}
            className="bg-transparent hover:bg-transparent border-2 border-default"
          >
            <Plus className="text-primary" size={15} />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Counter;
