/**
 * @author Diego Alberto Molina Vera
 * @copyright 2017 - 2018
 *
 */
// -========================== MODULES ==========================-
import React from 'react';
import ReactDOM from 'react-dom';

// -========================== ASSETS ==========================-
import 'unsemantic/assets/stylesheets/unsemantic-grid-responsive.css';
import './src/css/unsemantic-grid-responsive.css';
import './src/sass/style.sass';
import './src/img/stars.png';

// -========================== COMPONENTS ==========================-
import App from './App/App';

ReactDOM.render(
    <App />,
    document.querySelector('#app-container')
);
