"use client";
import "react-date-range/dist/styles.css"; // main style file
import "react-date-range/dist/theme/default.css"; // theme css file
import React, { useState } from "react";
import { DateRange } from "react-date-range";
import { Button } from "./ui/button";
import Link from "next/link";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { createReservation } from "@/app/Action/action";
import { eachDayOfInterval } from "date-fns";

type needIDProps = {
  userId: string;
  homeId: string;
  reservation: {
    startDate: Date;
    endDate: Date;
  }[];
};

const SelectCalender = ({ homeId, userId, reservation }: needIDProps) => {
  const [state, setState] = useState<any>({
    startDate: new Date(),
    endDate: new Date(),
    key: "selection",
  });

  const { handleSubmit } = useForm();
  const submit = async () => {
    const startDate = state?.startDate.toISOString();
    const endDate = state?.endDate.toISOString();

    await createReservation({ userId, homeId, startDate, endDate });
  };
  let disableDates: Date[] = [];
  reservation?.forEach((reservationItem) => {
    const dateRanges = eachDayOfInterval({
      start: new Date(reservationItem.startDate),
      end: new Date(reservationItem.endDate),
    });
    disableDates = [...disableDates, ...dateRanges];
  });
  return (
    <form onSubmit={handleSubmit(submit)} action="" method="post">
      <DateRange
        date={new Date()}
        showDateDisplay={false}
        rangeColors={["#ff5A5F"]}
        ranges={[state]}
        onChange={(item) => {
          setState(item.selection as any);
        }}
        minDate={new Date()}
        direction="vertical"
        disabledDates={disableDates}
      />
      {userId ? (
        <div>
          <Button className="w-full" type="submit">
            Make a Reservation
          </Button>
        </div>
      ) : (
        <Link href={"/api/auth/creation"}>
          <Button type="button">Make A Reservation</Button>
        </Link>
      )}
    </form>
  );
};

export default SelectCalender;
