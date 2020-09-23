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
 * Define Global letiables
 * 
*/
class Section {
    title;
    htmlContent;

}
const sections = [];

var coll;
var navLinks;

/**
 * End Global letiables
 * Start Helper Functions
 * 
*/
function setSections() {
    for (let i = 0; i < 20; i++) {
        sections.push({ title: `Section ${i + 1}`, htmlContent: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi fermentum metus faucibus lectus pharetra dapibus. Suspendisse potenti. Aenean aliquam elementum mi, ac euismod augue. Donec eget lacinia ex. Phasellus imperdiet porta orci eget mollis. Sed convallis sollicitudin mauris ac tincidunt. Donec bibendum, nulla eget bibendum consectetur, sem nisi aliquam leo, ut pulvinar quam nunc eu augue. Pellentesque maximus imperdiet elit a pharetra. Duis lectus mi, aliquam in mi quis, aliquam porttitor lacus. Morbi a tincidunt felis. Sed leo nunc, pharetra et elementum non, faucibus vitae elit. Integer nec libero venenatis libero ultricies molestie semper in tellus. Sed congue et odio sed euismod.' });
    }
}

function createMenuItem(itemTitle) {
    const menue = document.getElementById('navbar__list');
    const item = document.createElement('li');
    item.innerHTML = `<a class="section_link" href="#${itemTitle}">${itemTitle}</a>`;
    menue.appendChild(item);
}

function createMenuItems() {
    sections.forEach((sec, i) => {
        createMenuItem(`section${i + 1}`);
    });
}

function createSectionItem(section, index) {
    let btnCollabse = document.createElement('button');
    btnCollabse.className = "collapsible";
    btnCollabse.id = `collapsible${index}`;
    btnCollabse.textContent = `Open ${section.title}`;

    let divCollabse = document.createElement('div');
    divCollabse.className = "content";

    let divCollabseContainer = document.createElement('div');
    divCollabseContainer.className = "collapsible_container";

    const sectionElement = document.createElement('section');
    sectionElement.setAttribute('data-nav', `Section ${index}`);
    sectionElement.id = `section${index}`
    sectionElement.className = 'active-class';

    const innerDiv = document.createElement('div');
    innerDiv.className = 'landing__container';
    innerDiv.innerHTML = `<h2>${section.title}</h2>
    <p>${section.htmlContent}</p>`;
    sectionElement.appendChild(innerDiv);

    divCollabse.appendChild(sectionElement);

    divCollabseContainer.appendChild(btnCollabse);
    divCollabseContainer.appendChild(divCollabse);

    return divCollabseContainer;
}

function createSectionItems() {
    const fragement = document.createDocumentFragment();
    sections.forEach((sec, i) => {
        const secEle = createSectionItem(sec, i + 1);
        fragement.appendChild(secEle);
    });

    let menu = document.querySelector('main');
    menu.appendChild(fragement);
}

function setNavLinksClickListener() {
    navLinks.forEach((navLink, i) => {
        navLink.addEventListener('click', (event) => {
            event.preventDefault();
            //remove  active class for all a in nav menu
            // for (let j = 0; j < navLinks.length; j++) {
            //     navLinks[j].classList.remove('active_menu_link')
            // }
            // //toggle the class for the target one
            // let eventTarget = event.target;
            // eventTarget.classList.add('active_menu_link');

            // //remove active class for all collapsible btns and close them
            // for (let j = 0; j < coll.length; j++) {
            //     coll[j].classList.remove('active');
            //     let content = coll[j].nextElementSibling;
            //     content.style.maxHeight = null;
            // }

            //get  getBoundingClientRect for the section
            // let targetSection = document.getElementById(`section${i+1}`);
            let targetRect = coll[i].getBoundingClientRect();
            window.scrollTo({
                top: targetRect.top,
                left: targetRect.left,
                behavior: 'smooth'
            });
            //open the one that we needed
            // coll[i].click();
            inViewPortArray = [];
            inViewPortArray.push(coll[i].id);
            localStorage.setItem('collId', coll[i].id);

        });
    });
}

function callScrollEventListener() {

    window.addEventListener('scroll', () => {
        inViewPortArray = [];

        navLinks.forEach(e => {
            e.classList.remove('active_menu_link');
        });
        for (let j = 0; j < coll.length; j++) {
            let content = coll[j].nextElementSibling;
            coll[j].classList.remove("active");
            content.style.maxHeight = null;

            if (isInViewport(coll[j])) {
                inViewPortArray.push(coll[j]);
            }
        }
        if (localStorage.getItem('collId')) {
            let c = document.getElementById(localStorage.getItem('collId'));
            console.log(c);
            inViewPortArray = [];
            inViewPortArray.push(c);
        }
        console.log(inViewPortArray);
        if (inViewPortArray && inViewPortArray[0]) {
            inViewPortArray[0].classList.add("active");
            let navLinkIndex = +inViewPortArray[0].id.split('collapsible')[1];
            navLinks[navLinkIndex - 1].classList.add('active_menu_link');
            let content = inViewPortArray[0].nextElementSibling;
            content.style.maxHeight = content.scrollHeight + "px";
            // inViewPortArray[0].click();
            setTimeout(() => {
                localStorage.removeItem('collId');
            }, 4000);
        }
    });
}
var inViewPortArray = [];

function onCollapsibleClick() {
    for (let i = 0; i < coll.length; i++) {
        coll[i].addEventListener("click", clickCollabse);
    }
}

function clickCollabse(e) {

    toggleCollabse(this);
}

function toggleCollabse(target) {
    target.classList.toggle("active");
    let content = target.nextElementSibling;

    if (content.style.maxHeight) {
        content.style.maxHeight = null;
    } else {
        content.style.maxHeight = content.scrollHeight + "px";
    }
}

function isInViewport(element) {
    /*
    If an element is in the viewport, its top and left are always greater than or equal zero.
    In addition, its distance from the right is less than or equal to the width of the viewport,
    and ids distance from the bottom is less than or equal to the height of the viewport.


    */
    const rect = element.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );

}

function arrowListener() {
    let arrowTop = document.getElementById('arrowTop');
    arrowTop.onclick = function () {
        window.scrollTo(pageXOffset, 0);
        // after scrollTo, there will be a "scroll" event, so the arrow will hide automatically
    };
}
/**
 * End Helper Functions
 * Begin Main Functions
 * 
*/

// build the nav
setTimeout(setSections(), 0);

setTimeout(createMenuItems(), 0);
setTimeout(createSectionItems(), 0);
coll = document.getElementsByClassName("collapsible");
navLinks = document.querySelectorAll('.section_link');

setTimeout(onCollapsibleClick(), 0);
setTimeout(setNavLinksClickListener(), 0);
setTimeout(callScrollEventListener(), 0);

// Add class 'active' to section when near top of viewport (Done with bugs)

/* Scroll to anchor ID using scrollTO event (Done)
 with bug because of this part:
Add class 'active' to section when near top of viewport */


/**
 * End Main Functions
 * Begin Events
 *
*/

// Build menu (Done)

// Scroll to section on link click (Done)

// Set sections as active (Done)

