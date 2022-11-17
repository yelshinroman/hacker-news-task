import { createSlice } from '@reduxjs/toolkit';
import {
  getAllKidsComments,
  getAllNewStories,
  getSingleStory,
} from '../lib/api';
import { uiActions } from './ui-slice';

const newsSlice = createSlice({
  name: 'news',
  initialState: {
    items: [],
    currentStory: {},
  },
  reducers: {
    fetchNews(state, action) {
      state.items = action.payload;
    },
    fetchSingleStory(state, action) {
      state.currentStory = action.payload;
    },
    fetchKidsComments(state, action) {
      state.currentStory.comments = state.currentStory.comments.map(comment => {
        if (comment.id === action.payload.id) {
          return action.payload.storyWithNestedComments;
        }
        return comment;
      });
    },
    reloadComments(state, action) {
      state.currentStory.comments = action.payload.comments;
      state.currentStory.descendants = action.payload.descendants;
      state.currentStory.kids = action.payload.kids;
    },
  },
});

export const fetchData = () => {
  return async dispatch => {
    dispatch(
      uiActions.showNotification({
        status: 'pending',
        error: null,
      })
    );
    try {
      const stories = await getAllNewStories();
      dispatch(newsActions.fetchNews(stories));
      dispatch(
        uiActions.showNotification({
          status: 'success',
          error: null,
        })
      );
    } catch (error) {
      dispatch(
        uiActions.showNotification({
          status: 'error',
          error: error.message,
        })
      );
    }
  };
};

export const fetchCurrentStory = id => {
  return async dispatch => {
    dispatch(
      uiActions.showNotification({
        status: 'pending',
        error: null,
        commentsStatus: 'pending',
      })
    );
    try {
      const story = await getSingleStory(id);
      if (story.type !== 'story') {
        throw new Error('This is not a story!!!');
      }
      dispatch(newsActions.fetchSingleStory(story));
      dispatch(
        uiActions.showNotification({
          status: 'success',
          error: null,
          commentsStatus: 'success',
        })
      );
    } catch (error) {
      dispatch(
        uiActions.showNotification({
          status: 'error',
          error: error.message,
          commentsStatus: 'success',
        })
      );
    }
  };
};

export const fetchAllKidsComments = id => {
  return async dispatch => {
    dispatch(
      uiActions.showNotification({
        error: null,
        nestedCommentsStatus: 'pending',
      })
    );
    try {
      const storyWithNestedComments = await getAllKidsComments(id);
      console.log(id);
      console.log(storyWithNestedComments);
      dispatch(
        newsActions.fetchKidsComments({
          id,
          storyWithNestedComments,
        })
      );
      dispatch(
        uiActions.showNotification({
          error: null,
          nestedCommentsStatus: 'success',
        })
      );
    } catch (error) {
      dispatch(
        uiActions.showNotification({
          status: 'error',
          error: error.message,
          nestedCommentsStatus: 'error',
        })
      );
    }
  };
};

export const reloadComments = id => {
  return async dispatch => {
    dispatch(
      uiActions.showNotification({
        commentsStatus: 'pending',
        error: null,
      })
    );
    try {
      const story = await getSingleStory(id);
      dispatch(
        newsActions.reloadComments({
          comments: story.comments,
          descendants: story.descendants,
          kids: story.kids,
        })
      );
      dispatch(
        uiActions.showNotification({
          commentsStatus: 'success',
          error: null,
        })
      );
    } catch (error) {
      dispatch(
        uiActions.showNotification({
          commentsStatus: 'error',
          error: error.message,
        })
      );
    }
  };
};

export const convertDate = unixTime => {
  const a = new Date(unixTime * 1000);
  const months = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
  ];
  const year = a.getFullYear();
  const month = months[a.getMonth()];
  const date = a.getDate() < 10 ? `0${a.getDate()}` : a.getDate();
  const hour = a.getHours() < 10 ? `0${a.getHours()}` : a.getHours();
  const min = a.getMinutes() < 10 ? `0${a.getMinutes()}` : a.getMinutes();
  const sec = a.getSeconds() < 10 ? `0${a.getSeconds()}` : a.getSeconds();
  const time =
    date + ' ' + month + ' ' + year + ' ' + hour + ':' + min + ':' + sec;
  return time;
};

export const newsActions = newsSlice.actions;
export default newsSlice;
