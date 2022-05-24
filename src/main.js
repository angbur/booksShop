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
let linkHomeSignet = document.createElement('a');
linkHomeSignet.setAttribute("href", "https://angbur.github.io/booksShop/");
linkHomeSignet.appendChild(logoSignet);
span1.appendChild(linkHomeSignet);

let logoText = document.createElement('h1');
let linkHome = document.createElement('a');
linkHome.innerHTML = `Awesome Books Shop`;
linkHome.setAttribute("href", "https://angbur.github.io/booksShop/");
logoText.appendChild(linkHome);
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

let params = new URLSearchParams(window.location.search);
let paramsStreet = '';
let paramsHouse = '';
let paramsFlat = '';
let paramsFirstName = '';
let paramsLastName = '';

for (const param of params) {
    if (param[0]==='street') { paramsStreet = param[1]};
    if (param[0]==='house') { paramsHouse = param[1]};
    if (param[0]==='flat') { paramsFlat = param[1]};
    if (param[0]==='firstName') { paramsFirstName= param[1]};
    if (param[0]==='lastName') { paramsLastName = param[1]};
  }

if (params.get('firstName')) {
    let confirmBox = document.createElement('div');
    confirmBox.setAttribute('class', 'confirm-box');

    const paragraph = document.createElement('p');
    paragraph.innerHTML = `The order created. The delivery address is: <br> <span class="address"> ${paramsStreet} house ${paramsHouse} flat ${paramsFlat} </span>.`
    
    const paragraph2 = document.createElement('p');
    paragraph2.innerHTML = `Customer: <br> <span class="address"> ${paramsFirstName} ${paramsLastName}</span>.`

    confirmBox.appendChild(paragraph);
    confirmBox.appendChild(paragraph2);
    appDiv.append(confirmBox);

} else {
    appDiv.append(showCatalog());
}



let footer = document.createElement("footer");
document.body.appendChild(footer);
