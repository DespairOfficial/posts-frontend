import { ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

const AuthPage: React.FC<Props> = ({ children }: Props) => {
  return (
    <div className="w-screen bg__generate h-screen bg-white dark:bg-[--clr-bg-dark] relative">
      <div className="absolute flex justify-center w-full lg:w-[35%] pt-[30px] pb-[30px] h-full left-0 top-0 bottom-0 bg-white overflow-x-hidden dark:bg-[--clr-lbg-dark]">
        <div className="relative flex flex-col justify-between items-center max-w-[80%]">
          <div className="">{children}</div>
        </div>
      </div>
    </div>
  );
};
export default AuthPage;
