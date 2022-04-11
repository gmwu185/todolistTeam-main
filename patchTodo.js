const errHandle = require('./errorHandle');

function patchTodo(req, res, headers, body, todos) {
    try {
        const newTitle = JSON.parse(body).title;
        const index = todos.findIndex((element) => element.id == req.url.split('/').pop());
        if (newTitle !== undefined && index !== -1) {
            todos[index].title = newTitle;
            res.writeHead(200, headers);
            res.write(
                JSON.stringify({
                    status: 'success',
                    data: todos,
                })
            );
            res.end();
        } else {
            if (index == -1) {
                errHandle(res, 4001);
            } 
            if( newTitle == undefined) {
                errHandle(res, 400);
            }
        }
    } catch (err) {
        errHandle(res, 4002);
    }
}

module.exports = patchTodo;
