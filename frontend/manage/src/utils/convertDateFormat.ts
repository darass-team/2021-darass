const convertDateFormat = (date: Date) => {
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();

  return `${year}-${month >= 10 ? month : "0" + month}-${day >= 10 ? day : "0" + day}`;
};

export default convertDateFormat;
