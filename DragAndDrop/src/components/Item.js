import React from 'react';
import PropTypes from 'prop-types';

// Own components

class Item extends React.Component {
    constructor(props) {
        super();

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

        this.itemRef = React.createRef();

        this.onMouseDownHandler = this.onMouseDownHandler.bind(this);
        this.onMouseMoveHandler = this.onMouseMoveHandler.bind(this);
        this.onMouseUpHandler = this.onMouseUpHandler.bind(this);
    }


    // -========================== OWN EVENTS ==========================-
    onMouseMoveHandler(event) {
        const {
            pivot,
            isMouseDown,
            between
        } = this.state;

        if (isMouseDown) {
            const positionX = event.screenX - pivot.x;
            const positionY = event.screenY - pivot.y;

            this.setState(() => {
                return {
                    position: {
                        x: positionX,
                        y: positionY
                    }
                };
            });

            // Check if the component is up of another one
            console.log(positionY, between)
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
        const {
            offsetHeight,
            offsetWidth,
            offsetLeft,
            offsetTop
        } = child;

        // Using `cssText` is faster than using attributes properties
        child.parentNode.style.cssText = `height:${offsetHeight}px`;

        // set a fixed with to the child, because to move it, we will need
        // to set `position:abosolute` and that will cause to use the full scree
        child.style.cssText = `width:${offsetWidth}px;position:absolute;z-index:10`;

        // Get the item's pivot
        const pivotX = offsetLeft + offsetWidth / 2;
        const pivotY = offsetTop + offsetHeight;

        this.setState(() => {
            return {
                isMouseDown: true,
                pivot: {
                    x: pivotX,
                    y: pivotY
                }
            };
        });
    }

    // -========================== LIFE CYCLE ==========================-
    componentDidMount() {
        // Let's get the height of the component
        // This hell help to check if the dragged component is actually
        // up of another component. This means I can take its place
        const {
            distanceBetweenTopAndBottom,
            initPosition
        } = this.props;

        const { offsetHeight } = this.itemRef.current;

        const top = initPosition * offsetHeight;
        const bottom = top + offsetHeight;

        distanceBetweenTopAndBottom({
            top:
            bottom
        });
    }

    componentWillUnmount() {
        // Make sure to removed any listener before the component will unmount
        // This helps to saved memory, because we clear the created object, the event listener
        window.removeEventListener('mousemove', this.onMouseMoveHandler);
    }

    render() {
        const {
            // recalculateOrder,
            // distanceBetweenTopAndBottom,
            content,
            title
        } = this.props;

        const {
            position
        } = this.state;

        const style = {
            transform: `translate(${position.x}px, ${position.y}px)`
        };

        return (
            <div className="item-container" ref={this.itemRef}>
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