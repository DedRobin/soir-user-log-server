const fs = require('node:fs');
const path = require('node:path');
const { readFile, writeFile, utils } = require('xlsx');
const { months, headers } = require('./constants');

function appendRowToBook(row, path) {
  const currentMonth = new Date().getMonth();
  const sheet = months[currentMonth];
  const wb = readFile(path);

  let ws = wb.Sheets[sheet];

  if (!ws) {
    ws = utils.aoa_to_sheet([headers, row]);
    utils.book_append_sheet(wb, ws, months[currentMonth]);
  } else {
    utils.sheet_add_aoa(ws, [row], { origin: -1 });
  }

  writeFile(wb, path);

  console.log(new Date().toISOString(), `\nAdd row = ${row}\n`);
}

function createBook(row, pathToSave) {
  const wb = utils.book_new();
  const ws = utils.aoa_to_sheet([headers, row]);

  const currentMonth = new Date().getMonth();

  utils.book_append_sheet(wb, ws, months[currentMonth]);
  const folderName = path.dirname(pathToSave);
  const folderIsExist = fs.existsSync(folderName);
  if (!folderIsExist) fs.mkdirSync(folderName);
  writeFile(wb, pathToSave);

  console.log(new Date().toISOString(), '\nCreate new book\n');
  console.log(new Date().toISOString(), `\nAdd row = ${row}\n`);
}

module.exports = { appendRowToBook, createBook };
