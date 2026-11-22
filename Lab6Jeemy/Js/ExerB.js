// Error 1 (grade.html, Line 9): Missing 'return' in onsubmit="checkMark()", causing the form to reload and wipe the result.
// Error 2 (grade.html, Line 17): Wrong function casing onclick="showtable()" instead of onclick="showTable()".
// Error 3 (grade.html, Line 19): Wrong script filename src="grades.js" instead of src="grade.js".
// Error 4 (grade.js, Line 5): Used assignment operator (name = "") instead of comparison (name === "").
// Error 5 (grade.js, Line 9): Misspelled function name isNan(mark) instead of isNaN(mark).
// Error 6 (grade.js, Line 14): Used logical AND (&&) instead of logical OR (||) for out-of-range check (mark < 0 || mark > 100).
// Error 7 (grade.js, Line 28): Misspelled method getElementByID("result") instead of getElementById("result").
// Error 8 (grade.js, Line 30): British spelling style.colour instead of style.color.
// Error 9 (grade.js, Line 31): Returned true at the end of checkMark(), allowing form submission to refresh the page.
// Error 10 (grade.js, Line 38): Loop started at i = 1 instead of i = 0, skipping Grade A in the table.
// Error 11 (grade.js, Line 42): Misspelled property innerHtml instead of innerHTML.

function checkMark() {
    let name = document.forms["gradeForm"]["name"].value.trim();
    let mark = document.forms["gradeForm"]["mark"].value.trim();

    // Check for empty name
    if (name === "") {
        alert("Name must be filled out.");
        return false;
    }

    // Part 2: Check for empty mark
    if (mark === "") {
        alert("Mark field cannot be empty.");
        return false;
    }

    // Check for non-numeric input
    if (isNaN(mark)) {
        alert("Please enter a valid numeric value.");
        return false;
    }

    mark = parseInt(mark);

    // Check if mark is within 0 to 100
    if (mark < 0 || mark > 100) {
        alert("Mark must be between 0 and 100.");
        return false;
    }

    // Determine grade and set corresponding text color
    let grade;
    let gradeColor;

    if (mark >= 80) {
        grade = "A";
        gradeColor = "green";
    } else if (mark >= 65) {
        grade = "B";
        gradeColor = "green";
    } else if (mark >= 50) {
        grade = "C";
        gradeColor = "orange";
    } else {
        grade = "F";
        gradeColor = "red";
    }

    // Display result and apply grade color
    const resultEl = document.getElementById("result");
    resultEl.innerHTML = name + " got grade " + grade;
    resultEl.style.color = gradeColor;

    // Part 2: Display date and time checked using Date()
    document.getElementById("checkedTime").innerHTML = "Checked on: " + Date();

    // Return false so the page does not reload and erase the result
    return false;
}

// Part 2: Generate a random integer from 0 to 100 and insert into mark input
function generateRandomMark() {
    const randomMark = Math.floor(Math.random() * 101);
    document.getElementById("mark").value = randomMark;
}

// Display all 4 grades in a table
function showTable() {
    let grades = ["A", "B", "C", "F"];
    let ranges = ["80-100", "65-79", "50-64", "0-49"];
    let tableHTML = "<table><tr><th>Grade</th><th>Mark range</th></tr>";

    for (let i = 0; i < grades.length; i++) {
        tableHTML += "<tr><td>" + grades[i] + "</td><td>" + ranges[i] + "</td></tr>";
    }

    tableHTML += "</table>";
    document.getElementById("tableContainer").innerHTML = tableHTML;
}
