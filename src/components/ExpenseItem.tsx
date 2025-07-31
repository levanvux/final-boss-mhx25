"use client";

import { useEffect, useState } from "react";
import Modal from "./Modal";
import ExpenseForm from "./ExpenseForm";
import { Expense } from "@/utils/types";

const ExpenseItem = ({
  expense,
  selectAllChecked,
  selectExpense,
  deselectExpense,
  updateExpense,
}: {
  expense: Expense;
  selectAllChecked: boolean;
  selectExpense: () => void;
  deselectExpense: () => void;
  updateExpense: (name: string, amount: string, date: Date) => boolean;
}) => {
  const expenseName: string = expense.name;
  const expenseAmount: string = expense.amount.toString();
  const expenseDate: Date = new Date(expense.date);

  const [isChecked, setIsChecked] = useState<boolean>(selectAllChecked);

  const [isEditModalOpen, setIsEditModalOpen] = useState<boolean>(false);
  const openEditModal = () => {
    setIsEditModalOpen(true);
  };
  const closeEditModal = () => {
    setIsEditModalOpen(false);
  };

  useEffect(() => {
    setIsChecked(selectAllChecked);
  }, [selectAllChecked]);

  return (
    <div
      className="grid grid-cols-[1fr_4fr_5fr_3fr_1fr] items-center gap-2 rounded p-3 font-bold"
      onClick={() => {
        if (!isEditModalOpen) setIsChecked(!isChecked);
      }}
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
        {`${expenseDate.getDate().toString().padStart(2, "0")}-${(
          expenseDate.getMonth() + 1
        )
          .toString()
          .padStart(2, "0")}-${expenseDate.getFullYear()}`}{" "}
        <span className="text-gray-600">{`${expenseDate
          .getHours()
          .toString()
          .padStart(
            2,
            "0",
          )}:${expenseDate.getMinutes().toString().padStart(2, "0")}`}</span>
      </p>
      <p>{expenseName}</p>
      <p>{expenseAmount} VND</p>
      <Modal
        isModalOpen={isEditModalOpen}
        openModal={openEditModal}
        closeModal={closeEditModal}
        extraClassName="dark:bg-gray-600"
        trigger={
          <button
            className="h-9 w-16 cursor-pointer rounded-md bg-emerald-500 py-1 text-white transition hover:bg-emerald-600"
            onClick={(e) => {
              e.stopPropagation();
              openEditModal();
            }}
          >
            Edit
          </button>
        }
      >
        {
          <ExpenseForm
            title="Sửa Chi Tiêu"
            action="Hoàn Tất"
            expenseId={expense.id}
            initialExpenseName={expenseName}
            initialExpenseAmount={expenseAmount}
            initialExpenseDate={expenseDate}
            updateExpense={updateExpense}
            closeForm={closeEditModal}
          />
        }
      </Modal>
    </div>
  );
};

export default ExpenseItem;
