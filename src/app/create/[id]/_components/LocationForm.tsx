"use client";
import React, { useState } from "react";
import { Select, SelectItem } from "@nextui-org/react";
import { Animals } from "./Data";
import { Countries } from "./GetCountries";
import dynamic from "next/dynamic";
import { Skeleton } from "@/components/ui/skeleton";
import { useParams, usePathname, useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { createLocation } from "@/app/Action/action";
import toast from "react-hot-toast";
import { SubmitButton } from "./SubmitButton";

const LocationForm = () => {
  const router = useRouter();
  const [locationValue, setLocationValue] = useState("");
  const params = useParams();
  const id = params.id as string;
  console.log(id);

  const getCont = Countries();
  const LazyMap = dynamic(() => import("@/components/Map"), {
    ssr: false,
    loading: () => {
      return <Skeleton className="h-[50vh] w-full" />;
    },
  });

  const { handleSubmit } = useForm();

  const submit = async () => {
    try {
      await createLocation({ id, locationValue });
      toast.success("Location create successfully");
      router.push("/");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <form action="" method="post" onSubmit={handleSubmit(submit)}>
        <div className="flex flex-col justify-center items-center">
          <div className="md:w-[40%] w-full">
            <Select
              label="Select a Country"
              onChange={(e: any) => {
                setLocationValue(e.target.value);
              }}
              className="w-full"
            >
              {getCont.map((county, index) => (
                <SelectItem
                  key={county.name}
                  value={county.name}
                >{`${county.flag} ${county.name} - ${county.region}`}</SelectItem>
              ))}
            </Select>
          </div>
          <div className="mt-5 w-full md:w-[40%]">
            <LazyMap locationValue={locationValue} />
          </div>
        </div>
        <SubmitButton />
      </form>
    </div>
  );
};

export default LocationForm;
