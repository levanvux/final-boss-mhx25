"use client";

import { useEffect, useState } from "react";
import Modal from "./Modal";
import ExpenseForm from "./ExpenseForm";

const ExpenseItem = ({
  date,
  name,
  amount,
  selectAllChecked,
  selectExpense,
  deselectExpense,
  updateExpense,
}: {
  date: Date;
  name: string;
  amount: number;
  selectAllChecked: boolean;
  selectExpense: () => void;
  deselectExpense: () => void;
  updateExpense: (name: string, amount: string, date: Date) => boolean;
}) => {
  // const [expenseName, setExpenseName] = useState(name);
  // const [expenseAmount, setExpenseAmount] = useState(amount.toString());
  // const [expenseDate, setExpenseDate] = useState(getLocalDate(date));

  const [isChecked, setIsChecked] = useState(selectAllChecked);

  useEffect(() => {
    setIsChecked(selectAllChecked);
  }, [selectAllChecked]);

  return (
    <div
      className="grid grid-cols-[1fr_4fr_5fr_3fr_1fr] items-center gap-2 rounded p-3 font-bold"
      onClick={() => setIsChecked(!isChecked)}
    >
      <input
        type="checkbox"
        className="h-5 cursor-pointer"
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
      <Modal
        trigger={
          <button className="h-9 w-16 cursor-pointer rounded-md bg-emerald-500 py-1 text-white transition hover:bg-emerald-600">
            Edit
          </button>
        }
      >
        {(closeModal) => (
          <ExpenseForm
            title="Sửa Chi Tiêu"
            action="Hoàn Tất"
            updateExpense={updateExpense}
            closeModal={closeModal}
          />
        )}
      </Modal>
    </div>
  );
};

export default ExpenseItem;

// <input
//               type="text"
//               placeholder="Tên chi tiêu"
//               className="input-border"
//               value={expenseName}
//               onChange={(e) => setExpenseName(e.target.value)}
//             />
//             <input
//               type="number"
//               placeholder="Số tiền VND"
//               className="input-border"
//               value={expenseAmount}
//               onChange={(e) => setExpenseAmount(e.target.value)}
//             />
//             <input
//               type="datetime-local"
//               className="input-border dark:text-gray-300"
//               value={expenseDate.toISOString().slice(0, 16)}
//               onChange={(e) =>
//                 setExpenseDate(getLocalDate(new Date(e.target.value)))
//               }
//             />
//             <button className="cursor-pointer rounded bg-emerald-500 p-2 font-bold text-white transition hover:bg-emerald-600">
//               Hoàn tất
//             </button>
