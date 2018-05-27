/**
 * @author Diego Alberto Molina Vera
 * @copyright 2017 - 2018
 */
// -========================== MODULES ==========================-
import React from 'react';
import SuperAgent from 'superagent';

// -========================== COMPONENTS ==========================-
import Base from 'Components/Commons/Base';
import VideoList from 'Components/Video/List';
import {
    LOAD_VIDEOS_ERROR,
    TYPE_ERROR,
    TYPE_WARNING
} from 'Constants/Strings';
import { USER_DATA } from 'Constants/Storage';
import { VIDEOS_URL } from 'Constants/Paths';
import { getUserData } from 'Helpers';

export default class VideoListContainer extends React.Component {
    constructor(props) {
        super();

        this.state = {
            messageType: '',
            messageText: '',
            lastValue: 1, // The last video on the list
            videoListItems: [] // A list container of the videos,
        };

        // Get immediately the list of videos
        this.getMoreVideos = this.getMoreVideos.bind(this);
    }

    // -============================ OWN EVENTS ============================-

    getMoreVideos() {
        const {
            lastValue,
            videoListItems
        } = this.state;

        // Check always for the session
        // The list of videos are stored in the session
        // because if you refresh the browser, the list will be reseted.
        const { sessionId } = getUserData();

        // Fetch the data from the API
        // http://localhost:3000/videos
        // ------------------------------
        // Get the last 9 videos
        SuperAgent.get(VIDEOS_URL)
            .query({
                sessionId,
                skip: lastValue,
                limit: 1
            })
            .end((err, res) => {
                if (err) {
                    this.setState({
                        messageText: LOAD_VIDEOS_ERROR,
                        messageType: TYPE_ERROR
                    });
                } else {
                    if (res.body.status === 'success') {
                        this.setState({
                            videoListItems: videoListItems.concat(res.body.data),
                            lastValue: lastValue + 1
                        });
                    } else {
                        this.setState({
                            messageText: LOAD_VIDEOS_ERROR,
                            messageType: TYPE_WARNING
                        });
                    }
                }
            });
    }

    // -============================ REACT LIFECYLE ============================-
    componentDidMount() {
        this.getMoreVideos();
    }

    render() {
        const {
            videoListItems,
            lastValue
        } = this.state;

        return (
            <Base>
                <VideoList
                    videoListItems={videoListItems}
                    getMoreVideos={this.getMoreVideos}
                />
            </Base>
        );
    }
}
