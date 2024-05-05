import { Link, useNavigate } from 'react-router-dom';
import { ChangeEvent, FormEvent, useEffect, useRef, useState } from 'react';
import { useLoginMutation } from '../../../store/auth/slices/auth.api.slice';
import { useAppDispatch } from '../../../store/hooks';
import { setCredentials } from '../../../store/auth/slices/auth.slice';
import AuthPage from '../AuthPage';
import { isNestErrorResponse } from '../../../plugins/isNestResponse';

const Login = () => {
  const emailRef = useRef<HTMLInputElement | null>(null);
  const errRef = useRef<HTMLInputElement | null>(null);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errMsg, setErrMsg] = useState('');
  const navigate = useNavigate();

  const [login] = useLoginMutation();
  const dispatch = useAppDispatch();

  useEffect(() => {
    emailRef?.current?.focus();
  }, []);

  useEffect(() => {
    setErrMsg('');
  }, [email, password]);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const userData = await login({ email, password }).unwrap();

      dispatch(setCredentials(userData));
      setEmail('');
      setPassword('');
      navigate('/');
    } catch (err: unknown) {
      if (isNestErrorResponse(err)) {
        if (err.data.statusCode === 400) {
          const msg = err.data.message;
          setErrMsg(msg);
        } else if (err.data.statusCode === 401) {
          setErrMsg(err.data.message);
        } else {
          setErrMsg(err.data.message);
        }
      }
      errRef?.current?.focus();
    }
  };

  const handleEmailInput = (e: ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value.trim());
  };

  const handlePasswordInput = (e: ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value.trim());
  };

  return (
    <AuthPage>
      <div className="font-light text-[2rem] mb-[10px] dark:text-[--clr-text-dark]">Авторизация</div>

      <div className="mt-[30px] w-full">
        <p ref={errRef} className={errMsg ? 'text-red-300' : 'hidden'}>
          {errMsg}
        </p>

        <form action="" onSubmit={handleSubmit} className="flex flex-col dark:text-white">
          <label htmlFor="email" className=" font-semibold mb-2 ml-2">
            Email
          </label>
          <input
            type="text"
            id="email"
            ref={emailRef}
            value={email}
            onChange={handleEmailInput}
            autoComplete="off"
            required
            className="rounded h-[42px] p-3 mb-3 pl-3 border-[1px] hover:border-accent text-black"
          />

          <label htmlFor="password" className=" font-semibold mb-2 ml-2">
            Пароль
          </label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={handlePasswordInput}
            required
            className="rounded p-3 mb-5 h-[42px] text-black"
          />

          <button className="rounded p-2 mb-3 bg-[#3f83f8] text-[#FFF] ">Войти</button>
        </form>

        <div className="dark:text-[--clr-subtext-dark] mt-[30px] flex items-center justify-center flex-col">
          <div className="mb-[20px]">
            <Link className="text-blue-400" to="/password/forgot">
              Забыли пароль?
            </Link>
          </div>

          <p className="mb-[20px]">
            Ещё не зарегистрированы?{' '}
            <Link className="text-blue-400 underline" to="/register">
              Регистрация
            </Link>
          </p>

          <p className="text-[12px] text-center">Авторизируясь, вы подтверждаете, что согласны со всем вообщем </p>
        </div>
      </div>
    </AuthPage>
  );
};

export default Login;
