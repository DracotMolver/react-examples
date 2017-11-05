import React from 'react'

class ActivityItem extends React.Component {
    render() {
        const { activity } = this.props
        return (
            <div>
                <div>
                    <div>
                        <img
                            src={activity.user.avatar} alt={activity.text} />
                    </div>
                </div>
                <span>
                    {activity.timestamp}
                </span>
                <p>{activity.text}</p>
                <div>
                    {activity.comments.length}
                </div>
            </div>
        )
    }
}

export default ActivityItem