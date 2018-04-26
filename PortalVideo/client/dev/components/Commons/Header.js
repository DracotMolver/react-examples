/**
 * @author Diego Alberto Molina Vera
 * @copyright 2017 - 2018
 */
// -========================== MODULES ==========================-
import React from 'react';

// -========================== COMPONENTS ==========================-
import LogoutContainer from '_Login/LogoutContainer';
import { GREETINGS } from 'Constants/Strings';
import { USER_DATA } from 'Constants/Storage';
import { getUserData } from 'Helpers/getSession';

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
