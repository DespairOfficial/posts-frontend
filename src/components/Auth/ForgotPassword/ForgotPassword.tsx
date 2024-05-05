import { ChangeEvent, FormEvent, useRef, useState } from 'react';
import AuthPage from '../AuthPage';
import { useForgotPasswordMutation } from '../../../store/auth/slices/auth.api.slice';
import { AuthMessage } from '../interfaces/auth-message.interface';
import { Link } from 'react-router-dom';
import { isNestErrorResponse } from '../../../plugins/isNestResponse';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [forgotPassword] = useForgotPasswordMutation();

  const messageRef = useRef<HTMLInputElement | null>(null);

  const [message, setMessage] = useState<AuthMessage>();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const result = await forgotPassword(email).unwrap();
      setMessage({ message: result.message, status: 'success' });
    } catch (err: unknown) {
      if (isNestErrorResponse(err)) {
        if (err.data.statusCode === 400) {
          const msg = err.data.message;
          setMessage({ message: msg, status: 'error' });
        } else if (err.data.statusCode === 401) {
          setMessage({ message: err.data.message, status: 'error' });
        } else if (err.data.statusCode === 404) {
          setMessage({ message: 'User with that email not found', status: 'error' });
        } else {
          setMessage({ message: err.data.message, status: 'error' });
        }
      }
      messageRef?.current?.focus();
    }
  };

  const handleEmailInput = (e: ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  return (
    <AuthPage>
      <div className="font-light text-[2rem] mb-[50px] dark:text-[--clr-text-dark]">Восстановление пароля</div>

      <div className="relative mb-30px w-full text-center dark:text-[--clr-text-dark]">
        <div className="w-full border-b-[1px] mt-[-15px] dark:border-[--clr-border-dark]"></div>
      </div>
      <div className="mt-[30px] w-full">
        <p
          ref={messageRef}
          className={message ? (message.status === 'error' ? 'text-red-700' : 'text-green-700') : 'hidden'}
        >
          {message?.message}
        </p>
        <form action="" onSubmit={handleSubmit} className="flex flex-col dark:text-white">
          <label htmlFor="email" className=" font-semibold mb-2 ml-2">
            Email
          </label>
          <input
            type="text"
            id="email"
            value={email}
            onChange={handleEmailInput}
            autoComplete="off"
            required
            className="rounded h-[42px] p-3 mb-3 pl-3 text-black"
          />

          <button className="rounded p-2 mb-3 bg-[#3f83f8] text-white">Отправить ссылку</button>
        </form>

        <p className="mb-[20px] text-center">
          Вернуться к{' '}
          <Link className="text-blue-400 underline" to="/login">
            Авторизации
          </Link>
        </p>
      </div>
    </AuthPage>
  );
};

export default ForgotPassword;
