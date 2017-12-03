/**
 * @author Diego Alberto Molina Vera
 * @copyright 2017
 *
 * @class VideosComponents - Video componenet
 * Here we built some components to display info of the video
 * and the video itself.
 */
// -========================== MODULES ==========================-
// HTTP Requests
import SuperAgent from 'superagent';

import React from 'react';
import {
    Link
} from 'react-router-dom';

// -========================== COMPONENTS ==========================-
import HeaderComponent from './header.jsx';
import MessageComponent from './messages.jsx';

/**
 * This component will render a popup dialog to rate the video
 */
class VideoRatePopPupComponent extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            isSuccess: false,
            value: 0,
            id: '',
        };

        this.getInitialMessage = this.getInitialMessage.bind(this);
        this.getSuccessMessage = this.getSuccessMessage.bind(this);
        this.handleClickClose = this.handleClickClose.bind(this);
        this.handleChangeRate = this.handleChangeRate.bind(this);
        this.handleClickDone = this.handleClickDone.bind(this);
    }

    // -============================ OWN EVENTS ============================-

    handleChangeRate(e) {
        this.setState({
            value: e.currentTarget.value
        });
    }

    handleClickClose() {
        this.setState({
            isSuccess: false
        });

        // Belongs to the parent - VideoSingleCardComponent
        this.props.hidePopUp();
    }

    handleClickDone() {
        const {
            hidePopUp,
            idToRate
        } = this.props;

        SuperAgent.post('/video/ratings')
            .type('form')
            .query({
                'sessionId': JSON.parse(sessionStorage.getItem('userData')).sessionId
            })
            .send({
                'videoId': idToRate,
                'rating': this.state.value,
            })
            .end((err, res) => {
                if (err) {
                    this.setState({
                        isSuccess: false
                    });

                    // this.props.setMessage(
                    //     'There was an error trying to rate the video. Please, try later.',
                    //     'error'
                    // );

                    hidePopUp();
                } else {
                    if (res.body.status === 'success') {
                        this.setState({
                            isSuccess: true
                        });
                    } else {
                        //                         this.props.setMessage(
                        //                             'You can\t rate the video now. Please, try later.',
                        //                             'warning'
                        //                         );

                        hidePopUp();
                    }
                }
            });
    }

    getSuccessMessage() {
        if (this.state.isSuccess) {
            let time = setTimeout(() => {
                this.setState({
                    isSuccess: false
                });

                this.props.hidePopUp();
                clearTimeout(time);
            }, 2600);

            return (
                <div>
                    <div className="grid-100">
                        <div className="rate-close-popup"
                            onClick={this.handleClickClose}>
                            Close X
                        </div>
                    </div>
                    <div className="grid-100">
                        <h3>Thanks for rating the video! :)</h3>
                    </div>
                </div>
            );
        }
    }

    getInitialMessage() {
        let inputs = [];

        // This foor loop always is gonna be faster than the forEach
        for (let i = 0; i < 5; i++) {
            inputs.push(
                <div key={`rate-${i.toString()}`}>
                    <div className="grid-20">
                        <input
                            className="option-input"
                            name="rateVideo"
                            type="radio"
                            value={(i + 1).toString()}
                            onChange={this.handleChangeRate} />
                        +{(i + 1).toString()}
                    </div>
                </div>
            )
        }

        return (
            <div>
                <div className="grid-100">
                    <div className="rate-close-popup"
                        onClick={this.handleClickClose}>
                        Close X
                    </div>
                </div>
                <div className="grid-100">
                    <h3>How much did you enjoy the video?</h3>
                </div>
                <div className="grid-100 rate-stars-input">
                    {inputs}
                </div>
                <div className="grid-100">
                    <div className="rate-button-container">
                        <button type="button"
                            className="button shadow"
                            onClick={this.handleClickDone}>
                            Done!
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    // -============================ REACT LIFECYLE ============================-

    render() {
        const {
            displayPopUp
        } = this.props;

        return (
            <div className={
                `rate-stars-container ${displayPopUp ? '' : 'hide'}`
            }>
                <div className="grid-container">
                    <div className={
                        `rate-stars-popup shadow ${displayPopUp ? 'fadeInDown-anim' : ''}`
                    }>
                        {
                            this.state.isSuccess ? this.getSuccessMessage() : this.getInitialMessage()
                        }
                    </div>
                </div>
            </div>
        );
    }
}

/**
 * This component will render the Video with all its information
 */
class VideoSingleCardComponent extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            displayPopUp: false
        };

        this.handleClickRate = this.handleClickRate.bind(this);
        this.hidePopUp = this.hidePopUp.bind(this);
    }

    // -============================ OWN EVENTS ============================-

    handleClickRate() {
        this.setState({
            displayPopUp: true
        });
    }

    hidePopUp() {
        this.setState({
            displayPopUp: false
        });
    }

    // -============================ REACT LIFECYLE ============================-
    render() {
        const {
            videoData
        } = this.props;

        return (
            <div className="video-single-container">
                <VideoRatePopPupComponent
                    idToRate={videoData._id}
                    displayPopUp={this.state.displayPopUp}
                    hidePopUp={this.hidePopUp}
                />
                <div className="grid-container">
                    <div className="grid-100">
                        <Link className="back-arrow"
                            to="/videos-list">
                            &larr; Back to the list
                        </Link>
                    </div>
                    <div className="grid-100 grid-parent video-container shadow">
                        <div className="grid-100 grid-parent">
                            <div className="grid-50">
                                <h4 className="video-title">
                                    {videoData.title}
                                </h4>
                            </div>
                            <div className="grid-50 grid-parent">
                                <div className="grid-100 grid-parent">
                                    <div className="grid-80" style={
                                        {
                                            textAlign: 'right'
                                        }
                                    }>
                                        {VideoRatingComponent(videoData.ratings)}
                                    </div>
                                    <div className="grid-20 grid-parent">
                                        <button
                                            type="button"
                                            className="rate-button"
                                            onClick={this.handleClickRate}
                                        >
                                            Rate!
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="grid-100">
                            {VideoFullSCreenComponent(videoData.url)}
                        </div>
                        <div className="grid-100">
                            {VideoDescriptionComponent(videoData.description)}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

/**
 * Acts as video container.
 * Within it are:
 * 
 * - The image of the video
 * - The description
 * - The rating
 *
 * @param {array} props - List of videos
 */
const VideoCardComponent = props => {
    // Generate the list of videos (Cards).
    const videoList = props;
    const counter = videoList.length;

    return props.map(video => (
        <div id={video._id} className="video-list-item" key={video._id}>
            <div className="grid-25">
                <div className="grid-100 video-container shadow zoomInUp-anim">
                    <div className="grid-100">
                        <h4 className="video-title">
                            {video.title}
                        </h4>
                    </div>
                    <div className="grid-100">
                        {VideoThumbComponent(video)}
                    </div>
                    <div className="grid-100">
                        {VideoDescriptionComponent(video.description)}
                    </div>
                    <div className="grid-100">
                        {VideoRatingComponent(video.ratings)}
                    </div>
                </div>
            </div>
        </div>
    ));
}

// The small image of the video
const VideoThumbComponent = props => {
    const {
        _id,
        description
    } = props;

    return (
        <Link to={`/videos-list/${_id}`}>
            <div className="video-thumb">
                <img src="" alt={description} />
            </div>
        </Link>
    );
};

/**
 * it will get the video to render it
 * 
 * @param {string} props - The video URL
 */
const VideoFullSCreenComponent = props => (
    <div className="video-full-screen">
        <video
            className="video-source-container"
            height="auto"
            width="100%"
            controls="true">
            <source src={props} type="video/mp4"></source>
        </video>
        <div className="video-hover" >Play!</div>
    </div>
);

/**
 * It will show the amount of rating
 * filling the starts.
 *
 * @param {number} props - The amount of rating
 */
const VideoRatingComponent = props => {
    const ratings = props;

    const getPercentRating = () => {
        const total = ratings.reduce((a, b) => a + b);
        return ((100 * total) / (ratings.length * 5)).toString();
    };

    return (
        <div className="video-img">
            <div
                className="video-img-rating"
                style={
                    {
                        width: `${getPercentRating()}%`
                    }
                }>
            </div>
            <img srcSet="output/stars.png" width="100%" height="100%" />
        </div>
    );
};

/**
 * It will display the description of the video
 *
 * @param {string} props - The description of the video
 */
const VideoDescriptionComponent = props => (
    <div>
        <p className="video-description">
            {props}
        </p>
        <div className="line-separator"></div>
    </div>
);

/**
 * This class will render the whole list of videos in the main page
 */
class VideoListComponent extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            messageType: '',
            messageText: '',
            lastValue: 10, // The last video on the list
            videoList: [] // A list container of the videos,
        }

        // Get immediately the list of videos
        this.getMoreVideos = this.getMoreVideos.bind(this);

        this.getMoreVideos();
    }

    // -============================ OWN EVENTS ============================-

    getMoreVideos() {
        const {
            lastValue,
            videoList
        } = this.state;

        // Check always for the session
        // The list of videos are stored in the session
        // because if you refresh the browser, the list will be reseted.
        const userData = JSON.parse(sessionStorage.getItem('userData'));

        // Redirect to the home if the session doesn't exist
        if (!userData) {
            this.props.history.push('/');
        } else {

            // Fetch the data from the API
            // http://localhost:3000/videos
            // ------------------------------
            // Get the last 9 videos
            SuperAgent.get('/videos')
                .query({
                    sessionId: userData.sessionId.toString(),
                    skip: lastValue - 9,
                    limit: lastValue
                })
                .end((err, res) => {
                    if (err) {
                        this.setState({
                            messageText: 'There was an error trying to load the videos. Please, try later',
                            messageType: 'error'
                        });
                    } else {
                        if (res.body.status === 'success') {
                            // Save all the ids to use them later when the user clicks on
                            // a video. Could show him some shuffles one to watch
                            sessionStorage.setItem('videoList',
                                JSON.stringify(
                                    res.body.data.map(v =>
                                        ({ // Extracted from the data base (mongodb)
                                            title: v.name,
                                            id: v._id
                                        })
                                    )
                                )
                            );

                            this.setState({
                                videoList: videoList.concat(res.body.data)
                            });
                        } else {
                            this.setState({
                                messageText: 'We can\t load some videos now. Sorry',
                                messageType: 'warning'
                            });
                        }
                    }
                });
        }
    }

    // -============================ REACT LIFECYLE ============================-

    render() {
        return (
            <div>
                {HeaderComponent()}
                <div className="grid-container">
                    {
                        !!this.state.videoList.length &&
                        VideoCardComponent(this.state.videoList)
                    }
                    <div className="grid-25 zoomInUp-anim">
                        <button
                            onClick={this.getMoreVideos}
                            id="show-more"
                            className="button shadow"
                            type="button">
                            Show me more videos!
                        </button>
                    </div>
                </div>
            </div>
        );
    }
}

