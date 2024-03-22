"use client";

import ButtonComponent from "../shared/button.component";

import { useEffect, useRef, useState } from "react";
import SignInComponent from "./sign-in.component";
import SignupComponent from "./signup-form.component";
import Link from "next/link";
import { motion } from "framer-motion";
import { usePathname } from "next/navigation";
import MyModal from "../shared/modal.component";
import ForgottenPassword from "./forgotten-password.component";
import MenuSvg from "../shared/menu-svg.component";
import SearchSvg from "../shared/searchsvg.component";

import ClosePinkSvg from "../shared/close-pink.component";
import SearchModal from "../shared/search.modal";

import ProfileSvg from "../shared/profile";
import SignoutSvg from "../shared/signout";
import SignInSvg from "../shared/signin";
import SignupSvg from "../shared/signup";
import { useDispatch, useSelector } from "react-redux";
import { selectAuthUser, selectIsAuthenticated } from "@/services/auth-services/selector";
import { AppDispatchType } from "@/services/config-store";
import { logout } from "@/services/auth-services/slice";
import VerifyEmailComponent from "./verify-email.component";
import { PasswordResetComponent } from "./reset-password.component";
import ConfirmOtpComponent from "./reset-password.component";
import { getUserProfile } from "@/services/auth-services/async-actions";
import Image from "next/image";


