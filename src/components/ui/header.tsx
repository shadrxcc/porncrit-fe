"use client";

import ButtonComponent from "../shared/button.component";

import { useState } from "react";
import { AiOutlineClose } from "react-icons/ai";
import SignInComponent from "./sign-in.component";
import SignupComponent from "./signup-form.component";
import Link from "next/link";
import { motion } from "framer-motion";
import { usePathname } from "next/navigation";
import MyModal from "../shared/modal.component";
import ForgottenPassword from "./forgotten-password.component";
import MenuSvg from "../shared/menu-svg.component";
import SearchSvg from "../shared/searchsvg.component";
import CloseSvg from "../shared/close.component";
import ClosePinkSvg from "../shared/close-pink.component";
import SearchModal from "../shared/search.modal";


const Header = () => {
  const [menu, setMenu] = useState(false);
  const [signup, setSignUp] = useState(false);
  const [login, setLogin] = useState(false);
  const [forgotPassword, setForgotPassword] = useState(false)
  const [search, setSearch] = useState(false)


  let pathname = usePathname() || "/";


  function closeModal() {
    setSignUp(false)
    setLogin(false)
    setForgotPassword(false)
  }

  function openSignUp() {
    setMenu(false);
    setLogin(false)
    setForgotPassword(false)
    setSignUp(true)
  }

  function openLogin() {
    setMenu(false);
    setSignUp(false)
    setForgotPassword(false)
    setLogin(true);
  };

  function openForgotPassword() {
    setLogin(false)
    setForgotPassword(true)
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
    <>  <nav className="flex bg-body top-0 fixed w-full mx-auto z-10 pt-5 border-b border-mauve-30 justify-between items-center pb-6 px-5 sm:px-9">
      <div className="flex gap-x-12 items-center">
        <Link href={`/`}><img src="/logo.png" width={120} className="" alt="" /></Link>
        <div
          id="navbar"
          className={`${menu ? "#navbar active" : "#navbar"
            } absolute py-5 flex flex-col top-[-100em] h-fit px-4 justfify-center lg:py-0 lg:px-0 left-0 right-0 bg-body w-full lg:relative lg:top-0 lg:flex-row items-center text-sm gap-8`}
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

          <div className="lg:hidden flex flex-col gap-y-5">
            <ButtonComponent
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
            </ButtonComponent>
          </div>
        </div>
      </div>

      <div className="hidden lg:flex items-center gap-x-[22px]">
        <ButtonComponent onClick={() => setSearch(true)} variant="secondary" className="!p-0 "><SearchSvg /></ButtonComponent>
        <ButtonComponent
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
        </ButtonComponent>
      </div>

      <SearchModal isOpen={search} closeModal={()=>setSearch(false)}/>
      <MyModal isOpen={login} closeModal={closeModal}><SignInComponent signup={openSignUp} forgot={openForgotPassword} /></MyModal>
      <MyModal isOpen={signup} closeModal={closeModal}><SignupComponent login={openLogin} /></MyModal>
      <MyModal isOpen={forgotPassword} closeModal={closeModal}><ForgottenPassword login={openLogin} signup={openSignUp} /></MyModal>
      <div className="flex items-center gap-x-6 lg:hidden">
        <ButtonComponent onClick={() => setSearch(true)} variant="secondary" className="!p-0 "><SearchSvg /></ButtonComponent>
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
