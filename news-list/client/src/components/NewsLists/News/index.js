import React from 'react';
import formatDistanceToNow from 'date-fns/formatDistanceToNow'
// Styles
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import { Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import ListItemText from '@material-ui/core/ListItemText';
import IconButton from '@material-ui/core/IconButton';
import ListItem from '@material-ui/core/ListItem';
import Icon from '@material-ui/core/Icon';

const useStyles = makeStyles(theme => ({
  root: {
    '& button': {
      visibility: 'hidden'
    },
    '&:hover button': {
      visibility: 'visible'
    }
  },
  title: {
    marginRight: theme.spacing(2),
    fontSize: '13pt',
    color: '#333'
  },
  author: {
    color: '#999'
  },
}));

const News = ({ onDelete, onOpenNews, newsList }) => {
  const {
    story_title,
    created_at,
    story_url,
    story_id,
    author,
    title,
    url,
  } = newsList;

  const classes = useStyles();

  return (
    <ListItem button divider className={classes.root} onClick={onOpenNews} data-url={url || story_url}>
      <ListItemText
        disableTypography
        secondary={
          <Typography
            className={classes.author}
            display="inline"
          >
            {`- ${author} -`}
          </Typography>
        }
        primary={
          <Typography
            className={classes.title}
            display="inline"
          >
            {story_title || title}
          </Typography>
        }
      />
      <Typography
        className={classes.title}
        display="inline"
      >
        {formatDistanceToNow(new Date(created_at))}
      </Typography>
      <ListItemSecondaryAction>
        <IconButton
          aria-label="delete"
          data-id={story_id}
          onClick={onDelete}
          edge="end"
        >
          <Icon>delete</Icon>
        </IconButton>
      </ListItemSecondaryAction>
    </ListItem>
  );
};

export default News;
