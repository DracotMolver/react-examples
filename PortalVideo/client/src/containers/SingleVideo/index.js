import React, { useState, useEffect, Fragment } from "react";
import SuperAgent from "superagent";
import produce from "immer";
import { is } from "quartzjs";


const SingleVideo = (props) => {
  const [state, setState] = useState({
    messageText: "",
    messageType: "",
    videoData: {},
  });

  const history = useHistory();
  const { id } = useParams();
  console.log(id);
  useEffect(() => {
    const { sessionId } = getUserData();

    SuperAgent.get("http://localhost:5000/video")
      .query({
        sessionId,
        videoId: id,
      })
      .end((err, res) => {
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

  /**
   * constructor(props) {
        super();

        this.state = {
            displayPopUp: false
        };

        this.handleClickRate = this.handleClickRate.bind(this);
        this.hidePopUp = this.hidePopUp.bind(this);
    }

    // -============================ OWN EVENTS ============================-
    handleClickRate() {
        this.setState({
            displayPopUp: true
        });
    }

    hidePopUp() {
        this.setState({
            displayPopUp: false
        });
    }

    // -============================ REACT LIFECYLE ============================-
    render() {
        const {
            handleClickRate,
            hidePopUp,
            state,
            props
        } = this;

        return (
            <VideoCardBig
                {...props.videoData}
                hidePopUp={hidePopUp}
                handleClickRate={handleClickRate}
                displayPopUp={state.displayPopUp}
            />
        );
   */

  return (
    <Fragment>
      <VideoCardBig videoData={state.videoData} />
      {/* <Message messageText={messageText} messageType={messageType} /> */}
    </Fragment>
  );
};

export default SingleVideo;
