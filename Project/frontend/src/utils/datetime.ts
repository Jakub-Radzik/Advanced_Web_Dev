export const getDate = (date: string) => {
  const dateObj = new Date(date);
  const year = dateObj.getFullYear();
  const month = (dateObj.getMonth() + 1).toString().padStart(2, "0");
  const day = dateObj.getDate().toString().padStart(2, "0");
  return `${year}-${month}-${day}`;
};

export const getTime = (date: string) => {
  const dateObj = new Date(date);
  const hour = dateObj.getHours().toString().padStart(2, "0");
  const minute = dateObj.getMinutes().toString().padStart(2, "0");
  return `${hour}:${minute}`;
};

export const inFutureOrToday = (date: Date) => {
  // Returns true if passed date is today or will be in the future
  return date.setHours(0, 0, 0, 0) >= new Date().setHours(0, 0, 0, 0);
};
