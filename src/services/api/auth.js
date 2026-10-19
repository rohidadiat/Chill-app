import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import { auth, googleProvider } from "./firebase";
import { ensureUserProfile } from "./users";

const USERNAME_DOMAIN = import.meta.env.VITE_USERNAME_DOMAIN;

export const usernameToEmail = (identifier = "") => {
  const value = identifier.trim().toLowerCase();

  if (!value) {
    throw new Error("Username atau email wajib diisi.");
  }

  if (value.includes("@")) {
    return value;
  }

  return `${value}@${USERNAME_DOMAIN}`;
};

export const emailToUsername = (email = "") => {
  const value = email.trim().toLowerCase();
  const suffix = `@${USERNAME_DOMAIN.toLowerCase()}`;

  return value.endsWith(suffix) ? value.slice(0, -suffix.length) : value;
};

export function validateUsername(value = "") {
  const input = value.trim();

  if (!input) {
    return "Username atau email wajib diisi.";
  }

  // Izinkan email asli maupun email virtual aplikasi.
  if (input.includes("@")) {
    const email = input.toLowerCase();
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailPattern.test(email)) {
      return "Format email tidak valid.";
    }

    return null;
  }

  const usernamePattern = /^[a-zA-Z0-9_]{3,20}$/;

  if (!usernamePattern.test(input)) {
    return "Username harus terdiri dari 3–20 karakter, berupa huruf, angka, atau garis bawah.";
  }

  return null;
}

export async function registerWithUsername({ username, password }) {
  const { user } = await createUserWithEmailAndPassword(
    auth,
    usernameToEmail(username),
    password,
  );
  const profile = await ensureUserProfile(user.uid, { name: "", photoUrl: "" });
  return { user, profile };
}

export async function loginWithUsername({ username, password }) {
  const identifier = username.trim();

  const email = usernameToEmail(identifier);

  const { user } = await signInWithEmailAndPassword(auth, email, password);

  const profile = await ensureUserProfile(user.uid, {
    name: user.displayName || "",
    photoUrl: user.photoURL || "",
  });

  return { user, profile };
}

export async function loginWithGoogle() {
  const { user } = await signInWithPopup(auth, googleProvider);
  const profile = await ensureUserProfile(user.uid, {
    name: user.displayName || "",
    photoUrl: user.photoURL || "",
  });
  return { user, profile };
}

export function logout() {
  return signOut(auth);
}
