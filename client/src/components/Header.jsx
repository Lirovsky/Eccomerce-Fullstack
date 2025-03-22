import React from "react";
import logo from "../assets/logo.svg";
import Search from "./Search";
import { Link } from "react-router-dom";
import { FaRegUserCircle } from "react-icons/fa";

const Header = () => {
  return (
    <header className="sticky top-0 flex h-20 flex-col justify-center bg-gray-800 px-10 text-white">
      <div className="container flex items-center justify-between gap-2">
        <Link to="/" className="flex items-center gap-2">
          <img
            src={logo}
            width={60}
            height={60}
            alt="Logo"
            className="hidden md:block"
          />
          <img
            src={logo}
            width={30}
            height={30}
            alt="Logo"
            className="md:hidden"
          />
          <h1 className="font-bold md:text-2xl">FULL COMMERCE</h1>
        </Link>
        <div className="hidden lg:block">
          <Search />
        </div>

        <div>
          <button className="text-amber-300 md:hidden">
            <FaRegUserCircle size={25} />
          </button>
          <div className="hidden md:block">Carrinho</div>
        </div>
      </div>

      <div className="contaienr mx-auto block px-2 md:hidden">
        <Search />
      </div>
    </header>
  );
};

export default Header;
