import { useDispatch } from "react-redux";
import { removeWord } from "../features/wordSlice.js";

function WordList({ word, setWordToSearch }) {
  const dispatch = useDispatch();
  return (
    <div className="flex w-full max-w-80 h-8 rounded-lg bg-slate-700 items-center hover:cursor-pointer ">
      <div
        className=" flex-1 flex-shrink flex items-center justify-center text-white text-lg hover:bg-slate-500  rounded-l-lg"
        onClick={() => setWordToSearch(word.text.word)}
      >
        {word.text.word}
      </div>
      <button
        className="inline-flex w-8  rounded-r-md  border border-black/10 justify-center items-center bg-gray-50 hover:bg-black shrink-0"
        onClick={() => {
          dispatch(removeWord(word.id));
        }}
      >
        ❌
      </button>
    </div>
  );
}

export default WordList;
