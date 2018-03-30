import React from 'react';
import PropTypes from 'prop-types';

// Own components

class Item extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            pivot: {
                x: 0,
                y: 0
            },
            position: {
                x: 0,
                y: 0
            },
            isMouseDown: false
        };

        this.onMouseDownHandler = this.onMouseDownHandler.bind(this);
        this.onMouseMoveHandler = this.onMouseMoveHandler.bind(this);
        this.onMouseUpHandler = this.onMouseUpHandler.bind(this);
    }


    // -========================== OWN EVENTS ==========================-
    onMouseMoveHandler(event) {
        const {
            pivot,
            isMouseDown
        } = this.state;

        if (isMouseDown) {
            const positionX = event.screenX - pivot.x;
            const positionY = event.screenY - pivot.y;

            this.setState({
                position: {
                    x: positionX,
                    y: positionY
                }
            });
        }
    }

    onMouseUpHandler() {
        window.removeEventListener('mousemove', this.onMouseMoveHandler);

        this.setState({
            isMouseDown: false
        });
    }

    onMouseDownHandler(event) {
        // To capture the position of the cursor
        window.addEventListener('mousemove', this.onMouseMoveHandler);

        // Set the height to the parent based on the height of the child
        const child = event.currentTarget;
        const height = child.offsetHeight;
        const width = child.offsetWidth;

        // Using `cssText` is faster than using attributes properties
        child.parentNode.style.cssText = `height:${height}px`;

        // set a fixed with to the child, because to move it, we will need
        // to set `position:abosolute` and that will cause to use the full scree
        child.style.cssText = `width:${width}px; position:absolute; z-index: 10`;

        // Get the item's pivot
        const pivotX = child.offsetLeft + child.offsetWidth / 2;
        const pivotY = child.offsetTop + child.offsetHeight;

        this.setState({
            isMouseDown: true,
            pivot: {
                x: pivotX,
                y: pivotY
            }
        });
    }

    // -========================== LIFE CYCLE ==========================-
    componentWillUnmount() {
        window.removeEventListener('mousemove', this.onMouseMoveHandler);
    }

    render() {
        const {
            // recalculateOrder,
            title,
            content
        } = this.props;

        const {
            position
        } = this.state;

        const style = {
            transform: `translate(${position.x}px, ${position.y}px)`
        };

        console.log(position);
        return (
            <div className="item-container">
                <div className="item"
                    onMouseDown={this.onMouseDownHandler}
                    onMouseUp={this.onMouseUpHandler}
                    style={style}>
                    <div>
                        <h2>{title}</h2>
                    </div>
                    <div>
                        <p>{content}</p>
                    </div>
                </div>
            </div>
        );
    }
};

// -========================== PropTypes ==========================-
Item.propTypes = {
    onMouseDown: PropTypes.func,
    onMouseUp: PropTypes.func,
    title: PropTypes.string,
    content: PropTypes.string
}

export default Item;