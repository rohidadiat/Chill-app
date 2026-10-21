import { doc, getDoc, setDoc, updateDoc } from "firebase/firestore";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { db, storage } from "./firebase";

const usersRef = (uid) => doc(db, "users", uid);

/** Upload foto ke Storage dan kembalikan download URL-nya. */
export async function uploadProfilePhoto(uid, file) {
  const ext = file.name.split(".").pop() || "jpg";
  const photoRef = ref(storage, `users/${uid}/profile.${ext}`);
  await uploadBytes(photoRef, file, { contentType: file.type });
  return getDownloadURL(photoRef);
}

export async function getUserProfile(uid) {
  const snap = await getDoc(usersRef(uid));
  return snap.exists() ? { id: snap.id, ...snap.data() } : null;
}

/** Buat dokumen users/{uid} jika belum ada. Jika sudah ada, kembalikan apa adanya. */
export async function ensureUserProfile(
  uid,
  { name = "", photoUrl = "" } = {},
) {
  const existing = await getUserProfile(uid);
  if (existing) return existing;

  const data = {
    name,
    photoUrl,
    isPremium: false,
    expiredPremium: "",
  };
  await setDoc(usersRef(uid), data);
  return { id: uid, ...data };
}

export async function updateUserProfile(uid, data) {
  await updateDoc(usersRef(uid), data);
  return getUserProfile(uid);
}
