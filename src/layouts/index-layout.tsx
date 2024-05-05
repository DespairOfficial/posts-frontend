import { Outlet } from 'react-router-dom';
import { Header } from '../components/Header/Header';

export const IndexLayout: React.FC<React.PropsWithChildren<unknown>> = () => {
  return (
    <div className="w-full h-full bg-slate-100">
      <Header />
      <Outlet />
    </div>
  );
};
