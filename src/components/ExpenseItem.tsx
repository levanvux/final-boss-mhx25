"use client";

const ExpenseItem = ({
  date,
  name,
  amount,
}: {
  date: Date;
  name: string;
  amount: number;
}) => {
  return (
    <div className="grid grid-cols-[1fr_4fr_5fr_3fr_1fr] items-center gap-2 rounded p-3 font-bold">
      <input type="checkbox" className="h-5" />
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
