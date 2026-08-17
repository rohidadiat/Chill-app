import React from "react";
import AuthForm from "../components/AuthForm";
import "../styles/authentication.css";

const Register = () => {
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
    {
      name: "confirmPassword",
      label: "Konfirmasi Kata Sandi",
      type: "password",
      placeholder: "Masukkan kata sandi",
    },
  ];
  return (
    <div className="register-bg">
      <AuthForm
        title="Daftar"
        subtitle="Selamat datang!"
        fields={fields}
        buttonText="Daftar"
        bottomText="Sudah punya akun?"
        bottomLinkText="Masuk"
        bottomLinkHref="/login"
      />
    </div>
  );
};
export default Register;
