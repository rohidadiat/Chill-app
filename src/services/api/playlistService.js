import api from "./api";
import { movies } from "../../data/movies";

export const getUserPlaylists = async (uid) => {
  if (!uid) return [];

  try {
    const response = await api.get("/playlist", {
      params: { uid: uid },
    });

    const playlists = Array.isArray(response.data) ? response.data : [];

    return playlists
      .map((playlist) => {
        // Cocokkan movieId dari kedua sumber data
        const movie = movies.find(
          (item) => String(item.movieId) === String(playlist.movieId),
        );

        if (!movie) return null;

        return {
          ...movie,
          playlistId: playlist.id,
          iduser: playlist.iduser,
          movieId: playlist.movieId,
          progres: Number(playlist.progres) || 0,
        };
      })
      .filter(Boolean);
  } catch (error) {
    if (error.response?.status === 404) {
      return [];
    }

    throw error;
  }
};

export const updatePlaylistProgress = async (playlistId, progres) => {
  if (!playlistId) {
    throw new Error("ID playlist tidak ditemukan.");
  }

  if (
    typeof progres !== "number" ||
    !Number.isFinite(progres) ||
    progres < 0 ||
    progres > 100
  ) {
    throw new Error("Progres harus berupa angka 0–100.");
  }

  const response = await api.patch(
    `/playlist/${encodeURIComponent(playlistId)}`,
    { progres },
  );

  return response.data;
};

export const deletePlaylist = async (playlistId) => {
  if (!playlistId) {
    throw new Error("ID playlist tidak ditemukan.");
  }

  await api.delete(`/playlist/${encodeURIComponent(playlistId)}`);

  return playlistId;
};
