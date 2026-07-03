import type { ReactNode } from 'react';
import { useAppSelector } from '../store/hooks';
import LoginPage from './LoginPage';

interface AuthGateProps {
  children: ReactNode;
}

function AuthGate({ children }: AuthGateProps) {
  const isAuthenticated = useAppSelector((state) => state.auth.isAuthenticated);

  if (!isAuthenticated) {
    return <LoginPage />;
  }

  return children;
}

export default AuthGate;
