/**
 * @author Diego Alberto Molina Vera
 * @copyright 2018
 */
// -========================== MODULES ==========================-
import React from 'react';

// -========================== COMPONENTS ==========================-
// Mocks
import data from '../helpers/mockup';
// Own components
import Item from './Item';

import '../styles/style.css';

class App extends React.Component {
    constructor(props) {
        super();

        this.state = {
            items: [],
            itemsInitPosition: [], // When we need to reset the order of the dragged items
            itemsActualPosition: [],
            between: []
        };

        this.recalculateOrder = this.recalculateOrder.bind(this);
        this.distanceBetweenTopAndBottom = this.distanceBetweenTopAndBottom.bind(this);
    }

    // -========================== OWN EVENTS ==========================-
    recalculateOrder(event) {
        // Do something here
    }

    distanceBetweenTopAndBottom(distance) {
        this.setState((prevState) => {
            prevState.between.push(distance);

            return {
                between: prevState.between
            };
        });
    }

    // -========================== LIFE CYCLE ==========================-
    componentDidMount() {
        const dataKeys = Object.keys(data);

        this.setState({
            items: data.map((value, iter) =>
                <Item
                    key={`item-${iter}`}
                    title={value.title}
                    content={value.content}
                    initPosition={iter + 1}
                    actualPosition={0}
                    recalculateOrder={this.recalculateOrder}
                    distanceBetweenTopAndBottom={this.distanceBetweenTopAndBottom}
                />
            ),
            itemsInitPosition: dataKeys.map(value => Number(value) + 1),
            itemsActualPosition: dataKeys.map(() => 0)
        });
    }

    // -========================== Life Cycle ==========================-
    render() {
        return (
            <div className="app-container">
                {this.state.items}
            </div>
        );
    }
}

export default App;