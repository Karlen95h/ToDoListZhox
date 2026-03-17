const studentName = localStorage.getItem("studentName");
document.getElementById("student-name").innerText = studentName;

const addBtn = document.getElementById("add-btn");
const taskInput = document.getElementById("task-input");
const deadlineInput = document.getElementById("task-deadline");
const subjectInput = document.getElementById("task-subject");
const courseInput = document.getElementById("task-course"); // ՆՈՐ
const taskList = document.getElementById("task-list");


const courses = {
    economics: ["Տնտեսագիտություն", "Հաշվապահություն", "Մաթեմատիկա"],
    humanities: ["Հայոց լեզու", "Պատմություն", "Աշխարհագրություն"],
    science: ["Կենսաբանություն", "Քիմիա", "Ֆիզիկա"],
    physmath: [ "Ֆիզիկա"],
    ai: ["Ֆիզիկա", "Python", "ԱԲ", "Ռուսաց լեզու", "Բնագիտություն", "Արվեստ"]
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


// ➕ Ավելացնել task
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

    const li = document.createElement("li");

    li.classList.add(subject);

    li.innerHTML = `
        <div>
            <input type="checkbox" class="complete">
            <strong>${taskText}</strong><br>
            <small>${course} | ${deadline}</small>
        </div>

        <button class="delete-btn">✖</button>
    `;

    taskList.appendChild(li);

    checkReminder(deadline, taskText);

    taskInput.value = "";
    deadlineInput.value = "";
    courseInput.innerHTML = '<option value="">Ընտրեք առարկան</option>';

});


// ❌ Ջնջել + ✅ complete
taskList.addEventListener("click", function (e) {

    if (e.target.classList.contains("delete-btn")) {
        e.target.parentElement.remove();
    }

    if (e.target.classList.contains("complete")) {
        e.target.parentElement.classList.toggle("completed");
    }

});


// ⏰ հիշեցում
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
