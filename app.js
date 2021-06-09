//  Form element
const formContainer = document.getElementsByClassName("form-container")[0];

// Text task input element
let taskInput = document.querySelector(".task-input");

const tasksContainer = document.getElementsByClassName("tasks")[0]
let clearButton = document.querySelector(".clear-btn");

// Array of task items
let toDoItems = JSON.parse(localStorage.getItem("tasks")) || [];

toDoItems.forEach(task => {
    tasksWrapper(task);
})

function addToLocal(task) {
    toDoItems.push(task.toLowerCase());
    localStorage.setItem("tasks", JSON.stringify(toDoItems));
    console.log(toDoItems)
}


function tasksWrapper(title) {

    let taskWrapper = `<div class="task-wrapper"><h2 class="heading task-heading">${title}</h2><div class="task-icons"><span class="icon-item tick-item"><i class="far fa-check-circle"></i></span><span class="icon-item edit-item"><i class="far fa-edit"></i></span><span class="icon-item remove-item"><i class="far fa-times-circle"></i></span></div></div>`;

    tasksContainer.insertAdjacentHTML("beforeend", taskWrapper);


    const icons = document.querySelectorAll(".task-icons");
    icons.forEach(icon => {
        icon.addEventListener("click", iconsFunctionality)
    })

}


function iconsFunctionality(e) {
    let icon = e.target;
    let iconParent = icon.parentNode;
    let headingWrapper = icon.parentNode.parentNode.parentNode.querySelector(".task-heading");
    if (icon.classList == "far fa-check-circle") {
        iconParent.classList.toggle("visibility");
        headingWrapper.classList.toggle("completed");
    }
    let taskWrapper = headingWrapper.parentNode;
    if (icon.classList == "far fa-edit") {
        let index = toDoItems.indexOf(headingWrapper.innerText.toLowerCase());
        toDoItems.splice(index, 1);
        taskInput.value = headingWrapper.innerText;
        taskWrapper.remove();
    }
    // Remove from the DOM only
    if (icon.classList == "far fa-times-circle") {
        taskWrapper.remove();
    }
}

formContainer.addEventListener("submit", (e) => {
    e.preventDefault();
    let taskName = taskInput.value;
    if (taskInput.value == "") {
        return;
    } else {
        tasksWrapper(taskName);
        addToLocal(taskName);
    }

    taskInput.value = "";
})

// Remove from DOM and local storage
function clearStorage() {
    localStorage.removeItem("tasks");
    toDoItems = [];
    while (tasksContainer.firstChild) {
        tasksContainer.removeChild(tasksContainer.firstChild);
    }
}

clearButton.addEventListener("click", clearStorage)