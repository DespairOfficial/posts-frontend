import { UpdatePostDto } from '../../store/post/dto/update-post.dto';
import { IPost } from '../../store/post/interfaces/post.interface';
import { Post } from './Post';

interface Props {
  posts: IPost[];
  updatePost: (dto: UpdatePostDto) => void;
  deletePost: (id: string) => void;
}
export const ListOfPosts = ({ posts, updatePost, deletePost }: Props) => {
  return (
    <div className="grid grid-cols-1 gap-4 overflow-auto max-h-[55%]">
      {posts.map((post) => {
        return (
          <div key={post.id} className="">
            <Post post={post} updatePost={updatePost} deletePost={deletePost} />
          </div>
        );
      })}
    </div>
  );
};
