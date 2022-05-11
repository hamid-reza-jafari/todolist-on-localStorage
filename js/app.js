let addBtn = document.getElementById("addButton")
let clearAllBtn = document.getElementById("clearButton")
let Input = document.getElementById("itemInput")
let TodoContainer = document.getElementById("todoList")
var todoArray = []

function send() {
    let inputVal = Input.value

    var todoObj = {
        id: todoArray.length + 1,
        title: inputVal,
        complete: false
    }

    Input.value = ""

    todoArray.push(todoObj)
    setToLocal(todoArray)
    todoCreator(todoArray)

    Input.focus()
}

function setToLocal(todoList) {
    localStorage.setItem("todos", JSON.stringify(todoArray))
}

function todoCreator(todoList) {
    let liEl, labelEl, completeBtn, deleteBtn

    TodoContainer.innerHTML = ""

    todoList.forEach((x) => {

        liEl = document.createElement("li")
        liEl.setAttribute("class", "completed well")
        liEl.setAttribute("id", "todo" + x.id)

        labelEl = document.createElement("label")
        labelEl.innerHTML = x.title

        completeBtn = document.createElement("button")
        completeBtn.setAttribute("class", "btn-success btn")
        completeBtn.innerHTML = "Complete"
        completeBtn.setAttribute('onclick', 'completeTodoFunc(' + x.id + ')')

        deleteBtn = document.createElement("button")
        deleteBtn.setAttribute("class", "deleteTodo btn-danger btn")
        deleteBtn.setAttribute('onclick', 'deletTodo(' + x.id + ')')
        deleteBtn.innerHTML = "Delete"

        if (x.complete) {
            liEl.className = "uncompleted well"
            completeBtn.innerHTML = "UnComplete"
        }

        liEl.append(labelEl, completeBtn, deleteBtn)

        TodoContainer.append(liEl)

    });
}

function completeTodoFunc(thisId) {
    todoArray = JSON.parse(localStorage.getItem("todos"))

    todoArray.forEach(function (x) {
        if (x.id === thisId) {
            x.complete = !x.complete
        }
    })

    setToLocal(todoArray)
    todoCreator(todoArray)
}

function deletTodo(todoId) {

    let localStorageData = JSON.parse(localStorage.getItem("todos"))

    todoArray = localStorageData

    let searchTodoIndex = todoArray.findIndex(function (x) {
        return x.id === todoId
    })

    todoArray.splice(searchTodoIndex, 1)

    setToLocal(todoArray)
    todoCreator(todoArray)
}

function getToLocal() {
    let localArray = JSON.parse(localStorage.getItem("todos"))

    if (localArray) {
        todoArray = localArray
    } else {
        todoArray = []
    }

    todoCreator(todoArray)
}
function clearAllTodo() {
    todoArray = []
    localStorage.removeItem('todos')
    TodoContainer.innerHTML = ''
}

window.addEventListener("load", getToLocal)
addBtn.addEventListener("click", send)
clearAllBtn.addEventListener("click", clearAllTodo)

Input.addEventListener("keydown", function (e) {
    if (e.key === "Enter") {
        send()
    }
})



