/**
 * @author Diego Alberto Molina Vera
 * @copyright 2017 - 2018
 *
 * @class VideoListContainer
 * This class will render the whole list of videos in the main page
 */
// -========================== MODULES ==========================-
import React from 'react';
import SuperAgent from 'superagent';

// -========================== COMPONENTS ==========================-
import Header from './../../components/Commons/Header';
import VideoList from './../../components/Video/VideoList';
import { LOAD_VIDEOS_ERROR, TYPE_ERROR, TYPE_WARNING, LOAD_VIDEOS_BUTTON } from '../../constants/Strings';
import { VIDEO_LIST_DATA, USER_DATA } from '../../constants/Storage';
import { VIDEOS_URL } from '../../constants/Paths';

export default class VideoSingleContainer extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            messageType: '',
            messageText: '',
            lastValue: 5, // The last video on the list
            videoList: [] // A list container of the videos,
        }

        // Get immediately the list of videos
        this.getMoreVideos = this.getMoreVideos.bind(this);
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
        const userData = JSON.parse(sessionStorage.getItem(USER_DATA));

        // Fetch the data from the API
        // http://localhost:3000/videos
        // ------------------------------
        // Get the last 9 videos
        SuperAgent.get(VIDEOS_URL)
            .query({
                sessionId: userData.sessionId.toString(),
                skip: lastValue - 4 ,
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
                            videoList: videoList.concat(res.body.data)
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
            <div>
                <Header />
                <div className="grid-container">
                    <VideoList videoList={this.state.videoList} />
                    <div className="grid-25 mobile-grid-100 zoomInUp-anim">
                        <button
                            onClick={this.getMoreVideos}
                            id="show-more"
                            className="button shadow"
                            type="button"
                        >
                            {LOAD_VIDEOS_BUTTON}
                        </button>
                    </div>
                </div>
            </div>
        );
    }
}
