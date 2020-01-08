const presentation = document.querySelector('.presentation');
const planet = document.querySelectorAll('[class$=planet]');
const map = document.querySelector('.map');
const go_back = document.querySelector('.go_back');
const info_button = document.querySelector('.info_button');
let all_planets = document.querySelectorAll("div[class*=planet]");

all_planets.forEach(element => element.classList.add("default_color"));

// MASQUE/AFFICHE PRESENTATION

presentation.style.display="none";

function show() {
  presentation.style.display="grid";
  map.style.display="none";
}
info_button.addEventListener('click', show);

let hide = () => {
  presentation.style.display="none";
  map.style.display="grid";
}
go_back.addEventListener('click', hide);

// SWITCH ENTRE FORM ET FORM_SUB

const form_sub = document.querySelector(".form_sub");
const form = document.querySelector(".form");
form_sub.style.display = "none";

function showForm_sub () {
  form.style.display = "none";
  form_sub.style.display = "initial";
}
all_planets.forEach(element => element.addEventListener('click', showForm_sub));

const back_to_form = document.querySelector(".back_to_form");

function goBackToForm () {
  form.style.display = "initial";
  form_sub.style.display = "none";
  let all_planets = document.querySelectorAll("div[class*=planet]");
  all_planets.forEach(element => element.classList.add("default_color"));
  all_planets.forEach(element => element.classList.remove("clicked_color"));
}
back_to_form.addEventListener('click', goBackToForm);

// AJOUTE DES FIRST_PLANETS

const create_planet = document.querySelector('.form > section > .crea');

function add_firstplanets() {
  const system = document.querySelector(".system");
  let new_planet = document.createElement("div");
  let new_container = document.createElement("div");
  let last_planet = document.querySelector('.last');
  let select_size = document.querySelector('.form > section > .select_size');
  let size = select_size.options[select_size.selectedIndex].value;
  let name_planet = document.createElement("h2");
  let name = document.querySelector('.form > section > .planet_name').value;
  name_planet.insertAdjacentHTML('afterbegin', name);

  if(last_planet!=null) {
    last_planet.classList.remove("last");
  }

  if (size=="small") {
    new_planet.classList.add("first_smallplanet");
    new_container.classList.add("container_small");
  }
  if (size=="medium") {
    new_planet.classList.add("first_mediumplanet");
    new_container.classList.add("container_medium");
  }
  if (size=="big") {
    new_planet.classList.add("first_bigplanet");
    new_container.classList.add("container_big");
  }
  
  system.appendChild(new_container); // syntaxe incorrecte : document.system.insertBefore(new_container);
  new_container.appendChild(new_planet);
  new_planet.appendChild(name_planet);
  new_planet.classList.add("default_color");
  new_planet.classList.add("last");

  // AUTRES FONCTIONS
  let all_planets = document.querySelectorAll("div[class*=planet]");
  all_planets.forEach(element => element.addEventListener('click', showForm_sub));
  back_to_form.addEventListener('click', goBackToForm);
  all_planets.forEach(element => element.addEventListener('click', addSubPlanets));
  all_planets.forEach(element => element.addEventListener('click', changeColor));
  all_planets.forEach(element => element.addEventListener('click', showForm_sub));
  back_to_form.addEventListener('click', goBackToForm);

}
create_planet.addEventListener('click', add_firstplanets);


// AJOUTE DES SUB PLANET

const create_subplanet = document.querySelector('.form_sub > .crea');

function addSubPlanets(e) {
  create_subplanet.onclick = function() {
    
    let new_planet = document.createElement("div");
    let select_size = document.querySelector('.form_sub > .select_size');
    let size = select_size.options[select_size.selectedIndex].value;
    let name_planet = document.createElement("h2");
    let name = document.querySelector('.form_sub > .planet_name').value;
  
    name_planet.insertAdjacentHTML('afterbegin', name);

    new_planet.classList.add("sub");
    if (size=="small") {
      new_planet.classList.add("smallplanet");
    }
    if (size=="medium") {
      new_planet.classList.add("mediumplanet");
    }
    if (size=="big") {
      new_planet.classList.add("bigplanet");
    }
    new_planet.classList.add("default_color");
    new_planet.appendChild(name_planet);
    e.target.parentNode.insertBefore(new_planet, e.target.nextSibling);

    let all_planets = document.querySelectorAll("div[class*=planet]");
    all_planets.forEach(element => element.addEventListener('click', addSubPlanets));
  
  // AUTRES FONCTIONS
  
  let subplanets = document.querySelectorAll(".sub");
  let firstplanets = document.querySelectorAll("[class*=first]");
  subplanets.forEach(element => element.addEventListener('click', clickSubPlanets));
  firstplanets.forEach(element => element.addEventListener('click', clickFirstPlanets));
  all_planets.forEach(element => element.addEventListener('click', changeColor));
  all_planets.forEach(element => element.addEventListener('click', showForm_sub));
  back_to_form.addEventListener('click', goBackToForm);
  
  }

}
all_planets.forEach(element => element.addEventListener('click', addSubPlanets));

// SUPPRIME DES PLANÈTES DANS LE CAS FIRST ET SUB

let subplanets = document.querySelectorAll(".sub");
let remove_button = document.querySelector(".remove");
let firstplanets = document.querySelectorAll("[class*=first]");
const system = document.querySelector(".system");

function clickSubPlanets(e) {
  
  remove_button.onclick = function() {
    e.target.parentNode.removeChild(e.target);
  }
}
subplanets.forEach(element => element.addEventListener('click', clickSubPlanets));

function clickFirstPlanets(e) {
  console.log(e.target);
  remove_button.onclick = function() {
    system.removeChild(e.target.parentNode);
    let new_last = document.querySelector("[class^=container]:last-child > div:first-child");
    if(new_last!=null)  {
      new_last.classList.add("last");
    }
  }
}
firstplanets.forEach(element => element.addEventListener('click', clickFirstPlanets));

// LES PLANÈTES CLIQUÉES SONT EN ROSE

function changeColor(e) {
  
  let clicked_color = document.querySelector(".clicked_color");
  let all_planets = document.querySelectorAll("div[class*=planet]");

  if (clicked_color==e.currentTarget) {          
    return;
  }
  else {
    all_planets.forEach(element => element.classList.add("default_color"));
    if(clicked_color!=null) {
      clicked_color.classList.remove("clicked_color");
    }
    e.currentTarget.classList.toggle("clicked_color");
    e.currentTarget.classList.remove("default_color"); 
  }
}

all_planets.forEach(element => element.addEventListener('click', changeColor));
 
const x_button = document.querySelector(".x");
const box_form = document.querySelector(".form > section");

function hideForm() {
  if (box_form.style.visibility === "visible") {
    box_form.style.visibility = "hidden";
  }
  else box_form.style.visibility = "visible";
}
x_button.addEventListener('click', hideForm);