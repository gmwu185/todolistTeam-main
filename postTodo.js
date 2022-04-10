const errHandle = require('./errorHandle');
const { v4: uuidv4 } = require('uuid');

function postTodo(todos, req, res, body, headers) {
    try {
        const title = JSON.parse(body).title;
        if (title !== undefined) {
            const todo = {
                title: title,
                id: uuidv4()
            };
            todos.push(todo);
            res.writeHead(200, headers)
            res.write(
                JSON.stringify({
                    "success": "ture",
                    "data": todos
                })
            );
            res.end();
        } else {
            errHandle(res, 400);
        }
    } catch {
        errHandle(res, 4002);
    }
}

module.exports = postTodo;
