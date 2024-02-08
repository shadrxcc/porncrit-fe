"use client";

import { HambergerMenu } from "iconsax-react";
import ButtonComponent from "../shared/button.component";
import SearchInput from "../shared/searchinput.component";
import { useState } from "react";
import { AiOutlineClose } from "react-icons/ai";
import SignInComponent from "./sign-in.component";
import SignupComponent from "./signup-form.component";
import Link from "next/link";
import { motion } from "framer-motion";
import { usePathname } from "next/navigation";
// import ForgottenPassword from "./forgotten-password.component";

const Header = () => {
  const [menu, setMenu] = useState(false);
  const [signup, setSignUp] = useState(false);
  const [login, setLogIn] = useState(false);
  let pathname = usePathname() || "/";

  const openLogin = () => {
    setMenu(false);
    setLogIn(true);
  };

  const openSignUp = () => {
    setMenu(false);
    setSignUp(true);
  };

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
}: {
  label: string;
  path: string;
  active: boolean;
}) => {
  return (
      <Link scroll={false} href={path}>
          <motion.p
              className="flex flex-col items-center cursor-pointer transition-all ease-in-out delay-700"
          >
              <span
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
    <nav className="flex relative pt-5 border-b border-mauve-30 justify-between items-center pb-6 px-5 sm:px-9">
      <div className="flex gap-x-12 items-center">
        <Link href={`/`}><img src="/logo.png" width={150} className="" alt="" /></Link>
        <div
          id="navbar"
          className={`${
            menu ? "#navbar active" : "#navbar"
          } absolute py-5 flex flex-col top-[-100em] h-fit px-4 justfify-center lg:py-0 lg:px-0 left-0 bg-body w-full lg:relative lg:top-0 lg:flex-row items-center text-sm gap-8`}
        >
          {navItems.map((e) => (
                            <NavLink
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
      {login ? <SignInComponent /> : null}
      {signup ? <SignupComponent /> : null}
      {/* */}
      {/* <ForgottenPassword/> */}

      <div className="hidden lg:block">
        <SearchInput placeholder="Search" />
      </div>

      <div className="hidden lg:flex gap-x-[22px]">
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

      <div className="flex items-center gap-x-6 lg:hidden">
        <img src="/assets/icons/search.svg" width={25} alt="search-icon" />
        <button onClick={() => setMenu(!menu)}>
          {menu ? (
            <AiOutlineClose size={32} color="#f71d7f" />
          ) : (
            <HambergerMenu size="32" color="#f71d7f" />
          )}
        </button>
      </div>
    </nav>
  );
};

export default Header;
