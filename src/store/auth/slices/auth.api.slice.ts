import { authApi } from '../../auth.api';
import { ChangeNameActionPayload, RestorePasswordActionPayload } from '../interfaces/auth.action.interface';
import { AuthResponse, LoginUserDto, RegisterUserDto, User } from '../interfaces/auth.interface';

const authApiSlice = authApi.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation<AuthResponse, LoginUserDto>({
      query: (credentials) => ({
        url: '/auth/login',
        method: 'POST',
        body: { ...credentials },
      }),
    }),

    register: builder.mutation<AuthResponse, RegisterUserDto>({
      query: (credentials) => ({
        url: '/auth/register',
        method: 'POST',
        body: { ...credentials },
      }),
    }),

    logout: builder.mutation<void, null>({
      query: () => ({
        url: '/auth/logout',
        method: 'PATCH',
      }),
    }),

    changeName: builder.mutation<User, ChangeNameActionPayload>({
      query: (payload) => {
        return {
          url: '/users',
          method: 'PATCH',
          body: { ...payload },
        };
      },
    }),

    init: builder.mutation<User, null>({
      query: () => '/auth/init',
    }),

    sendEmailVerificationCode: builder.mutation<{ message: string }, string>({
      query: (email) => ({
        url: '/auth/emailVerification',
        method: 'POST',
        body: { email },
      }),
    }),

    forgotPassword: builder.mutation<{ message: string }, string>({
      query: (email) => ({
        url: '/password/forgot',
        method: 'POST',
        body: { email },
      }),
    }),

    restorePassword: builder.mutation<{ message: string }, RestorePasswordActionPayload>({
      query: (restorePasswordDto) => ({
        url: '/password/restore',
        method: 'PATCH',
        body: { ...restorePasswordDto },
      }),
    }),
  }),
});

export const {
  useLoginMutation,
  useRegisterMutation,
  useLogoutMutation,
  useChangeNameMutation,
  useSendEmailVerificationCodeMutation,
  useInitMutation,
  useForgotPasswordMutation,
  useRestorePasswordMutation,
  useRefreshMutation,
} = authApiSlice;
