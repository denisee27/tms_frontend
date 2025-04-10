import { Navigate } from 'react-router-dom';
import { useAuthService } from './authservice';

// ⛔ AfterLoginGuard (Only accessible if logged in)
export const AfterLoginGuard = ({ children }) => {
    const { isLoggedIn } = useAuthService();
    if (!isLoggedIn()) {
        window.location.href = '/login';
        return null;
    }

    return children;
};

// ⛔ BeforeLoginGuard (Redirect to dashboard if already logged in)
export const BeforeLoginGuard = ({ children }) => {
    const { isLoggedIn } = useAuthService();
    if (isLoggedIn()) {
        return <Navigate to="/" />;
    }
    return children;
};

// 🔄 CanDeactivateGuard (Prompt before navigating away)
// export const WithPromptGuard = ({ children }) => {
//     const [shouldBlock, setShouldBlock] = useState(true);
//     const navigator = useContext(NavigationContext).navigator;

//     useEffect(() => {
//         if (!shouldBlock) return;

//         const unblock = navigator.block((tx) => {
//             const autoUnblockingTx = {
//                 ...tx,
//                 retry() {
//                     unblock();
//                     tx.retry();
//                 }
//             };

//             if (window.confirm('Are you sure you want to leave this page? Unsaved changes will be lost.')) {
//                 autoUnblockingTx.retry();
//             }
//         });

//         return unblock;
//     }, [navigator, shouldBlock]);

//     return children;
// };
