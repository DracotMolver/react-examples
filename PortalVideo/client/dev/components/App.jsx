/**
 * @author Diego Alberto Molina Vera
 * @copyright 2017 - 2018
 */
// -========================== MODULES ==========================-
import React from 'react';
import { HashRouter, Switch, Route } from 'react-router-dom';

// -========================== COMPONENTS ==========================-
import { LoginForm } from './LoginForm.jsx';
import PrivateRouter from './HOC/PrivateRouter.jsx';
import VideoListContainer from './../containers/VideoListContainer.jsx';
import VideoSingleContainer from './../containers/VideoSingleContainer.jsx';

const App = () => {
    // Check the session before the rendering happens
    const userData = JSON.parse(sessionStorage.getItem('userData'));

    return (
        <HashRouter>
            <Switch>
                <Route exact path="/" component={LoginForm} />
                <PrivateRouter
                    exact
                    path="/videos-list"
                    component={VideoListContainer}
                />
                <PrivateRouter
                    path="/videos-list/:id"
                    component={VideoSingleContainer}
                />
            </Switch>
        </HashRouter>
    );
};

export default App;
