/**
 * @author Diego Alberto Molina Vera
 * @copyright 2017 - 2018
 */
// -========================== MODULES ==========================-
import React from 'react';
import SuperAgent from 'superagent';

// -========================== COMPONENTS ==========================-
import Base from 'Commons/Base';
import VideoCardContainer from '_VideoSingle/VideoCardContainer';
import Message from 'Commons/Messages';
import { LOAD_VIDEOS_ERROR, TYPE_ERROR } from 'Constants/Strings';
import { USER_DATA } from 'Constants/Storage';
import { VIDEO_URL, VIDEO_LIST_URL } from 'Constants/Paths';
import { getUserData } from 'Helpers/getSession';

export default class VideoSingleContainer extends React.Component {
    constructor(props) {
        super();

        this.state = {
            messageText: '',
            messageType: '',
            videoData: {}
        };

        this.getVideoData = this.getVideoData.bind(this);
    }

    // -============================ OWN EVENTS ============================-
    getVideoData() {
        const { sessionId } = getUserData();

        SuperAgent.get(VIDEO_URL)
            .query({
                sessionId,
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
    componentDidMount() {
        this.getVideoData();
    }

    render() {
        const {
            messageText,
            messageType,
            videoData
        } = this.state;

        return (
            <Base>
                <React.Fragment>
                    <VideoCardContainer videoData={videoData} />
                    <Message messageText={messageText} messageType={messageType} />
                </React.Fragment>
            </Base>
        );
    }
}
