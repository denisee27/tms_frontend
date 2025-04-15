import { Navigate } from 'react-router-dom';
import { useAuthService } from './authservice';

export const AfterLoginGuard = ({ children }) => {
    const { isLoggedIn } = useAuthService();
    if (!isLoggedIn()) {
        window.location.href = '/login';
        return null;
    }

    return children;
};

export const BeforeLoginGuard = ({ children }) => {
    const { isLoggedIn } = useAuthService();
    if (isLoggedIn()) {
        return <Navigate to="/" />;
    }
    return children;
};
