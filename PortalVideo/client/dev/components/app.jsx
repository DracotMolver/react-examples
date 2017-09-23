/**
 * @author Diego Alberto Molina Vera
 * @copyright 2017
 *
 */
// -========================== MODULES ==========================-
import React from 'react';
import {
    HashRouter,
    IndexRoute,
    Switch,
    Router,
    Route
} from 'react-router-dom';

// -========================== COMPONENTS ==========================-
import { LoginFormComponent } from './loginForm.jsx';
import { VideoListComponent, VideoSingleComponent } from './videos.jsx';

let App = React.createClass({
    render() {
        return (
            <HashRouter>
                <Switch>
                    <Route exact path="/" component={LoginFormComponent} />
                    <Route exact path="/videos-list" component={VideoListComponent} />
                    <Route exact path="/single-video/:id" component={VideoSingleComponent} />
                </Switch>
            </HashRouter>
        );
    }
})

export default App;
