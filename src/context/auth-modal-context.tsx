import { createContext, useContext, useState, ReactNode } from 'react';

interface AuthModalContextValue {
    signup: boolean;
    login: boolean;
    forgotPassword: boolean;
    verifymail: boolean;
    reset: boolean;
    confirmreset: boolean;
    enteredEmail: string;
    userId: string;
    resetToken: string;
    setSignUp: (value: boolean) => void;
    setLogin: (value: boolean) => void;
    setForgotPassword: (value: boolean) => void;
    setVerifyMail: (value: boolean) => void;
    setReset: (value: boolean) => void;
    setConfirmReset: (value: boolean) => void;
    setEnteredEmail: (value: string) => void;
    setUserId: (value: string) => void;
    setResetToken: (value: string) => void;
    openForgotPassword: () => void;
    verifyMail: (email: string, userId: string) => void;
    openResetPassword: (email: string) => void;
}

const AuthModalContext = createContext<AuthModalContextValue | undefined>(undefined);

export const useAuthModal = () => {
    const context = useContext(AuthModalContext);
    if (!context) {
        throw new Error('useAuthModal must be used within an AuthModalProvider');
    }
    return context;
};

interface AuthModalProviderProps {
    children: ReactNode;
}

export const AuthModalProvider: React.FC<AuthModalProviderProps> = ({ children }) => {
    const [signup, setSignUp] = useState(false);
    const [login, setLogin] = useState(false);
    const [forgotPassword, setForgotPassword] = useState(false);
    const [verifymail, setVerifyMail] = useState(false);
    const [reset, setReset] = useState(false);
    const [confirmreset, setConfirmReset] = useState(false);
    const [enteredEmail, setEnteredEmail] = useState("");
    const [userId, setUserId] = useState("");
    const [resetToken, setResetToken] = useState("");

    function openForgotPassword() {
        setSignUp(false)
        setLogin(false)
        setForgotPassword(true)
    }

    function openResetPassword(email: string) {
        setEnteredEmail(email)
        setLogin(false)
        setForgotPassword(false)
        setConfirmReset(true)
    }

    function verifyMail(email: string, userId: string) {
        setEnteredEmail(email)
        setUserId(userId)
        setSignUp(false)
        setLogin(false)
        setVerifyMail(true)
    }

    return (
        <AuthModalContext.Provider value={{
            signup, setSignUp,
            login, setLogin,
            forgotPassword, setForgotPassword,
            verifymail, setVerifyMail,
            reset, setReset,
            confirmreset, setConfirmReset,
            enteredEmail, setEnteredEmail,
            userId, setUserId,
            resetToken, setResetToken, openForgotPassword, openResetPassword, verifyMail
        }}>
            {children}
        </AuthModalContext.Provider>
    );
};