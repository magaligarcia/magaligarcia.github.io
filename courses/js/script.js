document.querySelectorAll('.show-details').forEach(button => {
    button.addEventListener('click', () => {
        const modal = document.getElementById(button.dataset.modal);
        modal.setAttribute('aria-hidden', 'false');
        modal.querySelector('.modal-content').focus();
        modal.querySelector('.close').focus(); // Mover el foco al botón de cerrar
        button.setAttribute('aria-expanded', 'true');
    });
});

document.querySelectorAll('.close').forEach(button => {
    button.addEventListener('click', () => {
        const modal = button.closest('.modal');
        closeModal(modal);
    });
});

// Función para cerrar el modal y devolver el foco al botón que lo activó
function closeModal(modal) {
    modal.setAttribute('aria-hidden', 'true');
    const triggerButton = document.querySelector(`[data-modal=${modal.id}]`);
    triggerButton.focus(); // Devuelve el foco al botón que activó el modal
    triggerButton.setAttribute('aria-expanded', 'false');
}

// Gestiona el evento "Escape" para cerrar el modal
window.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
        document.querySelectorAll('.modal[aria-hidden="false"]').forEach(modal => {
            closeModal(modal);
        });
    }
});

// Restringe el foco a los elementos dentro del modal
document.querySelectorAll('.modal').forEach(modal => {
    modal.addEventListener('keydown', (event) => {
        const focusableElements = modal.querySelectorAll('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])');
        const firstElement = focusableElements[0];
        const lastElement = focusableElements[focusableElements.length - 1];

        if (event.key === 'Tab') {
            if (event.shiftKey) {
                // Si se presiona Shift + Tab y el foco está en el primer elemento, se mueve al último
                if (document.activeElement === firstElement) {
                    event.preventDefault();
                    lastElement.focus();
                }
            } else {
                // Si se presiona Tab y el foco está en el último elemento, se mueve al primero
                if (document.activeElement === lastElement) {
                    event.preventDefault();
                    firstElement.focus();
                }
            }
        }
    });
});
