/**
 * @author Diego Alberto Molina Vera
 * @copyright 2017
 *
 */
// -========================== MODULES ==========================-
import React from 'react';
import ReactDOM from 'react-dom';

// -========================== ASSETS ==========================-
import 'unsemantic/assets/stylesheets/unsemantic-grid-responsive.css';
import './src/sass/style.sass';
import './src/img/stars.png';

// -========================== COMPONENTS ==========================-
import App from './components/app.jsx';

ReactDOM.render(
    <App />,
    document.querySelector("#app-container")
);
