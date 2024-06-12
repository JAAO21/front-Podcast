import { useParams } from "react-router-dom";
type Params = {
  ref: string;
};
const detailPodcast = () => {
  const { ref } = useParams<Params>();
  console.log(ref);
  return <div></div>;
};

export default detailPodcast;
