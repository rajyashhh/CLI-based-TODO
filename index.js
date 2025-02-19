const express = require('express')
const app = express()
const port = 3000

todos=[];
// route handlers
app.get('/', (req, res) => {
  res.send(todos);
})
let id = 1000;
app.post('/create/:value', (req, res) => {
    const {value} = req.params;
    id++;
    let newtodo = {id, task: value};
    todos.push(newtodo);
    res.send(newtodo);
    
})
var removeByAttr = function(todos, attr, value) {
  var i = todos.length;
  // Ensure value is a string for comparison
  value = String(value); 

  while(i--) {
    if (todos[i] && todos[i].hasOwnProperty(attr) && todos[i][attr] === value) {
      todos.splice(i, 1); // Remove the element
    }
  }
  return todos;
};

app.delete('/:id', (req, res) => {
  const { id } = req.params;
  
  // Debug: Check the value of id
  console.log(`Deleting todo with id: ${id}`);
  
  // Call the function to remove todo
  removeByAttr(todos, 'id', id);
  
  // Debug: Check the updated todos array
  console.log('Updated Todos:', todos);
  
  res.send(todos); // Return the updated todos
});
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})