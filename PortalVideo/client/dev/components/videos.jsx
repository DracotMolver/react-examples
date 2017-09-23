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

// CSS grid framework system
import {
    GridContainer,
    Grid
} from 'unsemantic';

// -========================== COMPONENTS ==========================-
import HeaderComponent from './header.jsx';
import MessageComponent from './messages.jsx';

let VideoRatePopPupComponent = React.createClass({
    getInitialState: function () {
        return {
            id: '',
            value: 0,
            isSuccess: false
        }
    },
    getInitialMessage () {
        let inputs = [];
        for (let i = 0; i < 5; i++) {
            inputs.push(
                <div key={i.toString()}>
                    <Grid desktop="20">
                        <input
                            className="option-input"
                            name="rateVideo"
                            type="radio"
                            value={(i + 1).toString()}
                            onChange={this.handleChangeRate} />+{(i + 1).toString()}
                    </Grid>
                </div>
            )
        }
        return (
            <div>
                <Grid desktop="100">
                    <div className="rate-close-popup" onClick={this.handleClickClose}>Close X</div>
                </Grid>
                <Grid desktop="100">
                    <h3>How much do you enjoyed this video?</h3>
                </Grid>
                <Grid desktop="100 rate-stars-input">
                    {inputs}
                </Grid>
                <Grid desktop="100">
                    <div className="rate-button-container">
                        <button type="button" className="button shadow" onClick={this.handleClickDone}>Done!</button>
                    </div>
                </Grid>
            </div>
        );
    },
    handleChangeRate (e) {
        this.setState({
            value: e.currentTarget.value
        });
    },
    handleClickDone () {
        SuperAgent.post('/video/ratings')
            .type('form')
            .query({
                'sessionId': JSON.parse(sessionStorage.getItem('userData')).sessionId
            })
            .send({
                'videoId': this.props.idToRate,
                'rating': this.state.value,
            })
            .end((function (err, res) {
                if (err) {
                    this.setState({
                        isSuccess: false
                    });

                    this.props.setMessage(
                        'There was an error trying to rate the video. Please, try later.',
                        'error'
                    );

                    this.props.hidePopUp();
                } else {
                    if (res.body.status === 'success') {
                        this.setState({
                            isSuccess: true
                        });
                    } else {
                        this.props.setMessage(
                            'You can\t rate the video now. Please, try later.',
                            'warning'
                        );
    
                        this.props.hidePopUp();
                    }
                }
            }).bind(this));
    },
    handleClickClose () {
        this.setState({
            isSuccess: false
        })
        this.props.hidePopUp();
    },
    getSuccessMessage () {
        if (this.state.isSuccess) {
            let time = setTimeout((function () {
                this.setState({
                    isSuccess: false
                });
                this.props.hidePopUp();
                clearTimeout(time);
            }).bind(this), 2600);

            return (
                <div>
                    <Grid desktop="100">
                        <div className="rate-close-popup" onClick={this.handleClickClose}>Close X</div>
                    </Grid>
                    <Grid desktop="100">
                        <h3>Thank you for rating this video! :)</h3>
                    </Grid>
                </div>
            );
        }
    },
    render () {
        return (
            <div className={"rate-stars-container " + (this.props.displayPopUp ? '' : 'hide')}>
                <GridContainer>
                    <div className={"rate-stars-popup shadow " + (this.props.displayPopUp? 'fadeInDown-anim' : '')} >
                        {
                            this.state.isSuccess ? this.getSuccessMessage() : this.getInitialMessage()
                        }
                    </div>
                </GridContainer>
            </div>
        );
    }
});

let VideoSingleCardComponent = React.createClass({
    getInitialState () {
        return {
            displayPopUp: false
        };
    },
    handleClickRate () {
        this.setState({
            displayPopUp: true
        });
    },
    hidePopUp() {
        this.setState({
            displayPopUp: false
        })
    },
    render() {
        return (
            <div className="video-single-container">
                <VideoRatePopPupComponent
                    idToRate={this.props._id}
                    displayPopUp={this.state.displayPopUp}
                    hidePopUp={this.hidePopUp}
                    {...this.props}/>
                <GridContainer>
                    <Grid desktop="100">
                        <Link className="back-arrow" to="/videos-list">&larr; Back to the list</Link>
                    </Grid>
                    <Grid desktop="100 video-container shadow" parent>
                        <Grid desktop="100">
                            <Grid desktop="50">
                                <h4 className="video-title">{this.props.title}</h4>
                            </Grid>
                            <Grid desktop="50">
                                <Grid desktop="100" parent>
                                    <Grid desktop="80" style={{textAlign: 'right'}}>
                                        <VideoRatingComponent {...this.props} />
                                    </Grid>
                                    <Grid desktop="20" parent>
                                        <button
                                            type="button"
                                            className="rate-button"
                                            onClick={this.handleClickRate}
                                        >Rate!</button>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid desktop="100">
                            <VideoFullSCreenComponent {...this.props} />
                        </Grid>
                        <Grid desktop="100">
                            <VideoDescriptionComponent {...this.props} />
                        </Grid>
                    </Grid>
                </GridContainer>
            </div>
        );
    }
});

let VideoCardComponent = React.createClass({
    render () {
        return (
            <div id={this.props._id} className="video-list-item">
                <Grid desktop="25">
                    <Grid desktop="100 video-container shadow zoomInUp-anim">
                        <Grid desktop="100">
                            <h4 className="video-title">
                                {this.props.title}
                            </h4>
                        </Grid>
                        <Grid desktop="100">
                            <VideoThumbComponent {...this.props} />
                        </Grid>
                        <Grid desktop="100">
                            <VideoDescriptionComponent {...this.props} />
                        </Grid>
                        <Grid desktop="100">
                            <VideoRatingComponent {...this.props} />
                        </Grid>
                    </Grid>
                </Grid>
            </div>
        );
    }
});

