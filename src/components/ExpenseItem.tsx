"use client";

import { useEffect, useState } from "react";

const ExpenseItem = ({
  date,
  name,
  amount,
  selectAllChecked,
  selectExpense,
  deselectExpense,
}: {
  date: Date;
  name: string;
  amount: number;
  selectAllChecked: boolean;
  selectExpense: () => void;
  deselectExpense: () => void;
}) => {
  const [isChecked, setIsChecked] = useState(selectAllChecked);

  useEffect(() => {
    setIsChecked(selectAllChecked);
  }, [selectAllChecked]);

  return (
    <div className="grid grid-cols-[1fr_4fr_5fr_3fr_1fr] items-center gap-2 rounded p-3 font-bold">
      <input
        type="checkbox"
        className="h-5"
        checked={isChecked}
        onChange={() => {
          const nextChecked = !isChecked;
          setIsChecked(nextChecked);
          if (nextChecked) {
            selectExpense();
          } else {
            deselectExpense();
          }
        }}
      />
      <p>
        {`${date.getDate().toString().padStart(2, "0")}-${(date.getMonth() + 1)
          .toString()
          .padStart(2, "0")}-${date.getFullYear()}`}{" "}
        <span className="text-gray-600">{`${date
          .getHours()
          .toString()
          .padStart(
            2,
            "0",
          )}:${date.getMinutes().toString().padStart(2, "0")}`}</span>
      </p>
      <p>{name}</p>
      <p>{amount} VND</p>
      <button className="h-9 w-16 cursor-pointer rounded-md bg-emerald-500 py-1 text-white transition hover:bg-emerald-600">
        Edit
      </button>
    </div>
  );
};

export default ExpenseItem;
