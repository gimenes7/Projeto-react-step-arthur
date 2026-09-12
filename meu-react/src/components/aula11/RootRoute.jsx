import Home from "./Home";
import Registrar from "./Registrar";

const RootRoute = () => {
  const token = localStorage.getItem("token");
  return token ? <Home /> : <Registrar />;
};

export default RootRoute;
