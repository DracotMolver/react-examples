import React from 'react';

const videoLoader = WrapperComponent =>
    class VideoLoader extends React.Component {
        render() {
            return (
                !!this.props.videoList.length
                    ? <WrapperComponent {...this.props} />
                    : <div className="spinner"></div>
            );
        }
    }

export default videoLoader;
