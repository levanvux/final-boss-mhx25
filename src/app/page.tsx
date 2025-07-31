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
  const realDate: Date = typeof date === "string" ? new Date(date) : date;
  return new Date(realDate.getTime() - realDate.getTimezoneOffset() * 60000);
};

export const normalizeText = (text: string) => {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/đ/g, "d")
    .replace(/Đ/g, "d")
    .replace(/\s+/g, " ")
    .trim();
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

  const [filteredExpenses, setFilteredExpenses] = useState<Expense[]>(expenses);

  useEffect(() => {
    const saved = localStorage.getItem("expenses");
    if (saved) {
      setExpenses(JSON.parse(saved));
    }
  }, []);

  useEffect(() => {
    setFilteredExpenses(expenses);
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
    const realNewDate: Date = typeof date === "string" ? new Date(date) : date;
    let addPosition: number = 0;
    for (const expense of expenses) {
      const realExpenseDate: Date =
        expense.date instanceof Date ? expense.date : new Date(expense.date);

      if (realExpenseDate.getTime() > realNewDate.getTime()) {
        addPosition = expenses.indexOf(expense) + 1;
      }
    }
    const newExpenses: Expense[] = [...expenses];
    newExpenses.splice(addPosition, 0, {
      id: expenses.length + 1,
      name,
      amount,
      date: new Date(
        (typeof realNewDate === "string"
          ? new Date(realNewDate).getTime()
          : realNewDate.getTime()) +
          (typeof realNewDate === "string"
            ? new Date(realNewDate).getTimezoneOffset()
            : realNewDate.getTimezoneOffset()) *
            60000,
      ),
    });
    setExpenses(newExpenses);
  };

  const [selectedExpenses, setSelectedExpenses] = useState<number[]>([]);

  const selectExpense = (id: number) => {
    setSelectedExpenses((prev) => [...prev, id]);
  };

  const deselectExpense = (id: number) => {
    setSelectedExpenses((prev) => prev.filter((expenseId) => expenseId !== id));
  };

  const deleteSelectedExpenses = () => {
    const newExpenses: Expense[] = expenses.filter(
      (expense) => !selectedExpenses.includes(expense.id),
    );
    setExpenses(newExpenses);
  };

  return (
    <div className="grid min-h-screen justify-items-center p-20 font-sans sm:p-28">
      <main className="grid w-full max-w-screen-xl grid-cols-[4.5fr_11fr_4fr] items-start gap-8">
        <ExpenseForm addExpense={addExpense} />
        <ExpenseList
          expenses={expenses}
          deleteExpense={deleteSelectedExpenses}
          selectExpense={selectExpense}
          deselectExpense={deselectExpense}
          totalSelected={selectedExpenses.length}
        />
        <ExpenseSummary total={total} />
        <button onClick={() => localStorage.clear()}>:D</button>
      </main>
    </div>
  );
}
