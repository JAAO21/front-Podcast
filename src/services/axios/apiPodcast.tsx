import axios from "axios";
const url = "https://itunes.apple.com/us/rss/toppodcasts";
const instance = axios.create({
  baseURL: url,
});

export const getAllPodcast = async () => {
  try {
    let response = await instance.get("/limit=100/genre=1310/json");
    return response; //devuelve la respuesta
  } catch {
    (function (error: any) {
      throw error; //manejo de errores
    });
  }
};
