"use client";
import { getLocalDate } from "@/app/page";
import { useState } from "react";
import { toast } from "react-hot-toast";

const ExpenseForm = ({
  addExpense,
}: {
  addExpense: (name: string, amount: number, date: Date) => void;
}) => {
  const [expenseName, setExpenseName] = useState("");
  const [expenseAmount, setExpenseAmount] = useState("");
  const [expenseDate, setExpenseDate] = useState(getLocalDate());
  return (
    <div className="container-border h-80">
      <h1 className="text-2xl font-bold">Thêm Chi Tiêu</h1>
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
            if (expenseName.trim() === "" || expenseAmount.trim() === "") {
              toast.error(
                "Vui lòng nhập đủ tên chi tiêu và số tiền. Số tiền phải là một số hợp lệ.",
              );
            } else {
              const expenseAmountNum = parseFloat(expenseAmount);
              if (expenseAmountNum < 0) {
                toast.error("Số tiền không thể âm.");
                return;
              }
              addExpense(expenseName.trim(), expenseAmountNum, expenseDate);
              setExpenseName("");
              setExpenseAmount("");
              toast.success("Đã thêm chi tiêu.");
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
