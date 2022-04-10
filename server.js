const http = require('http');
const { v4: uuidv4 } = require('uuid');
// const errHandle = require('./errorHandle');
const getTodo = require('./getTodo');
const deleteAllTodo = require('./deleteAllTodo');
const deleteTodo = require('./deleteTodo');
const patchTodo = require('./patchTodo');
const postTodo = require('./postTodo');
const todos = [{ title: '今天要刷牙', id: uuidv4() }];

const requestListener = (req, res) => {
    const headers = {
        'Access-Control-Allow-Headers': 'Content-Type, Authorization, Content-Length, X-Requested-With',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'PATCH, POST, GET,OPTIONS,DELETE',
        'Content-Type': 'application/json',
    };
    let body = '';

    req.on('data', (chunk) => {
        body += chunk;
    });

    if (req.url == '/todos' && req.method == 'GET') {
        getTodo(todos, res, headers);// getTodo.js
    } else if (req.url == '/todos' && req.method == 'POST') {
        req.on('end', () => postTodo(todos, req, res, body, headers)); // postTodo.js
    } else if (req.url == '/todos' && req.method == 'DELETE') {
        deleteAllTodo(todos, res, headers); // deleteTodo.js
    } else if (req.url.startsWith('/todos/') && req.method == 'DELETE') {
        deleteTodo(todos, req, res, headers); // deleteTodo.js
    } else if (req.url.startsWith('/todos/') && req.method == 'PATCH') {
        req.on('end', () => patchTodo(req, res, headers, body, todos)); // patchTodo.js
    } else if (req.method == 'OPTIONS') {
        res.writeHead(200, headers);
        res.end();
    } else {
        res.writeHead(404, headers);
        res.write(
            JSON.stringify({
                status: 'false',
                message: '無此網站路由',
            })
        );
        res.end();
    }
};

const server = http.createServer(requestListener);
server.listen(process.env.PORT || 3005);
