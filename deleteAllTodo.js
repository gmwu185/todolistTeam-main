function deleteAllTodo(todos, res, headers) {
  todos.length = 0;
  res.writeHeader(200, headers);
  res.write(JSON.stringify({ status: "success", data: todos }));
  res.end();
}

module.exports = deleteAllTodo;
