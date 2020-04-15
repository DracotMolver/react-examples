import React, { Fragment, useEffect, useState } from "react";
import SuperAgent from 'superagent';
import produce from "immer";
import { is } from "quartzjs";
// project
import { getUserData } from "../../utils/functions";
// components
import BarHeader from "../../components/Widgets/BarHeader";

// import VideoLists from 'Components/Video/List';
// import {
//     LOAD_VIDEOS_ERROR,
//     TYPE_ERROR,
//     TYPE_WARNING
// } from 'Constants/Strings';
// import { USER_DATA } from 'Constants/Storage';
// import { VIDEOS_URL } from 'Constants/Paths';
// import { getUserData } from 'Helpers';

const VideoLists = (props) => {
  const [state, setState] = useState({
    messageType: "",
    messageText: "",
    lastValue: 1, // The last video on the list
    videoListItems: [], // A list container of the videos,
  });

  useEffect(() => {
    // const {
    //         lastValue,
    //         videoListItems
    //     } = this.state;

    // Check always for the session
    // The list of videos are stored in the session
    // because if you refresh the browser, the list will be reset.
    const { sessionId } = getUserData();
    // Get the last 9 videos
    SuperAgent.get("http://localhost:5000/videos")
      .query({
        sessionId,
        skip: state.lastValue,
        limit: 1,
      })
      .end((err, res) => {
        if (
          is.truthty(err) ||
          (is.truthty(res) && res.body.status !== "success") ||
          is.falsy(res)
        ) {
          setState(
            produce((draft) => {
              draft.messageText =
                "There was an error trying to load the videos. Please, try later";
              draft.messageType = "error";
            })
          );
        } else {
          setState(
            produce((draft) => {
              draft.videoListItems = state.videoListItems.concat(res.body.data);
              draft.lastValue = state.lastValue + 1;
            })
          );
        }
      });
  }, []);

  return (
    <Fragment>
      <BarHeader />
    </Fragment>
    //         <Base>
    //             <VideoLists
    //                 videoListItems={videoListItems}
    //                 getMoreVideos={this.getMoreVideos}
    //             />
    //         </Base>
  );
};

export default VideoLists;
