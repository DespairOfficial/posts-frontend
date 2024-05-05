import { useEffect } from 'react';
import { AddPost } from '../components/Post/AddPost';
import { ListOfPosts } from '../components/Post/ListOfPosts';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import {
  useCreateMutation,
  useDeleteMutation,
  useGetAllMutation,
  useUpdateMutation,
} from '../store/post/slices/post.api.slice';
import { addPost, deletePost, setPosts, updatePost } from '../store/post/slices/post.slice';
import { UpdatePostDto } from '../store/post/dto/update-post.dto';
import { CreatePostDto } from '../store/post/dto/create-post.dto';

export const PostsPage = () => {
  const dispatch = useAppDispatch();
  const posts = useAppSelector((state) => state.post.posts);

  const [getPostsTrigger] = useGetAllMutation();
  const [createPostTrigger] = useCreateMutation();
  const [updatePostTrigger] = useUpdateMutation();
  const [deletePostTrigger] = useDeleteMutation();

  useEffect(() => {
    const getPosts = async () => {
      const posts = await getPostsTrigger(null).unwrap();
      dispatch(setPosts(posts));
    };
    getPosts();
  }, []);

  const createPost = async (dto: CreatePostDto) => {
    const newPost = await createPostTrigger(dto).unwrap();
    dispatch(addPost(newPost));
  };

  const deletePostFunc = async (id: string) => {
    const newPost = await deletePostTrigger(id).unwrap();
    dispatch(deletePost(newPost));
  };

  const updatePostFunc = async (dto: UpdatePostDto) => {
    const updatedPost = await updatePostTrigger(dto).unwrap();
    dispatch(updatePost(updatedPost));
  };

  console.log('posts', posts);

  return (
    <div className="flex flex-col h-full p-4 justify-start items-center">
      <AddPost createPost={createPost} />
      <div className="w-full h-1">
        <div className="absolute -inset-x-8 bottom-0 h-[3px] bg-slate-900/15 [mask-image:linear-gradient(to_left,transparent,white_4rem,white_calc(100%-4rem),transparent)] "></div>
      </div>
      <ListOfPosts posts={posts} deletePost={deletePostFunc} updatePost={updatePostFunc} />
    </div>
  );
};
