import React from 'react';

const videoLoader = propname => WrapperComponent =>
    class VideoLoader extends React.Component {
        render() {
            // Check if the prop to validate is an object or an array
            return (
                (typeof this.props[propname] === 'object'
                    ? Object.keys(this.props[propname]).length
                    : !!this.props[propname].length
                )
                    ? <WrapperComponent {...this.props} />
                    : <div className="spinner"></div>
            );
        }
    }

export default videoLoader;
