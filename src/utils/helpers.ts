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
