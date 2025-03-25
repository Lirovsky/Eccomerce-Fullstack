import React, { useState } from "react";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import Axios from "../utils/Axios";
import SummaryApi from "../common/SummaryApi";
import toast from "react-hot-toast";
import AxiosToastError from "../utils/AxiosToastError";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const [data, setData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((preve) => {
      return {
        ...preve,
        [name]: value,
      };
    });
  };

  const valideValue = Object.values(data).every((el) => el);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await Axios("", {
        ...SummaryApi.login,
        data: data,
      });

      if (response.data.error) {
        toast.error(response.data.message);
      }

      if (response.data.success) {
        toast.success("Usuário cadastrado com sucesso.");
        setData({
          email: "",
          password: "",
        });
      }
      navigate("/login");
    } catch (error) {
      AxiosToastError(error);
    }
  };
  return (
    <section className="container mx-auto w-full px-2">
      <div className="mx-auto my-4 w-full max-w-lg rounded bg-white p-7">
        <form className="grid gap-4 py-6" onSubmit={handleSubmit}>
          <div className="grid gap-1">
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              className="rounded border bg-blue-50 p-2 outline-none focus:border-amber-300"
              name="email"
              value={data.email}
              onChange={handleChange}
              placeholder="Digite seu email"
            />
          </div>
          <div className="grid gap-1">
            <label htmlFor="password">Senha:</label>
            <input
              type="password"
              id="password"
              className="rounded border bg-blue-50 p-2 outline-none focus:border-amber-300"
              name="password"
              value={data.password}
              onChange={handleChange}
              placeholder="Digite sua senha"
            />
            <div
              className="cursor-pointer"
              onClick={() => setShowPassword((preve) => !preve)}
            >
              {showPassword ? <FaRegEye /> : <FaRegEyeSlash />}
            </div>
            <Link className="ml-auto block hover:text-amber-300">
              Esqueceu sua senha?
            </Link>
          </div>

          <button
            className={`${valideValue ? "bg-amber-500 hover:bg-amber-600" : "rounded bg-amber-300 p-2 font-semibold"}`}
            disabled={!valideValue}
          >
            Entrar
          </button>
        </form>
        <p>
          Ainda não é cadastrado?{" "}
          <Link
            to={"/register"}
            className="font-semibold text-amber-300 hover:text-amber-400"
          >
            Cadastrar
          </Link>
        </p>
      </div>
    </section>
  );
};

export default Login;
