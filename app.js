
var taskInput = document.getElementById("new-task");
var addButton = document.getElementsByTagName("button")[0];
var incompleteTaskHolder = document.getElementById("incomplete-tasks");
var completedTasksHolder = document.getElementById("completed-tasks");


//New task list item
var createNewTaskElement = function(taskString){

    var listItem = document.createElement("li");
    var checkBox = document.createElement("input");
    var label = createElement("label", 'task', taskString);
    var editInput = createElement("input", "task");
    var editButton = createElement("button", "edit", "Edit");
    var deleteButton = createElement("button", "delete");
    var deleteButtonImg = document.createElement("img");

    checkBox.type = "checkbox";
    editInput.type = "text";
    deleteButtonImg.src = './remove.svg';
    deleteButton.appendChild(deleteButtonImg);

    listItem.append(checkBox, label, editInput, editButton, deleteButton);
    return listItem;
}

function createElement(tagName, className, innerText) {
    const element = document.createElement(tagName);
    element.classList.add(className);
    element.textContent = innerText;
    return element;
}

var addTask = function(){
    //Create a new list item with the text from the #new-task:
    if (!taskInput.value) return;
    var listItem = createNewTaskElement(taskInput.value);

    incompleteTaskHolder.appendChild(listItem);
    bindTaskEvents(listItem, taskCompleted);

    taskInput.value = "";
}

var editTask = function(){
    var listItem = this.parentNode;
    var editInput = listItem.querySelector('input[type=text]');
    var label = listItem.querySelector("label");
    var editBtn = listItem.querySelector(".edit");
    var containsClass = listItem.classList.contains("edit-mode");

    if(containsClass){
        label.innerText = editInput.value;
        editBtn.innerText = "Edit";
    }else{
        editInput.value = label.innerText;
        editBtn.innerText = "Save";
    }

    listItem.classList.toggle("edit-mode");
};

var deleteTask = function(){
    var listItem = this.parentNode;
    var ul = listItem.parentNode;

    ul.removeChild(listItem);
}

var taskCompleted = function(){
    var listItem = this.parentNode;
    completedTasksHolder.appendChild(listItem);
    bindTaskEvents(listItem, taskIncomplete);
}

var taskIncomplete = function(){
    var listItem = this.parentNode;

    incompleteTaskHolder.appendChild(listItem);
    bindTaskEvents(listItem,taskCompleted);
}

addButton.onclick=addTask;
addButton.addEventListener("click",addTask);

var bindTaskEvents = function(taskListItem,checkBoxEventHandler) {

    var checkBox = taskListItem.querySelector("input[type=checkbox]");
    var editButton = taskListItem.querySelector("button.edit");
    var deleteButton = taskListItem.querySelector("button.delete");

    editButton.onclick = editTask;
    deleteButton.onclick = deleteTask;
    checkBox.onchange = checkBoxEventHandler;
}

for (var i=0; i<incompleteTaskHolder.children.length; i++) {
    bindTaskEvents(incompleteTaskHolder.children[i], taskCompleted);
}

for (var i=0; i<completedTasksHolder.children.length; i++) {
    bindTaskEvents(completedTasksHolder.children[i], taskIncomplete);
}