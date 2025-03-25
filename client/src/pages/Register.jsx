import { useNavigate } from "react-router-dom";
import React, { useState } from "react";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import { Link } from "react-router-dom";
import SummaryApi from "../common/SummaryApi";
import toast from "react-hot-toast";
import Axios from "../utils/Axios";
import AxiosToastError from "../utils/AxiosToastError";

const Register = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const navigate = useNavigate();
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData({
      ...data,
      [name]: value,
    });
  };

  const valideValue = Object.values(data).every((el) => el);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (data.password !== data.confirmPassword) {
      toast.error("As senhas não coincidem.");
    }

    try {
      const response = await Axios("", {
        ...SummaryApi.register,
        data: data,
      });

      if (response.data.error) {
        toast.error(response.data.message);
      }

      if (response.data.success) {
        toast.success("Usuário cadastrado com sucesso.");
        setData({
          name: "",
          email: "",
          password: "",
          confirmPassword: "",
        });
      }
      navigate("/login");
    } catch (error) {
      AxiosToastError(error);
    }
  };
  return (
    <section className="container mx-auto w-full px-2">
      <div className="p7 mx-auto my-4 w-full max-w-lg rounded bg-white">
        <p>Formulário de cadastros</p>

        <form className="mt-6 grid gap-4" onSubmit={handleSubmit}>
          <div className="grid gap-1">
            <label htmlFor="name">Nome:</label>
            <input
              type="text"
              id="name"
              className="rounded border bg-blue-50 p-2 outline-none focus:border-amber-300"
              name="name"
              value={data.name}
              onChange={handleChange}
              placeholder="Digite seu email"
            />
          </div>
          <div className="grid gap-1">
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              className="rounded border bg-blue-50 p-2 outline-none focus:border-amber-300"
              name="email"
              value={data.email}
              onChange={handleChange}
              placeholder="Digite sua senha"
            />
          </div>
          <div className="grid gap-1">
            <label htmlFor="password">Senha:</label>
            <input
              type={showPassword ? "text" : "password"}
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
          </div>
          <div className="grid gap-1">
            <label htmlFor="confirmPassword">Confrimar Senha:</label>
            <input
              type="email"
              id="confirmPassword"
              className="rounded border bg-blue-50 p-2 outline-none focus:border-amber-300"
              name="confirmPassword"
              value=""
              onChange=""
              placeholder="Digite sua senha"
            />
            <div
              className="cursor-pointer"
              onClick={() => setShowConfirmPassword((preve) => !preve)}
            >
              {showConfirmPassword ? <FaRegEye /> : <FaRegEyeSlash />}
            </div>
          </div>
          <button
            className={`${valideValue ? "bg-amber-500 hover:bg-amber-600" : "rounded bg-amber-300 p-2 font-semibold"}`}
            disabled={!valideValue}
          >
            Cadastrar
          </button>
        </form>
        <p>
          Ja é cadastrado?{" "}
          <Link
            to={"/login"}
            className="font-semibold text-amber-300 hover:text-amber-400"
          >
            Entrar
          </Link>
        </p>
      </div>
    </section>
  );
};

export default Register;
