import React from 'react'

import Header from '../Header/index'
import Content from '../Content/index'

import './app.css'

// Data as example
const activities = [
    {
        timestamp: new Date().getTime(),
        text: "Ate lunch",
        user: {
            id: 1, name: 'Nate',
            avatar: "http://www.croop.cl/UI/twitter/images/doug.jpg"
        },
        comments: [{ from: 'Ari', text: 'Me too!' }]
    },
    {
        timestamp: new Date().getTime(),
        text: "Woke up early for a beautiful run",
        user: {
            id: 2, name: 'Ari',
            avatar: "http://www.croop.cl/UI/twitter/images/doug.jpg"
        },
        comments: [{ from: 'Nate', text: 'I am so jealous' }]
    },
]

class App extends React.Component {
    render() {
        return (
            <div className="notification-container">
                <div>
                    <Header title="título" />
                    <Content activities={activities}/>
                </div>
            </div>
        )
    }
}

export default App