document.addEventListener("DOMContentLoaded", function () {
    console.log("Script Loaded"); 

    
    const loginForm = document.getElementById("login-form");
    const loginButton = document.getElementById("login-button");
    const messageBox = document.getElementById("message-box");

    if (!loginForm) {
        console.error("Login form not found!");
        return;
    }

    loginButton.addEventListener("click", function () {
        loginForm.dispatchEvent(new Event("submit", { cancelable: true, bubbles: true }));
    });

    loginForm.addEventListener("submit", async function (event) {
        event.preventDefault(); 

        const username = document.getElementById("username").value.trim();
        const password = document.getElementById("password").value.trim();

        if (!username || !password) {
            showMessage("error", "Please enter both username and password.");
            return;
        }

        try {
            console.log("Fetching users...");
            const response = await fetch("https://jsonplaceholder.typicode.com/users");
            if (!response.ok) throw new Error("API request failed");

            const users = await response.json();
            console.log("Users received:", users);

            const user = users.find(u => u.username === username && u.email === password);

            if (user) {
                showMessage("success", "Login successful! Redirecting...");
                setTimeout(() => {
                    window.location.href = "course_view.html";
                }, 2000);
            } else {
                showMessage("error", "Invalid username or password.");
            }
        } catch (error) {
            console.error("Login error:", error);
            showMessage("error", "An error occurred. Please try again.");
        }
    });

    function showMessage(type, message) {
        if (!messageBox) {
            console.error("Message box not found!");
            return;
        }
        messageBox.textContent = message;
        messageBox.className = type;
        messageBox.style.display = "block";

        setTimeout(() => {
            messageBox.style.display = "none";
        }, 3000);
    }

    
    const pendingCourses = document.querySelectorAll(".accept-btn, .decline-btn");

    pendingCourses.forEach(button => {
        button.addEventListener("click", function () {
            let courseTile = this.parentElement;
            let action = this.classList.contains("accept-btn") ? "accept" : "decline";

            if (action === "accept") {
                let enrolledTable = document.querySelector("#courses tbody"); 
                let newRow = document.createElement("tr"); 
                let newCell = document.createElement("td");

                newCell.innerHTML = courseTile.innerHTML.replace(/<button.*?>.*?<\/button>/g, ""); 
                newRow.appendChild(newCell);
                enrolledTable.appendChild(newRow);
            }

            courseTile.remove(); 
        });
    });


    let timeLeft = 600; 
    const timerElement = document.getElementById("timer");

    if (timerElement) {
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
    }

  
    const submitButton = document.querySelector(".submit-btn");
    if (submitButton) {
        submitButton.addEventListener("click", submitQuiz);
    }

    function submitQuiz() {
        let score = 0;

        
        let q1Answer = document.querySelector('input[name="q1"]:checked');
        if (!q1Answer) {
            alert("Please answer Question 1.");
            return;
        } else if (q1Answer.value === "correct") {
            score += 50;
        }

        
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

        
        if (incorrectAnswers === 0) {
            score += correctAnswers * 25;
        }

        
        document.getElementById("scoreDisplay").textContent = `Your final score is: ${score}/100`;

        
        setTimeout(() => {
            window.location.href = "leadershipboard.html";
        }, 3000);



        
    }
});
