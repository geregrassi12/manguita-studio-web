const langButtons = document.querySelectorAll("[data-language]");
const textsToChange = document.querySelectorAll("[data-section]");

function loadLanguage(lang) {
    fetch(`../languages/${lang}.json`)
        .then(res => res.json())
        .then(data => {
            textsToChange.forEach((el) => {
                const section = el.dataset.section;
                const value = el.dataset.value;
                el.innerHTML = data[section][value];
            });
        });
}

langButtons.forEach((button) => {
    button.addEventListener("click", () => {
        const selectedLang = button.dataset.language;
        localStorage.setItem("preferredLanguage", selectedLang);
        loadLanguage(selectedLang);
    });
});

// Cuando se carga la página, aplicar el idioma guardado o el idioma por defecto (es)
document.addEventListener("DOMContentLoaded", () => {
    const savedLang = localStorage.getItem("preferredLanguage") || "es";
    loadLanguage(savedLang);
});
