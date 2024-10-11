const { createServer } = require('node:http');
const { appendRowToBook, createBook } = require('./actions');
const { getFormattedDate } = require('./services');

const filename = new Date().getFullYear();
const path = `${process.cwd()}\\database\\${filename}.xlsx`;

const requestListener = (request, response) => {
  const headers = {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': 'http://localhost:5173',
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Max-Age': 2592000,
  };

  if (request.method === 'OPTIONS') {
    response.writeHead(204, headers);
    response.end();
    return;
  }

  if (request.url === '/visitors/add') {
    if (request.method === 'POST') {
      const chunks = [];
      request.on('data', (chunk) => {
        chunks.push(chunk);
      });
      request.on('end', () => {
        const data = JSON.parse(chunks.join(''));
        const date = getFormattedDate();
        const row = [date, ...Object.values(data)];
        try {
          appendRowToBook(row, path);
          response.writeHead(200, headers);
          response.end('Пользователь добавлен.');
        } catch (e) {
          createBook(row, path);
          response.writeHead(201, headers);
          response.end('Создана новая база данных.\nПользователь добавлен.');
        }
      });
    }
  } else if (request.url === '/test') {
    response.writeHead(200, headers);
    response.end(JSON.stringify({ test: 'test' }));
  } else {
    response.writeHead(400, headers);
    response.end('Что-то пошло не так.');
  }
};

const server = createServer(requestListener);

module.exports = server;
