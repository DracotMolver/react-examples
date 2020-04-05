/**
 * @author Diego Alberto Molina Vera
 * @copyright 2017 - 2018
 */
// -========================== MODULES ==========================-
import React from 'react';
import SuperAgent from 'superagent';

// -========================== COMPONENTS ==========================-
import { LOAD_VIDEOS_ERROR, TYPE_ERROR } from 'Constants/Strings';
import { USER_DATA } from 'Constants/Storage';
import { VIDEO_URL, VIDEO_LIST_URL } from 'Constants/Paths';
import { getUserData } from 'Helpers';
import Base from 'Components/Commons/Base';
import Message from 'Components/Commons/Message';
import VideoCardContainer from 'Containers/Video/Single/Card';

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
                        this.setState((prevState, props) => {
                            return {
                                videoData: res.body.data
                            };
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
            <Base>
                <React.Fragment>
                    <VideoCardContainer videoData={videoData} />
                    <Message messageText={messageText} messageType={messageType} />
                </React.Fragment>
            </Base>
        );
    }
}
