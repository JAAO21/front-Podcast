import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useDetailPodcast } from "../../hooks/useDetailPodcast";
import "./main.css";
import { useState } from "react";

type Params = {
  ref: string;
};

const detailPodcast = () => {
  const { ref } = useParams<Params>();
  const navigate = useNavigate();
  const idDetailPodcast = ref || "";
  const { dataDetailPodcast, description, episodes } =
    useDetailPodcast(idDetailPodcast);
  const itemsPage = 10;
  const maxPageButtons = 7; // Máximo de botones visibles
  const [currentPage, setCurrentPage] = useState(1);

  const indexOfLastItem = itemsPage * currentPage;
  const indexOfFirstItem = indexOfLastItem - itemsPage;
  const currentItems = episodes?.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(episodes.length / itemsPage);

  const getVisiblePageNumbers = () => {
    const pages = [];
    const halfMaxButtons = Math.floor(maxPageButtons / 2);

    let startPage = Math.max(1, currentPage - halfMaxButtons);
    let endPage = Math.min(totalPages, currentPage + halfMaxButtons);

    if (currentPage <= halfMaxButtons) {
      endPage = Math.min(totalPages, maxPageButtons);
    } else if (currentPage + halfMaxButtons >= totalPages) {
      startPage = Math.max(1, totalPages - maxPageButtons + 1);
    }

    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }

    return pages;
  };

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setCurrentPage(Number(event.currentTarget.id));
  };

  const visiblePageNumbers = getVisiblePageNumbers();

  const handleDetailEpisode = (
    e: React.MouseEvent<HTMLTableDataCellElement>,
    item: number
  ) => {
    e.preventDefault();
    navigate(`/detailPodcast/${idDetailPodcast}/detailEpisodes/${item}`); //enviar params detailID y deltailPodcast
  };
  return (
    <div>
      <h1 className="h1Podcaster">Podcaster</h1>
      <hr />
      <div className="containerDetailPodcast">
        <div className="containerInfoDetilPodcast">
          <div className="containerImgInfoDetailPodcast">
            <img src={dataDetailPodcast?.artworkUrl600} alt="img" />
          </div>
          <div className="conatinerNameDetailPodcast">
            <hr />
            <h2>{dataDetailPodcast?.trackCensoredName}</h2>
            <p>{dataDetailPodcast?.artistName}</p>
          </div>

          <div className="containerDescriptionDetailPodcast">
            <hr />
            <h3>Description</h3>
            <p>{description}</p>
          </div>
        </div>
        <div className="containerTablaEpisodesDetailPodcast">
          <div className="contaierEpisodesDetailPodcast">
            <p>Episodes: {dataDetailPodcast?.trackCount}</p>
          </div>
          <div>
            <table className="styled-table">
              <thead>
                <tr>
                  <th>Title</th>
                  <th>Date</th>
                  <th>Duration</th>
                </tr>
              </thead>
              <tbody>
                {currentItems?.map((item, index) => (
                  <tr key={index}>
                    <td onClick={(e) => handleDetailEpisode(e, index)}>
                      {item.title}
                    </td>
                    <td>{new Date(item.pubDate).toLocaleDateString()}</td>
                    <td>{item.duration}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="containerPaginationDetailPodcast">
              {visiblePageNumbers.map((number, index) => (
                <button
                  key={index}
                  id={number.toString()}
                  onClick={handleClick}
                  className={currentPage === number ? "active" : ""}
                >
                  {number}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default detailPodcast;
