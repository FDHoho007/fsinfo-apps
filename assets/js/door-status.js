fetch("https://fsinfo.fim.uni-passau.de/buero-schild").then(r => r.text()).then(r => {
    let e = document.getElementById("door-status");
    switch (r.trim()) {
        case "0": e.classList.add("bi-door-closed"); break;
        case "1": e.classList.add("bi-door-open"); break;
        default: console.error("Unexpected result from buero-schild: " + r); break;
    }
});
