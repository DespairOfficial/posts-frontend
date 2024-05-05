import { RootState } from './index';
import FingerprintJS from '@fingerprintjs/fingerprintjs';

import {
  BaseQueryApi,
  BaseQueryFn,
  createApi,
  FetchArgs,
  fetchBaseQuery,
  FetchBaseQueryError,
  FetchBaseQueryMeta,
} from '@reduxjs/toolkit/query/react';
import { setCredentials, logOut } from './auth/slices/auth.slice';

const AUTH_SERVICE_URL = import.meta.env.VITE_AUTH_SERVICE_URL;

export const baseAuthQuery: BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError, object, FetchBaseQueryMeta> =
  fetchBaseQuery({
    baseUrl: AUTH_SERVICE_URL,
    credentials: 'include',
    prepareHeaders: async (headers, api) => {
      const state = api.getState() as RootState;
      const token = state.auth.token;
      if (token) {
        headers.set('authorization', `Bearer ${token}`);
      }
      const fpPromise = await FingerprintJS.load();
      const result = await fpPromise.get();
      headers.set('fingerprint', result.visitorId);
      return headers;
    },
  });

const baseAuthQueryWithReauth = async (args: string | FetchArgs, api: BaseQueryApi, extraOptions: object) => {
  let result = await baseAuthQuery(args, api, extraOptions);
  //originalStatus
  if (result?.error?.status === 401) {
    // should be PATCH
    const refreshResult = await baseAuthQuery('/auth/refreshToken', api, extraOptions);

    if (refreshResult?.data) {
      // store the new token
      const refreshData = refreshResult.data as { accessToken: string };
      api.dispatch(setCredentials({ ...refreshData }));
      // retry origin query with new acess token
      result = await baseAuthQuery(args, api, extraOptions);
    } else {
      api.dispatch(logOut());
    }
  }
  return result;
};

export const authApi = createApi({
  baseQuery: baseAuthQueryWithReauth,
  endpoints: (builder) => ({
    refresh: builder.mutation<{ accessToken: string }, null>({
      query: () => ({
        url: '/auth/refreshToken',
        method: 'GET',
      }),
    }),
  }),
});
