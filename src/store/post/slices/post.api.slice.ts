import { postsApi } from '../../posts.api';
import { CreatePostDto } from '../dto/create-post.dto';
import { UpdatePostDto } from '../dto/update-post.dto';
import { IPost } from '../interfaces/post.interface';

const postsApiSlice = postsApi.injectEndpoints({
  endpoints: (builder) => ({
    getAll: builder.mutation<IPost[], null>({
      query: () => ({
        url: '/posts',
        method: 'GET',
      }),
    }),
    create: builder.mutation<IPost, CreatePostDto>({
      query: (payload) => ({
        url: '/posts',
        method: 'POST',
        body: payload,
      }),
    }),
    update: builder.mutation<IPost, UpdatePostDto>({
      query: (payload) => {
        const { id, ...rest } = payload;
        return { url: `/posts/${id}`, method: 'PATCH', body: rest };
      },
    }),
    delete: builder.mutation<IPost, string>({
      query: (id) => {
        return { url: `/posts/${id}`, method: 'DELETE' };
      },
    }),
  }),
});

export const { useGetAllMutation, useCreateMutation, useUpdateMutation, useDeleteMutation } = postsApiSlice;
