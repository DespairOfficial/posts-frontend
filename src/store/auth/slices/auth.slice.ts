import { RootState } from './../../index';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ChangeNameActionPayload } from '../interfaces/auth.action.interface';
import { User } from '../interfaces/auth.interface';

export interface AuthState {
  user: User | null;
  token: string | null;
}

interface CredentialsPayload {
  user?: User | undefined;
  accessToken?: string;
}

const initialState: AuthState = {
  user: null,
  token: localStorage.getItem('token'),
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setCredentials: (state, action: PayloadAction<CredentialsPayload>) => {
      if (action.payload.user) {
        state.user = action.payload.user;
      }

      if (action.payload?.accessToken) {
        state.token = action.payload?.accessToken;
        localStorage.setItem('token', action.payload.accessToken);
      }
    },

    logOut: (state) => {
      state.user = null;
      state.token = null;
      localStorage.removeItem('token');
    },

    changeName: (state, action: PayloadAction<ChangeNameActionPayload>) => {
      const { firstName, lastName } = action.payload;
      if (state.user) {
        state.user.firstName = firstName;
        state.user.lastName = lastName;
      }
    },
  },
});

export const { setCredentials, logOut, changeName } = authSlice.actions;

export default authSlice.reducer;

export const selectCurrentUser = (state: RootState) => state.auth.user;
export const selectCurrentToken = (state: RootState) => state.auth.token;
