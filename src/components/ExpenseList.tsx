"use client";
import { FiSearch, FiFilter, FiTrash2 } from "react-icons/fi";
import ExpenseItem from "./ExpenseItem";
import Modal from "./Modal";
import { Expense, getLocalDate } from "@/app/page";
// import { useState } from "react";

const ExpenseList = ({ expenses }: { expenses: Expense[] }) => {
  // const [openSearchBox, setOpenSearchBox] = useState<boolean>(false);
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
          <FiFilter
            size={25}
            className="cursor-pointer hover:text-gray-500"
            title="Lọc chi tiêu"
          />
          <Modal
            trigger={
              <FiTrash2
                size={25}
                className="cursor-pointer hover:text-gray-500"
                title="Xóa chi tiêu"
              />
            }
          >
            <h1>Ban la dep trai nhat</h1>
          </Modal>
        </div>
      </div>
      <div className="grid divide-y divide-gray-300">
        <div className="grid grid-cols-[1fr_4fr_5fr_3fr_1fr] gap-3 rounded bg-sky-100 p-3 font-bold dark:border-2 dark:border-gray-700 dark:bg-[#0a0a0a]">
          <input type="checkbox" className="h-5" />
          <p>Thời gian</p>
          <p>Tên chi tiêu</p>
          <p>Số tiền</p>
        </div>
        {expenses.map((expense) => (
          <ExpenseItem
            key={expense.id}
            date={
              new Date(
                (typeof expense.date === "string"
                  ? new Date(expense.date).getTime()
                  : expense.date.getTime()) +
                  (typeof expense.date === "string"
                    ? new Date(expense.date).getTimezoneOffset()
                    : expense.date.getTimezoneOffset()) *
                    60000,
              )
            }
            name={expense.name}
            amount={expense.amount}
          />
        ))}
      </div>
    </div>
  );
};

export default ExpenseList;
