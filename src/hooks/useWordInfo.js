import { useEffect, useState } from "react";

function useWordInfo(wordToSearch) {
  const [data, setData] = useState({});
  useEffect(() => {
    const URL = `https://api.dictionaryapi.dev/api/v2/entries/en/${wordToSearch}`;
    fetch(URL)
      .then((res) => res.json())
      .then((res) => setData(res));
  }, [wordToSearch]);
  return data;
}

export default useWordInfo;
