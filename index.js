var input = document.getElementById("input");
var taskContainer = document.getElementById("task-container");
var taskArr = [];

function deleteFnx(e) {
  var taskArr = JSON.parse(localStorage.getItem("taskNotes"));
  var idx = e.id;
  taskArr.splice(idx, 1);
  var taskArr = JSON.stringify(taskArr);
  localStorage.setItem("taskNotes", taskArr);
  UI();
}

function editFnx(e) {
  var oldValue = e.previousElementSibling.innerText;
  var taskArr = JSON.parse(localStorage.getItem("taskNotes"));
  var idx = e.id;
  var editPrompt = prompt("Enter edit value", oldValue.trim());
  if (editPrompt < 3) {
    alert("Enter valide Task");
    return;
  }
  taskArr.splice(idx, 1, editPrompt);
  localStorage.setItem("taskNotes", JSON.stringify(taskArr));
  UI();
}

function cpl(e) {
  e.nextElementSibling.classList.toggle("lineThrough");
}

function addtask() {
  if (input.value.length < 3) {
    alert("Enter valide Task");
    return;
  }
  var taskNotes = localStorage.getItem("taskNotes");
  if (taskNotes == null) {
    var arr = [input.value];
    localStorage.setItem("taskNotes", JSON.stringify(arr));
  } else {
    var arr = JSON.parse(taskNotes);
    arr.unshift(input.value);
    localStorage.setItem("taskNotes", JSON.stringify(arr));
  }
  UI();
  input.value = "";
  return;
}

input.addEventListener("keypress", (event) => {
  if (event.key === "Enter") {
    addtask();
  }
});

function UI() {
  var taskArr = JSON.parse(localStorage.getItem("taskNotes"));
  var UI = "";
  for (var i = 0; i < taskArr.length; i++) {
    UI += `<ul><li> <span id=${i} onclick="cpl(this)" class="complete">✔️</span><p>${taskArr[i]}</p> <span id=${i} class="edit" onclick="editFnx(this)">📝</span><span id=${i} class="delete" onclick="deleteFnx(this)">🗑️</span></li></ul>`;
  }
  taskContainer.innerHTML = UI;
}

// localStorage.clear()
