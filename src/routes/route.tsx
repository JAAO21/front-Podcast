import { Routes, Route } from "react-router-dom";
import { routesData } from "./dataRoutes";
const RouterNav = () => {
  return (
    <Routes>
      {routesData.map(({ path, element }) => (
        <Route key={path} path={path} element={element} />
      ))}
    </Routes>
  );
};

export default RouterNav;
