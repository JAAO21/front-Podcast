import { useState, useEffect } from "react";
import { Podcast } from "../layout/types/typePodcast";

interface Params {
  dataPodcast: Array<Podcast>;
  copyData: Array<Podcast>;
  setDataPodcast: Function;
}

export const useSeacrhCountPodcast = ({
  dataPodcast,
  copyData,
  setDataPodcast,
}: Params) => {
  const [keyword, setKeyword] = useState("");
  const [countPodcast, setCountPodcast] = useState<number | 0>(0);
  const [previousWord, setPreviousWord] = useState<String>("");

  useEffect(() => {
    setCountPodcast(dataPodcast.length);
    if (!keyword && previousWord?.length > 0) {
      setKeyword("");
      setPreviousWord("");
      setDataPodcast(copyData);
    }
  }, [dataPodcast, previousWord]);

  return { countPodcast, keyword, setKeyword, setPreviousWord };
};
