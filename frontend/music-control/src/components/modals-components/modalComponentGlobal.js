function initModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.classList.add('show');
        modal.addEventListener('click', (e) => {
            if (e.target.id === modalId || e.target.className === 'close') {
                modal.classList.remove('show')
            }
        });
    }
}

export {initModal}