import { useState } from 'react';
import { CreatePostDto } from '../../store/post/dto/create-post.dto';

interface Props {
  createPost: (dto: CreatePostDto) => void;
}

export const AddPost = ({ createPost }: Props) => {
  const [title, setTitle] = useState('');
  const [text, setText] = useState('');
  const onSubmit = () => {
    if (!title) return;
    if (!text) return;
    createPost({ text, title });
  };
  return (
    <div className="flex">
      <div className="pointer-events-auto w-[21rem] rounded-lg bg-white p-4 text-[0.8125rem] leading-5 shadow-xl shadow-black/5 hover:bg-slate-50 ring-1 ring-slate-700/10">
        <div className="font-medium text-slate-900 text-2xl">
          <div className="sm:col-span-3">
            <div className="mt-2">
              <label className="block text-sm font-medium leading-6 text-gray-900">Заголовок</label>
              <input
                type="text"
                id="first-name"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>
        </div>
        <div className="mt-1 text-slate-700">
          <div className="col-span-full">
            <label className="block text-sm font-medium leading-6 text-gray-900">Текст поста</label>
            <div className="mt-2">
              <textarea
                id="about"
                rows={3}
                value={text}
                onChange={(e) => setText(e.target.value)}
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              ></textarea>
            </div>
          </div>
        </div>
        <div className="flex justify-end mt-2">
          <a
            onClick={onSubmit}
            className="inline-flex justify-center rounded-lg text-sm font-semibold py-3 px-4 bg-slate-900 text-white hover:bg-slate-700 pointer-events-auto"
          >
            Добавить
          </a>
        </div>
      </div>
    </div>
  );
};
