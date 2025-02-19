const express = require("express");
const app = express();
const port = 3001;

let todos = [];
let id = 1000;

app.get("/", (req, res) => {
  res.send(todos);
});

app.post("/create/:value", (req, res) => {
  const { value } = req.params;
  id++;
  let newtodo = { id, task: value };
  todos.push(newtodo);
  res.send(newtodo);
});

// Function to remove todo by ID
const removeById = (id) => {
  id = parseInt(id); // Convert id to number
  let index = todos.findIndex((todo) => todo.id === id);
  if (index !== -1) {
    todos.splice(index, 1); // Remove the object at the found index
    return true;
  }
  return false;
};

// DELETE request to remove a todo
app.delete("/:id", (req, res) => {
  const { id } = req.params;
  
  console.log(`Deleting todo with id: ${id}`);

  // Call the function to remove todo
  const success = removeById(id);

  // Debugging Output
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