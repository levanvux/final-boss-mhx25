"use client";

import { useState } from "react";
import { getLocalDate } from "@/utils/helpers";

const ExpenseForm = ({
  title,
  action,
  expenseId,
  initialExpenseName,
  initialExpenseAmount,
  initialExpenseDate,
  updateExpense,
  closeForm,
}: {
  title: string;
  action: string;
  expenseId?: number;
  initialExpenseName?: string;
  initialExpenseAmount?: string;
  initialExpenseDate?: Date;
  updateExpense: (
    name: string,
    amount: string,
    date: Date,
    id?: number,
  ) => boolean;
  closeForm?: () => void;
}) => {
  const [expenseName, setExpenseName] = useState(initialExpenseName ?? "");
  const [expenseAmount, setExpenseAmount] = useState(
    initialExpenseAmount ?? "",
  );
  const [expenseDate, setExpenseDate] = useState(
    getLocalDate(initialExpenseDate),
  );

  return (
    <>
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
            if (
              updateExpense(
                expenseName.trim(),
                expenseAmount,
                expenseDate,
                expenseId,
              )
            ) {
              setExpenseName("");
              setExpenseAmount("");
              if (closeForm) closeForm();
            }
          }}
        >
          {action}
        </button>
      </div>
    </>
  );
};

export default ExpenseForm;
