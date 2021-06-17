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

// Scroll Top Arrow
const scrollTopArrow = document.body.querySelector(".arrow-up");
// Hero Header
const heroHeader = document.body.querySelector("#hero");

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
// Getting the NodeList of NavLists.
const navLists = document.body.querySelectorAll(".menu__link");

/**
 * Begining
 * #### Add class 'active' to section when near top of viewport
 */

// InterSectionObserver Call Back Function for the Active(Sections - NavList - Section Header)
// considering the DRY concept & performance - declaring the variable & loops in the begining.
const sectionObsCallBack = function (entries) {
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
const sectionObsOptions = {
  root: null,
  threshold: 0.65,
};

// Calling API IntersectionObserver with Params
// 1- Call Back Func.
// 2- Options.
const sectionsObserver = new IntersectionObserver(
  sectionObsCallBack,
  sectionObsOptions
);

//adding the API Observer to each Section.
sections.forEach((section) => {
  sectionsObserver.observe(section);
});

/**
 * End
 * #### Add class 'active' to section when near top of viewport
 */

/**
 * Begining
 * ### Scroll to anchor ID using scrollTO event
 */

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
  // Following function is alternative & modern.
  //  just align the section vertically in the view port.
  section.scrollIntoView({ behavior: "smooth", block: "center" });
});

/**
 * End
 * ### Scroll to anchor ID using scrollTO event
 */

/**
 * End Main Functions
 * Begin Events
 *
 */

// Begining Build menu Collapsible
const collapsibles = document.querySelectorAll(".collapsible");
collapsibles.forEach((l) =>
  l.addEventListener("click", function () {
    this.classList.toggle("collapsible--expanded");
  })
);
// End Build menu Collapsible

/**
 *  Begining Scroll to TOP of the Page Arrow.
 */

// The Call Back function
const scrollTopCallBack = function (entries) {
  const [entry] = entries;
  if (!entry.isIntersecting) {
    scrollTopArrow.classList.add("arrow-up-active");
  } else if (entry.isIntersecting) {
    scrollTopArrow.classList.remove("arrow-up-active");
  }
};

// Observer Options.
const arrowObserverOptions = {
  root: null,
  threshold: 0.65,
};

// Calling API IntersectionObserver with Params
// 1- Call Back Func.
// 2- Options.
const scrollUpArrowObserver = new IntersectionObserver(
  scrollTopCallBack,
  arrowObserverOptions
);

//adding the API Observer HeroHeader.
scrollUpArrowObserver.observe(heroHeader);

// Adding Event onClick event for the Arrow btn.
scrollTopArrow.addEventListener("click", function (e) {
  // No need to prevent default since I'm not using the att #href.
  // e.preventDefault();
  heroHeader.scrollIntoView({ behavior: "smooth", block: "center" });
});

/**
 *  End Scroll to TOP of the Page.
 */
