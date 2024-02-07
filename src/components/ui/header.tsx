"use client";

import { HambergerMenu } from "iconsax-react";
import ButtonComponent from "../shared/button.component";
import SearchInput from "../shared/searchinput.component";
import { useState } from "react";
import { AiOutlineClose } from "react-icons/ai";
import SignInComponent from "./sign-in.component";
import SignupComponent from "./signup-form.component";
import Link from "next/link";
// import ForgottenPassword from "./forgotten-password.component";

const Header = () => {
  const [menu, setMenu] = useState(false);
  const [signup, setSignUp] = useState(false)
  const [login, setLogIn] = useState(false)

  const openLogin = () => {
    setMenu(false)
    setLogIn(true)
  }

  const openSignUp = () => {
    setMenu(false)
    setSignUp(true)
  }

  return (
    <nav className="flex relative pt-5 border-b border-mauve-30 justify-between items-center pb-6 px-5 sm:px-9">
      <div className="flex gap-x-12 items-center">
        <img src="/logo.png" width={100} className="" alt="" />
        <div id="navbar" className={`${menu ?  "#navbar active" : "#navbar"} absolute py-5 flex flex-col top-[-100em] h-fit px-4 justfify-center lg:py-0 lg:px-0 left-0 bg-body w-full lg:relative lg:top-0 lg:flex-row items-center text-sm gap-8`}>
          <Link href={`/`}><p>Home</p></Link>
          <Link href={`/reviews`}><p>Reviews</p></Link>
          <p>Lists</p>
          <p>Fans</p>
          <div className="lg:hidden flex flex-col gap-y-5">
            <ButtonComponent onClick={openLogin} variant="secondary" className="rounded-primary">
              Log in
            </ButtonComponent>
            <ButtonComponent onClick={openSignUp} variant="pink" className="rounded-primary">
              Sign up
            </ButtonComponent>
          </div>
        </div>
      </div>
{login ? <SignInComponent/> : null}
{signup ?  <SignupComponent/> : null}
      {/* */}
      {/* <ForgottenPassword/> */}

      <div className="hidden lg:block">
        <SearchInput placeholder="Search" />
      </div>

      <div className="hidden lg:flex gap-x-[22px]">
        <ButtonComponent onClick={openLogin} variant="secondary" className="rounded-primary">
          Log in
        </ButtonComponent>
        <ButtonComponent onClick={openSignUp} variant="pink" className="rounded-primary">
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
