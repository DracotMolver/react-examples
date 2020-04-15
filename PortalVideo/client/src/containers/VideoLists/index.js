import React, { Fragment, useEffect, useState } from "react";
import SuperAgent from "superagent";
import produce from "immer";
import { is } from "quartzjs";
// project
import { getUserData } from "../../utils/functions";
// components
import BarHeader from "../../components/Widgets/BarHeader";
import VideoList from "../../components/Videos/VideoList";

const VideoLists = (props) => {
  const [state, setState] = useState({
    messageType: "",
    messageText: "",
    lastValue: 1, // The last video on the list
    videoLists: [], // A list container of the videos,
  });

  useEffect(() => {
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
              draft.videoLists = state.videoLists.concat(res.body.data);
              draft.lastValue = state.lastValue + 1;
            })
          );
        }
      });
  }, []);

  return (
    <Fragment>
      <BarHeader />
      <div className="grid-container">
        <VideoList videoLists={state.videoLists} />
        <div className="grid-25 mobile-grid-100 zoomInUp-anim">
          <button
            // onClick={getMoreVideos}
            className="button shadow"
            type="button"
            id="show-more"
          >
            Show me more videos!
          </button>
        </div>
      </div>
    </Fragment>
  );
};

export default VideoLists;
