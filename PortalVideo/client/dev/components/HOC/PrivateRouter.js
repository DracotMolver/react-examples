/**
 * @author Diego Alberto Molina Vera
 * @copyright 2017 - 2018
 *
 * @class PrivateRouter
 * It acts as a authentication middleware
 */
// -========================== MODULES ==========================-
import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { USER_DATA } from '../../constants/Storage';

const isAuthenticated = () => !!JSON.parse(sessionStorage.getItem(USER_DATA));

const PrivateRouter = ({ component: Component, ...rest }) =>
    isAuthenticated()
        ? <Route {...rest} render={props => (
            <Component {...props} />
        )} />
        : <Redirect to="/" />;

export default PrivateRouter;
