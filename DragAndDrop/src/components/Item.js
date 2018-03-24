import React from 'react';
import PropTypes from 'prop-types';

// Own components
// import '../styles/style.css';

const Item = props => {
    const {
        onMouseDown,
        onMouseUp,
        title,
        content
    } = props;

    return (
        <div className="item-container" onMouseDown={onMouseDown} onMouseUp={onMouseUp}>
            <div className="item">
                <div>
                    <h2>{title}</h2>
                </div>
                <div>
                    <p>{content}</p>
                </div>
            </div>
        </div>
    );
};

// -========================== PropTypes ==========================-
Item.propTypes = {
    onMouseDown: PropTypes.func,
    onMouseUp: PropTypes.func,
    title: PropTypes.string,
    content: PropTypes.string
}

export default Item;