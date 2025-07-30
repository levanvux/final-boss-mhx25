"use client";

const ExpenseSummary = ({ total }: { total: number }) => {
  return (
    <div className="container-border flex h-44 flex-col justify-between">
      <h1 className="text-2xl font-bold">Tổng Chi Tiêu</h1>
      <p className="self-end text-xl font-bold text-green-600">{total} VND</p>
    </div>
  );
};

export default ExpenseSummary;
