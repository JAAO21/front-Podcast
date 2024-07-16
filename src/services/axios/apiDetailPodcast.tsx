import axios from "axios";
const url = "https://itunes.apple.com/lookup";
const instance = axios.create({
  baseURL: url,
});

export const getDetailPodcast = async (podcastId: string) => {
  try {
    let response = await instance.get(`?id=${podcastId}`);
    return response; //devuelve la respuesta
  } catch {
    (function (error: any) {
      throw error; //manejo de errores
    });
  }
};
