const start = document.getElementById("start");
const stop = document.getElementById("stop");
const reset = document.getElementById("reset");
const timer = document.getElementById("timer");

let timeleft = 1500; // 25 minutes in seconds
let interval = null;

// Function to update the timer display
const updateTimer = () => {
    const minutes = Math.floor(timeleft / 60); // Get minutes
    const seconds = timeleft % 60; // Get seconds
    timer.innerHTML = `${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
};

// Start the timer
const startTimer = () => {
    if (!interval) { // Avoid multiple intervals
        interval = setInterval(() => {
            timeleft--; // Decrease by 1 second
            updateTimer(); // Update the display

            // When time reaches 0
            if (timeleft === 0) {
                clearInterval(interval); // Stop the timer
                interval = null; // Reset the interval variable
                alert("Time's up!");
                timeleft = 1500; // Reset to 25 minutes
                updateTimer(); // Update the display
            }
        }, 1000); // Update every second (1000 ms)
    }
};

// Stop the timer
const stopTimer = () => {
    clearInterval(interval);
    interval = null; // Reset the interval variable
};

// Reset the timer
const resetTimer = () => {
    clearInterval(interval);
    interval = null; // Reset the interval variable
    timeleft = 1500; // Reset to 25 minutes
    updateTimer(); // Update the display
};

// Add event listeners to buttons
start.addEventListener("click", startTimer);
stop.addEventListener("click", stopTimer);
reset.addEventListener("click", resetTimer);

// Initial timer update on page load
updateTimer();
