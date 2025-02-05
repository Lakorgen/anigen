import axios from "axios";

const instance = axios.create({
  baseURL: "https://shikimori.one/api/",
  // withCredentials: true,
});

export const animeAPI = {
  getAllAnimes(status, page) {
    return instance.get(
      `animes?order=ranked&status=${status}&limit=30&page=${page}`
    );
  },
  getAnimeById(id) {
    return instance.get(`https://shikimori.one/api/animes/${id}`);
  },
  getPopularAnime() {
    return instance.get(
      "animes?order=ranked&status=ongoing&limit=10"
    );
  },
  getSimilarAnime(id) {
    return instance.get(
      `https://shikimori.one/api/animes/${id}/similar?limit=10`
    );
  },
  getSearchAnime(search) {
    return instance.get(
      `https://shikimori.one/api/animes/?search=${search}&limit=50&order=ranked`
    );
  },
};
