let elem = document.createElement("div");
elem.innerHTML = " <link rel='stylesheet' href='https://yajgodwin.github.io/web-dev/header.css'>";
document.body.prepend(elem);

fetch("https://yajgodwin.github.io/web-dev/global-header.html")
.then((result) => result.text())
.then((text) => {elem.innerHTML = elem.innerHTML + text;})
.error((e) => console.error(e));
