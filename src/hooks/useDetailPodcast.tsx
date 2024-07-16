import { useEffect, useState } from "react";
import { useLoading } from "./useLoading";
import { getDetailPodcast } from "../services/axios/apiDetailPodcast";
import { PodcastDetail } from "../layout/types/typeDetailPodcast";
import axios from "axios";

export interface Episode {
  id: string;
  title: string;
  pubDate: string;
  duration: string;
}

export const useDetailPodcast = (idDetailPodcast: string) => {
  const [dataDetailPodcast, setDataDetailPodcast] =
    useState<PodcastDetail | null>(null);
  const [description, setDescription] = useState<string | null>(null);
  const [episodes, setEpisodes] = useState<Episode[]>([]);
  const { loading, setLoading } = useLoading();
  useEffect(() => {
    const apiDetailPodcast = async () => {
      try {
        setLoading(false);
        const apiDetail = await getDetailPodcast(idDetailPodcast);
        if (apiDetail?.status === 200) {
          const podcastDetail: PodcastDetail = apiDetail.data.results[0];
          setDataDetailPodcast(podcastDetail);
          const feedResponse = await axios.get(podcastDetail.feedUrl);
          const parser = new DOMParser();
          const xmlDoc = parser.parseFromString(feedResponse.data, "text/xml");
          const descriptionNode = xmlDoc.querySelector("description");
          const items = xmlDoc.querySelectorAll("item");
          if (descriptionNode) {
            setDescription(descriptionNode.textContent);
          }
          if (items) {
            const episodesList: Episode[] = Array.from(items).map(
              (item, index) => ({
                id: index.toString(),
                title: item.querySelector("title")?.textContent || "No Title",
                pubDate:
                  item.querySelector("pubDate")?.textContent || "No Date",
                duration:
                  item.querySelector("itunes\\:duration")?.textContent ||
                  "No Duration",
              })
            );
            setEpisodes(episodesList);
          }
        } else {
          alert("error en el servidor");
        }
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(true);
      }
    };
    apiDetailPodcast();
  }, []);

  return { loading, dataDetailPodcast, description, episodes };
};
