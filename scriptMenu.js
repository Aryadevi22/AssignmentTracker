// JavaScript for Sidebar Toggle
document.getElementById('menu-toggle').addEventListener('click', function () {
    document.getElementById('sidebar').style.left = '0'; // Slide in the sidebar
});

document.getElementById('close-button').addEventListener('click', function () {
    document.getElementById('sidebar').style.left = '-250px'; // Slide out the sidebar
});
