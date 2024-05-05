import { selectCurrentToken } from '../../store/auth/slices/auth.slice';
import { useLocation, Navigate, Outlet } from 'react-router-dom';
import { useAppSelector } from '../../store/hooks';

const RequireUnauth = () => {
  const token = useAppSelector(selectCurrentToken);

  const location = useLocation();
  return !token ? <Outlet /> : <Navigate to="/" state={{ from: location }} replace />;
};
export default RequireUnauth;
