import React from "react";
import AuthForm from "../components/AuthForm";
import "../styles/authentication.css";

const Login = () => {
  const fields = [
    {
      name: "username",
      label: "Username",
      type: "text",
      placeholder: "Masukkan username",
    },
    {
      name: "password",
      label: "Kata Sandi",
      type: "password",
      placeholder: "Masukkan kata sandi",
    },
  ];

  return (
    <div className="login-bg">
      <AuthForm
        title="Masuk"
        subtitle="Selamat datang kembali"
        fields={fields}
        buttonText="Masuk"
        bottomText="Belum punya akun?"
        bottomLinkText="Daftar"
        bottomLinkHref="/register"
        forgotPassword={true}
      />
    </div>
  );
};

export default Login;
