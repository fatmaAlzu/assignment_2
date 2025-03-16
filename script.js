document.addEventListener("DOMContentLoaded", function () {
    //login
    const loginForm = document.getElementById("login-form");
    const messageBox = document.getElementById("message-box");

    if (loginForm) {
        loginForm.addEventListener("submit", async function (event) {
            event.preventDefault();

            const username = document.getElementById("username").value;
            const password = document.getElementById("password").value;

            try {
                const response = await fetch("https://jsonplaceholder.typicode.com/users");
                const users = await response.json();

                const user = users.find(u => u.username === username && u.email === password);

                if (user) {
                    showMessage("success", "Login successful! Redirecting...");
                    setTimeout(() => {
                        window.location.href = "course_view.html";
                    }, 2000);
                } else {
                    showMessage("error", "Invalid credentials. Please try again.");
                }
            } catch (error) {
                showMessage("error", "An error occurred. Please try again.");
            }
        });

        function showMessage(type, message) {
            messageBox.textContent = message; 
            messageBox.className = type; 
            messageBox.classList.remove("hidden");

        }
    }
    // Exercise 1: Dynamic Enrollment
    const pendingCourses = document.querySelectorAll(".accept-btn, .decline-btn");

    pendingCourses.forEach(button => {
        button.addEventListener("click", function () {
            let courseTile = this.parentElement;
            let action = this.classList.contains("accept-btn") ? "accept" : "decline";

            if (action === "accept") {
                let enrolledTable = document.querySelector("#courses tbody"); // Ensure tbody exists
                let newRow = document.createElement("tr"); // Create a row
                let newCell = document.createElement("td");

                newCell.innerHTML = courseTile.innerHTML.replace(/<button.*?>.*?<\/button>/g, ""); // Remove buttons
                newRow.appendChild(newCell);
                enrolledTable.appendChild(newRow);
            }

            courseTile.remove(); // Remove from pending courses
        });
    });

    // Exercise 2: Quiz Timer
    let timeLeft = 600; // 10 minutes in seconds
    const timerElement = document.getElementById("timer");

    const countdown = setInterval(() => {
        let minutes = Math.floor(timeLeft / 60);
        let seconds = timeLeft % 60;
        timerElement.textContent = `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;

        if (timeLeft <= 0) {
            clearInterval(countdown);
            alert("Time's up! Redirecting to the leaderboard...");
            window.location.href = "leaderboard.html";
        }
        timeLeft--;
    }, 1000);

    // Exercise 2: Submit Quiz and Calculate Score
    document.querySelector(".submit-btn").addEventListener("click", submitQuiz);

    function submitQuiz() {
        let score = 0;

        // Question 1: Check if correct answer is selected
        let q1Answer = document.querySelector('input[name="q1"]:checked');
        if (!q1Answer) {
            alert("Please answer Question 1.");
            return;
        } else if (q1Answer.value === "correct") {
            score += 50;
        }

        // Question 2: Check selected checkboxes
        let checkboxes = document.querySelectorAll('input[type="checkbox"]');
        let correctAnswers = 0;
        let incorrectAnswers = 0;

        checkboxes.forEach((box) => {
            if (box.checked) {
                if (box.value === "correct") {
                    correctAnswers += 1;
                } else {
                    incorrectAnswers += 1;
                }
            }
        });

        // Award points for correct answers (+25 per correct checkbox)
        if (incorrectAnswers === 0) {
            score += correctAnswers * 25;
        }

        // Display Score
        document.getElementById("scoreDisplay").textContent = `Your final score is: ${score}/100`;

        // Redirect after 3 seconds
        setTimeout(() => {
            window.location.href = "leadershipboard.html";
        }, 3000);
    }
});
