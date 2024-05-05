import { selectCurrentToken } from '../../store/auth/slices/auth.slice';
import { useLocation, Navigate, Outlet } from 'react-router-dom';
import { useAppSelector } from '../../store/hooks';

const RequireAuth = () => {
  const token = useAppSelector(selectCurrentToken);

  const location = useLocation();
  return token ? <Outlet /> : <Navigate to="/login" state={{ from: location }} replace />;
};
export default RequireAuth;
