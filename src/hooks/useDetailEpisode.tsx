import { useEffect, useState } from "react";
import { getDetailEpisode } from "../services/axios/apiUseDetailEpisodes";
import { DetailEpisode } from "../layout/types/typeDetailEpisode";
import axios from "axios";

export const useDetailEpisode = (podcastId: string, episodeId: string) => {
  const [detailEpisode, setDetailEpisode] = useState<DetailEpisode | null>(
    null
  );
  const [description, setDescription] = useState<String>(
    "No description available."
  );
  const [description2, setDescription2] = useState<String>(
    "No description available."
  );
  const [audioDetailEpisode, setAudioDetailEpisode] = useState<
    string | undefined
  >(undefined);
  useEffect(() => {
    const apiUseDetailEpisodes = async () => {
      const apiDetailEpisodes = await getDetailEpisode(podcastId, episodeId);
      if (apiDetailEpisodes?.results[0]) {
        const feedUrl = apiDetailEpisodes.results[0].feedUrl.replace(
          "https://podcasts.apple.com",
          "/itunes-proxy"
        );

        try {
          const { data } = await axios.get(feedUrl);
          const parser = new DOMParser();
          const xmlDoc = parser.parseFromString(data, "text/xml");
          // Intentar obtener la descripción del elemento <p>
          const descriptionNode = xmlDoc.querySelector("channel > description");
          setDescription(
            descriptionNode?.textContent || "No description available."
          );

          const encodedContentNode = xmlDoc.querySelector(
            "channel > item > description"
          );

          if (encodedContentNode) {
            // Parsear el contenido de CDATA como HTML
            const encodedContent = encodedContentNode.textContent || "";
            const encodedDoc = parser.parseFromString(
              encodedContent,
              "text/html"
            );
            const contentText = Array.from(encodedDoc.body.childNodes)
              .map((node) =>
                node.nodeType === Node.TEXT_NODE
                  ? node.textContent
                  : (node as HTMLElement).innerText
              )
              .join(" ");
            setDescription2(contentText.trim() || "No description available.");
          }

          setDetailEpisode(apiDetailEpisodes.results[0] || null);

          const enclosureNode = xmlDoc.querySelector(
            "channel > item > enclosure"
          );
          if (enclosureNode) {
            const audioUrl = enclosureNode.getAttribute("url");
            setAudioDetailEpisode(audioUrl || undefined);
          }
        } catch (error) {
          console.error("Error fetching detail episode :", error);
        }
      } else {
        alert("Problem in the server");
      }
    };

    apiUseDetailEpisodes();
  }, [podcastId, episodeId]);

  return { detailEpisode, description, description2, audioDetailEpisode };
};
