/**
 * @author Diego Alberto Molina Vera
 * @copyright 2017 - 2018
 */
// -========================== MODULES ==========================-
import React from 'react';
import { Route, Redirect } from 'react-router-dom';

// -========================== Components ==========================-
import { USER_DATA } from 'Constants/Storage';
import { getUserData } from 'Helpers/getSession';

const isAuthenticated = () => !!getUserData();

const PrivateRouter = ({ component: Component, ...rest }) =>
    isAuthenticated()
        ? <Route {...rest} render={props => (
            <Component {...props} />
        )} />
        : <Redirect to="/" />;

export default PrivateRouter;
