import React, { useEffect, useState } from "react";
import { IoSearch } from "react-icons/io5";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { TypeAnimation } from "react-type-animation";
import useMobile from "../hooks/useMobile";
import { FaArrowLeft } from "react-icons/fa";

const Search = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isSearchPage, setIsSearchPage] = useState(false);
  const [isMobile] = useMobile();
  const params = useLocation();
  const searchText = params.search.slice(3);

  const redirectToSearch = () => {
    navigate("/search");
  };

  useEffect(() => {
    const isSearch = location.pathname === "/search";
    setIsSearchPage(isSearch);
  }, [location]);

  return (
    <div className="flex h-9 w-full min-w-[300px] items-center overflow-hidden rounded-lg border bg-slate-50 text-neutral-500 group-focus-within:border-amber-300 lg:h-12 lg:min-w-[420px]">
      <div>
        {isMobile && isSearchPage ? (
          <Link
            to={"/"}
            className="m-1 flex h-full items-center justify-center p-2"
          >
            <FaArrowLeft size={20} />
          </Link>
        ) : (
          <div className="flex h-full items-center justify-center p-3">
            <IoSearch size={22} />
          </div>
        )}
      </div>

      <div className="h-full w-full">
        {!isSearchPage ? (
          <div
            onClick={redirectToSearch}
            className="flex h-full w-full items-center"
          >
            <TypeAnimation
              sequence={[
                "Pesquisar 'Leite'",
                1000,
                "Pesquisar 'Pão'",
                1000,
                "Pesquisar 'Açúcar'",
                1000,
                "Pesquisar 'Chocolate'",
                1000,
                "Pesquisar 'Doces'",
                1000,
                "Pesquisar 'Ovos'",
                1000,
                "Pesquisar 'Batatas'",
                1000,
              ]}
              wrapper="span"
              speed={50}
              repeat={Infinity}
            />
          </div>
        ) : (
          <div className="h-full w-full">
            <input
              type="text"
              placeholder="Pesquise por Produtos"
              autoFocus
              className="h-full w-full bg-transparent outline-none"
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default Search;
