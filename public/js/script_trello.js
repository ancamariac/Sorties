// getting all required elements
const inputBox = document.querySelector(".inputField input");
const addBtn = document.querySelector(".inputField button");
const todoList = document.querySelector(".todoList");

function createWrappers() {
  var wrappers = [];
  let appTitles = ["Todo 1", "Todo 2", "Todo 3"];

  for (let i = 0; i < 3; ++i) {
    let wrapper = document.createElement("div");
    wrapper.className = "wrapper inline-block-child";

    wrapper.className += " wrapper" + i;

    let header = document.createElement("header");
    header.innerHTML = appTitles[i];

    let inputField = document.createElement("div");
    inputField.className = "inputField";

    let input = document.createElement("input");
    input.setAttribute("type", "text");
    input.setAttribute("placeholder", "Add your new todo");

    let addButton = document.createElement("button");
    let addButtonIcon = document.createElement("i");
    addButtonIcon.classList = "fas fa-plus";
    addButton.appendChild(addButtonIcon);

    inputField.appendChild(input);
    inputField.appendChild(addButton);

    let todoList = document.createElement("ul");
    todoList.className = "todoList";

    let footer = document.createElement("div");
    footer.classList = "footer";

    let pendingTasks = document.createElement("span");
    let pendingTasksNumber = document.createElement("span");
    pendingTasksNumber.innerHTML = "0";
  
    pendingTasksNumber.classList = "pendingTasks";
    
    pendingTasks.innerHTML += "You have ";
    pendingTasks.appendChild(pendingTasksNumber);
    pendingTasks.innerHTML += " pending tasks";


    let clearButton = document.createElement("button");
    clearButton.classList = "clear";
    clearButton.innerHTML = "Clear All";

    clearButton.addEventListener("click", function() {
      let tasksList = this.parentElement.parentElement.children[2];
      let numberOfTasks =this.parentElement.parentElement.children[3].children[0].children[0];
      numberOfTasks.innerHTML = "0";
      tasksList.innerHTML = "";
      this.classList.remove("active");
      
    });

    footer.appendChild(pendingTasks);
    footer.appendChild(clearButton);

    wrapper.appendChild(header);
    wrapper.appendChild(inputField);
    wrapper.appendChild(todoList);
    wrapper.appendChild(footer);

    wrappers.push(wrapper);
  }

  const mainContainer = document.getElementById("mainContainer");

  for (let i = 0; i < 3; ++i) {
    mainContainer.appendChild(wrappers[i]);
  }
}

createWrappers();

let wrappers = document.getElementsByClassName("wrapper");

for (let i = 0; i < wrappers.length; ++i) {
  wrappers[i].onkeyup = ()=>{
    let inputBox = wrappers[i].children[1].children[0];
    let userEnteredValue = inputBox.value; //getting user entered value
    if(userEnteredValue.trim() != 0){ //if the user value isn't only spaces
      wrappers[i].children[1].children[1].classList.add("active"); //active the add button
    }else{
      wrappers[i].children[1].children[1].classList.remove("active"); //unactive the add button
    }
  }

  wrappers[i].children[1].children[1].onclick = ()=> { //when user click on plus icon button
    let inputBox = wrappers[i].children[1].children[0];
    let userEnteredValue = inputBox.value; //getting input field value
    let listArray = wrappers[i].children[2];
    let listElem = document.createElement("li");
    listElem.classList = "align-center";
    let pendingTasksNumber = wrappers[i].children[3].children[0].children[0];
    let clearButton = wrappers[i].children[3].children[1];
    let listElemName = document.createElement("span");
    listElemName.innerHTML = userEnteredValue;

    let deleteSpan = document.createElement("span");
    deleteSpan.classList = "icon";

    deleteSpan.addEventListener("click", function() {
      let parent = this.parentElement.parentElement;
      parent.removeChild(this.parentElement);
      pendingTasksNumber.innerHTML = listArray.children.length;

      if (listArray.children.length > 0) { //if array length is greater than 0
        clearButton.classList += " active"; //active the delete button
      } else {
        clearButton.classList.remove("active"); //unactive the delete button
      }
    })

    let deleteIcon = document.createElement("i");
    deleteIcon.classList = "fas fa-trash";

    deleteSpan.appendChild(deleteIcon);
    listElem.appendChild(listElemName);
    listElem.appendChild(deleteSpan);

 
    let newLiTag = "";
    let listFromChildren = Array.from(listArray);
  
    listFromChildren.forEach((element, index) => {
      newLiTag += ``;
    });


    listArray.appendChild(listElem); //pushing or adding new value in array
    pendingTasksNumber.innerHTML = listArray.children.length;

    if (listArray.children.length > 0) { //if array length is greater than 0
      clearButton.classList += " active"; //active the delete button
    } else {
      clearButton.classList.remove("active"); //unactive the delete button
    }

    wrappers[i].children[1].children[0].value = "";
  }
}
