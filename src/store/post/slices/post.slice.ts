import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IPost } from '../interfaces/post.interface';
import { UpdatePostDto } from '../dto/update-post.dto';

export interface PostState {
  posts: IPost[];
}

const initialState: PostState = {
  posts: [],
};

const postSlice = createSlice({
  name: 'post',
  initialState,
  reducers: {
    setPosts: (state, action: PayloadAction<IPost[]>) => {
      state.posts = action.payload;
    },
    addPost: (state, action: PayloadAction<IPost>) => {
      state.posts.push(action.payload);
    },
    updatePost: (state, action: PayloadAction<UpdatePostDto>) => {
      const index = state.posts.findIndex((post) => post.id === action.payload.id);
      if (index > -1) {
        state.posts[index] = { ...state.posts[index], ...action.payload };
      }
    },

    deletePost: (state, action: PayloadAction<{ id: string }>) => {
      const index = state.posts.findIndex((post) => post.id === action.payload.id);
      if (index > -1) {
        state.posts.splice(index, 1);
      }
    },
  },
});

export const { setPosts, addPost, updatePost, deletePost } = postSlice.actions;

export default postSlice.reducer;
