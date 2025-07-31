"use client";
import ExpenseForm from "@/components/ExpenseForm";
import ExpenseList from "@/components/ExpenseList";
import ExpenseSummary from "@/components/ExpenseSummary";
import { Expense } from "@/utils/types";
import { useState, useEffect, useMemo } from "react";
import { useDebounce } from "use-debounce";
import toast from "react-hot-toast";
import { normalizeText } from "@/utils/helpers";

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

  const updateExpense = (
    name: string,
    amount: string,
    date: Date = new Date(),
    id?: number,
  ) => {
    if (name.trim() === "" || amount.trim() === "") {
      toast.error(
        "Vui lòng nhập đủ tên chi tiêu và số tiền. Số tiền phải là một số hợp lệ.",
      );
      return false;
    } else {
      const expenseAmount: number = parseFloat(amount);
      if (expenseAmount < 0) {
        toast.error("Số tiền không thể âm.");
        return false;
      }
      const expenseId = id ?? Math.trunc(Math.random() * 1000000);
      const realNewDate: Date = new Date(date);
      const newExpense = {
        id: expenseId,
        name,
        amount: expenseAmount,
        date: new Date(
          realNewDate.getTime() + realNewDate.getTimezoneOffset() * 60000,
        ),
      };

      let expenseExits: boolean = false;
      setExpenses((prev) => {
        expenseExits = prev.some((expense) => expense.id === expenseId);
        if (expenseExits) {
          return prev.map((expense) =>
            expense.id === expenseId ? newExpense : expense,
          );
        } else {
          let addPosition: number = 0;
          for (const expense of prev) {
            const realExpenseDate: Date = new Date(expense.date);

            if (realExpenseDate.getTime() > realNewDate.getTime()) {
              addPosition = expenses.indexOf(expense) + 1;
            }
          }

          const newExpenses: Expense[] = [...prev];
          newExpenses.splice(addPosition, 0, newExpense);
          return newExpenses;
        }
      });
      toast.success(`Đã ${expenseExits ? "sửa" : "thêm"} chi tiêu.`);
      return true;
    }
  };

  const [selectedExpenses, setSelectedExpenses] = useState<number[]>([]);

  const selectExpense = (id: number) => {
    setSelectedExpenses((prev) => [...prev, id]);
  };
  const selectAllExpenses = () => {
    setSelectedExpenses(expenses.map((expense) => expense.id));
  };

  const deselectExpense = (id: number) => {
    setSelectedExpenses((prev) => prev.filter((expenseId) => expenseId !== id));
  };

  const deselectAllExpenses = () => {
    setSelectedExpenses([]);
  };

  const deleteSelectedExpenses = () => {
    const newExpenses: Expense[] = expenses.filter(
      (expense) => !selectedExpenses.includes(expense.id),
    );
    setExpenses(newExpenses);
  };

  const [searchTerm, setSearchTerm] = useState<string>("");

  const updateSearchTerm = (term: string) => {
    setSearchTerm(term);
  };

  const [debouncedSearchTerm] = useDebounce(searchTerm, 300);

  const filteredExpenses = useMemo(() => {
    if (debouncedSearchTerm.trim() === "") {
      return expenses;
    }

    const normalizedSearchTerm = normalizeText(debouncedSearchTerm);
    const newFilteredExpenses = expenses.filter(
      (expense) =>
        normalizeText(expense.name).includes(normalizedSearchTerm) ||
        normalizeText(expense.amount.toString()).includes(normalizedSearchTerm),
    );
    return newFilteredExpenses;
  }, [debouncedSearchTerm, expenses]);

  // useEffect(() => {
  //   setFilteredExpenses(expenses);
  // }, [expenses]);

  // const [filteredExpenses, setFilteredExpenses] = useState<Expense[]>(expenses);

  // const updateFilteredExpenses = (newExpenses: Expense[]) => {
  //   setFilteredExpenses(newExpenses);
  // };

  // const returnFilteredExpenses = () => {
  //   setFilteredExpenses(expenses);
  // };

  // useEffect(() => {
  //   setFilteredExpenses(expenses);
  // }, [expenses]);

  const total = useMemo(() => {
    return filteredExpenses.reduce((acc, expense) => acc + expense.amount, 0);
  }, [filteredExpenses]);

  return (
    <div className="grid min-h-screen justify-items-center p-20 font-sans sm:p-28">
      <main className="grid w-full max-w-screen-xl grid-cols-[4.5fr_11fr_4fr] items-start gap-8">
        <div className="container-border h-80">
          <ExpenseForm
            title="Thêm Chi Tiêu"
            action="Thêm Chi Tiêu"
            updateExpense={updateExpense}
          />
        </div>
        <ExpenseList
          expenses={filteredExpenses}
          updateExpense={updateExpense}
          deleteExpense={deleteSelectedExpenses}
          selectExpense={selectExpense}
          selectAllExpenses={selectAllExpenses}
          deselectExpense={deselectExpense}
          deselectAllExpenses={deselectAllExpenses}
          totalSelected={selectedExpenses.length}
          searchTerm={searchTerm}
          updateSearchTerm={updateSearchTerm}
          // updateFilteredExpenses={updateFilteredExpenses}
          // returnFilteredExpenses={returnFilteredExpenses}
        />
        <ExpenseSummary total={total} />
        <button onClick={() => localStorage.clear()}>:D</button>
      </main>
    </div>
  );
}
