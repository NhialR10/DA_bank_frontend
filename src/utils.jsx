//for formating numbers to include comas
export const formatNumber = (number) => {
  return new Intl.NumberFormat().format(number);
};

export const formatDate = (date) => {
  const startDatearr = date.split("/");
  const day = startDatearr[0];
  const month = startDatearr[1];
  const year = startDatearr[2];
  return `${year}-${month}-${day}`;
};
