/**
 * @author Diego Alberto Molina Vera
 * @copyright 2017 - 2018
 *
 * @class VideoSingleContainer
 * This class display only one video in a full screen mode
 */
// -========================== MODULES ==========================-
import React from "react";
import SuperAgent from 'superagent';

// -========================== COMPONENTS ==========================-
import Header from './../../components/Commons/Header';
import { VideoCardBig } from './../../components/Video/VideoCard';
import Message from './../../components/Commons/Messages';
import { LOAD_VIDEOS_ERROR, TYPE_ERROR } from "../../constants/Strings";
import { USER_DATA } from "../../constants/Storage";
import { VIDEO_URL, VIDEO_LIST_URL } from "../../constants/Paths";

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
        const userData = JSON.parse(sessionStorage.getItem(USER_DATA));

        const {
            videoData
        } = this.state;

        SuperAgent.get(VIDEO_URL)
            .query({
                sessionId: userData.sessionId,
                videoId: this.props.match.params.id // Match allow us to get the data from the URL
            })
            .end((err, res) => {
                // Redirect to the home if the sessión doesn't exist
                if (err) {
                    this.props.history.push(VIDEO_LIST_URL);
                } else {
                    if (res.body.status === 'success') {
                        this.setState({
                            videoData: res.body.data
                        });
                    } else {
                        this.setState({
                            messageText: LOAD_VIDEOS_ERROR,
                            messageType: TYPE_ERROR
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
