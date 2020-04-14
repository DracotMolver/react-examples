import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
// project
import { VIDEO_LIST_URL } from "./../utils/constants";
import PrivateRouter from "./../utils/HOC/PrivateRouter";
// Containers
import Login from "./../containers/Login";
// styles
import './styles.scss';

const App = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={Login} />
        {/* <PrivateRouter exact path={VIDEO_LIST_URL}>
          <VideoLists />
        </PrivateRouter> */}
        {/* <PrivateRouter
          path={`${VIDEO_LIST_URL}/:id`}
          component={VideoSingleContainer}
        /> */}
      </Switch>
    </BrowserRouter>
  );
};

export default App;
