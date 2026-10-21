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
  updateUserPassword,
} from "../services/api";

import {
  getUserPlaylists,
  updatePlaylistProgress,
  deletePlaylist,
} from "../services/api/playlistService";

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
    "auth/requires-recent-login":
      "Silakan login ulang sebelum mengganti password.",
  };

  return map[err?.code] || err?.message || "Terjadi kesalahan.";
};

export const useAuthStore = create((set, get) => ({
  user: null,
  profile: null,
  initializing: true,
  busy: false,
  error: null,

  myplaylist: [],
  playlistLoading: false,
  playlistError: null,

  fetchMyPlaylist: async () => {
    const uid = get().user?.uid;

    if (!uid) {
      set({
        myplaylist: [],
        playlistLoading: false,
        playlistError: null,
      });
      return [];
    }

    set({
      playlistLoading: true,
      playlistError: null,
    });

    try {
      const data = await getUserPlaylists(uid);

      // Pastikan user belum berganti
      if (get().user?.uid !== uid) return [];

      set({
        myplaylist: Array.isArray(data) ? data : [],
        playlistError: null,
      });

      return Array.isArray(data) ? data : [];
    } catch (err) {
      // Jika endpoint tidak ditemukan, kosongkan playlist
      if (err.response?.status === 404) {
        if (get().user?.uid === uid) {
          set({
            myplaylist: [],
            playlistError: null,
          });
        }

        return [];
      }

      // Tangani error lainnya
      if (get().user?.uid === uid) {
        set({
          myplaylist: [],
          playlistError: err.message || "Gagal mengambil playlist.",
        });
      }

      return [];
    } finally {
      if (get().user?.uid === uid) {
        set({ playlistLoading: false });
      }
    }
  },

  // Sinkronisasi status login Firebase
  init: () =>
    onAuthStateChanged(auth, async (fbUser) => {
      if (!fbUser) {
        set({
          user: null,
          profile: null,
          myplaylist: [],
          playlistLoading: false,
          playlistError: null,
          initializing: false,
        });
        return;
      }

      if (get().busy) return;

      try {
        const profile = await ensureUserProfile(fbUser.uid, {
          name: fbUser.displayName || "",
          photoUrl: fbUser.photoURL || "",
        });

        set({
          user: {
            uid: fbUser.uid,
            email: fbUser.email,
          },
          profile,
          initializing: false,
        });

        // Ambil playlist setelah user Firebase tersedia
        await get().fetchMyPlaylist();
      } catch (err) {
        set({
          initializing: false,
          playlistError: err.message || "Gagal memuat data pengguna.",
        });
      }
    }),

  _run: async (fn) => {
    set({ busy: true, error: null });

    try {
      const { user, profile } = await fn();

      set({
        user: {
          uid: user.uid,
          email: user.email,
        },
        profile,
      });

      // Ambil playlist setelah login berhasil
      await get().fetchMyPlaylist();

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
      const profile = await updateUserProfile(user.uid, {
        name: name.trim(),
      });

      set({ profile });
      return true;
    } catch (err) {
      set({ error: errorMessage(err) });
      return false;
    } finally {
      set({ busy: false });
    }
  },

  updatePassword: async (newPassword) => {
    set({ busy: true, error: null });

    try {
      await updateUserPassword(newPassword);
      return true;
    } catch (err) {
      set({ error: errorMessage(err) });
      return false;
    } finally {
      set({ busy: false });
    }
  },

  // Update progres di server dan global state
  updateMyPlaylistProgress: async (playlistId, progres) => {
    try {
      const updated = await updatePlaylistProgress(playlistId, progres);

      set((state) => ({
        myplaylist: state.myplaylist.map((movie) =>
          movie.playlistId === playlistId
            ? {
                ...movie,
                progres: updated.progres,
              }
            : movie,
        ),
      }));

      return true;
    } catch (err) {
      set({ playlistError: errorMessage(err) });
      return false;
    }
  },

  // Hapus playlist dari server dan global state
  deleteMyPlaylist: async (playlistId) => {
    try {
      await deletePlaylist(playlistId);

      set((state) => ({
        myplaylist: state.myplaylist.filter(
          (movie) => movie.playlistId !== playlistId,
        ),
        playlistError: null,
      }));

      return true;
    } catch (err) {
      set({ playlistError: errorMessage(err) });
      return false;
    }
  },

  logout: async () => {
    try {
      await logout();

      set({
        user: null,
        profile: null,
        myplaylist: [],
        playlistLoading: false,
        playlistError: null,
        error: null,
      });
    } catch (err) {
      set({ error: errorMessage(err) });
    }
  },

  clearError: () => set({ error: null }),

  clearPlaylistError: () => set({ playlistError: null }),
}));
