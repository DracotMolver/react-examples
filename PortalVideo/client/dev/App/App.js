/**
 * @author Diego Alberto Molina Vera
 * @copyright 2017 - 2018
 */

// -========================== MODULES ==========================-
import React from 'react';
import { HashRouter, Switch, Route } from 'react-router-dom';
import LoginContainer from 'Containers/Login/Login';
import PrivateRouter from 'Components/HOC/PrivateRouter';
import VideoListContainer from 'Containers/Video/List';
import VideoSingleContainer from 'Containers/Video/Single/Single';
import { VIDEO_LIST_URL } from 'Constants/Paths';

// -========================== COMPONENTS ==========================-

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
