import { createSlice } from '@reduxjs/toolkit';

const uiSlice = createSlice({
  name: 'ui',
  initialState: {
    notification: {
      status: null,
      error: null,
      commentsStatus: null,
      nestedCommentsStatus: null,
    },
  },
  reducers: {
    showNotification(state, action) {
      state.notification = {
        status: action.payload.status,
        error: action.payload.error,
        commentsStatus: action.payload.commentsStatus,
        nestedCommentsStatus: action.payload.nestedCommentsStatus,
      };
    },
  },
});

export const uiActions = uiSlice.actions;
export default uiSlice;
