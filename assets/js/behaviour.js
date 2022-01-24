// SCROLL-ACTIVE
function lockScroll(status) {
    const body = document.querySelector("body");
    if(status) 
        body.style.overflowY = "hidden";
    else 
        body.style.overflowY = "auto";
}

// SCROLLING HEADER
let header = document.querySelector("header");
window.addEventListener('scroll', function () {
    let windowPosition = window.scrollY;

    header.classList.toggle('scrolling-active', windowPosition > 0);
});

// NAV-ITEM-ACTIVE
const navItems = document.querySelectorAll(".navbar-item:not(:last-child)");

for(const navItem of navItems) {
    navItem.onclick = function() {
        const navItemActive = document.querySelector(".navbar-item.active");
        navItemActive.classList.remove("active");
        this.classList.add("active");
    } 
}

// MODAL
const app = document.getElementById("app");

if (app) {
    const galleryModal = document.createElement("div");
    galleryModal.classList.add("modal", "gallery-modal");
    
    function openModal() {
        app.appendChild(galleryModal);
        galleryModal.classList.add("open");
    }

    function closeModal() {
        app.removeChild(galleryModal);
        galleryModal.classList.remove("open");
        lockScroll(false);
    }
    
    galleryModal.addEventListener("click", closeModal);

    // MODAL-CLIP
    const clipMoment = document.querySelector(".clip-link");

    clipMoment.onclick = function() {
        const innerClip = `
            <div class="modal-close">
                <i class="fas fa-times"></i>
            </div>
            <div class="gallery-modal-clip item-16-9">
                <iframe src="https://www.youtube.com/embed/eX2qFMC8cFo" title="YouTube video player" frameborder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    id="clip" allowfullscreen="">
                </iframe>
            </div>
        `;
        galleryModal.innerHTML = innerClip;
        openModal();
        lockScroll(true);
    }

    // MODAL-IMG
    const catImgs = document.querySelectorAll(".gallery-item-img");
    for(const catImg of catImgs) {
        catImg.onclick = function() {
            const src = catImg.src;
            const innerImg = `
                <div class="modal-close">
                    <i class="fas fa-times"></i>
                </div>
                <img class="gallery-modal-img" src="${src}" alt="">
            `;
            galleryModal.innerHTML = innerImg;
            openModal();
            lockScroll(true);
        }
    }
}

// NAV-ITEM ACTIVE
// let navItems = document.querySelectorAll(".navbar-item:not(:last-child)");
let sec= document.querySelectorAll(".section:not(:nth-child(2))");

function activeNavbar() {
    let len = sec.length;
    while(--len && window.scrollY + 10 < sec[len].offsetTop){}
    navItems.forEach(ltx => ltx.classList.remove("active"));
    navItems[len].classList.add("active");
}
activeNavbar();
window.addEventListener("scroll", activeNavbar);

// MOBILE-MENU
let menuMobile = document.querySelector(".menu-mobile");
let navbar = document.querySelector(".navbar");
let menuClose = document.querySelector(".menu-close-mobile");
let modal = document.createElement("div");

modal.classList.add("modal", "open");

function openMenuMobile() {
    navbar.classList.add("open");
    header.appendChild(modal);
    lockScroll(true);
}

function closeMenuMobile() {
    navbar.classList.remove("open");
    header.removeChild(modal);
    lockScroll(false);
}

menuMobile.onclick = function() {
    openMenuMobile();
    let navItems = document.querySelectorAll(".navbar-item");
    for(let navItem of navItems) {
        navItem.onclick = closeMenuMobile;
    }
};

modal.onclick = menuClose.onclick = closeMenuMobile;