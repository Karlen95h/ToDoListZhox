const loginBtn = document.getElementById("login-btn");

loginBtn.addEventListener("click", function () {

    const studentName = document.getElementById("student-name-input").value;

    if(studentName === ""){
        alert("Խնդրում ենք գրեք ձեր անունը");
        return;
    }

    // պահում ենք անունը
    localStorage.setItem("studentName", studentName);

    // տեղափոխվում ենք todo էջ
    window.location.href = "todo.html";

});
