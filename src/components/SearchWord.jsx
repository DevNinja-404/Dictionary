import { useState } from "react";
function SearchWord({ setWordToSearch }) {
  const [word, setWord] = useState("");

  const getWordInfo = (e) => {
    e.preventDefault();
    if (!word) return;
    setWordToSearch(word);
  };

  return (
    <>
      <div className="w-full shadow-2xl shadow-black flex flex-col items-center py-10 gap-y-4">
        <h1 className="w-full text-orange-500 text-center  font-serif font-semibold text-2xl ">
          Search Any Word :
        </h1>
        <form onSubmit={getWordInfo} className="w-full">
          <div className="w-full flex justify-center">
            <input
              type="text"
              placeholder="Your Word Here..."
              className=" w-4/6 lg:w-2/4 h-10 bg-gray-50 outline-none text-center rounded-y-lg rounded-l-lg border-2 placeholder:text-center "
              value={word}
              onChange={(e) => {
                setWord(e.target.value);
              }}
              onClick={() => {
                setWord("");
                setWordToSearch("");
              }}
            />
            <button
              type="submit"
              className="rounded-r-md px-3 bg-green-600 text-white shrink-0"
            >
              Search
            </button>
          </div>
        </form>
      </div>
    </>
  );
}

export default SearchWord;
