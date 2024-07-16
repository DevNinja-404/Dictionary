import { useState, useEffect } from "react";
import { SearchResult, SearchWord, WordList } from "./components";
import { useDispatch, useSelector } from "react-redux";
import { loadWord } from "./features/wordSlice";

function App() {
  const words = useSelector((state) => state.words);
  const [wordToSearch, setWordToSearch] = useState("");
  const dispatch = useDispatch();

  useEffect(() => {
    const wordsFromLS = JSON.parse(localStorage.getItem("words"));
    if (wordsFromLS && wordsFromLS.length > 0) {
      dispatch(loadWord(wordsFromLS));
    }
  }, [dispatch]);

  useEffect(() => {
    localStorage.setItem("words", JSON.stringify(words));
  }, [words]);

  return (
    <>
      <div className="w-full lg:h-screen  flex flex-col lg:flex-row lg:justify-center">
        <div className="w-full lg:w-3/4 px-3 lg:px-10 py-4 flex flex-col gap-y-8">
          <SearchWord setWordToSearch={setWordToSearch} />
          {wordToSearch && <SearchResult wordToSearch={wordToSearch} />}
        </div>
        <div className="w-full lg:w-1/4 px-10 py-4 flex justify-center">
          <div className="w-full shadow-2xl shadow-black flex flex-col items-center py-10  gap-y-3 px-4 ">
            <h1 className="w-full text-amber-500 text-center font-serif font-semibold text-2xl">
              Bookmarked Words
            </h1>
            <div className=" w-11/12 lg:w-full flex flex-col items-center gap-y-3 px-4 overflow-y-auto max-h-full lg:h-full ">
              {words.map((word) => (
                <WordList
                  key={word.id}
                  word={word}
                  setWordToSearch={setWordToSearch}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
