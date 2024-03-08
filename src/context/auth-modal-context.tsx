import { createContext, useContext, useState, ReactNode } from 'react';

interface AuthModalContextValue {
    signup: boolean;
    login: boolean;
    menu: boolean;

    forgotPassword: boolean;
    verifymail: boolean;
    reset: boolean;
    confirmreset: boolean;
    enteredEmail: string;
    userId: string;
    resetToken: string;
    setSignUp: (value: boolean) => void;
    setMenu: (value: boolean) => void;
  
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
    closeModal: () => void;
    openSignUp: () => void;
    openLogin: () => void;
    openReset: (userId: string, resettoken: string) => void;
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
    const [menu, setMenu] = useState(false);

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

    function closeModal() {
        setSignUp(false)
        setLogin(false)
        setForgotPassword(false)
        setVerifyMail(false)
        setReset(false)
        setConfirmReset(false)
    }

    function openSignUp() {
        setMenu(false);
        setLogin(false)
        
        setVerifyMail(false)
        setForgotPassword(false)
        setSignUp(true)
    }

    function openLogin() {
        setMenu(false);
        setSignUp(false)
      
        setForgotPassword(false)
        setVerifyMail(false)
        setReset(false)
        setLogin(true);

    };

    function openReset(userId: string, resettoken: string) {
        setUserId(userId)
        setResetToken(resettoken)
        setMenu(false);
        setSignUp(false)
      
        setForgotPassword(false)
        setVerifyMail(false)
        setConfirmReset(false)
        setReset(true)
    };

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
            resetToken, setResetToken, openForgotPassword, openResetPassword, verifyMail,
            openLogin, openReset, openSignUp, closeModal, menu, setMenu
        }}>
            {children}
        </AuthModalContext.Provider>
    );
};