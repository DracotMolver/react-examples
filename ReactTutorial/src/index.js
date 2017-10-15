import React from 'react'
import ReactDOM from 'react-dom'
import App from './client/components/App'
import './client/css/styles.css'
import registerServiceWorker from './registerServiceWorker'

ReactDOM.render(<App />, document.getElementById('app'));
registerServiceWorker();
