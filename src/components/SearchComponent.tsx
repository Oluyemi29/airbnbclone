"use client";
import React, { useContext, useState } from "react";
import {
  Dialog,
  DialogClose,
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
import { useForm } from "react-hook-form";
import { serchCompo } from "@/app/Action/action";
import { useRouter } from "next/navigation";
import { any } from "zod";
import { SearchingContext } from "./SearchContext";

type searchProps = {
  guestCount: number;
  bathCount: number;
  bedCount: number;
  setGuestCount: any;
  setBathCount: any;
  setBedCount: any;
  locationValue: any;
  setLocationValue: any;
};

const SearchComponent = () => {
  const AllSearch = useContext<searchProps>(SearchingContext as any);
  const {
    guestCount,
    bathCount,
    bedCount,
    setGuestCount,
    setBathCount,
    setBedCount,
    locationValue,
    setLocationValue,
  } = AllSearch;

  // const guestCount = AllSearch.guestCount as number;
  // const bedCount = AllSearch.bedCount as number;
  // const bathCount = AllSearch.bathCount as number;
  // const setGuestCount = AllSearch?.setGuestCount();
  // const setBathCount = AllSearch?.setBathCount();
  // const setBedCount = AllSearch?.setBedCount();

  const [step, setStep] = useState(1);
  const [hideModal, setHideModal] = useState(false);
  const getCont = Countries();
  const { handleSubmit } = useForm();
  const router = useRouter();
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
  const submit = async () => {
    // await serchCompo({ locationValue, guestCount, bedCount, bathCount });
    setHideModal(false);
    setStep(1);
    router.push(
      `/?${locationValue && `country=${locationValue}`}&${
        guestCount > 0 && `guest=${guestCount}`
      }&${bedCount > 0 && `bedroom=${bedCount}`}&${
        bathCount > 0 && `bathroom=${bathCount}`
      }`
    );
    // router.push(
    //   `/?country=${locationValue ?? undefined}&guest=${
    //     guestCount > 0 ? guestCount : undefined
    //   }&bedroom=${bedCount > 0 ? bedCount : undefined}&bathroom=${
    //     bathCount > 0 ? bathCount : undefined
    //   }`
    // );
  };

  return (
    <div>
      <Dialog open={hideModal} onOpenChange={() => setHideModal(!hideModal)}>
        <DialogTrigger asChild>
          <div className="rounded-full w-max py-2 px-5 border flex items-center cursor-pointer">
            <div className="md:flex hidden h-full divide-x font-medium">
              <p className="px-4">Anywhere</p>
              <p className="px-4">Any Week</p>
              <p className="px-4">Any Guest</p>
            </div>
            <Search className="bg-primary text-white p-1 h-8 w-8 rounded-full" />
          </div>
        </DialogTrigger>
        <>
          <DialogContent className="sm:max-[425px]">
            <div>
              <form action="" onSubmit={handleSubmit(submit)} method="post">
                {step === 1 ? (
                  <>
                    <DialogHeader>
                      {/* <DialogClose asChild>Close me jooor</DialogClose> */}
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
        </>
      </Dialog>
    </div>
  );
};

export default SearchComponent;
