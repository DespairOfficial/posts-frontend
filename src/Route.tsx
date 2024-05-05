import { Route, createBrowserRouter, createRoutesFromElements, RouterProvider, Navigate } from 'react-router-dom';

import Login from './components/Auth/Login/login';
import RequireAuth from './components/Auth/RequireAuth';
import Register from './components/Auth/Register/Register';
import RequireUnauth from './components/Auth/RequireUnauth';
import ForgotPassword from './components/Auth/ForgotPassword/ForgotPassword';
import RestorePassword from './components/Auth/RestorePassword/RestorePassword';
import { useAppDispatch, useAppSelector } from './store/hooks';
import { selectCurrentToken, setCredentials } from './store/auth/slices/auth.slice';
import { useEffect } from 'react';
import { useInitMutation, useRefreshMutation } from './store/auth/slices/auth.api.slice';

import { IndexLayout } from './layouts/index-layout';
import { PostsPage } from './pages/posts';

export const tokenExpired = (exp: number, refreshTrigger: () => void) => {
  // eslint-disable-next-line prefer-const
  let expiredTimer;

  const currentTime = Date.now();

  const refreshRate = 60000;

  const timeLeft = exp * 1000 - currentTime - refreshRate;

  clearTimeout(expiredTimer);

  expiredTimer = setTimeout(() => {
    refreshTrigger();
  }, timeLeft);
};

function jwtDecode(token: string) {
  const base64Url = token.split('.')[1];
  const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
  const jsonPayload = decodeURIComponent(
    window
      .atob(base64)
      .split('')
      .map((c) => `%${`00${c.charCodeAt(0).toString(16)}`.slice(-2)}`)
      .join(''),
  );

  return JSON.parse(jsonPayload);
}

export default function RouteApp() {
  const dispatch = useAppDispatch();
  const accessToken = useAppSelector(selectCurrentToken);

  const [refreshMutation, { data: refreshData, isSuccess: isRefreshSuccess }] = useRefreshMutation({});
  const [initMutation, { data, isSuccess }] = useInitMutation({});

  const refreshTrigger = () => {
    refreshMutation(null);
  };

  useEffect(() => {
    if (isRefreshSuccess && refreshData) {
      dispatch(setCredentials({ accessToken: refreshData.accessToken }));
    }
  }, [refreshData]);

  useEffect(() => {
    initMutation(null);
  }, []);

  useEffect(() => {
    if (isSuccess && accessToken) {
      const { exp } = jwtDecode(accessToken);
      dispatch(setCredentials({ user: data }));
      tokenExpired(exp, refreshTrigger);
    }
  }, [data, isSuccess, accessToken]);

  const router = createBrowserRouter(
    createRoutesFromElements(
      <>
        <Route element={<RequireAuth />}>
          <Route path="/" element={<IndexLayout />}>
            <Route index path="/" element={<PostsPage />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Route>
        </Route>

        <Route element={<RequireUnauth />}>
          <Route path="/login" index element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/password/forgot" element={<ForgotPassword />} />
          <Route path="/password/restore/:token" element={<RestorePassword />} />
        </Route>
      </>,
    ),
  );
  return <RouterProvider router={router} />;
}
