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
        li.appendChild(ul);
        a.onclick = () => {
            if(ul.style.maxHeight) {
                ul.style.maxHeight = null;
                a.classList.add("collapsed");
            }
            else {
                ul.style.maxHeight = ul.scrollHeight + "px";
                a.classList.remove("collapsed");
            }
        };
        links.appendChild(li);
    }
}

function buildLinks(links) {
    for (let c of Object.keys(links)) {
        let category = document.getElementById(c);
        if (category != null && category.parentElement.classList.contains("link-category")) {
            for (let link of links[c]) {
                let li = document.createElement("li");
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
                category.appendChild(li);
            }
        }
    }
}

if(location.pathname === "/") {
    clearLinks();
    buildCategories();
    setTimeout(() => {
        for (let ul of document.querySelectorAll(".link-category ul"))
            ul.style.maxHeight = ul.scrollHeight + "px";
    }, 500);

    fetch("links.json").then(r => r.json()).then(links => {
        buildLinks(links);
    });
}
else
    location.href = "https://fsinfo.fim.uni-passau.de" + location.pathname;
