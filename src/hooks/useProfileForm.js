import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { useAuthStore } from "../store/useAuthStore";

const alertOptions = {
  confirmButtonColor: "#09147A",
  background: "#111827",
  color: "#ffffff",
};

export function useProfileForm() {
  const profile = useAuthStore((state) => state.profile);
  const updateName = useAuthStore((state) => state.updateName);
  const updatePassword = useAuthStore((state) => state.updatePassword);

  const [name, setName] = useState(profile?.name || "");
  const [password, setPassword] = useState("");

  useEffect(() => {
    setName(profile?.name || "");
  }, [profile?.name]);

  const showError = (title, message) =>
    Swal.fire({
      icon: "error",
      title,
      text: message || "Terjadi kesalahan.",
      ...alertOptions,
    });

  const saveName = async ({ notify = false } = {}) => {
    const newName = name.trim();

    if (!newName) {
      if (notify) {
        await Swal.fire({
          icon: "warning",
          title: "Nama wajib diisi!",
          text: "Silakan masukkan nama pengguna.",
          ...alertOptions,
        });
      }
      return false;
    }

    if (newName === (profile?.name || "")) return true;

    const success = await updateName(newName);

    if (!success) {
      await showError("Gagal memperbarui nama", useAuthStore.getState().error);
      return false;
    }

    if (notify) {
      await Swal.fire({
        toast: true,
        position: "top",
        icon: "success",
        title: "Nama berhasil diperbarui",
        showConfirmButton: false,
        timer: 2000,
        ...alertOptions,
      });
    }

    return true;
  };

  const savePassword = async ({ notify = false } = {}) => {
    if (!password) return true;

    if (password.length < 6) {
      await Swal.fire({
        icon: "warning",
        title: "Password terlalu pendek",
        text: "Password minimal 6 karakter.",
        ...alertOptions,
      });
      return false;
    }

    const success = await updatePassword(password);

    if (!success) {
      await showError("Gagal mengubah password", useAuthStore.getState().error);
      return false;
    }

    setPassword("");

    if (notify) {
      await Swal.fire({
        toast: true,
        position: "top",
        icon: "success",
        title: "Password berhasil diperbarui",
        showConfirmButton: false,
        timer: 2000,
        ...alertOptions,
      });
    }

    return true;
  };

  const onSaveProfile = async (e) => {
    e.preventDefault();

    const newName = name.trim();
    const nameChanged = newName !== (profile?.name || "");
    const passwordChanged = password.length > 0;

    if (!newName) {
      await Swal.fire({
        icon: "warning",
        title: "Nama wajib diisi!",
        text: "Silakan masukkan nama pengguna terlebih dahulu.",
        ...alertOptions,
      });
      return;
    }

    if (!nameChanged && !passwordChanged) {
      await Swal.fire({
        icon: "info",
        title: "Tidak ada perubahan",
        text: "Silakan ubah nama atau password sebelum menyimpan.",
        ...alertOptions,
      });
      return;
    }

    if (passwordChanged && password.length < 6) {
      await Swal.fire({
        icon: "warning",
        title: "Password terlalu pendek",
        text: "Password minimal 6 karakter.",
        ...alertOptions,
      });
      return;
    }

    if (nameChanged) {
      const success = await updateName(newName);

      if (!success) {
        await showError(
          "Gagal memperbarui nama",
          useAuthStore.getState().error,
        );
        return;
      }
    }

    if (passwordChanged) {
      const success = await updatePassword(password);

      if (!success) {
        await showError(
          "Gagal memperbarui password",
          useAuthStore.getState().error,
        );
        return;
      }

      setPassword("");
    }

    await Swal.fire({
      icon: "success",
      title: "Berhasil!",
      text:
        nameChanged && passwordChanged
          ? "Nama dan password berhasil diperbarui."
          : nameChanged
            ? "Nama pengguna berhasil diperbarui."
            : "Password berhasil diperbarui.",
      ...alertOptions,
    });
  };

  const saveNameOnBlur = () => {
    if (window.innerWidth < 768) {
      return saveName({ notify: true });
    }
  };

  const savePasswordOnBlur = () => {
    if (window.innerWidth < 768) {
      return savePassword({ notify: true });
    }
  };

  return {
    name,
    setName,
    password,
    setPassword,
    onSaveProfile,
    saveNameOnBlur,
    savePasswordOnBlur,
  };
}
