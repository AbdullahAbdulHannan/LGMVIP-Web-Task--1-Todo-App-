const taskInput = document.getElementById("taskInput");
    const addButton = document.getElementById("addButton");
    const taskList = document.getElementById("taskList");
    function eventListenersAttachment(taskItem){

      // editButton.addEventListener('click',()=>{
        const spanInp = taskItem.querySelector('span');
          const editButton = taskItem.querySelector(".edit-button");
          
          editButton.addEventListener('click', () => {
            if (editButton.textContent === 'Edit') {
              const editInput = document.createElement("input");
              editInput.type = "text";
              editInput.value = spanInp.textContent;
              editInput.className = "edited-value";
              spanInp.innerHTML = "";
              spanInp.appendChild(editInput);
        editButton.textContent = 'Save';
      } else {
        const editInput = taskItem.querySelector(".edited-value");
        const newTaskText = editInput.value.trim();
        const taskSpan = taskItem.querySelector("span");
        taskSpan.textContent = newTaskText;
        editButton.textContent = "Edit";
      }
      
      localStorage.setItem('todo',taskList.innerHTML)
    })
    const deleteButton=taskItem.querySelector(".delete-button");
    deleteButton.addEventListener('click',()=>{
      taskList.removeChild(taskItem);
      localStorage.setItem('todo',taskList.innerHTML)
    });
    const completedCheckbox = taskItem.querySelector(".completed-checkbox");
    completedCheckbox.addEventListener("change", function() {
      const taskSpan = taskItem.querySelector("span");
      if (completedCheckbox.checked) {
        taskSpan.style.textDecoration = "line-through";
      } else {
        taskSpan.style.textDecoration = "none";
      }
      localStorage.setItem('todo',taskList.innerHTML)
      
    });
  }
  if(localStorage.getItem('todo')){
    taskList.innerHTML=localStorage.getItem('todo')
    const loadedTaskItems = taskList.querySelectorAll(".task-item");
    loadedTaskItems.forEach(taskItem => {
    eventListenersAttachment(taskItem); 
  });
}
  addButton.addEventListener('click',()=>{
    if(taskInput.value!=""){
      const taskItem = document.createElement("li");
      taskItem.classList.add("task-item");
      taskItem.innerHTML = `
      <input type="checkbox" class="completed-checkbox">
      <span>${taskInput.value}</span>
      <button class="delete-button">Delete</button>
      <button class="edit-button">Edit</button>
      `;
      eventListenersAttachment(taskItem); 
      taskList.appendChild(taskItem);
      taskInput.value=" "
      localStorage.setItem('todo',taskList.innerHTML)
    }
  });