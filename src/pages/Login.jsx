import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import AuthForm from "../components/AuthForm";
import { useAuthStore } from "../store/useAuthStore";
import Swal from "sweetalert2";

import "../styles/authentication.css";
const Login = () => {
  const navigate = useNavigate();

  const { login, loginGoogle, busy, error, clearError } = useAuthStore();

  const [form, setForm] = useState({
    username: "",
    password: "",
  });

  const fields = [
    {
      name: "username",
      label: "Username",
      type: "text",
      placeholder: "Masukkan username",
      autoComplete: "username",
      autoCapitalize: "none",
    },
    {
      name: "password",
      label: "Kata Sandi",
      type: "password",
      placeholder: "Masukkan kata sandi",
      autoComplete: "current-password",
    },
  ];

  useEffect(() => {
    if (error) {
      Swal.fire({
        icon: "error",
        title: "Login Gagal",
        text: error,
        confirmButtonText: "Coba Lagi",
        confirmButtonColor: "#4f46e5",
        background: "#181A1C",
        color: "#ffffff",
      });

      clearError();
    }
  }, [error, clearError]);

  const onChange = (e) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    if (await login(form)) {
      navigate("/", { replace: true });
    }
  };

  const onGoogle = async () => {
    if (await loginGoogle()) {
      navigate("/", { replace: true });
    }
  };

  return (
    <div className="login-bg">
      <AuthForm
        title="Masuk"
        subtitle="Selamat datang kembali"
        fields={fields}
        form={form}
        onChange={onChange}
        onSubmit={onSubmit}
        onGoogle={onGoogle}
        busy={busy}
        error={error}
        clearError={clearError}
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
