const links = document.getElementById("links");

const categories = [
    {
        id: "general",
        title: "Fachschaft"
    },
    {
        id: "protokoll",
        title: "Protokoll-Team"
    },
    {
        id: "klausuren",
        title: "Klausuren-Team"
    },
    {
        id: "social",
        title: "Social-Team"
    },
    {
        id: "finance",
        title: "Finanz-Team"
    },
    {
        id: "admins",
        title: "Admins-Team"
    },
    {
        id: "custom",
        title: "Kreationen von Fachschaftlern"
    }
];

function clearLinks() {
    while (links.children.length > 0)
        links.children[0].remove();
}

function buildCategories() {
    for (let category of categories) {
        let li = document.createElement("li");
        li.classList.add("link-category");
        let a = document.createElement("a");
        a.innerText = category.title;
        li.appendChild(a);
        let ul = document.createElement("ul");
        ul.id = category.id;
        ul.style.maxHeight = "3000px";
        li.appendChild(ul);
        a.onclick = () => {
            if (ul.style.maxHeight) {
                ul.style.maxHeight = null;
                a.classList.add("collapsed");
            } else {
                ul.style.maxHeight = "3000px";
                a.classList.remove("collapsed");
            }
        };
        links.appendChild(li);
        // Add to settings menu
        li = document.createElement("li");
        let checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.id = "settings-disabled-apps-" + category.id;
        li.appendChild(checkbox);
        let label = document.createElement("label");
        label.setAttribute("for", "settings-disabled-apps-" + category.id);
        label.innerText = category.title;
        li.appendChild(label);
        let ul2 = document.createElement("ul");
        ul2.id = "settings-disabled-apps-category-" + category.id;
        li.appendChild(ul2);
        checkbox.onclick = () => {
            for (let e of ul2.querySelectorAll("input[type=checkbox]"))
                e.checked = checkbox.checked;
        }
        document.getElementById("settings-disabled-apps").appendChild(li);
    }
}

function updateCategory(category) {
    let empty = true;
    for (let li of category.querySelectorAll("ul li"))
        if (li.style.display === "")
            empty = false;
    category.style.display = empty ? "none" : "";
}

function updateSettingsCategory(c, settingsCategory) {
    let full = true;
    for (let cb of settingsCategory.querySelectorAll("input[type=checkbox]"))
        if (!cb.checked)
            full = false;
    document.getElementById("settings-disabled-apps-" + c).checked = full;
}

function buildLinks(links) {
    for (let c of Object.keys(links)) {
        let category = document.getElementById(c);
        let settingsCategory = document.getElementById("settings-disabled-apps-category-" + c);
        if (category != null && category.parentElement.classList.contains("link-category")) {
            for (let link of links[c]) {
                let li = document.createElement("li");
                li.id = "link-" + c + "-" + link.id;
                let a = document.createElement("a");
                a.href = link.url;
                let i = document.createElement("i");
                i.classList.add("bi");
                if (link.icon !== "")
                    i.classList.add("bi-" + link.icon);
                a.appendChild(i);
                let div = document.createElement("div");
                let div1 = document.createElement("div");
                div1.innerText = link.title;
                div.appendChild(div1);
                let div2 = document.createElement("div");
                div2.classList.add("description");
                div2.innerText = link.description;
                div.appendChild(div2);
                a.appendChild(div);
                li.appendChild(a);
                li.style.display = isDisabled(c, link.id) ? "none" : "";
                updateCategory(category.parentElement);
                category.appendChild(li);
                // Add to settings menu
                li = document.createElement("li");
                let checkbox = document.createElement("input");
                checkbox.type = "checkbox";
                checkbox.id = "settings-disabled-apps-app-" + c + "-" + link.id;
                checkbox.checked = isDisabled(c, link.id);
                checkbox.setAttribute("app", link.id);
                checkbox.onclick = () => updateSettingsCategory(c, settingsCategory);
                li.appendChild(checkbox);
                let label = document.createElement("label");
                label.setAttribute("for", "settings-disabled-apps-app-" + c + "-" + link.id);
                label.innerText = link.title;
                li.appendChild(label);
                settingsCategory.appendChild(li);
            }
            updateSettingsCategory(c, settingsCategory);
        }
    }
}

if (location.pathname === "/") {
    clearLinks();
    buildCategories();
    fetch("links.json").then(r => r.json()).then(links => {
        buildLinks(links);
    });
} else
    location.href = "https://fsinfo.fim.uni-passau.de" + location.pathname;
