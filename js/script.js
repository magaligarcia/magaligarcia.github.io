// Obtener todos los botones de abrir y cerrar modal
const openModalButtons = document.querySelectorAll('.open-modal');
const closeModalButtons = document.querySelectorAll('.close-modal');
const modals = document.querySelectorAll('.modal');

// Función para abrir el modal y gestionar el foco
openModalButtons.forEach(button => {
    button.addEventListener('click', function () {
        const modalId = this.getAttribute('data-modal');
        const modal = document.getElementById(modalId);
        modal.setAttribute('aria-hidden', 'false');
        this.setAttribute('aria-expanded', 'true');
        modal.querySelector('.close-modal').focus();

        trapFocus(modal); // Mantener el foco dentro del modal
    });
});

// Función para cerrar el modal y devolver el foco al botón original
closeModalButtons.forEach(button => {
    button.addEventListener('click', function () {
        const modal = this.closest('.modal');
        modal.setAttribute('aria-hidden', 'true');
        const openButton = document.querySelector(`[data-modal="${modal.id}"]`);
        openButton.setAttribute('aria-expanded', 'false');
        openButton.focus();
    });
});

// Cerrar el modal al hacer clic fuera del contenido o presionar Esc
window.addEventListener('click', function (event) {
    modals.forEach(modal => {
        if (event.target === modal) {
            modal.setAttribute('aria-hidden', 'true');
            const openButton = document.querySelector(`[data-modal="${modal.id}"]`);
            openButton.setAttribute('aria-expanded', 'false');
            openButton.focus();
        }
    });
});

window.addEventListener('keydown', function (event) {
    if (event.key === 'Escape') {
        modals.forEach(modal => {
            if (modal.getAttribute('aria-hidden') === 'false') {
                modal.setAttribute('aria-hidden', 'true');
                const openButton = document.querySelector(`[data-modal="${modal.id}"]`);
                openButton.setAttribute('aria-expanded', 'false');
                openButton.focus();
            }
        });
    }
});

// Mantener el foco dentro del modal
function trapFocus(modal) {
    const focusableElements = modal.querySelectorAll('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])');
    const firstFocusableElement = focusableElements[0];
    const lastFocusableElement = focusableElements[focusableElements.length - 1];

    modal.addEventListener('keydown', function (event) {
        if (event.key === 'Tab') {
            if (event.shiftKey) { // Shift + Tab
                if (document.activeElement === firstFocusableElement) {
                    event.preventDefault();
                    lastFocusableElement.focus();
                }
            } else { // Tab
                if (document.activeElement === lastFocusableElement) {
                    event.preventDefault();
                    firstFocusableElement.focus();
                }
            }
        }
    });
}
