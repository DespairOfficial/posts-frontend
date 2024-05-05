import { ChangeEvent, FormEvent, useEffect, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useRegisterMutation, useSendEmailVerificationCodeMutation } from '../../../store/auth/slices/auth.api.slice';
import { setCredentials } from '../../../store/auth/slices/auth.slice';
import { useAppDispatch } from '../../../store/hooks';
import AuthPage from '../AuthPage';
import { AuthMessage } from '../interfaces/auth-message.interface';
import { isNestErrorResponse } from '../../../plugins/isNestResponse';

const Register = () => {
  const emailRef = useRef<HTMLInputElement | null>(null);

  const messageRef = useRef<HTMLInputElement | null>(null);
  const [message, setMessage] = useState<AuthMessage>();

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [emailVerificationCode, setEmailVerificationCode] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const navigate = useNavigate();

  const [registerTrigger] = useRegisterMutation();
  const [sendEmailCode] = useSendEmailVerificationCodeMutation();

  const [emailCodeStatus, setEmailCodeStatus] = useState(false);
  const [loader, setLoader] = useState(false);

  const [isTermsAccepted, setIsTermsAccepted] = useState(false);

  const dispatch = useAppDispatch();

  useEffect(() => {
    emailRef?.current?.focus();
  }, []);

  useEffect(() => {
    setMessage(undefined);
  }, [password, email, confirmPassword, emailVerificationCode, firstName, lastName]);

  function handleTermsAcceptance() {
    setIsTermsAccepted((currentValue) => {
      return !currentValue;
    });
  }

  const handleSendEmail = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      setLoader(true);
      const result = await sendEmailCode(email).unwrap();
      setMessage({ message: result.message, status: 'success' });
      setEmailCodeStatus(true);
      setLoader(false);
    } catch (err: unknown) {
      setLoader(false);
      if (isNestErrorResponse(err)) {
        setMessage({ message: err.data.message, status: 'error' });
      }
      setEmailCodeStatus(false);
    }
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (confirmPassword !== password) {
      setMessage({ message: 'Passwords does not match', status: 'error' });
      messageRef?.current?.focus();
    }

    try {
      const userData = await registerTrigger({ email, password, firstName, lastName, emailVerificationCode }).unwrap();
      // ERROR
      dispatch(setCredentials(userData));
      setPassword('');
      setEmail('');
      navigate('/');
    } catch (err: unknown) {
      console.log('ERROR HERE: ', err);
      if (isNestErrorResponse(err)) {
        if (err.data.statusCode === 400) {
          const msg = err.data.message;
          setMessage({ message: msg, status: 'error' });
        } else if (err.data.statusCode === 401) {
          setMessage({ message: err.data.message, status: 'error' });
        } else if (err.data.statusCode === 404) {
          setMessage({ message: 'Пожалуйста, отправьте проверочный код', status: 'error' });
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

  const handleFirstNameInput = (e: ChangeEvent<HTMLInputElement>) => {
    setFirstName(e.target.value.trim());
  };

  const handleLastNameInput = (e: ChangeEvent<HTMLInputElement>) => {
    setLastName(e.target.value.trim());
  };

  const handleConfirmPasswordInput = (e: ChangeEvent<HTMLInputElement>) => {
    setConfirmPassword(e.target.value.trim());
  };

  const handleEmailInput = (e: ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value.trim());
  };

  const handleEmailVerificationCode = (e: ChangeEvent<HTMLInputElement>) => {
    setEmailVerificationCode(e.target.value.trim());
  };

  return (
    <AuthPage>
      <div className="font-light text-[2rem] mb-[10px] dark:text-[--clr-text-dark]">Регистрация</div>
      <div className="w-full">
        <p
          ref={messageRef}
          className={message ? (message.status === 'error' ? 'text-red-700' : 'text-green-700') : 'hidden'}
        >
          {message?.message}
        </p>

        <form onSubmit={handleSendEmail}>
          <label htmlFor="email" className=" font-semibold mb-2 ml-2">
            Email
          </label>
          <div className="flex w-full items-center mb-3">
            <input
              type="text"
              id="email"
              ref={emailRef}
              value={email}
              onChange={handleEmailInput}
              autoComplete="off"
              required
              className={` ${!email ? 'rounded' : 'rounded-l'} p-3 w-full h-[42px] text-black`}
            />
            {email ? (
              <button
                type="submit"
                disabled={loader}
                className="relative bg-[#3f83f8] text-[#FFF] p-3 rounded-r h-[42px] flex items-center justify-center"
              >
                {loader ? (
                  <svg
                    className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                ) : (
                  ''
                )}
                Отправить
              </button>
            ) : (
              ''
            )}
          </div>
        </form>

        <form onSubmit={handleSubmit} className="flex flex-col dark:text-white">
          {email && emailCodeStatus ? (
            <>
              <label htmlFor="emailVerificationCode" className="font-semibold mb-2 ml-2">
                Код из Email
              </label>
              <input
                type="text"
                id="emailVerificationCode"
                value={emailVerificationCode}
                onChange={handleEmailVerificationCode}
                required
                className="rounded p-3 mb-3 h-[42px] text-black"
              />
            </>
          ) : (
            ''
          )}

          {email && emailVerificationCode ? (
            <>
              <label htmlFor="firstName" className="font-semibold mb-2 ml-2">
                Имя
              </label>
              <input
                type="text"
                id="firstName"
                value={firstName}
                onChange={handleFirstNameInput}
                required
                className="rounded p-3 mb-3 h-[42px] text-black"
              />
              <label htmlFor="lastName" className="font-semibold mb-2 ml-2">
                Фамилия
              </label>
              <input
                type="text"
                id="lastName"
                value={lastName}
                onChange={handleLastNameInput}
                className="rounded p-3 mb-3 h-[42px] text-black"
              />
              <label htmlFor="password" className=" font-semibold mb-2 ml-2">
                Придумайте пароль
              </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={handlePasswordInput}
                required
                className="rounded p-3 mb-3 h-[42px] text-black"
              />
              <label htmlFor="confirmPassword" className="font-semibold mb-2 ml-2">
                Повторите пароль
              </label>
              <input
                type="password"
                id="confirmPassword"
                value={confirmPassword}
                onChange={handleConfirmPasswordInput}
                required
                className="rounded p-2 mb-10 h-[42px] text-black"
              />

              <div className="flex">
                <div className="">
                  <span className="">
                    <div
                      className={`h-4 w-4 inline-flex mr-2 cursor-pointer justify-center items-center ${
                        isTermsAccepted ? 'bg-[#3f83f8]' : 'bg-white'
                      }`}
                      onClick={handleTermsAcceptance}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="w-6 h-6"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                      </svg>
                    </div>
                    Я подтверждаю своё согласие с любыми условиями
                  </span>
                </div>
              </div>
              <button
                className={`rounded p-2 mb-3 mt-2 bg-[#3f83f8] text-[#FFF] ${isTermsAccepted ? '' : 'opacity-50'}`}
                disabled={!isTermsAccepted}
              >
                Зарегистрироваться
              </button>
            </>
          ) : (
            ''
          )}
        </form>
      </div>
      <div className="dark:text-[--clr-subtext-dark] mt-[20px]">
        <div className="flex flex-col items-center justify-center">
          <Link className="text-blue-400  mb-[20px]" to="/password/forgot">
            Забыли пароль?
          </Link>

          <p className="mb-[20px]">
            Уже зарегестрированы?{' '}
            <Link className="text-blue-400 underline" to="/login">
              Авторизация
            </Link>
          </p>
        </div>
      </div>
    </AuthPage>
  );
};
export default Register;
