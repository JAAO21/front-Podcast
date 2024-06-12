import { useState, useEffect } from "react";
import { useLoading } from "./useLoading";
import { getAllPodcast } from "../services/axios/apiPodcast";

interface Podcast {
  category: {
    attributes: any;
  };
  id: {
    label: string;
    attributes: any;
  };
  "im:artist": {
    label: string;
    attributes: any;
  };
  "im:contentType": {
    attributes: any;
  };
  "im:image": {
    label: string;
  }[];
  "im:name": {
    label: string;
  };
  "im:price": {
    label: string;
    attributes: any;
  };
  "im:releaseDate": {
    label: string;
    attributes: any;
  };
  link: {
    attributes: any;
  };
  rights: {
    label: string;
  };
  summary: {
    label: string;
  };
  title: {
    label: string;
  };
}

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
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    useApi();
  }, []);
  return { dataPodcast, copyData, setDataPodcast, loading };
};
