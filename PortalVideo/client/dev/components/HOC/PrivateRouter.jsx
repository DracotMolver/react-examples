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

const isAuthenticated = () => !!JSON.parse(sessionStorage.getItem('userData'));

const PrivateRouter = ({ component: Component, ...rest }) =>
    isAuthenticated()
        ? (
            <Route {...rest} render={(props) => (
                <Component {...props} />)
            } />
        ) : (
            <Redirect to="/" />
        );

export default PrivateRouter;
