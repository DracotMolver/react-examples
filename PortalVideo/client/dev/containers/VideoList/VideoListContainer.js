/**
 * @author Diego Alberto Molina Vera
 * @copyright 2017 - 2018
 */
// -========================== MODULES ==========================-
import React from 'react';
import SuperAgent from 'superagent';

// -========================== COMPONENTS ==========================-
import Base from './../../components/Commons/Base';
import VideoList from './../../components/Video/VideoList';
import {
    LOAD_VIDEOS_ERROR,
    TYPE_ERROR,
    TYPE_WARNING
} from '../../constants/Strings';
import { USER_DATA } from '../../constants/Storage';
import { VIDEOS_URL } from '../../constants/Paths';

export default class VideoSingleContainer extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            messageType: '',
            messageText: '',
            lastValue: 5, // The last video on the list
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
        const userData = JSON.parse(sessionStorage.getItem(USER_DATA));

        // Fetch the data from the API
        // http://localhost:3000/videos
        // ------------------------------
        // Get the last 9 videos
        SuperAgent.get(VIDEOS_URL)
            .query({
                sessionId: userData.sessionId.toString(),
                skip: lastValue - 4,
                limit: lastValue
            })
            .end((err, res) => {
                if (err) {
                    this.setState({
                        messageText: LOAD_VIDEOS_ERROR,
                        messageType: TYPE_ERROR
                    });
                } else {
                    if (res.body.status === 'success') {
                        // #TODO
                        // Save all the ids to use them later when the user clicks on
                        // a video. Could show him some shuffles one to watch
                        // sessionStorage.setItem(VIDEO_LIST_DATA,
                        //     JSON.stringify(
                        //         res.body.data.map(v =>
                        //             ({ // Extracted from the data base (mongodb)
                        //                 name: v.name,
                        //                 id: v._id
                        //             })
                        //         )
                        //     )
                        // );

                        this.setState({
                            videoListItems: videoListItems.concat(res.body.data)
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
    componentWillMount() {
        this.getMoreVideos();
    }

    render() {
        return (
            <Base>
                <VideoList
                    videoListItems={this.state.videoListItems}
                    getMoreVideo={this.getMoreVideos}
                />
            </Base>
        );
    }
}
