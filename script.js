function toggleMenu() {
    const nav = document.getElementById("mainNav");
    const menuButton = document.getElementById("menuToggle");

    nav.classList.toggle("open");

    const isOpen = nav.classList.contains("open");
    menuButton.setAttribute("aria-expanded", isOpen.toString());

    console.log("Navigation menu toggled:", isOpen);
}

function setupSmoothScrolling() {
    const navLinks = document.querySelectorAll('nav a[href^="#"]');

    navLinks.forEach(function (link) {
        link.addEventListener("click", function (event) {
            event.preventDefault();

            const targetId = link.getAttribute("href");
            const targetSection = document.querySelector(targetId);

            if (targetSection) {
                targetSection.scrollIntoView({
                    behavior: "smooth"
                });
            }

            const nav = document.getElementById("mainNav");
            const menuButton = document.getElementById("menuToggle");
            nav.classList.remove("open");
            menuButton.setAttribute("aria-expanded", "false");
        });
    });
}

function filterProjects(category) {
    const projectCards = document.querySelectorAll(".project-card");

    projectCards.forEach(function (card) {
        const projectCategory = card.getAttribute("data-category");

        if (category === "all" || projectCategory === category) {
            card.classList.remove("hidden");
        } else {
            card.classList.add("hidden");
        }
    });

    console.log("Project filter selected:", category);
}

function setupProjectFilters() {
    const filterButtons = document.querySelectorAll(".filter-button");

    filterButtons.forEach(function (button) {
        button.addEventListener("click", function () {
            const selectedCategory = button.getAttribute("data-filter");

            filterButtons.forEach(function (btn) {
                btn.classList.remove("active");
            });

            button.classList.add("active");
            filterProjects(selectedCategory);
        });
    });
}

function openLightbox(imageSource, imageTitle) {
    const modal = document.getElementById("imageModal");
    const modalImage = document.getElementById("modalImage");
    const modalTitle = document.getElementById("modalTitle");

    modalImage.src = imageSource;
    modalImage.alt = imageTitle + " preview image";
    modalTitle.textContent = imageTitle;

    modal.classList.add("open");
    modal.setAttribute("aria-hidden", "false");

    console.log("Lightbox opened for:", imageTitle);
}

function closeLightbox() {
    const modal = document.getElementById("imageModal");
    const modalImage = document.getElementById("modalImage");

    modal.classList.remove("open");
    modal.setAttribute("aria-hidden", "true");
    modalImage.src = "";
}

function setupLightbox() {
    const lightboxButtons = document.querySelectorAll(".lightbox-button");
    const closeModalButton = document.getElementById("closeModal");
    const modal = document.getElementById("imageModal");

    lightboxButtons.forEach(function (button) {
        button.addEventListener("click", function () {
            const imageSource = button.getAttribute("data-image");
            const imageTitle = button.getAttribute("data-title");

            openLightbox(imageSource, imageTitle);
        });
    });

    closeModalButton.addEventListener("click", closeLightbox);

    modal.addEventListener("click", function (event) {
        if (event.target === modal) {
            closeLightbox();
        }
    });

    document.addEventListener("keydown", function (event) {
        if (event.key === "Escape") {
            closeLightbox();
        }
    });
}

function validateContactForm(event) {
    event.preventDefault();

    const nameInput = document.getElementById("name");
    const emailInput = document.getElementById("email");
    const messageInput = document.getElementById("message");

    const nameError = document.getElementById("nameError");
    const emailError = document.getElementById("emailError");
    const messageError = document.getElementById("messageError");
    const formStatus = document.getElementById("formStatus");

    let isValid = true;

    nameError.textContent = "";
    emailError.textContent = "";
    messageError.textContent = "";
    formStatus.textContent = "";

    if (nameInput.value.trim() === "") {
        nameError.textContent = "Please enter your name.";
        isValid = false;
    }

    if (emailInput.value.trim() === "") {
        emailError.textContent = "Please enter your email address.";
        isValid = false;
    } else if (!emailInput.value.includes("@") || !emailInput.value.includes(".")) {
        emailError.textContent = "Please enter a valid email address.";
        isValid = false;
    }

    if (messageInput.value.trim() === "") {
        messageError.textContent = "Please enter a message.";
        isValid = false;
    }

    if (isValid) {
        formStatus.textContent = "Thank you. Your message is ready to be submitted.";
        console.log("Form validation passed.");
    } else {
        console.log("Form validation failed.");
    }
}

document.addEventListener("DOMContentLoaded", function () {
    const menuButton = document.getElementById("menuToggle");
    const contactForm = document.getElementById("contactForm");

    menuButton.addEventListener("click", toggleMenu);
    contactForm.addEventListener("submit", validateContactForm);

    setupSmoothScrolling();
    setupProjectFilters();
    setupLightbox();

    console.log("Final portfolio project loaded successfully.");
});
