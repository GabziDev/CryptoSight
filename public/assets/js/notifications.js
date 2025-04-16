function pushNotification(type = 'info', message = 'Notification') {
    const container = document.getElementById('notificationcontainer');

    const notification = document.createElement('div');
    notification.className = `notification ${type}`;

    notification.innerHTML = `
        <p>${message}</p>
        <button class="closeBtn" aria-label="Fermer la notification">
            <img src="assets/svg/Close.svg" alt="Fermer">
        </button>
    `;

    const removeWithAnimation = () => {
        notification.classList.add('fade-out');
        setTimeout(() => {
            notification.remove();
        }, 300);
    };

    notification.querySelector('.closeBtn').addEventListener('click', removeWithAnimation);

    container.append(notification);

    setTimeout(() => {
        if (container.contains(notification)) {
            removeWithAnimation();
        }
    }, 5000);
}

export { pushNotification };
