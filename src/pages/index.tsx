import Head from "next/head";
import { api } from "~/utils/api";
import { useEffect, useState } from "react";
import { useUser } from "@clerk/nextjs";
import { Button } from "~/components/ui/button";
import { useRouter } from "next/router";

export default function Home() {
  return (
    <>
      <Head>
        <title>YearInReview - Home</title>
        <meta
          name="description"
          content="YearInReview - A web-app for tracking your year"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <h1>Home</h1>
      <Calendar />
    </>
  );
}

const monthNames = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

const getColour = () => {
  // random choice from red-400, yellow-400, green-400
  const colours = ["red", "yellow", "green, purple, blue"];
  const c = colours[Math.floor(Math.random() * colours.length)];
  return c;
};

interface DayBoxProps {
  date: Date;
  onClick: (date: Date) => void;
  isSelected: boolean;
}

const DayBox = (props: DayBoxProps) => {
  const { date, onClick, isSelected } = props;
  const isToday = new Date().toDateString() === date.toDateString();
  return (
    <div
      className={`min-w-15 w-15 min-h-15 h-15 flex cursor-pointer flex-col border px-2 py-3 md:w-24 md:p-4 ${isToday ? "border-gray-500 dark:border-red-500" : "border-gray-200"} ${isSelected ? "bg-green-200" : "bg-transparent"} flex-shrink-0`}
      onClick={() => onClick(date)}
    >
      <p className="text-xs font-medium text-green-800 md:text-base">
        {new Date(date).toLocaleDateString("en-GB", {
          day: "numeric",
        })}
      </p>
    </div>
  );
};

const Calendar = () => {
  const router = useRouter();
  const today = new Date();
  const [date, setDate] = useState<{ month: number; year: number }>({
    month: today.getMonth(),
    year: today.getFullYear(),
  });
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  const handleDayClick = (date: Date) => {
    if (
      selectedDate !== null &&
      selectedDate.toDateString() === date.toDateString()
    ) {
      setSelectedDate(null);
    } else {
      setSelectedDate(date);
    }
  };

  const handlePrevMonth = () => {
    setDate(({ month, year }) => {
      if (month === 0) {
        // If January, decrement the year
        return { month: 11, year: year - 1 }; // Set to December of the previous year
      } else {
        return { month: month - 1, year }; // Just decrement the month
      }
    });
  };

  const handleNextMonth = () => {
    setDate(({ month, year }) => {
      if (month === 11) {
        // If December, increment the year
        return { month: 0, year: year + 1 }; // Set to January of the next year
      } else {
        return { month: month + 1, year }; // Just increment the month
      }
    });
  };

  const handleCurrentMonth = () => {
    const today = new Date();
    setDate({ month: today.getMonth(), year: today.getFullYear() });
  };

  const daysInMonth = new Date(date.year, date.month + 1, 0).getDate();
  const firstDayOfMonth = new Date(date.year, date.month, 1).getDay();

  return (
    <div className=" flex min-w-80 max-w-full flex-col items-center justify-center rounded-lg border border-green-200 p-3 md:max-w-[750px]">
      <div className="mb-4 flex w-full items-center justify-stretch">
        <h2 className="my-4 text-xl font-semibold text-green-600">
          {monthNames[date.month]} {date.year}
        </h2>
        <div className="ml-auto flex gap-1">
          <Button
            onClick={handlePrevMonth}
            className="rounded border text-xs shadow-md md:text-sm"
            variant={"ghost"}
          >
            Prev
          </Button>
          <div>
            <Button
              onClick={handleCurrentMonth}
              className="rounded border text-xs shadow-md md:text-sm"
              variant={"ghost"}
            >
              Today
            </Button>
          </div>
          <Button
            onClick={handleNextMonth}
            className="rounded border text-xs shadow-md md:text-sm"
            variant={"ghost"}
          >
            Next
          </Button>
        </div>
      </div>
      <div className="grid grid-cols-7 gap-1">
        {dayNames.map((dayName) => (
          <div key={dayName} className="p-4 text-center">
            {dayName}
          </div>
        ))}
        {Array.from({ length: firstDayOfMonth }, (_, i) => (
          <div
            key={`placeholder-${i}`}
            className="border border-transparent p-1 md:p-4"
          ></div>
        ))}
        {Array.from({ length: daysInMonth }, (_, i) => {
          const dayDate = new Date(date.year, date.month, i + 1);
          return (
            <DayBox
              key={i}
              date={dayDate}
              onClick={handleDayClick}
              isSelected={
                selectedDate !== null &&
                selectedDate.toDateString() === dayDate.toDateString()
              }
            />
          );
        })}
      </div>
      {selectedDate && (
        <div className="mt-4 flex flex-col gap-2 border border-gray-200 p-4">
          <p>
            Selected Date:{" "}
            {new Date(selectedDate).toLocaleDateString("en-GB", {
              year: "2-digit",
              month: "2-digit",
              day: "2-digit",
            })}
          </p>
          <Button
            variant="outline"
            onClick={() =>
              router.push(
                "/days?date=" +
                  new Date(selectedDate).toLocaleDateString("en-GB", {
                    year: "2-digit",
                    month: "2-digit",
                    day: "2-digit",
                  }),
              )
            }
          >
            Add day details
          </Button>
        </div>
      )}
    </div>
  );
};
