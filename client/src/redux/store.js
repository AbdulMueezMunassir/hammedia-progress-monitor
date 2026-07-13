import { configureStore } from '@reduxjs/toolkit';
import authSlice from './slices/authSlice';
import meetingSlice from './slices/meetingSlice';
import taskSlice from './slices/taskSlice';
import workerSlice from './slices/workerSlice';
import dashboardSlice from './slices/dashboardSlice';

export const store = configureStore({
  reducer: {
    auth: authSlice,
    meetings: meetingSlice,
    tasks: taskSlice,
    workers: workerSlice,
    dashboard: dashboardSlice,
  },
  devTools: process.env.NODE_ENV !== 'production',
});

export default store;