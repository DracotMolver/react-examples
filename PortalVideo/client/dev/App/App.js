/**
 * @author Diego Alberto Molina Vera
 * @copyright 2017 - 2018
 */

// -========================== MODULES ==========================-
import React from 'react';
import { HashRouter, Switch, Route } from 'react-router-dom';

// -========================== COMPONENTS ==========================-
import LoginContainer from './../containers/Login/LoginContainer';
import PrivateRouter from './../components/HOC/PrivateRouter';
import VideoListContainer from './../containers/VideoList/VideoListContainer';
import VideoSingleContainer from './../containers/VideoSingle/VideoSingleContainer';
import { VIDEO_LIST_URL } from '../constants/Paths';

const App = () => {
    return (
        <HashRouter>
            <Switch>
                <Route exact path="/" component={LoginContainer} />
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
