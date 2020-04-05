import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
// Styles
import LinearProgress from '@material-ui/core/LinearProgress';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
// Components
import News from './News';

const useStyles = makeStyles(theme => ({
  root: {
    position: 'relative',
    overflow: 'auto',
    height: '100%'
  },
  linearProgress: props => ({
    padding: theme.spacing(1, 0),
    marginTop: theme.spacing(2),
    display: props.isProgress ? 'block' : 'none'
  })
}));

const NewsLists = ({ onOpenNews, onDelete, isProgress, newsLists }) => {
  const classes = useStyles({ isProgress });

  return (
    <Fragment>
      <List className={classes.root}>
        <LinearProgress
          className={classes.linearProgress}
          color="secondary"
        />
        {newsLists.map(newsList => (
          <News
            key={newsList._id}
            onOpenNews={onOpenNews}
            onDelete={onDelete}
            newsList={newsList}
          />
        ))}
      </List>
    </Fragment>
  );
}

NewsLists.defaultProps = {
  isProgress: false,
  onDelete() { },
  newsLists: []
};

NewsLists.propTypes = {
  isProgress: PropTypes.bool,
  newsLists: PropTypes.arrayOf(PropTypes.object),
  onDelete: PropTypes.func
};

export default NewsLists;
