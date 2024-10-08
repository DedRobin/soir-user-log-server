function getFormattedDate() {
  const currentDate = new Date();
  const date = currentDate.getDate().toString().padStart(2, '0');
  const month = currentDate.getMonth().toString().padStart(2, '0');
  const year = currentDate.getFullYear();
  const formattedDate = [date, month, year].join('-');

  return formattedDate;
}

module.exports = { getFormattedDate };
