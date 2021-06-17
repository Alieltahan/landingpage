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

// Getting the Sections Dynamically as it returns NodeList.
const sections = document.body.querySelectorAll("section");

// Refactoring with Virtual DOM.
const fragDoc = document.createDocumentFragment();
/**
 * End Global Variables
 * Start Helper Functions
 *
 */

// @description:  Dynamic Nav List Function based on Number of Sections.
// @param : Number of Sections.

const dynamicNavList = function () {
  //  Looping over the sections Array's to get:
  //  1- Section Name to be displayed as list textContent.
  //  2- Adding data-* attribute to be used later for smooth Scrolling.

  sections.forEach((section) => {
    const sectionName = section.getAttribute("data-nav");
    const sectionId = section.getAttribute("id");
    const list = document.createElement("li");
    list.innerHTML = `<a class="menu__link" data-sectionId="#${sectionId}" > ${sectionName} </a>`;
    fragDoc.append(list);
  });
  navBar.append(fragDoc);
};

/**
 * End Helper Functions
 * Begin Main Functions
 *
 */

// ### Build the nav List
dynamicNavList();

// #### Add class 'active' to section when near top of viewport
// Getting the NodeList of NavLists.
const navLists = document.body.querySelectorAll(".menu__link");

// observer Call Back Function
const obsCallBack = function (entries) {
  // Looping over the sections
  entries.forEach((entry) => {
    // Active Section's Header
    let activeHeader = entry.target.querySelector("h2");
    // Looping over the NavLists of each section with Matching Strategy
    navLists.forEach((list) => {
      if ("#" + entry.target.id === list.getAttribute("data-sectionId")) {
        if (
          !entry.isIntersecting &&
          entry.target.classList.contains("your-active-class")
        ) {
          entry.target.classList.remove("your-active-class");
          list.classList.remove("section-active-class");
          activeHeader.classList.remove("section-active-class");
        } else if (entry.isIntersecting) {
          entry.target.classList.add(
            "your-active-class",
            "section-active-class"
          );
          list.classList.add("section-active-class");
          activeHeader.classList.add("section-active-class");
        }
      }
    });
  });
};

// Observer Options.
const obsOptions = {
  root: null,
  threshold: 0.7,
};

// Calling API IntersectionObserver with Params
// 1- Call Back Func.
// 2- Options.
const sectionsObserver = new IntersectionObserver(obsCallBack, obsOptions);

//adding the API Observer to each Section.
sections.forEach((section) => {
  sectionsObserver.observe(section);
});

// ### Scroll to anchor ID using scrollTO event

// Adding Smooth Scrolling Function based on
// selecting Sections by data-* attribute Dynamically by a single event for performance "Delegation".
navBar.addEventListener("click", function (e) {
  const section = document.querySelector(
    e.target.getAttribute("data-sectionId")
  );
  const sectionCordinates = section.getBoundingClientRect();
  window.scrollTo({
    left: sectionCordinates.left + window.pageXOffset,
    top: sectionCordinates.top + window.pageYOffset,
    behavior: "smooth",
  });
});

/**
 * End Main Functions
 * Begin Events
 *
 */

// Build menu

// Scroll to section on link click

// Set sections as active
