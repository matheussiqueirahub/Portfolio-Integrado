document.addEventListener("DOMContentLoaded", () => {
    initializeThemeToggle();
    initializeNavigation();
    initializeTypingEffect();
    initializeSmoothScroll();
    initializeFormValidation();
    injectCurrentYear();
});

function initializeThemeToggle() {
    const toggleButton = document.querySelector(".theme-toggle");
    const icon = toggleButton.querySelector("i");
    const storedTheme = localStorage.getItem("preferred-theme");

    if (storedTheme === "light") {
        document.body.setAttribute("data-theme", "light");
        icon.classList.replace("fa-moon", "fa-sun");
    }

    toggleButton.addEventListener("click", () => {
        const isLight = document.body.getAttribute("data-theme") === "light";
        if (isLight) {
            document.body.removeAttribute("data-theme");
            localStorage.setItem("preferred-theme", "dark");
            icon.classList.replace("fa-sun", "fa-moon");
        } else {
            document.body.setAttribute("data-theme", "light");
            localStorage.setItem("preferred-theme", "light");
            icon.classList.replace("fa-moon", "fa-sun");
        }
    });
}

function initializeNavigation() {
    const toggleButton = document.querySelector(".nav-toggle");
    const navList = document.querySelector(".main-nav ul");

    toggleButton.addEventListener("click", () => {
        const expanded = toggleButton.getAttribute("aria-expanded") === "true";
        toggleButton.setAttribute("aria-expanded", String(!expanded));
        navList.dataset.open = String(!expanded);
        toggleButton.querySelector("i").classList.toggle("fa-bars");
        toggleButton.querySelector("i").classList.toggle("fa-xmark");
    });

    navList.addEventListener("click", event => {
        if (event.target.matches("a")) {
            toggleButton.setAttribute("aria-expanded", "false");
            navList.dataset.open = "false";
            const icon = toggleButton.querySelector("i");
            icon.classList.remove("fa-xmark");
            icon.classList.add("fa-bars");
        }
    });
}

function initializeTypingEffect() {
    const title = document.getElementById("typed-title");
    if (!title) return;

    const text = title.dataset.texto || title.textContent.trim();
    let index = 0;

    title.textContent = "";

    const typeNext = () => {
        if (index <= text.length) {
            title.textContent = text.slice(0, index);
            index += 1;
            setTimeout(typeNext, 90);
        } else {
            setTimeout(() => {
                index = 0;
                title.textContent = "";
                typeNext();
            }, 4200);
        }
    };

    typeNext();
}

function initializeSmoothScroll() {
    const links = document.querySelectorAll('a[href^="#"]');
    links.forEach(link => {
        link.addEventListener("click", event => {
            const targetId = link.getAttribute("href");
            if (!targetId || targetId === "#") return;

            const target = document.querySelector(targetId);
            if (target) {
                event.preventDefault();
                target.scrollIntoView({ behavior: "smooth" });
            }
        });
    });
}

function initializeFormValidation() {
    const form = document.getElementById("contact-form");
    if (!form) return;

    const feedback = form.querySelector(".form-feedback");

    form.addEventListener("submit", event => {
        event.preventDefault();

        const fields = {
            nome: form.nome,
            email: form.email,
            mensagem: form.mensagem
        };

        let isValid = true;

        if (!fields.nome.value.trim() || fields.nome.value.trim().length < 3) {
            setError(fields.nome, "Informe seu nome completo.");
            isValid = false;
        } else {
            clearError(fields.nome);
        }

        if (!validateEmail(fields.email.value)) {
            setError(fields.email, "Informe um e-mail válido.");
            isValid = false;
        } else {
            clearError(fields.email);
        }

        if (!fields.mensagem.value.trim() || fields.mensagem.value.trim().length < 10) {
            setError(fields.mensagem, "Descreva sua mensagem com pelo menos 10 caracteres.");
            isValid = false;
        } else {
            clearError(fields.mensagem);
        }

        if (isValid) {
            feedback.textContent = "Mensagem pronta para envio. Integre seu serviço favorito (ex: Formspree) para receber os contatos.";
            feedback.classList.remove("error");
            feedback.classList.add("success");
            form.reset();
        } else {
            feedback.textContent = "Corrija os campos destacados antes de enviar.";
            feedback.classList.remove("success");
            feedback.classList.add("error");
        }
    });
}

function setError(field, message) {
    const container = field.closest(".form-field");
    const messageSpan = container.querySelector(".error-message");
    messageSpan.textContent = message;
    field.setAttribute("aria-invalid", "true");
}

function clearError(field) {
    const container = field.closest(".form-field");
    const messageSpan = container.querySelector(".error-message");
    messageSpan.textContent = "";
    field.removeAttribute("aria-invalid");
}

function validateEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function injectCurrentYear() {
    const yearSpan = document.getElementById("current-year");
    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }
}
