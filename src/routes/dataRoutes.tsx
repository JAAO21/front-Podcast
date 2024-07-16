import { Home, DetailPodcast, NotFound, DetailEpisodes } from "../views";

const PATH_ROUTES = {
  home: "/home",
  detailPodcasat: "/detailPodcasat/:ref",
  detailEpisodes:
    "/detailPodcast/:idDetailPodcast/detailEpisodes/:idDetailEpisodes",
};

export const routesData = [
  {
    path: PATH_ROUTES.home,
    element: <Home />,
  },
  {
    path: PATH_ROUTES.detailPodcasat,
    element: <DetailPodcast />,
  },
  {
    path: "*",
    element: <NotFound />,
  },
  {
    path: PATH_ROUTES.detailEpisodes,
    element: <DetailEpisodes />,
  },
];
