import React from 'react'

import './header.css'

class Header extends React.Component {
    render() {
        return (
            <div className="header-container">
                <div></div>
                <span>{this.props.title}</span>
                <input
                    type="text"
                    placeholder="Search ..." />
                <div></div>
            </div>
        )
    }
}

export default Header