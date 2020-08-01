import React, { Fragment, useEffect, useState } from 'react';
import produce from 'immer';
import axios from 'axios';
// Styles
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';
import Snackbar from '@material-ui/core/Snackbar';
import Alert from '@material-ui/lab/Alert';
import Box from '@material-ui/core/Box';
// components
import BarHeader from '../../components/BarHeader';
import NewsLists from '../../components/NewsLists';

const API_URL = `http://0.0.0.0:${process.env.NODE_ENV === 'production' ? '5000' : '3000'}`;

const HackNews = () => {
  const [state, setState] = useState({
    isProgress: true,
    openAlert: false,
    newsLists: [],
    severity: 'info',
    message: '',
  });

  useEffect(() => {
    axios
      .get(`${API_URL}/api/v1/news`)
      .then(res => {
        setState(
          produce(draft => {
            if (res.status === 200) {
              draft.isProgress = false;
              draft.newsLists = res.data.data
            } else {
              draft.isProgress = false;
              draft.openAlert = true;
              draft.severity = 'danger';
              draft.message = res.data.message;
            }
          })
        );
      });
  }, []);

  function onClickDeleteHandler(event) {
    event.persist();

    const { id } = event.currentTarget.dataset;

    axios
      .delete(`${API_URL}/api/v1/news/${id}`)
      .then(res => {
        console.log(res)
        if (res.status === 200 && res.data.success) {
          setState(
            produce(draft => {
              draft.severity = 'success';
              draft.openAlert = true;
              draft.message = res.data.message;
            })
          )
        }
      });

    setState(
      produce(draft => {
        draft.newsLists = state.newsLists.filter(({ story_id }) => Number(story_id) !== Number(id));
      })
    );
  }

  function onClickOpenNewsHandler(event) {
    event.persist();
    window.open(event.currentTarget.dataset.url, '_blank');
  }

  function onCloseHandler() {
    setState(
      produce(draft => {
        draft.openAlert = false;
      })
    )
  }

  return (
    <Fragment>
      <CssBaseline />
      <BarHeader />
      <Container maxWidth={false}>
        <Box my={8}>
          <NewsLists
            isProgress={state.isProgress}
            newsLists={state.newsLists}
            onOpenNews={onClickOpenNewsHandler}
            onDelete={onClickDeleteHandler}
          />
        </Box>
        <Snackbar open={state.openAlert} autoHideDuration={4000} onClose={onCloseHandler}>
          <Alert evelation={6} variant="filled" severity={state.severity} onClick={onCloseHandler}>
            {state.message}
          </Alert>
        </Snackbar>
      </Container>
    </Fragment>
  );
};

export default HackNews;
