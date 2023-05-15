function closeNotification() {
    const notification = document.querySelectorAll('.show_notification');

    for (let index = 0; index < notification.length; index++) {
        notification.item(index).classList.remove('show_notification');
    }

}

export { closeNotification };