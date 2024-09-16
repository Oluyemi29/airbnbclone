"use client";
import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
// import { Select, SelectItem } from "@nextui-org/react";
import { Search } from "lucide-react";
import { Countries } from "@/app/create/[id]/_components/GetCountries";
import HomeMap from "./HomeMap";
import { Animals } from "@/app/create/[id]/_components/Data";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { Button } from "./ui/button";
import { SubmitButton } from "@/app/create/[id]/_components/SubmitButton";
import { Card, CardHeader } from "./ui/card";
import Counter from "@/app/create/[id]/_components/Counter";

const SearchComponent = () => {
  const [guestCount, setGuestCount] = useState<number>(0);
  const [bathCount, setBathCount] = useState<number>(0);
  const [bedCount, setBedCount] = useState<number>(0);
  const [step, setStep] = useState(1);
  const [locationValue, setLocationValue] = useState("");
  const getCont = Countries();
  const SubmitLocalButton = () => {
    if (step === 1) {
      return (
        <Button
          onClick={() => {
            setStep(step + 1);
          }}
        >
          Next
        </Button>
      );
    } else if (step === 2) {
      return <SubmitButton />;
    }
  };
  return (
    <div>
      <Dialog>
        <DialogTrigger asChild>
          <div className="rounded-full py-2 px-5 border flex items-center cursor-pointer">
            <div className="flex h-full divide-x font-medium">
              <p className="px-4">Anywhere</p>
              <p className="px-4">Any Week</p>
              <p className="px-4">Any Guest</p>
            </div>
            <Search className="bg-primary text-white p-1 h-8 w-8 rounded-full" />
          </div>
        </DialogTrigger>
        <DialogContent className="sm:max-[425px]">
          <div>
            <form action="">
              {step === 1 ? (
                <>
                  <DialogHeader>
                    <DialogTitle>Select a Country</DialogTitle>
                    <DialogDescription>
                      Please Choose a country that you want
                    </DialogDescription>
                    <Select
                      onValueChange={(item) => {
                        console.log(item);
                        setLocationValue(item);
                      }}
                    >
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select a Country" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          <SelectLabel>Countries</SelectLabel>
                          {getCont.map((AllCountry) => {
                            return (
                              <SelectItem
                                key={AllCountry.name}
                                value={AllCountry.name}
                              >{`${AllCountry.flag} ${AllCountry.name} / ${AllCountry.region}`}</SelectItem>
                            );
                          })}
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                    <HomeMap locationValue={locationValue} />
                  </DialogHeader>
                </>
              ) : (
                <div className="mb-14">
                  <DialogHeader>
                    <DialogTitle>Select all info needed</DialogTitle>
                    <Card className="my-2">
                      <CardHeader className="">
                        <div className="flex flex-row gap-3 justify-between items-center text-[0.8rem]">
                          <Counter
                            guestCount={guestCount}
                            setGuestCount={setGuestCount}
                            bedCount={bedCount}
                            setBedCount={setBedCount}
                            bathCount={bathCount}
                            setBathCount={setBathCount}
                          />
                        </div>
                      </CardHeader>
                    </Card>
                  </DialogHeader>
                </div>
              )}
              <DialogFooter>
                <SubmitLocalButton />
              </DialogFooter>
            </form>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default SearchComponent;
