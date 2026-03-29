const studentName = localStorage.getItem("studentName");
document.getElementById("student-name").innerText = studentName;

const addBtn = document.getElementById("add-btn");
const taskInput = document.getElementById("task-input");
const deadlineInput = document.getElementById("task-deadline");
const subjectInput = document.getElementById("task-subject");
const courseInput = document.getElementById("task-course");
const taskList = document.getElementById("task-list");



const courses = {
    economics: ["Տնտեսագիտություն", "Հանրահաշիվ", "Երկրաչափություն", "Հայոց լեզու"],
    humanities: ["Հայոց լեզու", "Պատմություն", "Աշխարհագրություն"],
    science: ["Կենսաբանություն", "Քիմիա", "Ֆիզիկա"],
    physmath: ["Ֆիզիկա", "Մաթեմատիկա"],
    ai: ["Ֆիզիկա", "Python", "ԱԲ", "Ռուսաց լեզու"]
};



const books = {
    "Հանրահաշիվ": "https://fliphtml5.com/fumf/ijfc/%D5%80%D5%A1%D5%B6%D6%80%D5%A1%D5%B0%D5%A1%D5%B7%D5%AB%D5%BE_%D6%87_%D5%B4%D5%A1%D5%A9%D5%A5%D5%B4%D5%A1%D5%BF%D5%AB%D5%AF%D5%A1%D5%AF%D5%A1%D5%B6_%D5%A1%D5%B6%D5%A1%D5%AC%D5%AB%D5%A6%D5%AB_%D5%BF%D5%A1%D6%80%D6%80%D5%A5%D6%80_10/",
    "Երկրաչափություն":"https://fliphtml5.com/fumf/ogkr/%D4%B5%D5%90%D4%BF%D5%90%D4%B1%D5%89%D4%B1%D5%93%D5%88%D5%92%D4%B9%D5%85%D5%88%D5%92%D5%86_10/",
    "Հայոց լեզու": "https://fliphtml5.com/fumf/tmxo/%D5%80%D4%B1%D5%85%D5%88%D5%91_%D4%BC%D4%B5%D4%B6%D5%88%D5%92_10%2C_%D5%B0%D5%B8%D6%82%D5%B4%D5%A1%D5%B6%D5%AB%D5%BF%D5%A1%D6%80_%D5%B0%D5%B8%D5%BD%D6%84%D5%AB_%D5%B0%D5%A1%D5%B4%D5%A1%D6%80/"
};



subjectInput.addEventListener("change", function () {

    const selected = this.value;
    courseInput.innerHTML = '<option value="">Ընտրեք առարկան</option>';

    if (courses[selected]) {
        courses[selected].forEach(course => {
            const option = document.createElement("option");
            option.value = course;
            option.textContent = course;
            courseInput.appendChild(option);
        });
    }

});



addBtn.addEventListener("click", function () {

    const taskText = taskInput.value;
    const deadline = deadlineInput.value;
    const subject = subjectInput.value;
    const course = courseInput.value;

    if (taskText === "") {
        alert("Գրեք հանձնարարությունը");
        return;
    }

    if (course === "") {
        alert("Ընտրեք առարկան");
        return;
    }

    createTask(taskText, deadline, subject, course);

    taskInput.value = "";
    deadlineInput.value = "";
    courseInput.innerHTML = '<option value="">Ընտրեք առարկան</option>';

    saveTasks();
    updateStats();
});


function createTask(taskText, deadline, subject, course) {

    const li = document.createElement("li");
    li.classList.add(subject);

    li.innerHTML = `
        <div>
            <input type="checkbox" class="complete">
            <strong>${taskText}</strong><br>
            <small>${course} | ${deadline}</small><br>
            <button class="book-btn">📖 Գիրք</button>
        </div>
        <button class="delete-btn">✖</button>
    `;

    taskList.appendChild(li);

    // ⏰ deadline check
    const now = new Date().getTime();
    const deadlineTime = new Date(deadline).getTime();

    if (deadlineTime < now) {
        li.classList.add("overdue");
    }

    checkReminder(deadline, taskText);
}


taskList.addEventListener("click", function (e) {

    if (e.target.classList.contains("delete-btn")) {
        e.target.parentElement.remove();
        saveTasks();
        updateStats();
    }

    if (e.target.classList.contains("complete")) {
        e.target.parentElement.classList.toggle("completed");
        saveTasks();
        updateStats();
    }

    if (e.target.classList.contains("book-btn")) {

        const course = e.target.parentElement
            .querySelector("small")
            .innerText.split(" | ")[0];

        if (books[course]) {
            window.open(books[course], "_blank");
        } else {
            alert("📚 Գիրք դեռ չկա այս առարկայի համար");
        }
    }

});


function updateStats() {
    const tasks = document.querySelectorAll("#task-list li");
    const completed = document.querySelectorAll(".completed");

    document.getElementById("total").innerText = tasks.length;
    document.getElementById("done").innerText = completed.length;
    document.getElementById("pending").innerText = tasks.length - completed.length;
}


// 💾 SAVE
function saveTasks() {
    localStorage.setItem("tasks", taskList.innerHTML);
}


function loadTasks() {

    taskList.innerHTML = localStorage.getItem("tasks") || "";

    document.querySelectorAll("#task-list li").forEach(li => {

        const div = li.querySelector("div");

        if (!li.querySelector(".book-btn")) {

            const btn = document.createElement("button");
            btn.className = "book-btn";
            btn.innerText = "📖 Գիրք";

            div.appendChild(document.createElement("br"));
            div.appendChild(btn);
        }

    });

    updateStats();
}

loadTasks();


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