const Header = () => {
  const [menu, setMenu] = useState(false);
  const [signup, setSignUp] = useState(false);
  const [login, setLogin] = useState(false);
  const [forgotPassword, setForgotPassword] = useState(false)
  const [search, setSearch] = useState(false)
  const [dropdown, setDropdown] = useState(false)
  const [verifymail, setVerifyMail] = useState(false)
  const [reset, setReset] = useState(false)
  const [confirmreset, setConfirmReset] = useState(false)
  const [enteredEmail, setEnteredEmail] = useState("");
  const [userId, setUserId] = useState("")
  const [resetToken, setResetToken] = useState("")

  const trigger = useRef<HTMLButtonElement | null>(null);
  const dropdwn = useRef<HTMLDivElement | null>(null);

  const isAuthenticated = useSelector(selectIsAuthenticated);
  const dispatch: AppDispatchType = useDispatch();

  const user = useSelector(selectAuthUser);


  useEffect(() => {
    if (isAuthenticated) {
      dispatch(getUserProfile());
    }
  }, [dispatch, isAuthenticated]);

  // close on click outside
  useEffect(() => {
    const clickHandler = ({ target }: MouseEvent) => {
      if (!dropdwn.current) return;
      const targetNode = target as Node;
      if (
        !dropdown ||
        dropdwn.current.contains(targetNode) ||
        trigger.current?.contains(targetNode)
      )
        return;
      setDropdown(false);
    };
    document.addEventListener("click", clickHandler);
    return () => document.removeEventListener("click", clickHandler);
  });

  let pathname = usePathname() || "/";


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
    setDropdown(false)
    setVerifyMail(false)
    setForgotPassword(false)
    setSignUp(true)
  }

  function openLogin() {
    setMenu(false);
    setSignUp(false)
    setDropdown(false)
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
    setDropdown(false)
    setForgotPassword(false)
    setVerifyMail(false)
    setConfirmReset(false)
    setReset(true)
  };


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

  function toggleDropdown() {
    setMenu(false);
    setDropdown(!dropdown)
  }

  function logOut() {
    dispatch(logout())
    setDropdown(false)
  }

  const navItems = [
    {
      path: "/",
      name: "Home",
    },
    {
      path: "/reviews",
      name: "Reviews",
    },
    {
      path: "/lists",
      name: "Lists",
    },
    {
      path: "/fans",
      name: "Fans",
    },
  ];

  const NavLink = ({
    label,
    path,
    active,
    closemenu
  }: {
    label: string;
    path: string;
    active: boolean;
    closemenu: () => void;
  }) => {
    return (
      <Link scroll={false} href={path}>
        <motion.p
          className="flex flex-col items-center cursor-pointer transition-all ease-in-out delay-700"
        >
          <span onClick={closemenu}
            className={`text-sm ${active
              ? "text-pink font-medium"
              : "text-white"
              }`}
          >
            {label}
          </span>
        </motion.p>
      </Link>
    );
  };

  return (
    <>  <nav className="flex bg-body top-0 fixed w-full mx-auto z-30 border-b border-mauve-30 justify-between items-center pt-5 pb-6 px-5 sm:px-9">
      <div className="flex gap-x-12 items-center">
        <Link href={`/`}><img src="/logo.png" width={120} className="" alt="" /></Link>
        <div
          id="navbar"
          className={`${menu ? "#navbar active" : "#navbar"
            } absolute py-10 flex flex-col top-[-100em] h-fit px-4 justfify-center lg:py-0 lg:px-0 left-0 right-0 bg-body w-full lg:relative lg:top-0 lg:flex-row items-center text-sm gap-8`}
        >
          {navItems.map((e) => (
            <NavLink
              closemenu={() => setMenu(false)}
              key={e.path}
              path={e.path}
              label={e.name}
              active={e.path === pathname}
            />
          ))}
        </div>
      </div>

      <div className="hidden lg:flex items-center gap-x-[22px]">
        <ButtonComponent onClick={() => setSearch(true)} variant="secondary" className="!p-0 "><SearchSvg /></ButtonComponent>
        {!isAuthenticated ? <><ButtonComponent
          onClick={openLogin}
          variant="secondary"
          className="rounded-primary"
        >
          Log in
        </ButtonComponent>
          <ButtonComponent
            onClick={openSignUp}
            variant="pink"
            className="rounded-primary"
          >
            Sign up
          </ButtonComponent></> : null}
        {isAuthenticated ? <div>
          <ButtonComponent ref={trigger} onClick={toggleDropdown} variant="secondary" className="!p-0 "><Image className="w-6 h-6 object-cover rounded-full" src={isAuthenticated ? user?.avatar || "/assets/images/user.png" : "/assets/images/user.png"} width={24} height={24} priority alt="" /></ButtonComponent>
          {dropdown ? <div ref={dropdwn} className="flex absolute top-16 right-2 flex-col gap-y-4 bg-box rounded-box px-6 py-6">
            <Link href={`/my-account`}><div onClick={() => setDropdown(false)} className="flex items-center gap-x-2 text-xs">
              <ProfileSvg />
              <p>Profile</p>
            </div></Link>

            <ButtonComponent onClick={logOut}
              variant="secondary"
              className="rounded-primary !p-0 !justify-start !text-xs"
            >
              <SignoutSvg />
              Sign out
            </ButtonComponent>
          </div> : null}
        </div> : null}
      </div>

      <SearchModal isOpen={search} closeModal={() => setSearch(false)} />
      <MyModal isOpen={forgotPassword} closeModal={closeModal}><ForgottenPassword reset={openResetPassword} login={openLogin} signup={openSignUp} /></MyModal>
      <MyModal isOpen={verifymail} closeModal={closeModal}><VerifyEmailComponent email={enteredEmail} userId={userId} signin={openLogin} /></MyModal>
      <MyModal isOpen={confirmreset} closeModal={closeModal}><ConfirmOtpComponent email={enteredEmail} reset={openReset} /></MyModal>
      <MyModal isOpen={reset} closeModal={closeModal}><PasswordResetComponent toKen={resetToken} userid={userId} login={openLogin} /></MyModal>
      <MyModal isOpen={signup} closeModal={closeModal}><SignupComponent verify={verifyMail} login={openLogin} /></MyModal>
      <MyModal isOpen={login} closeModal={closeModal}><SignInComponent verify={verifyMail} close={closeModal} signup={openSignUp} forgot={openForgotPassword} /></MyModal>

      <div className="flex items-center gap-x-6 lg:hidden">
        <ButtonComponent onClick={() => setSearch(true)} variant="secondary" className="!p-0 "><SearchSvg /></ButtonComponent>

        <div>
          <ButtonComponent ref={trigger} onClick={toggleDropdown} variant="secondary" className="!p-0 "><Image className="w-6 h-6 object-cover rounded-full" src={isAuthenticated ? user?.avatar || "/assets/images/user.png" : "/assets/images/user.png"} width={24} height={24} priority alt="" /></ButtonComponent>
          {dropdown ? <div ref={dropdwn} className="flex absolute top-16 right-2 flex-col gap-y-4 bg-box rounded-box px-6 py-6">
            {isAuthenticated ? <><Link href={`/my-account`}><div onClick={() => setDropdown(false)} className="flex items-center gap-x-2 text-xs">
              <ProfileSvg />
              <p>Profile</p>
            </div></Link><ButtonComponent
              onClick={logOut}
              variant="secondary"
              className="rounded-primary !p-0 !justify-start !text-xs"
            >
                <SignoutSvg />
                Sign out
              </ButtonComponent></> : null}

            {!isAuthenticated ? <><ButtonComponent
              onClick={openLogin}
              variant="secondary"
              className="rounded-primary !p-0 !justify-start !text-xs"
            >
              <SignInSvg />
              Log in
            </ButtonComponent>

              <ButtonComponent
                onClick={openSignUp}
                variant="secondary"
                className="rounded-primary !p-0 !justify-start !text-xs"
              >
                <SignupSvg />
                Sign up
              </ButtonComponent></> : null}
          </div> : null}
        </div>

        <button onClick={() => setMenu(!menu)}>
          {menu ? (
            <ClosePinkSvg />
          ) : (
            <MenuSvg />
          )}
        </button>
      </div>
    </nav>
    </>

  );
};

export default Header;
