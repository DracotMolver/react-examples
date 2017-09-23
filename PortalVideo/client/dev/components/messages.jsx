/**
 * @author Diego Alberto Molina Vera
 * @copyright 2017
 *
 * @class MessageComponent - Message component
 * A simple component to disply messages:
 * Error,
 * Warning,
 * Success
 */
// -========================== MODULES ==========================-
import React from 'react';

// CSS grid framework system
import {
    GridContainer,
    Grid
} from 'unsemantic';

// -========================== COMPONENTS ==========================-
let MessageComponent = React.createClass({
    getInitialState () {
        return {
            error: 'msg-error',
            success: 'msg-success',
            warning: 'msg-warning'
        }
    },
    render () {
        let { errorType, errorMessage } = this.props;
        return (
            <Grid desktop="100">
                <div className={ errorType !== '' ? this.state[this.props.errorType] : '' }>
                    {errorMessage}
                </div>
            </Grid>
        );
    }
});

export default MessageComponent;
