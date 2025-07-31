"use client";
import { FiSearch, FiFilter, FiTrash2 } from "react-icons/fi";
import ExpenseItem from "./ExpenseItem";
import Modal from "./Modal";
import { Expense } from "@/app/page";
import { useState } from "react";
import toast from "react-hot-toast";

const ExpenseList = ({
  expenses,
  deleteExpense,
  selectExpense,
  deselectExpense,
  totalSelected,
}: {
  expenses: Expense[];
  deleteExpense: () => void;
  selectExpense: (id: number) => void;
  deselectExpense: (id: number) => void;
  totalSelected: number;
}) => {
  // const [openSearchBox, setOpenSearchBox] = useState<boolean>(false);
  const [selectAllChecked, setSelectAllChecked] = useState<boolean>(false);

  return (
    <div className="container-border h-full">
      <div className="mb-5 flex items-center justify-between">
        <h1 className="text-2xl font-bold">Các khoản chi tiêu</h1>
        <div className="flex gap-3 select-none">
          <FiSearch
            size={25}
            className="cursor-pointer hover:text-gray-500"
            title="Tìm kiếm chi tiêu"
          />

          <Modal
            trigger={
              <FiFilter
                size={25}
                className="cursor-pointer hover:text-gray-500"
                title="Lọc chi tiêu"
              />
            }
          >
            {(closeModal) => <h1>Ban la dep trai nhat</h1>}
          </Modal>

          {totalSelected > 0 ? (
            <Modal
              trigger={
                <FiTrash2
                  size={25}
                  className="cursor-pointer hover:text-gray-500"
                  title="Xóa chi tiêu"
                />
              }
            >
              {(closeModal) => (
                <>
                  <h1 className="text-center">
                    Bạn có chắc chắn muốn xóa{" "}
                    <span className="text-lg font-bold text-red-600">
                      {totalSelected}
                    </span>{" "}
                    chi tiêu?
                  </h1>
                  <div className="mt-8 flex justify-center gap-3">
                    <button
                      className="cursor-pointer rounded-md bg-red-600 px-4 py-2 text-white transition hover:bg-red-700"
                      onClick={() => {
                        deleteExpense();
                        setSelectAllChecked(false);
                        closeModal();
                      }}
                    >
                      Xác nhận
                    </button>
                    <button
                      className="cursor-pointer rounded-md bg-neutral-200 px-4 py-2 text-gray-700 transition hover:bg-neutral-300"
                      onClick={() => {
                        closeModal();
                      }}
                    >
                      Hủy bỏ
                    </button>
                  </div>
                </>
              )}
            </Modal>
          ) : (
            <FiTrash2
              size={25}
              className="cursor-pointer hover:text-gray-500"
              title="Xóa chi tiêu"
              onClick={() => {
                toast.error("Bạn chưa chọn chi tiêu nào để xóa.");
              }}
            />
          )}
        </div>
      </div>
      <div className="grid divide-y divide-gray-300">
        <div className="grid grid-cols-[1fr_4fr_5fr_3fr_1fr] gap-3 rounded bg-sky-100 p-3 font-bold dark:border-2 dark:border-gray-700 dark:bg-[#0a0a0a]">
          <input
            type="checkbox"
            className="h-5"
            checked={selectAllChecked}
            onChange={() => {
              const nextChecked = !selectAllChecked;
              setSelectAllChecked(nextChecked);
              if (nextChecked) {
                expenses.forEach((expense) => {
                  selectExpense(expense.id);
                });
              } else {
                expenses.forEach((expense) => {
                  deselectExpense(expense.id);
                });
              }
            }}
          />
          <p>Thời gian</p>
          <p>Tên chi tiêu</p>
          <p>Số tiền</p>
        </div>
        {expenses.map((expense) => (
          <ExpenseItem
            key={expense.id}
            date={
              expense.date instanceof Date
                ? expense.date
                : new Date(expense.date)
            }
            name={expense.name}
            amount={expense.amount}
            selectAllChecked={selectAllChecked}
            selectExpense={() => selectExpense(expense.id)}
            deselectExpense={() => deselectExpense(expense.id)}
          />
        ))}
      </div>
    </div>
  );
};

export default ExpenseList;
