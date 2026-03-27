// GET ELEMENTS
const input = document.getElementById("scoreInput");
const button = document.getElementById("submitBtn");
const resetBtn = document.getElementById("resetBtn");

const totalEntries = document.getElementById("totalEntries");
const activityList = document.getElementById("activityList");

// LOAD DATA FROM STORAGE
let entries = Number(localStorage.getItem("entries")) || 0;
let activities = JSON.parse(localStorage.getItem("activities")) || [];

// APPLY DATA TO UI 
totalEntries.textContent = entries;
renderActivities();

// EVENT LISTENER
button.addEventListener("click", addScore);

input.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
        addScore();
    }
})

resetBtn.addEventListener("click", resetDashboard);

// ADD SCORE
function addScore() {
    const score = input.value.trim();
    const date = document.getElementById("dateInput").value;

    // VALIDATION
    if (!score) {
        alert("Please enter a score");
        return;
    }

    if (score < 1 || score > 45) {
        alert("Score must be between 1 and 45");
        return;
    }

    if (!date) {
        alert("Please select a date");
        return;
    }

    // UPDATE ENTRIES
    entries++;

    // ADD ACTIVITY WITH DATE
    const newActivity = {
        score: score,
        date: date,
        text: "⛳ Score " + score + " submitted on " + date
    };
    activities.unshift(newActivity);

    // LIMIT TO 5
    if (activities.length > 5) {
        activities.pop();
    }

    updateUI();
    saveData();

    input.value = "";
    document.getElementById("dateInput").value = "";
}

// UPDATE UI
function updateUI() {
    totalEntries.textContent = entries;
    renderActivities();
}

// RENDER LIST
function renderActivities() {
    activityList.innerHTML = "";

    if (activities.length === 0) {
        activityList.innerHTML = "<li class='empty-msg'>🏌️ No scores yet — submit your first score to get started!</li>";
        return;
    }

    activities.forEach(item => {
        const li = document.createElement("li");
        li.textContent = item.text;
        activityList.appendChild(li);
    });
}

// SAVE TO LOCAL STORAGE
function saveData() {
    localStorage.setItem("entries", entries);
    localStorage.setItem("activities", JSON.stringify(activities));
}

// Clear Data
function resetDashboard() {

    const confirmReset = confirm("Are you sure you want to clear all data?");

    if (!confirmReset) return;

    // RESET STATE
    entries = 0;
    activities = [];

    // UPDATE UI
    updateUI();

    // CLEAR STORAGE
    localStorage.removeItem("entries");
    localStorage.removeItem("activities");
}

