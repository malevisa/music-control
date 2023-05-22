import Notification from "./notification";
import * as ReactDOM from 'react-dom/client';

function generateNotification(boolean, data) {

    const elements = []

    if (boolean) {
        elements[0] = <Notification
            key={0}
            status={boolean}
            title={data.title}
            content={data.content}
        />
    } else {
        data.length > 0 ? Array.from(data, (error, index) => {

            elements[index] = <Notification
                key={index}
                status={boolean}
                title={error.campo == null ? "Erro" : error.campo}
                content={error.message}
            />

        }) : elements[0] = <Notification
            key={0}
            status={boolean}
            title={data.campo == null ? "Erro" : data.campo}
            content={data.message}
        />
    }

    renderNotification(elements);

}

function renderNotification(elements) {
    const boxNotification = document.getElementById('box-notification');

    const root = ReactDOM.createRoot(
        boxNotification
    );

    root.render(elements);
}

function closeNotification() {
    const notification = document.querySelectorAll('.show_notification');

    for (let index = 0; index < notification.length; index++) {
        notification.item(index).classList.remove('show_notification');
    }

}

export { closeNotification, generateNotification };