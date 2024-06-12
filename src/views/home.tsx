import { usePodcast } from "../hooks/usePodcast";

import "./App.css";
import { useState } from "react";

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

  const handlePodcast = (item: Podcast) => {
    console.log("redicrect");
  };
  return (
    <div>
      <h1>Podcaster</h1>
      <div>
        <form action="" onSubmit={(e) => e.preventDefault()}>
          <input type="text" value={keyword} onChange={(e) => changeInput(e)} />
          <button>send</button>
        </form>
      </div>
      {dataPodcast?.map((item, index) => (
        <div key={index} onClick={() => handlePodcast(item)}>
          <div>
            <div>
              <img src={item["im:image"][0].label} alt="" />
            </div>
            <h2>{item["im:name"].label}</h2>
            <p>Author:{item["im:artist"].label}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Home;
