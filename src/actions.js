const { readFile, writeFile, utils } = require('xlsx');

const headers = [
  'Дата',
  'Ф.И.О.',
  'Автомобиль, номер',
  'Цель визита',
  'Организация',
  'Сопровождающий',
  'Согласовано с',
  'с',
  'по',
];

function appendRowToBook(row, path) {
  const wb = readFile(path);
  const ws = wb.Sheets['Data'];
  utils.sheet_add_aoa(ws, [row], { origin: -1 });
  writeFile(wb, path);
}

function createBook(row, path) {
  const wb = utils.book_new();
  const ws = utils.aoa_to_sheet([headers, row]);
  utils.book_append_sheet(wb, ws, 'Data');
  writeFile(wb, path);
}

module.exports = { appendRowToBook, createBook };
