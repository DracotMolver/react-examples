import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
// project
import { VIDEO_LIST_URL } from "./../utils/constants";
import PrivateRouter from "./../utils/HOC/PrivateRouter";
// Containers
import SingleVideo from "./../containers/SingleVideo";
import VideoLists from "./../containers/VideoLists";
import Login from "./../containers/Login";
// styles
import "./styles.scss";

const App = () => (
  <BrowserRouter>
    <Switch>
      <Route exact path="/" component={Login} />
      <PrivateRouter exact path={VIDEO_LIST_URL}>
        <VideoLists />
      </PrivateRouter>
      <PrivateRouter
        path={`${VIDEO_LIST_URL}/:id`}
        component={SingleVideo}
      />
    </Switch>
  </BrowserRouter>
);

export default App;
