/**
 *
 * Manipulating the DOM exercise.
 * Exercise programmatically builds navigation,
 * scrolls to anchors from navigation,
 * and highlights section in viewport upon scrolling.
 *
 * Dependencies: None
 *
 * JS Version: ES2015/ES6
 *
 * JS Standard: ESlint
 *
 */

/**
 * Define Global Variables
 *
 */

// Nav Bar Element
const navBar = document.body.querySelector("#navbar__list");

// Getting the Number of Sections Dynamically as it returns HTML Collection.
const sections = document.body.getElementsByTagName("section");
const numberOfSections = sections.length;

/**
 * End Global Variables
 * Start Helper Functions
 *
 */

// TODO: Refactoring with Virtual DOM.
// Virtual DOM
// const frag = document.createDocumentFragment();

/**
 * @description:  Dynamic Nav List Function based on Number of Sections.
 * @param : Number of Sections.
 */
const dynamicNavList = function (num) {
  /**
   * Looping over the sections Array's to get:
   * 1- Section Name to be displayed as list textContent.
   * 2- ID which to be used as href for the list.
   */
  for (let i = 0; i < num; i++) {
    const sectionsName = sections[i].getAttribute("data-nav");
    const navHrefAtt = sections[i].getAttribute("id");

    const list = document.createElement("li");
    const link = document.createElement("a");
    link.setAttribute("href", "#" + navHrefAtt);
    link.innerText = sectionsName;
    link.classList.add("menu__link");
    // list.classList.add("menu__link");
    navBar.append(list);
    list.append(link);
  }
};

/**
 * End Helper Functions
 * Begin Main Functions
 *
 */

// Build the nav List
dynamicNavList(numberOfSections);

// Add class 'active' to section when near top of viewport

// Scroll to anchor ID using scrollTO event

/**
 * End Main Functions
 * Begin Events
 *
 */

// Build menu

// Scroll to section on link click

// Set sections as active
