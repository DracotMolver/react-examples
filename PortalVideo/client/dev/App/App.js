/**
 * @author Diego Alberto Molina Vera
 * @copyright 2017 - 2018
 */
// -========================== MODULES ==========================-
import React from 'react';
import { HashRouter, Switch, Route } from 'react-router-dom';

// -========================== COMPONENTS ==========================-
import { LoginForm } from './../components/Login/LoginForm';
import PrivateRouter from './../components/HOC/PrivateRouter';
import VideoListContainer from './../containers/VideoList/VideoListContainer';
import VideoSingleContainer from './../containers/VideoSingle/VideoSingleContainer';
import { USER_DATA } from '../constants/Storage';
import { VIDEO_LIST_URL } from '../constants/Paths';

const App = () => {
    // Check the session before the rendering happens
    const userData = JSON.parse(sessionStorage.getItem(USER_DATA));

    return (
        <HashRouter>
            <Switch>
                <Route exact path="/" component={LoginForm} />
                <PrivateRouter
                    exact
                    path={VIDEO_LIST_URL}
                    component={VideoListContainer}
                />
                <PrivateRouter
                    path={`${VIDEO_LIST_URL}/:id`}
                    component={VideoSingleContainer}
                />
            </Switch>
        </HashRouter>
    );
};

export default App;
