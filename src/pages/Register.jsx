import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import AuthForm from "../components/AuthForm";
import "../styles/authentication.css";
import { validateUsername } from "../services/api";
import { useAuthStore } from "../store/useAuthStore";

const Register = () => {
  const navigate = useNavigate();

  const { register, loginGoogle, busy, error, clearError } = useAuthStore();

  const [form, setForm] = useState({
    username: "",
    password: "",
    confirmPassword: "",
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
      autoComplete: "new-password",
      minLength: 6,
    },
    {
      name: "confirmPassword",
      label: "Konfirmasi Kata Sandi",
      type: "password",
      placeholder: "Ulangi kata sandi",
      autoComplete: "new-password",
      minLength: 6,
    },
  ];

  const [localError, setLocalError] = useState(null);

  useEffect(() => {
    const message = localError || error;

    if (!message) return;

    Swal.fire({
      icon: "error",
      title: "Pendaftaran Gagal",
      text: message,
      confirmButtonText: "Coba Lagi",
      confirmButtonColor: "#4f46e5",
      background: "#181A1C",
      color: "#ffffff",
    }).then(() => {
      setLocalError(null);
      clearError();
    });
  }, [localError, error, clearError]);

  const onChange = (e) => {
    const { name, value } = e.target;

    setLocalError(null);
    clearError();

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    const usernameError = validateUsername(form.username);

    if (usernameError) {
      setLocalError(usernameError);
      return;
    }

    if (form.password.length < 6) {
      setLocalError("Password minimal 6 karakter.");
      return;
    }

    if (form.password !== form.confirmPassword) {
      setLocalError("Konfirmasi password tidak sama.");
      return;
    }

    const success = await register({
      username: form.username,
      password: form.password,
    });

    if (success) {
      navigate("/", { replace: true });
    }
  };

  const onGoogle = async () => {
    const success = await loginGoogle();

    if (success) {
      navigate("/", { replace: true });
    }
  };

  return (
    <div className="register-bg">
      <AuthForm
        title="Daftar"
        subtitle="Selamat datang!"
        fields={fields}
        form={form}
        onChange={onChange}
        onSubmit={onSubmit}
        onGoogle={onGoogle}
        busy={busy}
        clearError={clearError}
        buttonText="Daftar"
        bottomText="Sudah punya akun?"
        bottomLinkText="Masuk"
        bottomLinkHref="/login"
      />
    </div>
  );
};

export default Register;
