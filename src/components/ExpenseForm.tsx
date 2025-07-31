"use client";
import { getLocalDate } from "@/app/page";
import { useState } from "react";

const ExpenseForm = ({
  title,
  addExpense,
}: {
  title: string;
  addExpense: (name: string, amount: string, date: Date) => boolean;
}) => {
  const [expenseName, setExpenseName] = useState("");
  const [expenseAmount, setExpenseAmount] = useState("");
  const [expenseDate, setExpenseDate] = useState(getLocalDate());
  return (
    <div className="container-border h-80">
      <h1 className="text-2xl font-bold">{title}</h1>
      <div className="mt-4 flex flex-col gap-4">
        <input
          type="text"
          placeholder="Tên chi tiêu"
          className="input-border"
          value={expenseName}
          onChange={(e) => setExpenseName(e.target.value)}
        />
        <input
          type="number"
          placeholder="Số tiền VND"
          className="input-border"
          value={expenseAmount}
          onChange={(e) => setExpenseAmount(e.target.value)}
        />
        <input
          type="datetime-local"
          className="input-border dark:text-gray-300"
          value={expenseDate.toISOString().slice(0, 16)}
          onChange={(e) =>
            setExpenseDate(getLocalDate(new Date(e.target.value)))
          }
        />
        <button
          className="cursor-pointer rounded bg-blue-500 p-2 text-white transition hover:bg-blue-600"
          onClick={() => {
            if (addExpense(expenseName.trim(), expenseAmount, expenseDate)) {
              setExpenseName("");
              setExpenseAmount("");
            }
          }}
        >
          Thêm Chi Tiêu
        </button>
      </div>
    </div>
  );
};

export default ExpenseForm;
