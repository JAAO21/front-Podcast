import { useState, useEffect } from "react";
import { useLoading } from "./useLoading";
import { getAllPodcast } from "../services/axios/apiPodcast";
import { Podcast } from "../layout/types/typePodcast";

export const usePodcast = () => {
  const [dataPodcast, setDataPodcast] = useState<Podcast[]>([]);
  const [copyData, setCopyData] = useState<Podcast[]>([]);
  const { loading, setLoading } = useLoading();

  useEffect(() => {
    const useApi = async () => {
      try {
        setLoading(true);
        const data = await getAllPodcast();
        if (data && data.status === 200) {
          setDataPodcast(data.data.feed.entry);
          setCopyData(data.data.feed.entry);
        }
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    useApi();
  }, []);
  return { dataPodcast, copyData, setDataPodcast, loading };
};
