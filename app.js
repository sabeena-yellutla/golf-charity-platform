// GET ELEMENTS
const input = document.getElementById("scoreInput");
const button = document.getElementById("submitBtn");
const resetBtn = document.getElementById("resetBtn");

const totalEntries = document.getElementById("totalEntries");
const activityList = document.getElementById("activityList");
const totalWins = document.getElementById("totalWins");

// LOAD DATA FROM STORAGE
let entries = localStorage.getItem("entries") || 0;
let activities = JSON.parse(localStorage.getItem("activities")) || [];
let wins = Number(localStorage.getItem("wins")) || 0;

// APPLY DATA TO UI 
totalEntries.textContent = entries;
totalWins.textContent = wins;
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

    if (score === "") {
        alert("Please enter a score");
        return;
    }

    // UPDATE ENTRIES
    entries++;

    // ADD ACTIVITY
    const newActivity = winMessage(score);
    activities.unshift(newActivity);

    // LIMIT TO 5
    if (activities.length > 5) {
        activities.pop();
    }

    updateUI();
    saveData();

    input.value = "";
}

// Win 
function winMessage(score) {
    if (Number(score) <= 50) {
        wins++;
        return "🎉 Score " + score + " submitted — You won!";
    } else {
        return "Score " + score + " submitted";
    }
}

// UPDATE UI
function updateUI() {
    totalEntries.textContent = entries;
    totalWins.textContent = wins;
    renderActivities();
}

// RENDER LIST
function renderActivities() {
    activityList.innerHTML = "";

    activities.forEach(item => {
        const li = document.createElement("li");
        li.textContent = item;
        activityList.appendChild(li);
    });
}

// SAVE TO LOCAL STORAGE
function saveData() {
    localStorage.setItem("entries", entries);
    localStorage.setItem("activities", JSON.stringify(activities));
    localStorage.setItem("wins", wins);
}

// Clear Data
function resetDashboard() {

    const confirmReset = confirm("Are you sure you want to clear all data?");

    if (!confirmReset) return;

    // RESET STATE
    entries = 0;
    wins = 0;
    activities = [];

    // UPDATE UI
    updateUI();

    // CLEAR STORAGE
    localStorage.removeItem("entries");
    localStorage.removeItem("wins");
    localStorage.removeItem("activities");
}

