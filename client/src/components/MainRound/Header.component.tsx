import { useState } from "react";
import { AiOutlineMenu, AiOutlineClose } from "react-icons/ai";
export default function Header() {
  const [nav, setNav] = useState(false);
  const handleNav = () => {
    setNav(!nav);
  };

  const handleLogOut = () => {
    window.localStorage.clear();
  };

  return (
    <>
      <div className=" fixed top-0 z-10  rounded-div flex items-center justify-between h-20 font-bold w-full bg-black/90 text-white md:px-8">
        <a href="/">
          <h1 className="text-2xl uppercase pl-2 select-none">Arena</h1>
        </a>
        <div className=" hidden md:block">
          <a
            href="/register"
            className=" p-4 duration-300 hover:text-[#d9d9d9d9] no-underline"
          >
            {" "}
            Register
          </a>
          <a
            href="/login"
            className=" p-4 duration-300 hover:text-[#d9d9d9d9] no-underline"
          >
            {" "}
            Login
          </a>
          <a
            href="/quickround"
            className=" p-4 duration-300 hover:text-[#d9d9d9d9] no-underline"
          >
            {" "}
            Quickround
          </a>
          <a
            href="/scoredisplay"
            className=" p-4 duration-300 hover:text-[#d9d9d9d9] no-underline"
          >
            {" "}
            Score Display
          </a>
          <a
            href="/ranks"
            className=" p-4 duration-300 hover:text-[#d9d9d9d9] no-underline"
          >
            {" "}
            Ranking
          </a>
          <a
            href="/mainround"
            className=" p-4 duration-300 hover:text-[#d9d9d9d9] no-underline"
          >
            {" "}
            MainRound
          </a>
          <a
            href="/admin"
            className=" p-4 duration-300 hover:text-[#d9d9d9d9] no-underline"
          >
            {" "}
            Admin
          </a>
        </div>
        <div
          onClick={handleNav}
          className="block md:hidden cursor-pointer z-10 pr-4"
        >
          {nav ? <AiOutlineClose size={25} /> : <AiOutlineMenu size={25} />}
        </div>
        <div
          className={
            nav
              ? "md:hidden fixed right-0 top-20 flex flex-col items-center justify-between w-full h-fit border-b-2 border-l-2 border-t-2 bg-black ease-in duration-500 z-10 "
              : "fixed right-[-100%] w-full top-20 h-fit flex flex-col items-center justify-between ease-in duration-500"
          }
        >
          <ul className="w-full p-4 ">
            <li className=" py-6 border-b">
              <a href="/">Acasă</a>
            </li>
            <li className=" py-6 border-b">
              <a href="/concurenti">Concurenți</a>
            </li>

            {!window.localStorage.getItem("token") ? (
              <li className=" py-6 border-b">
                <a href="/login">Autentificare</a>
              </li>
            ) : (
              <li className=" py-6 border-b">
                <a href="/" onClick={handleLogOut}>
                  Deconectare
                </a>
              </li>
            )}
          </ul>
        </div>
      </div>
    </>
  );
}
