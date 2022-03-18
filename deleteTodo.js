const errorHandle = require('./errorHandle');

function deleteTodo(todos, req, res, headers) {
    const id = req.url.split('/').pop()
    const index = todos.findIndex(item => item.id === id)


    if (index !== -1) {
        todos.splice(index, 1)
        res.writeHead(200, headers);
        res.write(JSON.stringify({
            'status': 'success',
            'data': todos
        }));
        res.end()
    } else {
        errorHandle(res, 4001)
    }
}

module.exports = deleteTodo