import React, { useState, useEffect, Fragment } from "react";
import { useHistory, useParams } from "react-router-dom";
import SuperAgent from "superagent";
import produce from "immer";
import { is } from "quartzjs";
// project
import { getUserData } from "./../../utils/functions";
import { VIDEO_URL } from "../../utils/constants";
// components
import VideoCardBig from "./../../components/Videos/Cards/VideoCardBig";
import BarHeader from "./../../components/Widgets/BarHeader";

const SingleVideo = (props) => {
  const [state, setState] = useState({
    displayModal: false,
    messageText: "",
    messageType: "",
    videoData: {},
  });

  const history = useHistory();
  const { id } = useParams();

  useEffect(() => {
    const { sessionId } = getUserData();

    SuperAgent.get(VIDEO_URL)
      .query({
        sessionId,
        videoId: id,
      })
      .end((err, res) => {
        console.log(res)
        // Redirect to the home if the sessión doesn't exist
        if (is.truthty(err)) {
          history.goBack();
        } else {
          setState(
            produce((draft) => {
              if (res.body.status === "success") {
                draft.videoData = res.body.data;
              } else {
                draft.messageText =
                  "There was an error trying to load the videos. Please, try later";
                draft.messageType = "error";
              }
            })
          );
        }
      });
  }, []);

  function onClickRateHandler() {
    setState(
      produce((draft) => {
        draft.displayModal = true;
      })
    );
  }

  function onClickHideModalHandler() {
    setState(
      produce((draft) => {
        draft.displayModal = false;
      })
    );
  }

  return (
    <Fragment>
      <BarHeader />
      <VideoCardBig
        onClickHideModalHandler={onClickHideModalHandler}
        onClickRateHandler={onClickRateHandler}
        displayModal={state.displayModal}
        videoData={state.videoData}
      />
      {/* <Message messageText={messageText} messageType={messageType} /> */}
    </Fragment>
  );
};

export default SingleVideo;
