import { selectCurrentUser } from '../../store/auth/slices/auth.slice';
import { Outlet } from 'react-router-dom';
import { useAppSelector } from '../../store/hooks';

const RequireRole = () => {
  const user = useAppSelector(selectCurrentUser);
  return user?.role === 'ADMIN' ? <Outlet /> : null;
};
export default RequireRole;
