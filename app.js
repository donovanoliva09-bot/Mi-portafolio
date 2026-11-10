
// MOBILE NAVIGATION
const menuToggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");
const navItems = document.querySelectorAll(".nav-link");

menuToggle.addEventListener("click", () => {
    navLinks.classList.toggle("open");

    const icon = menuToggle.querySelector("i");

    if (navLinks.classList.contains("open")) {
        icon.setAttribute("data-lucide", "x");
    } else {
        icon.setAttribute("data-lucide", "menu");
    }

    lucide.createIcons();
});

// CLOSE MOBILE MENU WHEN CLICKING A LINK
navItems.forEach((link) => {
    link.addEventListener("click", () => {
        navLinks.classList.remove("open");

        const icon = menuToggle.querySelector("i");
        icon.setAttribute("data-lucide", "menu");
        lucide.createIcons();
    });
});

// TYPING ANIMATION
const typingText = document.getElementById("typingText");

const words = [
    "Web Development",
    "Programming",
    "Creative Design",
    "New Technologies"
];

let wordIndex = 0;
let letterIndex = 0;
let deleting = false;

function typeEffect() {
    const currentWord = words[wordIndex];

    if (!deleting) {
        typingText.textContent = currentWord.substring(0, letterIndex + 1);
        letterIndex++;

        if (letterIndex === currentWord.length) {
            deleting = true;
            setTimeout(typeEffect, 1500);
            return;
        }
    } else {
        typingText.textContent = currentWord.substring(0, letterIndex - 1);
        letterIndex--;

        if (letterIndex === 0) {
            deleting = false;
            wordIndex = (wordIndex + 1) % words.length;
        }
    }

    setTimeout(typeEffect, deleting ? 45 : 85);
}

typeEffect();

// REVEAL ANIMATION
const revealElements = document.querySelectorAll(".reveal");

const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            observer.unobserve(entry.target);
        }
    });
}, {
    threshold: 0.12
});

revealElements.forEach((element) => {
    revealObserver.observe(element);
});

// SKILL BAR ANIMATION
const skillsSection = document.getElementById("skills");
const skillBars = document.querySelectorAll(".skill-progress");

const skillObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            skillBars.forEach((bar) => {
                const progress = bar.dataset.progress;
                bar.style.width = `${progress}%`;
            });

            observer.unobserve(entry.target);
        }
    });
}, {
    threshold: 0.25
});

skillObserver.observe(skillsSection);

// ACTIVE NAVIGATION LINK
const sections = document.querySelectorAll("main section[id]");

const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            const currentId = entry.target.id;

            navItems.forEach((link) => {
                link.classList.toggle(
                    "active",
                    link.getAttribute("href") === `#${currentId}`
                );
            });
        }
    });
}, {
    rootMargin: "-35% 0px -55% 0px"
});

sections.forEach((section) => {
    sectionObserver.observe(section);
});

// AUTOMATIC FOOTER YEAR
document.getElementById("year").textContent = new Date().getFullYear();

// PROFILE PHOTO SCAN REVEAL
const photoCard = document.getElementById("photoCard");
const photoScanStatus = document.getElementById("photoScanStatus");

if (photoCard && photoScanStatus) {
    const finishPhotoScan = () => {
        photoCard.classList.remove("is-scanning");
        photoCard.classList.add("is-scanned");
        photoScanStatus.textContent = "SCAN COMPLETE";
    };

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        finishPhotoScan();
    } else {
        window.setTimeout(finishPhotoScan, 3200);
    }
}

// INITIALIZE ICONS
lucide.createIcons();
