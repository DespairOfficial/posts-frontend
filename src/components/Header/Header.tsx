import { useLogoutMutation } from '../../store/auth/slices/auth.api.slice';
import { logOut, selectCurrentUser } from '../../store/auth/slices/auth.slice';
import { useAppDispatch, useAppSelector } from '../../store/hooks';

export const Header = () => {
  const dispatch = useAppDispatch();
  const [logoutTrigger] = useLogoutMutation();

  const onLogout = async () => {
    await logoutTrigger(null).unwrap();
    dispatch(logOut());
  };
  const user = useAppSelector(selectCurrentUser);
  return (
    <div className="flex justify-between p-4 bg-slate-600">
      <div className="text-4xl font-bold text-white">Posts</div>
      <div className="flex justify-center items-center space-x-4">
        <div onClick={onLogout} className="cursor-pointer">
          Выйти
        </div>
        <div className="h-10 w-10 flex-none rounded-full text-black bg-white flex justify-center items-center">
          {user && `${user.firstName[0].toUpperCase()}${user.lastName && user.lastName[0].toUpperCase()}`}
        </div>
      </div>
    </div>
  );
};
