document.addEventListener("DOMContentLoaded", function () {
    const pendingCourses = document.querySelectorAll(".accept-btn, .decline-btn");

    pendingCourses.forEach(button => {
        button.addEventListener("click", function () {
            let courseTile = this.parentElement;
            let action = this.classList.contains("accept-btn") ? "accept" : "decline";

            if (action === "accept") {
                let enrolledTable = document.querySelector("#courses");
                let newRow = document.createElement("td");
                newRow.innerHTML = courseTile.innerHTML.replace(/<button.*?>.*?<\/button>/g, ""); // Remove buttons
                enrolledTable.appendChild(newRow);
            }

            courseTile.parentElement.removeChild(courseTile);
        });
    });
});
