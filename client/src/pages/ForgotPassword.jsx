import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Axios from "../utils/Axios";
import SummaryApi from "../common/SummaryApi";
import toast from "react-hot-toast";
import AxiosToastError from "../utils/AxiosToastError";

const ForgotPassword = () => {
  const navigate = useNavigate();
  const [data, setData] = useState({
    email: "",
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
        ...SummaryApi.forgot_password,
        data: data,
      });

      if (response.data.error) {
        toast.error(response.data.message);
      }

      if (response.data.success) {
        toast.success(response.data.message);
        navigate("/verification-otp", {
          state: data,
        });
        setData({
          email: "",
        });
      }
    } catch (error) {
      AxiosToastError(error);
    }
  };
  return (
    <section className="container mx-auto w-full px-2">
      <div className="mx-auto my-4 w-full max-w-lg rounded bg-white p-7">
        <p>Recuperar senha</p>

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

          <button
            className={`${valideValue ? "bg-amber-500 hover:bg-amber-600" : "rounded bg-amber-300 p-2 font-semibold"}`}
            disabled={!valideValue}
          >
            Enviar OTP
          </button>
        </form>
        <p>
          Já é cadastrado?{" "}
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

export default ForgotPassword;
