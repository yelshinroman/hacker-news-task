import { configureStore } from '@reduxjs/toolkit';
import newsSlice from './news-slice';
import uiSlice from './ui-slice';

const store = configureStore({
  reducer: {
    news: newsSlice.reducer,
    ui: uiSlice.reducer,
  },
});

export default store;
