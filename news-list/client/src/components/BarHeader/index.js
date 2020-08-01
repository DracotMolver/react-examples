import React, { Fragment } from 'react';
// Syles
import useScrollTrigger from '@material-ui/core/useScrollTrigger';
import { Typography } from '@material-ui/core';
import Toolbar from '@material-ui/core/Toolbar';
import AppBar from '@material-ui/core/AppBar';

const BarHeader = () => {
  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 0,
  });

  return (
    <Fragment>
      {
        React.cloneElement(
          <AppBar >
            <Toolbar>
              <Typography variant="h2">HN Feed</Typography>
            </Toolbar>
            <Toolbar>
              <Typography variant="h4">{'We <3 hacker news!'}</Typography>
            </Toolbar>
          </AppBar>,
          {
            elevation: trigger ? 4 : 0,
          })
      }
      <Toolbar />
    </Fragment>
  )
};

export default BarHeader;
