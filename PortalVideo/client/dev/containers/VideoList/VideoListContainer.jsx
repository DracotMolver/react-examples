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
import Header from './../../components/Commons/Header.jsx';
import VideoList from './../../components/Video/VideoList.jsx';

export default class VideoSingleContainer extends React.Component {
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
                                        name: v.name,
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
                            Show me more videos!
                        </button>
                    </div>
                </div>
            </div>
        );
    }
}
