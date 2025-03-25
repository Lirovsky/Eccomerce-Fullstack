import { useLocation } from "react-router-dom";
import React, { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Axios from "../utils/Axios";
import SummaryApi from "../common/SummaryApi";
import toast from "react-hot-toast";
import AxiosToastError from "../utils/AxiosToastError";

const OtpVerification = () => {
  const navigate = useNavigate();
  const [data, setData] = useState(["", "", "", "", "", ""]);
  const inputRef = useRef([]);
  const location = useLocation();

  const valideValue = data.every((el) => el);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await Axios("", {
        ...SummaryApi.forgot_password_otp_verification,
        data: {
          email: location?.state?.email,
          otp: data.join(""),
        },
      });

      if (response.data.error) {
        toast.error(response.data.message);
      }

      if (response.data.success) {
        toast.success(response.data.message);
        setData(["", "", "", "", "", ""]);
      }
      // navigate("/verification-otp");
    } catch (error) {
      AxiosToastError(error);
    }
  };

  useEffect(() => {
    if (!location?.state?.email) {
      navigate("/forgot-password");
    }
  }, []);

  return (
    <section className="container mx-auto w-full px-2">
      <div className="mx-auto my-4 w-full max-w-lg rounded bg-white p-7">
        <p>Formulário de recuperação</p>

        <form className="grid gap-4 py-6" onSubmit={handleSubmit}>
          <div className="grid gap-1">
            <label htmlFor="email">Digite seu código OTP:</label>

            <div className="flex items-center justify-between">
              {data.map((element, index) => {
                return (
                  <input
                    key={"otp" + index}
                    type="text"
                    id="otp"
                    ref={(ref) => {
                      inputRef.current[index] = ref;
                      return ref;
                    }}
                    value={data[index]}
                    onChange={(e) => {
                      const value = e.target.value;
                      const newData = [...data];
                      newData[index] = value;
                      setData(newData);
                      if (value && index < 5) {
                        inputRef.current[index + 1].focus();
                      }
                    }}
                    maxLength={1}
                    className="w-full max-w-16 rounded border border-amber-200 bg-amber-100 p-2 text-center font-semibold outline-none focus:border-amber-300"
                  />
                );
              })}
            </div>
          </div>

          <button
            className={`${valideValue ? "rounded bg-amber-300 p-2 font-semibold text-white" : "rounded bg-slate-400 p-2 font-semibold text-slate-200"}`}
            disabled={!valideValue}
          >
            Verificar OTP
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

export default OtpVerification;
