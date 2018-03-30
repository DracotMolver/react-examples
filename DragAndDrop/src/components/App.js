import React from 'react';

// Mocks
import data from '../helpers/mockup';

// Own components
import Item from './Item';

import '../styles/style.css';

class App extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            items: [],
            itemsInitPosition: [],
            itemsActualPosition: []
        };

        this.recalculateOrder = this.recalculateOrder.bind(this);
    }

    // -========================== OWN EVENTS ==========================-
    recalculateOrder(event) {
        // Do something here
    }

    // -========================== LIFE CYCLE ==========================-
    componentWillMount() {
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
                />
            ),
            itemsInitPosition: dataKeys.map(value => Number(value) + 1),
            itemsActualPosition: (new Array(dataKeys.length)).fill(0, 0, dataKeys.length)
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