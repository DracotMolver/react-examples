/**
 * @author Diego Alberto Molina Vera
 * @copyright 2017 - 2018
 *
 * @class VideoSingleContainer
 * This class display only one video in a full screen mode
 */
// -========================== MODULES ==========================-
import SuperAgent from 'superagent';

import React from "react";


// -========================== COMPONENTS ==========================-
import Header from './../components/Header.jsx';
import { VideoCardBig } from './../components/VideoCard.jsx';
import Message from './../components/Messages.jsx';

export default class VideoSingleContainer extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            messageText: '',
            messageType: '',
            videoData: {}
        };

        this.getVideoData = this.getVideoData.bind(this);
    }

    // -============================ OWN EVENTS ============================-
    getVideoData() {
        const userData = JSON.parse(sessionStorage.getItem('userData'));

        const {
            videoData
        } = this.state;

        SuperAgent.get('/video')
            .query({
                sessionId: userData.sessionId,
                videoId: this.props.match.params.id // Match allow us to get the data from the URL
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

    // -============================ REACT LIFECYLE ============================-
    componentWillMount() {
        this.getVideoData();
    }

    render() {
        const {
            messageText,
            messageType,
            videoData
        } = this.state;

        return (
            <div>
                <Header />
                <VideoCardBig videoData={videoData}/>
                <Message messageText={messageText} messageType={messageType} />
            </div>
        );
    }
}
