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

// @description:  Dynamic Nav List Function based on Number of Sections.
// @param : Number of Sections.

const dynamicNavList = function (num) {
  //  Looping over the sections Array's to get:
  //  1- Section Name to be displayed as list textContent.
  //  2- Adding data-* attribute to be used later for smooth Scrolling.

  for (let i = 0; i < num; i++) {
    const sectionName = sections[i].getAttribute("data-nav");
    const sectionId = sections[i].getAttribute("id");

    const list = document.createElement("li");
    const link = document.createElement("a");
    link.setAttribute("data-sectionId", "#" + sectionId);
    link.innerText = sectionName;
    link.classList.add("menu__link");
    navBar.append(list);
    list.append(link);

    // smoothScroll(sectionId);
  }
};

// Adding Smooth Scrolling Function based on data-* attribute.

navBar.addEventListener("click", function (e) {
  const section = document.querySelector(
    e.target.getAttribute("data-sectionId")
  );
  section.scrollIntoView({ behavior: "smooth" });
});

// const smoothScroll = function (el) {
//   el.scrollIntoView({ behavior: "smooth" });
// };

// const section1 = document.querySelector("#section1");
// section1.scrollIntoView({ behavior: "smooth" });

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
