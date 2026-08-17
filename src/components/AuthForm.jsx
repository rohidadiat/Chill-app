import React, { useState } from "react";
import google from "../assets/icon/Google-logo.svg";
import logo from "../assets/icon/Logo.png";
import { Eye, EyeOff } from "lucide-react";

const AuthForm = ({
  title,
  subtitle,
  fields,
  buttonText,
  bottomText,
  bottomLinkText,
  bottomLinkHref = "#",
  forgotPassword = false,
}) => {
  const [showPassword, setShowPassword] = useState({});
  const togglePassword = (fieldName) => {
    setShowPassword((prev) => ({ ...prev, [fieldName]: !prev[fieldName] }));
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-[#181A1C]/84 p-10 rounded-2xl text-center text-white">
        <img src={logo} alt="chill" className="w-35 max-w-full mx-auto mb-5" />
        <h2 className="m-0 text-xl md:text-2xl font-bold">{title}</h2>

        <p className="text-xs md:text-base mt-2">{subtitle}</p>

        <form className="mt-5">
          {fields.map((field) => (
            <div key={field.name}>
              <label className="block mt-3 mb-2 text-base md:text-lg text-left">
                {field.label}
              </label>

              <div className="relative">
                <input
                  name={field.name}
                  type={
                    field.type === "password"
                      ? showPassword[field.name]
                        ? "text"
                        : "password"
                      : field.type
                  }
                  placeholder={field.placeholder}
                  className="
                  w-full h-10 md:h-12 rounded-full
                  border border-[#E7E3FC]/20
                  bg-transparent
                  text-white
                  px-5 pr-12
                  outline-none
                  placeholder:text-[#E7E3FC]/70
                  placeholder:text-base
                  focus:border-[#E7E3FC]/50
                "
                />

                {field.type === "password" && (
                  <button
                    type="button"
                    onClick={() => togglePassword(field.name)}
                    className="
                    absolute right-5 top-1/2
                    -translate-y-1/2
                    text-[#E7E3FC]/40
                    cursor-pointer
                  "
                  >
                    {showPassword[field.name] ? (
                      <EyeOff size={20} />
                    ) : (
                      <Eye size={20} />
                    )}
                  </button>
                )}
              </div>
            </div>
          ))}

          <div className="flex justify-between mt-3 mb-6 text-xs md:text-base">
            {bottomText && (
              <div className="text-[#C1C2C4]/90">
                {bottomText}

                {bottomLinkText && (
                  <a
                    href={bottomLinkHref}
                    className="ms-1 text-white hover:text-white/70"
                  >
                    {bottomLinkText}
                  </a>
                )}
              </div>
            )}

            {forgotPassword && (
              <a
                href="/forgot-password"
                className="text-white hover:text-white/70"
              >
                Lupa password?
              </a>
            )}
          </div>

          <button
            type="submit"
            className="
            w-full h-12 rounded-full
            bg-[#3D4142]
            border border-[#E7E3FC]/20
            text-[#E7E3FC]/85
            text-base font-semibold
            cursor-pointer
            hover:bg-[#181A1C]
            transition
          "
          >
            {buttonText}
          </button>

          <div
            className="
            my-2
            text-[#E7E3FC]/40
            text-sm
            text-center
          "
          >
            atau
          </div>

          <button
            type="button"
            className="
            w-full h-12 rounded-full
            border border-[#E7E3FC]/20
            bg-transparent
            text-white
            flex items-center justify-center
            gap-5
            text-base
            cursor-pointer
            hover:bg-white/5
            transition
          "
          >
            <img src={google} alt="Google" className="w-4" />
            {title} dengan Google
          </button>
        </form>
      </div>
    </div>
  );
};

export default AuthForm;
