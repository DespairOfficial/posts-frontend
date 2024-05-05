import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/dist/query';
import { authApi } from './auth.api';
import { postsApi } from './posts.api';
import authReducer from './auth/slices/auth.slice';
import postReducer from './post/slices/post.slice';

export const store = configureStore({
  reducer: {
    [authApi.reducerPath]: authApi.reducer,
    auth: authReducer,
    [postsApi.reducerPath]: postsApi.reducer,
    post: postReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(authApi.middleware, postsApi.middleware),
  devTools: true,
});

setupListeners(store.dispatch);
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
