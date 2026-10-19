import { create } from "zustand";
import { onAuthStateChanged } from "firebase/auth";
import {
  auth,
  ensureUserProfile,
  loginWithUsername,
  loginWithGoogle,
  logout,
  registerWithUsername,
  updateUserProfile,
  uploadProfilePhoto,
} from "../services/api";

const errorMessage = (err) => {
  const map = {
    "auth/invalid-credential": "Username atau password salah.",
    "auth/user-not-found": "Akun tidak ditemukan.",
    "auth/wrong-password": "Username atau password salah.",
    "auth/email-already-in-use": "Username sudah dipakai. Pilih username lain.",
    "auth/weak-password": "Password minimal 6 karakter.",
    "auth/invalid-email": "Format username tidak valid.",
    "auth/popup-closed-by-user": "Login dengan Google dibatalkan.",
    "auth/too-many-requests": "Terlalu banyak percobaan. Coba lagi nanti.",
  };
  return map[err?.code] || err?.message || "Terjadi kesalahan.";
};

export const useAuthStore = create((set, get) => ({
  user: null,
  profile: null,
  initializing: true,
  busy: false,
  error: null,

  init: () =>
    onAuthStateChanged(auth, async (fbUser) => {
      if (!fbUser) {
        set({ user: null, profile: null, initializing: false });
        return;
      }

      if (get().busy) return;

      const profile = await ensureUserProfile(fbUser.uid, {
        name: fbUser.displayName || "",
        photoUrl: fbUser.photoURL || "",
      });
      set({
        user: { uid: fbUser.uid, email: fbUser.email },
        profile,
        initializing: false,
      });
    }),

  _run: async (fn) => {
    set({ busy: true, error: null });
    try {
      const { user, profile } = await fn();
      set({ user: { uid: user.uid, email: user.email }, profile });
      return true;
    } catch (err) {
      set({ error: errorMessage(err) });
      return false;
    } finally {
      set({ busy: false });
    }
  },

  register: (data) => get()._run(() => registerWithUsername(data)),
  login: (data) => get()._run(() => loginWithUsername(data)),
  loginGoogle: () => get()._run(() => loginWithGoogle()),

  updateName: async (name) => {
    const { user } = get();
    if (!user) return false;
    set({ busy: true, error: null });
    try {
      const profile = await updateUserProfile(user.uid, { name: name.trim() });
      set({ profile });
      return true;
    } catch (err) {
      set({ error: errorMessage(err) });
      return false;
    } finally {
      set({ busy: false });
    }
  },

  updatePhoto: async (file) => {
    const { user } = get();
    if (!user) return;
    set({ busy: true, error: null });
    try {
      const photoUrl = await uploadProfilePhoto(user.uid, file);
      const profile = await updateUserProfile(user.uid, { photoUrl });
      set({ profile });
    } catch (err) {
      set({ error: errorMessage(err) });
    } finally {
      set({ busy: false });
    }
  },

  logout: async () => {
    await logout();
    set({ user: null, profile: null, error: null });
  },

  clearError: () => set({ error: null }),
}));
