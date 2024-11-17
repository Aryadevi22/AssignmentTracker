const tasksList = document.getElementById("tasks-list");
const searchBar = document.getElementById("search-bar");
const filterButtons = document.querySelectorAll(".filter");

function loadNotifications() {
  const notifications = JSON.parse(localStorage.getItem("notifications")) || [];
  tasksList.innerHTML = ""; // Clear current notifications

  notifications.forEach((notification) => {
    const task = document.createElement("div");
    task.classList.add("task");

    task.innerHTML = `
      <h3 class="task-title">${notification.title}</h3>
      <p class="task-time">${notification.time}</p>
      <p class="task-date">${notification.date}</p>
      <span class="task-type">${notification.type}</span>
    `;

    tasksList.appendChild(task);
  });
}

// Filter notifications
filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const filter = button.getAttribute("data-filter");
    document.querySelector(".filter.active").classList.remove("active");
    button.classList.add("active");

    const tasks = document.querySelectorAll(".task");
    tasks.forEach((task) => {
      if (filter === "all" || task.querySelector(".task-type").textContent === filter) {
        task.style.display = "block";
      } else {
        task.style.display = "none";
      }
    });
  });
});

// Search notifications
searchBar.addEventListener("input", () => {
  const searchValue = searchBar.value.toLowerCase();
  const tasks = document.querySelectorAll(".task");
  tasks.forEach((task) => {
    const title = task.querySelector(".task-title").textContent.toLowerCase();
    if (title.includes(searchValue)) {
      task.style.display = "block";
    } else {
      task.style.display = "none";
    }
  });
});

// Load notifications on page load
document.addEventListener("DOMContentLoaded", loadNotifications);