export const capitalize = (text: string) => {
  const firstLetter = text[0];
  return firstLetter.toUpperCase() + text.slice(1);
};

export const getDate = (date: Date) => {
  const turnedDate = new Date(date);
  const day = turnedDate.getDate();
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  const monthIndex = turnedDate.getMonth();
  const year = turnedDate.getFullYear();
  return `${day}/${months[monthIndex]}/${year}`;
};
