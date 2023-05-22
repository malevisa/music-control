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

function closeModal() {
    const notification = document.querySelectorAll('.show');

    if (notification.length === 1) {
        notification.item(0).addEventListener('click', (e) => {
            if (e.target.id === "modal-edit-music" || e.target.id === "modal-delete-music" || e.target.className === 'close') {
                notification.item(0).classList.remove('show')
            }
        })
    }

}

export { initModal, closeModal }