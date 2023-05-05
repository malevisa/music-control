import React from "react";
import '../notification/notification.css'

export default function Notification(props) {

    return (
        <>
            <div id="notification" className="notification show_notification">
                <div>
                    <div className={props.status ? 'content_notification success' : 'content_notification error'}>
                        <div className="header">
                            <h2 className="title_notification">{props.title}</h2>
                            <h4 className="close_notification">X</h4>
                        </div>
                        <div className="notification_message">
                            <span>
                                {props.content}
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}