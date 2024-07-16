import axios from "axios";
const url = "https://itunes.apple.com/lookup";
const instance = axios.create({
  baseURL: url,
});

export const getDetailEpisode = async (
  podcastId: string,
  episodeId: string
) => {
  try {
    let response = await instance.get(`?id=${podcastId}&episode=${episodeId}`);
    return response.data; //devuelve la respuesta
  } catch {
    (function (error: any) {
      throw error; //manejo de errores
    });
  }
};
