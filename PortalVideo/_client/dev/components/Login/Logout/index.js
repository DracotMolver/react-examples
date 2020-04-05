/**
 * @author Diego Alberto Molina Vera
 * @copyright 2017 -2018
 */
// -========================== MODULES ==========================-
import React from 'react';
import PropTypes from 'prop-types';

// -========================== COMPONENTS ==========================-
import { FORM_LOGOUT_LABEL } from 'Constants/Strings';

const Logout = props => {
    const {
        handleClickButtonForm
    } = props;

    return (
        <button type="button" onClick={handleClickButtonForm}>
            {FORM_LOGOUT_LABEL}
        </button>
    );
};

Logout.propTypes = {
    handleClickButtonForm: PropTypes.func
};

export default Logout;
