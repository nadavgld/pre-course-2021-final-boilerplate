let count = 1;
let itemsArray = [];
let itemsFromLocalStorage = JSON.parse(localStorage.getItem("items"));
const listSection = document.querySelector("#view-section");

console.log(itemsFromLocalStorage);
window.addEventListener("DOMContentLoaded", function () {
  for (let i = 0; i < itemsFromLocalStorage.length; i++) {
    const todoContainer = document.createElement("div");
    todoContainer.classList.add("todo-container");
    listSection.appendChild(todoContainer);

    // adding a check box
    const taskCheck = document.createElement("input");
    taskCheck.setAttribute("type", "checkbox");
    taskCheck.className = "taskCheck";
    todoContainer.appendChild(taskCheck);

    // adding the text
    const todoText = document.createElement("div");
    todoText.classList.add("todo-text");
    todoContainer.appendChild(todoText);

    // adding the time
    const todoCreatedAt = document.createElement("div");
    todoCreatedAt.classList.add("todo-created-at");
    todoContainer.appendChild(todoCreatedAt);

    // adding the priority
    const todoPriority = document.createElement("div");
    todoPriority.classList.add("todo-priority");
    todoContainer.appendChild(todoPriority);

    //add counter
    const counter = document.getElementById("counter");

    todoText.innerText = itemsFromLocalStorage[i]["todo-text"];
    todoCreatedAt.innerText = itemsFromLocalStorage[i]["todo-created-at"];
    todoPriority.innerText = itemsFromLocalStorage[i]["todo-priority"];
    counter.innerText = itemsFromLocalStorage[i]["todo-counter"];
  }
});
//get the value of the input and his priority
const takeInput = function () {
  let inputValue = document.getElementById("text-input").value;
  let priority = document.getElementById("priority-selector").value;
  document.getElementById("text-input").value = "";
  document.getElementById("text-input").focus();
  addToList(inputValue, priority);
  addCounter(count);
  count++;
};

//adding to the counter
const addCounter = function (count) {
  const counter = document.getElementById("counter");
  counter.innerHTML = count;
};
//giving the item a div
const addToList = function (inputValue, priority) {
  //get the date in more readable way
  const getDate = function () {
    const time = new Date();
    const date = `${
      time.getDate() > 10 ? time.getDate() : `0${time.getDate()}`
    }-
    ${time.getMonth() > 10 ? time.getMonth() : `0${time.getMonth() + 1}`}
    -${time.getFullYear()}   ${time.getHours()}:${
      time.getMinutes() > 10 ? time.getMinutes() : `0${time.getMinutes()}`
    }:${time.getSeconds() > 10 ? time.getSeconds() : `0${time.getSeconds()}`}`;
    return date;
  };
  // creating the container div
  const todoContainer = document.createElement("div");
  todoContainer.classList.add("todo-container");
  listSection.appendChild(todoContainer);

  // adding data-percentage and class to sort them later by priority
  todoContainer.setAttribute("data-percentage", priority);

  // adding a check box
  const taskCheck = document.createElement("input");
  taskCheck.setAttribute("type", "checkbox");
  taskCheck.className = "taskCheck";
  todoContainer.appendChild(taskCheck);

  // adding the text
  const todoText = document.createElement("div");
  todoText.classList.add("todo-text");
  todoContainer.appendChild(todoText);

  // adding the time
  const todoCreatedAt = document.createElement("div");
  todoCreatedAt.classList.add("todo-created-at");
  todoContainer.appendChild(todoCreatedAt);

  // adding the priority
  const todoPriority = document.createElement("div");
  todoPriority.classList.add("todo-priority");
  todoContainer.appendChild(todoPriority);

  //giving the item another class to style him by class
  if (priority === "1") {
    todoContainer.classList.add("top-priority");
  } else if (priority === "2") {
    todoContainer.classList.add("second-priority");
  } else if (priority === "3") {
    todoContainer.classList.add("third-priority");
  } else if (priority === "4") {
    todoContainer.classList.add("fourth-priority");
  } else {
    todoContainer.classList.add("fifth-priority");
  }

  //adding value to each div
  todoText.textContent = inputValue;
  todoCreatedAt.textContent = getDate();
  todoPriority.textContent = priority;

  //push to localStorage
  let itemsObject = {
    "todo-text": inputValue,
    "todo-created-at": new Date(),
    "todo-priority": priority,
    "todo-counter": count,
  };
  itemsArray.push(itemsObject);
  let changeToJson = JSON.stringify(itemsArray);
  localStorage.setItem("items", changeToJson);
};

//add button to add the item to the list
const addButton = document.querySelector("#add-button");
addButton.addEventListener("click", takeInput);

//adding item by using enter key
const input = document.getElementById("text-input");
input.addEventListener("keyup", function (event) {
  if (event.keyCode === 13) {
    event.preventDefault();
    document.getElementById("add-button").click();
  }
});

//adding a sorting function
const sortButton = document.getElementById("sort-button");
sortButton.addEventListener("click", function () {
  let warpingDiv = $("#view-section");
  warpingDiv
    .find(".todo-container")
    .sort(function (a, b) {
      return +a.dataset.percentage - +b.dataset.percentage;
    })
    .appendTo(warpingDiv);
});

//adding a delete button
const deleteButton = document.getElementById("delete-button");
deleteButton.addEventListener("click", function () {
  let confirmation = confirm("Are you sure you want to delete this items?");
  if (confirmation === true) {
    $(".taskCheck:checked").closest(".todo-container").remove();
  }
  return;
});
