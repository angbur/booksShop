import { showCatalog } from "./catalog.js";

let header = document.createElement("header");
document.body.appendChild(header);

let nav = document.createElement("nav");
header.appendChild(nav);

let navbarWrapper = document.createElement("div");
navbarWrapper.setAttribute("class", "navbar-wrapper");
nav.appendChild(navbarWrapper);

let navbar = document.createElement("list");
navbar.setAttribute("class", "navbar");
nav.appendChild(navbar);

let logo = document.createElement('li');
let span1 = document.createElement('span');
let span2 = document.createElement('span');

let logoSignet = document.createElement('img');
logoSignet.setAttribute("src", "assets/icon/books.svg");
logoSignet.setAttribute("class", "logo-icon");
logoSignet.setAttribute("alt", "");
span1.appendChild(logoSignet);

let logoText = document.createElement('h1');
logoText.innerHTML = `Awesome Books Shop`;
span2.appendChild(logoText);

logo.append(span1);
logo.append(span2);
navbar.appendChild(logo);

const loginButton = document.createElement('li');
loginButton.setAttribute("class", "navbar-item")
loginButton.innerHTML = `Login`;
navbar.appendChild(loginButton);

let appDiv = document.createElement("div");
appDiv.setAttribute("id", "app")
document.body.appendChild(appDiv);
appDiv.append(showCatalog());

let footer = document.createElement("footer");
document.body.appendChild(footer);
