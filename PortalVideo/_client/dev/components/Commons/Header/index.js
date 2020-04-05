/**
 * @author Diego Alberto Molina Vera
 * @copyright 2017 - 2018
 */
// -========================== MODULES ==========================-
import React from 'react';

// -========================== COMPONENTS ==========================-
import { GREETINGS } from 'Constants/Strings';
import { USER_DATA } from 'Constants/Storage';
import { getUserData } from 'Helpers';
import LogoutContainer from 'Containers/Login/Logout';

const Header = () => {
    const { username } = getUserData();

    return (
        <div className="grid-100 grid-parent header-nav">
            <div className="grid-container">
                <header>
                    <span>{GREETINGS} {username}</span>
                    <LogoutContainer />
                </header>
            </div>
        </div>
    );
};

export default Header;
