"use client";

import { HambergerMenu } from "iconsax-react";
import ButtonComponent from "../shared/button.component";
import SearchInput from "../shared/searchinput.component";
import { useState } from "react";
import { AiOutlineClose } from "react-icons/ai";
import ForgottenPassword from "./forgotten-password.component";

const Header = () => {
  const [menu, setMenu] = useState(false);

  return (
    <nav className="flex relative pt-5 border-b border-mauve-30 justify-between items-center pb-6 px-5 s:px-9">
      <div className="flex gap-x-12 items-center">
        <img src="/logo.png" width={100} className="" alt="" />
        <div id="navbar" className={`${menu ?  "#navbar active" : "#navbar"} text-sm absolute py-5 flex flex-col top-[-100em] h-fit px-4 justfify-center lg:py-0 lg:px-0 left-0 bg-body w-full lg:relative lg:top-0 lg:flex-row items-center text-sm gap-8`}>
          <p>Home</p>
          <p>Reviews</p>
          <p>Lists</p>
          <p>Fans</p>
          <div className="lg:hidden flex flex-col gap-y-5">
            <ButtonComponent variant="secondary" className="rounded-primary">
              Log in
            </ButtonComponent>
            <ButtonComponent variant="pink" className="rounded-primary">
              Sign up
            </ButtonComponent>
          </div>
        </div>
      </div>
{/* <SignInComponent/> */}
      {/* <SignupComponent/> */}
      <ForgottenPassword/>

      <div className="hidden lg:block">
        <SearchInput placeholder="Search" />
      </div>

      <div className="hidden lg:flex gap-x-[22px]">
        <ButtonComponent variant="secondary" className="rounded-primary">
          Log in
        </ButtonComponent>
        <ButtonComponent variant="pink" className="rounded-primary">
          Sign up
        </ButtonComponent>
      </div>

      <div className="flex items-center gap-x-3 lg:hidden">
        <img src="/assets/icons/search.svg" width={25} alt="search-icon" />
        <div onClick={() => setMenu(!menu)}>
          {menu ? (
            <AiOutlineClose size={32} color="#f71d7f" />
          ) : (
            <HambergerMenu size="32" color="#f71d7f" />
          )}
        </div>
      </div>
    </nav>
  );
};

export default Header;
