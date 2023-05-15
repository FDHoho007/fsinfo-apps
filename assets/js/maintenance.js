function updateMaintenanceStatus() {
    let e = document.getElementById("maintenance");
    let date = new Date();
    if (date.getDay() === 6 && date.getHours() >= 13 && date.getHours() < 17) {
        if (!e.classList.contains("on"))
            e.classList.add("on");
    } else if (e.classList.contains("on"))
        e.classList.remove("on");
}

updateMaintenanceStatus();
setInterval(updateMaintenanceStatus, 60 * 1000);
