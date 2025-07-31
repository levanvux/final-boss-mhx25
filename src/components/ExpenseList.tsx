"use client";
import { useState, useEffect, useRef } from "react";
import { FiSearch, FiFilter, FiTrash2, FiX } from "react-icons/fi";
import toast from "react-hot-toast";
import ExpenseItem from "./ExpenseItem";
import Modal from "./Modal";
import { Expense } from "@/utils/types";

const ExpenseList = ({
  expenses,
  updateExpense,
  deleteExpense,
  selectExpense,
  selectAllExpenses,
  deselectExpense,
  deselectAllExpenses,
  totalSelected,
  searchTerm,
  updateSearchTerm,
}: {
  expenses: Expense[];
  updateExpense: (name: string, amount: string, date: Date) => boolean;
  deleteExpense: () => void;
  selectExpense: (id: number) => void;
  selectAllExpenses: () => void;
  deselectExpense: (id: number) => void;
  deselectAllExpenses: () => void;
  totalSelected: number;
  searchTerm: string;
  updateSearchTerm: (term: string) => void;
}) => {
  const [openSearchBox, setOpenSearchBox] = useState<boolean>(false);
  const [selectAllChecked, setSelectAllChecked] = useState<boolean>(false);
  const searchRef = useRef<HTMLInputElement>(null);

  const [isFilterModalOpen, setIsFilterModalOpen] = useState<boolean>(false);
  const openFilterModal = () => {
    setIsFilterModalOpen(true);
  };
  const closeFilterModal = () => {
    setIsFilterModalOpen(false);
  };

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState<boolean>(false);
  const openDeleteModal = () => {
    setIsDeleteModalOpen(true);
  };
  const closeDeleteModal = () => {
    setIsDeleteModalOpen(false);
  };

  useEffect(() => {
    if (openSearchBox && searchRef.current) {
      searchRef.current.focus();
    }
  }, [openSearchBox]);

  return (
    <div className="container-border h-full">
      <div className="mb-5 flex items-center justify-between">
        <h1 className="text-2xl font-bold">Các khoản chi tiêu</h1>
        <div className="flex items-center gap-3 select-none">
          {openSearchBox ? (
            <>
              <input
                type="text"
                placeholder="Tìm kiếm chi tiêu theo tên"
                className="rounded border border-gray-300 p-1 text-sm outline-none dark:border-gray-600 dark:bg-gray-700"
                value={searchTerm}
                onChange={(e) => {
                  updateSearchTerm(e.target.value);
                }}
                ref={searchRef}
              />
              <FiX
                size={25}
                className="cursor-pointer hover:text-gray-500"
                title="Tắt tìm kiếm"
                onClick={() => {
                  setOpenSearchBox(false);
                  updateSearchTerm("");
                }}
              />
            </>
          ) : (
            <FiSearch
              size={25}
              className="cursor-pointer hover:text-gray-500"
              title="Tìm kiếm chi tiêu"
              onClick={() => setOpenSearchBox(true)}
            />
          )}

          <Modal
            isModalOpen={isFilterModalOpen}
            openModal={openFilterModal}
            closeModal={closeFilterModal}
            trigger={
              <FiFilter
                size={25}
                className="cursor-pointer hover:text-gray-500"
                title="Lọc chi tiêu"
              />
            }
          >
            {
              <div className="flex flex-col items-center justify-center gap-5 text-xl">
                <h1 className="text-gray-800">Bạn là đẹp trai nhất</h1>
                <button
                  className="cursor-pointer rounded bg-red-500 px-3 py-1 font-bold text-white hover:bg-red-600"
                  onClick={() => closeFilterModal()}
                >
                  Đồng ý
                </button>
              </div>
            }
          </Modal>

          {totalSelected > 0 ? (
            <Modal
              isModalOpen={isDeleteModalOpen}
              openModal={openDeleteModal}
              closeModal={closeDeleteModal}
              trigger={
                <FiTrash2
                  size={25}
                  className="cursor-pointer hover:text-gray-500"
                  title="Xóa chi tiêu"
                />
              }
            >
              {
                <>
                  <h1 className="text-center text-gray-800">
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
                        closeDeleteModal();
                      }}
                    >
                      Xác nhận
                    </button>
                    <button
                      className="cursor-pointer rounded-md bg-neutral-200 px-4 py-2 text-gray-700 transition hover:bg-neutral-300"
                      onClick={() => {
                        closeDeleteModal();
                      }}
                    >
                      Hủy bỏ
                    </button>
                  </div>
                </>
              }
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
            className="h-5 cursor-pointer"
            checked={selectAllChecked}
            onChange={() => {
              const nextChecked: boolean = !selectAllChecked;
              setSelectAllChecked(nextChecked);
              if (nextChecked) {
                selectAllExpenses();
              } else {
                deselectAllExpenses();
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
            expense={expense}
            updateExpense={updateExpense}
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
