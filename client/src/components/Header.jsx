import React from "react";
import { Link, useNavigate } from "react-router-dom";

import { useLocation } from "react-router-dom";
import useMobile from "../hooks/useMobile";

import Search from "./Search";
import { FaCartPlus, FaRegUserCircle } from "react-icons/fa";
import logo from "../assets/logo.svg";

const Header = () => {
  const [isMobile] = useMobile();
  const location = useLocation();
  const isSearchPage = location.pathname === "/search";
  const navigate = useNavigate();

  const redirectToLoginPage = () => {
    navigate("/login");
  };
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

          <div className="hidden items-center gap-10 lg:flex">
            <button onClick={redirectToLoginPage} className="px-2 text-lg">
              Entrar
            </button>
            <button className="flex items-center gap-2 rounded-sm bg-amber-300 p-3">
              <div className="animate-bounce">
                <FaCartPlus size={25} />
              </div>
              <div className="text-sm font-semibold">
                <p>Meu carrinho</p>
              </div>
            </button>
          </div>
        </div>
      </div>
      <div className="container mx-auto block px-2 md:hidden">
        <Search />
      </div>
    </header>
  );
};

export default Header;
