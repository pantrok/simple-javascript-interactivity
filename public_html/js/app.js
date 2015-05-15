//Problem: User interaction doesn't provide desired results.
//Solution: Add interactivity so the user can manage daily tasks.

var taskInput = document.getElementById("new-task"); //new-task
var addButton = document.getElementsByTagName("button")[0]; //first button
var incompleteTasksHolder = document.getElementById("incomplete-tasks"); //incomplete-tasks
var completeTasksHolder = document.getElementById("completed-tasks"); //completed-tasks

//New Task list item
var createNewTaskElement = function(taskString){
  //Create list item
  var listItem = document.createElement("li");
  //input checkbox
  var checkbox = document.createElement("input"); //checkbox
  //label
  var label = document.createElement("label");
  //input (text)
  var editInput = document.createElement("input"); //text
  //button.edit
  var editButton = document.createElement("button");
  //button.delete
  var deleteButton = document.createElement("button");
  //Each element needs modifiying
  checkbox.type = "checkbox";
  editInput.type = "text";
  
  label.innerText = taskString;
  
  editButton.innerText = "Edit";
  editButton.className = "edit";
  deleteButton.innerText = "Delete";
  deleteButton.className = "delete";
  //Each element needs appendeding
  listItem.appendChild(checkbox);
  listItem.appendChild(label);
  listItem.appendChild(editInput);
  listItem.appendChild(editButton);
  listItem.appendChild(deleteButton);
  return listItem;
}

//Add a new task 
var addTask = function(){
  console.log("Add task...");
  //Create a new list item with the text from #newTask
  var listItem = createNewTaskElement(taskInput.value);
  //Append list item to the incompleteTaskHolder
  incompleteTasksHolder.appendChild(listItem);
  taskInput.value = "";
}

//Edit an existing task
var editTask = function(){
  console.log("Edit task...");
  var listItem = this.parentNode;
  var editInput = listItem.querySelector("input[type=text]");
  var label = listItem.querySelector("label");
  
  var containsClass = listItem.classList.contains("editMode");
  //If the class of the parent is .editMode
  if(containsClass){
    //Switch from .editMode
    //label text become the input's value
    label.innerText = editInput.value;
  } else {
    //Switch to .editMode
    //Input value becomes the label's text
    editInput.value = label.innerText;
  }
    
  //Toggle .editMode on the list item
  listItem.classList.toggle("editMode");
  
}

//Delete an existing task
var deleteTask = function(){
  console.log("Delete task...");
  var listItem = this.parentNode;
  var ul = listItem.parentNode;
  //Remove the parent list item from ul
  ul.removeChild(listItem);
}

//Mark a task as complete
var taskCompleted = function(){
  console.log("Task Complete ...");
  //Append the task to the #completed-tasks
  var listItem = this.parentNode;
  completeTasksHolder.appendChild(listItem);
  bindTaskEvents(listItem, taskIncomplete);
}

//Mark a task as incomplete
var taskIncomplete = function(){
  console.log("Task Incomplete...");
  //Append the task to the #incomplete-tasks
  var listItem = this.parentNode;
  incompleteTasksHolder.appendChild(listItem);
  bindTaskEvents(listItem, taskCompleted);
}

var bindTaskEvents= function(taskListItem, checkboxEventHandler) {
  //select taskListItem's children
  var checkbox = taskListItem.querySelector("input[type=checkbox]");
  var editButton = taskListItem.querySelector("button.edit");
  var deleteButton = taskListItem.querySelector("button.delete");;
  //bind the editTask to edit button
  editButton.onclick = editTask;
  //bind deleteTask to delete button
  deleteButton.onclick = deleteTask;
  //bind checkboxEventHandler to checkbox
  checkbox.onchange = checkboxEventHandler;
  
}

var ajaxRequest = function(){
  console.log("Ajax Request");
}

//Set the click handler to the addTask function
addButton.addEventListener("click",addTask);
addButton.addEventListener("click",ajaxRequest);

//cycle over incompleteTaskHolder ul list items
for(var i = 0; i < incompleteTasksHolder.children.length; i++) {
  //bind events to list item's children (taskCompleted)
  bindTaskEvents(incompleteTasksHolder.children[i], taskCompleted);
}

//cycle over completedTaskHolder ul list items
for(var i = 0; i < completeTasksHolder.children.length; i ++){
  //bind events to list item's children (taskIncomplete)
  bindTaskEvents(completeTasksHolder.children[i], taskIncomplete);
}