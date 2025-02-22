const express = require("express");
const app = express();
const port = 3001;
const data = require('./data.json');
const fs = require('fs');


let todos = [];


app.get("/", (req, res) => {
  res.send(todos);
});

app.post("/create/:value", (req, res) => {
  const { value } = req.params;
  let id = Math.floor(math.random*1000);
  let newtodo = { id, task: value };
  todos.push(newtodo);
  res.send(newtodo);
});

const removeById = (id) => {
  id = parseInt(id); 
  let index = todos.findIndex((todo) => todo.id === id);
  if (index !== -1) {
    todos.splice(index, 1); 
    return true;
  }
  return false;
};

app.delete("/:id", (req, res) => {
  const { id } = req.params;
  
  console.log(`Deleting todo with id: ${id}`);

  const success = removeById(id);

  
  console.log("Updated Todos:", todos);

  if (success) {
    res.send({ message: `Todo with id ${id} deleted.`, todos });
  } else {
    res.status(404).send({ message: "Todo not found!" });
  }
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});