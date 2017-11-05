import React from 'react'

import ActivityItem from './components/ActivityItem/index'

class Content extends React.Component {
    render() {
        const {activities} = this.props
        return (
            <div>
                <div>line</div>
                {
                    activities.map((activity, i) => (
                        <ActivityItem
                            key={i}
                            activity={activity} />
                    ))
                }
            </div>
        )
    }
}

export default Content