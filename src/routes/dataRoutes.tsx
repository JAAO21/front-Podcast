import { Home, DetailPodcast, NotFound } from "../views";

const PATH_ROUTES = {
  home: "/home",
  detailPodcasat: "/detailPodcasat/:ref",
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
];
