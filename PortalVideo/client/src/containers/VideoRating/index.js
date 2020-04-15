import React, { useState } from "react";
import SuperAgent from "superagent";
import produce from "immer";
import { is } from "quartzjs";
// project
import { getUserData } from "../../utils/functions";
import { VIDEO_RATING_URL } from "../../utils/constants";

const VideoRating = (props) => {
  const [state, setState] = useState({
    isSuccess: false,
    value: 0,
    id: "",
  });

  function onChangeRateHandler(event) {
    event.persist();

    setState(
      produce((draft) => {
        draft.value = event.target.value;
      })
    );
  }

  function onClickCloseHandler() {
    setState(
      produce((draft) => {
        draft.isSuccess = false;
        draft.value = 0;
        draft.id = "";
      })
    );

    // Belongs to the parent - VideoCardBigWrapper
    const { onClickHideModalHandler } = props;
    onClickHideModalHandler();
  }

  function onClickVoteHandler() {
    const { onClickHideModalHandler, idToRate } = props;

    const { sessionId } = getUserData();

    SuperAgent.post(VIDEO_RATING_URL)
      .type("form")
      .query({
        sessionId,
      })
      .send({
        videoId: idToRate,
        rating: state.value,
      })
      .end((err, res) => {
        if (
          is.falsy(err) ||
          (is.truthty(res) && res.body.status === "success")
        ) {
          setState(
            produce((draft) => {
              draft.isSuccess = true;
            })
          );
        }
        onClickHideModalHandler();
      });
  }

  const { displayModal } = props;

  return (
    <VideoRateModal
      onClickCloseHandler={onClickCloseHandler}
      onChangeRateHandler={onChangeRateHandler}
      onClickVoteHandler={onClickVoteHandler}
      displayModal={displayModal}
      isSuccess={state.isSuccess}
    />
  );
};

export default VideoRating;
