import { ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';
import { PATH } from '../routes/path';
import { isUserAuthenticated } from '../utils/common'
import Login from './Login';

type Props = {
  children: JSX.Element | ReactNode;
}

function AuthGaurd({ children }: Props) {
  const navigate = useNavigate();

  if (!isUserAuthenticated()) {
    navigate(PATH.login);
    return <Login />
  }

  return <>{children}</>
}

export default AuthGaurd;
