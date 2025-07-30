"use client";
import ExpenseForm from "@/components/ExpenseForm";
import ExpenseList from "@/components/ExpenseList";
import ExpenseSummary from "@/components/ExpenseSummary";
import { useState, useEffect, useMemo } from "react";

export type Expense = {
  id: number;
  name: string;
  amount: number;
  date: Date;
};

// ham nhan 1 date va tra ve date da chuyen doi sang timezone cua nguoi dung
export const getLocalDate = (date: Date | string = new Date()) => {
  const realDate = typeof date === "string" ? new Date(date) : date;
  return new Date(realDate.getTime() - realDate.getTimezoneOffset() * 60000);
};

export default function Home() {
  const [expenses, setExpenses] = useState<Expense[]>([
    {
      id: 1,
      name: "Mua bút chì",
      amount: 4000,
      date: new Date("2025-07-28T17:08:03.763Z"),
    },
    {
      id: 2,
      name: "Ăn cơm sườn gà ba chỉ 2 trứng tại quán Ngô Quyền cổng A UIT",
      amount: 50000,
      date: new Date("2025-07-28T17:08:03.763Z"),
    },
    {
      id: 3,
      name: "Uống nước mía socola",
      amount: 10000,
      date: new Date("2025-07-28T17:08:03.763Z"),
    },
  ]);

  useEffect(() => {
    const saved = localStorage.getItem("expenses");
    if (saved) {
      setExpenses(JSON.parse(saved));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("expenses", JSON.stringify(expenses));
  }, [expenses]);

  const total = useMemo(() => {
    return expenses.reduce((acc, expense) => acc + expense.amount, 0);
  }, [expenses]);

  const addExpense = (
    name: string,
    amount: number,
    date: Date = new Date(),
  ) => {
    setExpenses([
      {
        id: Math.trunc(Math.random() * 1000000),
        name: name,
        amount: amount,
        date,
      },
      ...expenses,
    ]);
  };

  return (
    <div className="grid min-h-screen justify-items-center p-20 font-sans sm:p-28">
      <main className="grid w-full max-w-screen-xl grid-cols-[10fr_21fr_9fr] items-start gap-8">
        <ExpenseForm addExpense={addExpense} />
        <ExpenseList expenses={expenses} />
        <ExpenseSummary total={total} />
        <button onClick={() => localStorage.clear()}>QWEWEW</button>
      </main>
    </div>
  );
}
