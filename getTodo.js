function getTodo(todos, res, headers) {
  res.writeHead(200, headers);
  res.write(
    JSON.stringify({
      status: "success",
      data: todos,
    })
  );
  res.end();
}

module.export = getTodo;
