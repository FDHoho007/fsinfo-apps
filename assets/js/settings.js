function openSettings() {
    document.getElementById("settings-overlay").style.display = "";
    setTimeout(() => document.getElementById("settings-overlay").classList.remove("hidden"), 10);
    for (let option of document.getElementById("settings-theme").children)
        option.selected = option.value === getTheme();
}

function closeSettings() {
    document.getElementById("settings-overlay").classList.add("hidden");
    setTimeout(() => document.getElementById("settings-overlay").style.display = "none", 600);
}

function saveTheme() {
    let date = new Date();
    date.setTime(date.getTime() + 10 * 356 * 24 * 60 * 60 * 1000);
    document.cookie = "theme=" + document.getElementById("settings-theme").value + "; expires=" + date.toUTCString() + "; path=/";
    loadTheme();
}

function getTheme() {
    for (let cookie of document.cookie.split("; "))
        if (cookie.split("=")[0] === "theme")
            return cookie.split("=")[1];
    return null;
}

function loadTheme() {
    if (getTheme() === "dark")
        document.body.classList.add("theme-dark");
    else
        document.body.classList.remove("theme-dark");
}

loadTheme();

function saveDisabledApps() {
    let disabledApps = {};
    for (let category of categories) {
        disabledApps[category.id] = [];
        for (let cb of document.getElementById("settings-disabled-apps-category-" + category.id).querySelectorAll("input[type=checkbox]")) {
            if (cb.checked)
                disabledApps[category.id].push(cb.getAttribute("app"));
            let link = document.getElementById("link-" + category.id + "-" + cb.getAttribute("app"));
            link.style.display = cb.checked ? "none" : "";
            updateCategory(link.parentElement.parentElement);
        }
    }
    localStorage.setItem("disabled-apps", JSON.stringify(disabledApps));
}

function isDisabled(category, app) {
    return localStorage.getItem("disabled-apps") != null && JSON.parse(localStorage.getItem("disabled-apps"))[category].includes(app);
}
