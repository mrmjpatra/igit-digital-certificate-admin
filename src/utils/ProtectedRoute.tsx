import { useAppSelector } from '../state/hooks';
import { Navigate, Outlet } from 'react-router-dom';

function ProtectedRoute() {
  const isLoggedIn = useAppSelector(state => {
    return state.admin.isLoggedIn;
  })
  return (
    isLoggedIn ? <Outlet /> : <Navigate to="/" />
  )
}

export default ProtectedRoute