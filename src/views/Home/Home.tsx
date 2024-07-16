import { useNavigate } from "react-router-dom";
import { usePodcast } from "../../hooks/usePodcast";
import { useSeacrhCountPodcast } from "../../hooks/useSeacrhCountPodcast";
import { Podcast } from "../../layout/types/typePodcast";

import "./main.css";
const Home = () => {
  const { copyData, dataPodcast, setDataPodcast } = usePodcast();
  const { countPodcast, keyword, setKeyword, setPreviousWord } =
    useSeacrhCountPodcast({ dataPodcast, copyData, setDataPodcast });

  const navigate = useNavigate();

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
      setPreviousWord(keyword);
    }
  };

  const handlePodcast = (item: Podcast) => {
    navigate(`/detailPodcasat/${item.id.attributes["im:id"]}`);
  };

  return (
    <div className="containerPodcaster">
      <p className="pPodcaster">Podcaster</p>
      <hr />
      <div className="containerPodcasterSearch">
        <p className="pCountPodcast">{countPodcast}</p>
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
              <img src={item["im:image"][2].label} alt="" />
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
