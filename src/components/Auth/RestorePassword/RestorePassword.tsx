import { ChangeEvent, FormEvent, useEffect, useRef, useState } from 'react';
import AuthPage from '../AuthPage';
import { useRestorePasswordMutation } from '../../../store/auth/slices/auth.api.slice';
import { AuthMessage } from '../interfaces/auth-message.interface';
import { Link, useLocation } from 'react-router-dom';
import { isNestErrorResponse } from '../../../plugins/isNestResponse';

const RestorePassword = () => {
  useEffect(() => {
    // Projector();
  }, []);
  const location = useLocation();
  const restorePasswordHash = location.pathname.split('/').reverse()[0];
  const email = location.search.split('=')[1];

  const [restorePassword] = useRestorePasswordMutation();

  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const messageRef = useRef<HTMLInputElement | null>(null);

  const [message, setMessage] = useState<AuthMessage>();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (confirmPassword !== password) {
      setMessage({ message: 'Passwords does not match', status: 'error' });
      messageRef?.current?.focus();
    }
    try {
      const result = await restorePassword({ email, password, restorePasswordHash }).unwrap();
      setMessage({ message: result.message, status: 'success' });
    } catch (err: unknown) {
      if (isNestErrorResponse(err)) {
        if (err.data.statusCode === 400) {
          const msg = err.data.message;
          setMessage({ message: msg, status: 'error' });
        } else if (err.data.statusCode === 401) {
          setMessage({ message: err.data.message, status: 'error' });
        } else if (err.data.statusCode === 404) {
          setMessage({ message: 'Такого пользователя не существует', status: 'error' });
        } else {
          setMessage({ message: err.data.message, status: 'error' });
        }
      }

      messageRef?.current?.focus();
    }
  };

  const handlePasswordInput = (e: ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value.trim());
  };

  const handleConfirmPasswordInput = (e: ChangeEvent<HTMLInputElement>) => {
    setConfirmPassword(e.target.value.trim());
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
        <form action="" onSubmit={handleSubmit} className="flex flex-col">
          <label htmlFor="password" className=" font-semibold mb-2 ml-2">
            Новый пароль
          </label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={handlePasswordInput}
            autoComplete="off"
            required
            className="rounded h-[42px] p-3 mb-3 pl-3"
          />

          <label htmlFor="confirmPassword" className="font-semibold mb-2 ml-2">
            Повторите новый пароль
          </label>
          <input
            type="password"
            id="confirmPassword"
            value={confirmPassword}
            onChange={handleConfirmPasswordInput}
            required
            className="rounded h-[42px] p-3 mb-3 pl-3"
          />

          <button className="rounded p-2 mb-3 bg-[#3f83f8] text-white">Подтвердить</button>

          {/* <input type="text" hidden value={hash} name=""/>
					<input type="text" hidden value={email} name="email"/> */}
        </form>

        <p>
          <Link className="text-blue-400 underline" to="/login">
            Авторизация
          </Link>
        </p>
      </div>
    </AuthPage>
  );
};

export default RestorePassword;