/**
 * This class display only one video in a full screen mode
 */
class VideoSingleComponent extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            messageText: '',
            messageType: '',
            videoData: {}
        };

        this.getVideoData = this.getVideoData.bind(this);

        this.getVideoData();
    }

    // -============================ OWN EVENTS ============================-

    getVideoData() {
        const userData = JSON.parse(sessionStorage.getItem('userData'));

        // Redirect to the home if the sessión doesn't exist
        if (!userData) {
            this.props.history.push('/');
        } else {

            const {
                videoData
            } = this.state;

            SuperAgent.get('/video')
                .query({
                    sessionId: userData.sessionId,
                    videoId: this.props.videoId // Match allow us to get the data from the URL
                })
                .end((err, res) => {
                    // Redirect to the home if the sessión doesn't exist
                    if (err) {
                        this.props.history.push('/videos-list');
                    } else {
                        if (res.body.status === 'success') {
                            this.setState({
                                videoData: res.body.data
                            });
                        } else {
                            this.setState({
                                messageText: 'There was an error trying to load the videos. Please, try later.',
                                messageType: 'error'
                            });
                        }
                    }
                });
        }
    }

    // -============================ REACT LIFECYLE ============================-

    render() {
        const {
            messageText,
            messageType,
            videoData
        } = this.state;

        return (
            <div>
                {HeaderComponent()}
                {MessageComponent({ messageText, messageType })}
                {
                    !!Object.keys(videoData).length &&
                    <VideoSingleCardComponent videoData={videoData} />
                }
            </div>
        );
    }
}

export {
    VideoListComponent,
    VideoSingleComponent
};
