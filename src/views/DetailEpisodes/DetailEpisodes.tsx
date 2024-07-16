import { useParams } from "react-router-dom";
import { useDetailEpisode } from "../../hooks/useDetailEpisode";
import "./main.css";
type Params = {
  idDetailPodcast: string;
  idDetailEpisodes: string;
};

const DetailEpisodes = () => {
  const { idDetailPodcast, idDetailEpisodes } = useParams<Params>();
  const paramIdDetailPodcast = idDetailPodcast || "",
    paramIdDetailEpisodes = idDetailEpisodes || "";
  const { detailEpisode, description, description2, audioDetailEpisode } =
    useDetailEpisode(paramIdDetailPodcast, paramIdDetailEpisodes); //traer por params
  const cleanText = description.replace(/<\/?p[^>]*>/g, "");

  if (!detailEpisode) {
    return <div>Loading...</div>;
  }
  return (
    <div className="containerDetailEpisodes">
      <div className="containerInfoDetailEpisode">
        <div>
          <img
            src={detailEpisode.artworkUrl600}
            alt={detailEpisode?.artistName || "imageEpisodes"}
          />
        </div>
        <div>
          <hr />
          <h2>{detailEpisode?.collectionName || "Uknow"}</h2>
          <p>by {detailEpisode?.artistName || "Title uknow"}</p>
        </div>
        <div>
          <hr />
          <h3>Description</h3>
          <p>{cleanText}</p>
        </div>
      </div>
      <div className="containerArtistDescriptionDetailEpisode">
        <h1>{detailEpisode?.artistName || "Artist Uknow"}</h1>
        <p>{description2}</p>

        <audio controls src={audioDetailEpisode}></audio>
      </div>
    </div>
  );
};

export default DetailEpisodes;
