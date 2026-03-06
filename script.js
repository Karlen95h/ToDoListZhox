const studentName = localStorage.getItem("studentName");
document.getElementById("student-name").innerText = studentName;

const addBtn = document.getElementById("add-btn");
const taskInput = document.getElementById("task-input");
const deadlineInput = document.getElementById("task-deadline");
const subjectInput = document.getElementById("task-subject");
const taskList = document.getElementById("task-list");


addBtn.addEventListener("click", function () {

    const taskText = taskInput.value;
    const deadline = deadlineInput.value;
    const subject = subjectInput.value;

    if (taskText === "") {
        alert("Գրեք հանձնարարությունը");
        return;
    }

    const li = document.createElement("li");

    li.classList.add(subject);

    li.innerHTML = `
        <div>
            <input type="checkbox" class="complete">
            <strong>${taskText}</strong><br>
            <small>${subject.toUpperCase()} | ${deadline}</small>
        </div>

        <button class="delete-btn">✖</button>
    `;

    taskList.appendChild(li);

    checkReminder(deadline, taskText);

    taskInput.value = "";
    deadlineInput.value = "";

});


taskList.addEventListener("click", function (e) {

    if (e.target.classList.contains("delete-btn")) {
        e.target.parentElement.remove();
    }

    if (e.target.classList.contains("complete")) {
        e.target.parentElement.classList.toggle("completed");
    }

});


function checkReminder(deadline, taskText) {

    const deadlineTime = new Date(deadline).getTime();
    const now = new Date().getTime();

    const diff = deadlineTime - now;

    if (diff > 0) {

        setTimeout(function () {

            alert("Հիշեցում ⚠️\n\nՀանձնարարություն՝ " + taskText);
       
        }, diff);

    }

}
