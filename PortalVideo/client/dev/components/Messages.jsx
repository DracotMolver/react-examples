/**
 * @author Diego Alberto Molina Vera
 * @copyright 2017
 *
 * A simple component to disply messages:
 * Error,
 * Warning,
 * Success
 */
// -========================== MODULES ==========================-
import React from 'react';

// -========================== COMPONENTS ==========================-
const msgCSSClass = {
    error: 'msg-error',
    success: 'msg-success',
    warning: 'msg-warning'
};

/**
 * It will displays general messages.
 * - warnings
 * - erros
 * - success
 */
const Message = props => {
    const {
        messageType,
        messageText
    } = props;

    return (
        <div className="gird-100">
            <div className={messageType !== '' ? msgCSSClass[messageType] : ''}>
                {messageText}
            </div>
        </div>
    );
};

export default Message;
