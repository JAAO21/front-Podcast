import { useState, useEffect } from "react";
import { getAllPodcast } from "../services/axios/apiPodcast";

export const usePodcast = () => {
  const [dataPodcast, setDataPodcast] = useState([]);
  const [copyData, setCopyData] = useState([]);
  useEffect(() => {
    const useApi = async () => {
      const data = await getAllPodcast;
    };
    useApi();
  });
  return { dataPodcast };
};
