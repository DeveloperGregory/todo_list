let addButton = document.getElementById('add-button');
let clearButton = document.getElementById('clear-completed-button');
let emptyButton = document.getElementById('empty-button');
let saveButton = document.getElementById('save-button');
let toDoEntryBox = document.getElementById('todo-entry-box');
let toDoList = document.getElementById('todo-list');

function toggleComplete(){
    if(this.classList.contains('completed')){
        this.classList.remove('completed');
    }else{
        this.classList.add('completed');
    }
}

function newTodoItem(taskText, completed){
    
    let newItem = document.createElement('li');
    let itemText = document.createTextNode(taskText);
    newItem.appendChild(itemText);

    if(completed){
        newItem.classList.add('completed')
    }

    toDoList.appendChild(newItem);
    newItem.addEventListener('dblclick', toggleComplete);
    toDoEntryBox.value = '';
}

function addTodoItem(){
    //toDoList.innerHTML = toDoList.innerHTML + "<li>" + toDoEntryBox.value +"</li>";
    let itemText = toDoEntryBox.value;
    newTodoItem(itemText, false);
}

function clearCompleted(){
    let completedTasks = document.getElementsByClassName('completed');
    
    while(completedTasks.length > 0){
        completedTasks.item(0).remove();
    }
}

function emptyList(){
    let allTasks = toDoList.children;
    while(allTasks.length > 0){
        allTasks.item(0).remove();
    }
}

function saveList(){
    let taskList =[];
    for(let i = 0; i < toDoList.children.length; i++){
        let newLine = toDoList.children.item(i);

        let lineObject = {
            task: newLine.innerHTML,
            completed: newLine.classList.contains('completed')
        };

        taskList.push(lineObject);
    }
    localStorage.setItem("taskList", JSON.stringify(taskList));
    
}

function loadList(){
    if(localStorage.getItem('taskList') != null){
        let taskList = JSON.parse(localStorage.getItem('taskList'));
        for(let i = 0; i < taskList.length; i++){
            let item = taskList[i];
            newTodoItem(item.task, item.completed);
        }
    }
}
loadList();

addButton.addEventListener('click',addTodoItem);
clearButton.addEventListener('click', clearCompleted);
emptyButton.addEventListener('click', emptyList);
saveButton.addEventListener('click', saveList);

