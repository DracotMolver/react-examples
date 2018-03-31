/**
 * @author Diego Alberto Molina Vera
 * @copyright 2017 - 2018
 */
// -========================== MODULES ==========================-
import React from 'react';
import PropTypes from 'prop-types';

// -========================== COMPONENTS ==========================-
import Header from './Header';

const Base = props =>
    <React.Fragment>
        <Header />
        {props.children}
    </React.Fragment>;

Base.propTypes = {
    children: PropTypes.element.isRequired
};

export default Base;
