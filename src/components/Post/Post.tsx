import { useState } from 'react';
import { UpdatePostDto } from '../../store/post/dto/update-post.dto';
import { IPost } from '../../store/post/interfaces/post.interface';
import moment from 'moment';

interface Props {
  post: IPost;
  updatePost: (dto: UpdatePostDto) => void;
  deletePost: (id: string) => void;
}
export const Post = ({ post, updatePost, deletePost }: Props) => {
  const [isEditing, setIsEditing] = useState(false);

  const [title, setTitle] = useState(post.title);
  const [text, setText] = useState(post.text);

  const onChangeTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  const onChangeText = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setText(e.target.value);
  };

  const onDelete = (id: string) => {
    deletePost(id);
  };

  const onSave = () => {
    updatePost({ id: post.id, title, text });
    setIsEditing(false);
  };
  return (
    <div className="pointer-events-auto w-[21rem] rounded-lg bg-white p-4 text-[0.8125rem] leading-5 shadow-xl shadow-black/5 hover:bg-slate-50 ring-1 ring-slate-700/10">
      <div className="flex justify-between">
        <div className="font-medium text-slate-900">
          {isEditing ? (
            <input
              type="text"
              value={title}
              onChange={onChangeTitle}
              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
          ) : (
            <p>{title}</p>
          )}
        </div>
      </div>
      <div className="flex justify-between">
        {isEditing ? (
          <textarea
            rows={3}
            value={text}
            onChange={onChangeText}
            className="my-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          />
        ) : (
          <p>{text}</p>
        )}
      </div>
      <div className="flex justify-between">
        <div>{moment(post.createdAt).format('LLL')}</div>
        <div className='flex'>
          <div>
            {isEditing ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="green"
                className="w-6 h-6 cursor-pointer"
                onClick={onSave}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="blue"
                className="w-6 h-6 cursor-pointer"
                onClick={() => setIsEditing(true)}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"
                />
              </svg>
            )}
          </div>

          <div
            onClick={() => {
              onDelete(post.id);
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="red"
              className="w-6 h-6 cursor-pointer"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
              />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
};