let VideoComponent = React.createClass({
    render () {
        return (
            <div>
                <video
                    className="video-source-container"
                    height="auto"
                    width="100%"
                    controls={this.props.controls}>
                    <source src={this.props.url} type="video/mp4"></source>
                </video>
                <div className="video-hover" >Play!</div>
            </div>
        );
    }
});

let VideoThumbComponent = React.createClass({
    render () {
        return (
            <Link to={'/single-video/' + this.props._id}>
                <div className="video-thumb">
                    <VideoComponent {...this.props}/>
                </div>
            </Link>
        );
    }
});

let VideoFullSCreenComponent = React.createClass({
    render: function () {
        return (
            <div className="video-full-screen">
                <VideoComponent {...this.props} />
            </div>
        );
    }
});

let VideoRatingComponent = React.createClass({
    getPercentRating () {
        const total = this.props.ratings.reduce(function (a, b) {
            return a + b;
        });
        return (100 * total) / (this.props.ratings.length * 5);
    },
    render () {
        return (
            <div className="video-img">
                <div
                    className="video-img-rating"
                    style={{ width: this.getPercentRating().toString() + '%' }}>
                </div>
                <img srcSet="output/stars.png" width="100%" height="100%" />
            </div>
        );
    }
});

let VideoDescriptionComponent = React.createClass({
    render () {
        return (
            <div>
                <p className="video-description">
                    {this.props.description}
                </p>
                <div className="line-separator"></div>
            </div>
        );
    }
});

let VideoShowMoreComponent = React.createClass({
    render () {
        return (
            <Grid desktop="25 zoomInUp-anim">
                <button
                    onClick={this.props.getMoreVideos}
                    id="show-more"
                    className="button shadow"
                    type="button">Show me more videos!</button>
            </Grid>
        );
    }
});

let VideoListComponent = React.createClass({
    getInitialState () {
        return {
            lastValue: 10,
            videoList: []
        }
    },
    getMoreVideos () {
        const userData = JSON.parse(sessionStorage.getItem('userData'));
        if (userData) {
            // Fetch the data from the API
            // http://localhost:3000/videos
            SuperAgent.get('/videos')
                .query({
                    sessionId: userData.sessionId.toString(),
                    skip: this.state.lastValue - 9,
                    limit: this.state.lastValue
                })
                .end((function (err, res) {
                    if (err) {
                        this.props.setMessage(
                            'There was an error trying to load the video. Please, try later',
                            'error'
                        );
                    } else {
                        if (res.body.status === 'success') {
                            // Save all the ids to use them later when the user click on
                            // a videa and we could show him some other that he could watch
                            sessionStorage.setItem('videoList',
                                JSON.stringify(res.body.data.map(function (v) {
                                    return {
                                        title: v.name,
                                        id: v._id
                                    };
                                })
                                ));
    
                            // Make the list of videos (Cards).
                            let counter = this.state.videoList.length;
                            let videoList = res.body.data.map((function (v) {
                                return <VideoCardComponent
                                    key={++counter}
                                    _id={v._id}
                                    description={v.description}
                                    url={v.url}
                                    title={v.name}
                                    ratings={v.ratings}
                                    controls={false}
                                />;
                            }).bind(this));
    
                            this.setState({
                                videoList: this.state.videoList.concat(videoList)
                            });
                        } else {
                            this.props.setMessage(
                                'We can\t load some videos now. Sorry',
                                'warning'
                            );
                        }
                    }
                }).bind(this));
        } else {
            this.props.history.push('/');
        }
    },
    componentWillMount() {
        this.getMoreVideos();
    },
    render () {
        return (
            <div>
                <HeaderComponent />
                <GridContainer>
                    {this.state.videoList}
                    <VideoShowMoreComponent getMoreVideos={this.getMoreVideos} />
                </GridContainer>
            </div>
        );
    }
});

let VideoSingleComponent = React.createClass({
    getInitialState: function () {
        return {
            singleVideo: null,
            errorMessage: '',
            errorType: ''
        };
    },
    componentWillMount: function () {
        const userData = JSON.parse(sessionStorage.getItem('userData'));

        if (userData === null) {
            this.props.history.push('/');
        }

        SuperAgent.get('/video')
            .query({
                sessionId: userData.sessionId,
                videoId: this.props.match.params.id // Match allow us to get the data from the URL
            })
            .end((function (err, res) {
                if (err) {
                    this.props.history.push('/videos-list');
                } else {
                    if (res.body.status === 'success') {
                        this.setState({
                            singleVideo: (
                                <VideoSingleCardComponent
                                    key={this.props.match.params.id}
                                    title={res.body.data.name}
                                    _id={res.body.data._id}
                                    description={res.body.data.description}
                                    url={res.body.data.url}
                                    ratings={res.body.data.ratings}
                                    controls={true}
                                    setMessage={this.setMessage}
                                />)
                        });
                    } else {
                        this.setMessage(
                            'There was an error trying to load the videos. Please, try later.',
                            'error'
                        );
                    }
                }
            }).bind(this));
    },
    setMessage(msg, _type) {
        this.setState({
            errorType: _type,
            errorMessage: msg
        });
    },
    render () {
        return (
            <div>
                <HeaderComponent />
                <MessageComponent
                    errorMessage={this.state.errorMessage}
                    errorType={this.state.errorType} />
                {this.state.singleVideo}
            </div>
        );
    }
});

export { VideoListComponent, VideoSingleComponent };
