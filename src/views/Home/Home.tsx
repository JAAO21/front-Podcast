import { useState } from "react";
import { usePodcast } from "../../hooks/usePodcast";

import { PodcastType } from "./type";

import "./main.css";
const Home = () => {
  const [keyword, setKeyword] = useState("");
  const { copyData, dataPodcast, setDataPodcast } = usePodcast();

  const changeInput = (e: any) => {
    e.preventDefault();
    setKeyword(e.target.value);

    searchTitleArtist(e.target.value);
  };

  const searchTitleArtist = (value: String) => {
    const valueToLowecase = value.toLocaleLowerCase();
    const seacrhTitle = dataPodcast.filter((item) => {
      const title = item["im:name"].label.toLocaleLowerCase();
      const artist = item["im:artist"].label.toLocaleLowerCase();
      return (
        title.includes(valueToLowecase) || artist.includes(valueToLowecase)
      );
    });
    if (!seacrhTitle || seacrhTitle.length === 0) {
      alert("no se encontro la informacion");
      setDataPodcast(copyData);
      setKeyword("");
    } else {
      setDataPodcast(seacrhTitle);
    }
  };

  const handlePodcast = (item: PodcastType) => {
    console.log("redicrect", item.id);
  };
  return (
    <div className="containerPodcaster">
      <p className="pPodcaster">Podcaster</p>

      <div className="containerPodcasterSearch">
        <form action="" onSubmit={(e) => e.preventDefault()}>
          <input
            type="text"
            placeholder="Filter podcast"
            value={keyword}
            onChange={(e) => changeInput(e)}
          />
        </form>
      </div>
      <div className="containerDataPodcast">
        {dataPodcast?.map((item, index) => (
          <div
            key={index}
            onClick={() => handlePodcast(item)}
            className="contaierPodcastInfo"
          >
            <div>
              <img src={item["im:image"][0].label} alt="" />
            </div>
            <h2>{item["im:name"].label}</h2>
            <p>Author:{item["im:artist"].label}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
