import { useEffect, useState } from "react";
import useWordInfo from "../hooks/useWordInfo";
import bookmarkImage from "../images/bookmark.png";
import { useDispatch, useSelector } from "react-redux";
import { addWord } from "../features/wordSlice";

function SearchResult({ wordToSearch }) {
  const words = useSelector((state) => state.words);
  const [info, setInfo] = useState(null);
  const dispatch = useDispatch();
  const wordInfo = useWordInfo(wordToSearch);

  useEffect(() => {
    const getData = () => {
      if (wordInfo && wordInfo.length > 0) {
        const word = wordInfo[0].word;
        const phonetics = Array.from(
          wordInfo[0].phonetics.map((eachPhonetic) => eachPhonetic)
        );
        const meanings = wordInfo[0].meanings.map((eachMeaning) => eachMeaning);
        const sourceUrls = wordInfo[0].sourceUrls;
        setInfo({
          word,
          phonetics,
          meanings,
          sourceUrls,
        });
      }
    };
    getData();
  }, [wordInfo, setInfo]);

  const playAudio = (URL) => {
    new Audio(URL).play();
  };

  const bookmarkWord = () => {
    if (words.some((word) => word.text.word === wordToSearch)) return;
    dispatch(addWord(info));
  };

  if (wordInfo.title)
    return (
      <div className="w-full flex-1 shadow-2xl shadow-black flex flex-col py-10 px-10 gap-y-4 text-white justify-center items-center text-xl">
        <p>{wordInfo.title}😭😭</p>
        <p>{wordInfo.message}</p>
      </div>
    );

  if (!info) {
    // Rendering The Loading State :
    return (
      <div className="w-full flex-1 shadow-2xl shadow-black flex flex-col py-10 px-10 gap-y-4 text-white justify-center items-center text-xl">
        Just a Moment Please...
      </div>
    );
  }

  return (
    <div className="w-full relative flex-1 shadow-2xl shadow-black flex flex-col py-10 px-4 lg:px-10 gap-y-4 text-white overflow-y-auto">
      {/* Bookmark Button */}
      <button
        className="absolute top-0 right-0 opacity-70 hover:opacity-100"
        onClick={bookmarkWord}
      >
        <img src={bookmarkImage} alt="Bookmark" className="w-8" />
      </button>

      {/* Word */}
      <div className="w-full">
        <p className="flex-1 ">
          <span className="font-bold text-lg">Word : </span>
          {info.word}
        </p>
      </div>

      {/* Phonetics : */}
      <div className="flex flex-col lg:flex-row gap-x-4">
        <div className=" py-1 font-bold text-lg">Phonetics :</div>
        <div className="flex-1 flex flex-col gap-y-2 ">
          {info.phonetics &&
            info.phonetics.map((eachPhonetic, index) => (
              <div
                key={index}
                className="flex justify-between py-1 px-4 hover:bg-slate-900 rounded-lg"
              >
                {eachPhonetic.text ? (
                  <p className="">Text : {eachPhonetic.text}</p>
                ) : (
                  <p className="">Text : Not-Found</p>
                )}
                {eachPhonetic.audio ? (
                  <button
                    className=""
                    onClick={() => playAudio(eachPhonetic.audio)}
                  >
                    Audio : 🔊
                  </button>
                ) : (
                  <button>Audio : Not-Found</button>
                )}
              </div>
            ))}
        </div>
      </div>

      {/* Meanings : */}
      <div className="flex flex-col lg:flex-row ">
        <div className=" font-bold text-lg mt-8">Meanings :</div>
        <div className="flex-1 ml-2 overflow-x-auto">
          {info.meanings &&
            info.meanings.map((eachMeaning, index) => (
              <div
                key={index}
                className="flex flex-col lg:p-4 rounded-lg hover:bg-slate-900 gap-y-2 my-5"
              >
                {/* Part Of Speech */}
                {eachMeaning.partOfSpeech && (
                  <p className="">
                    <span className="font-semibold">Part of Speech : </span>
                    {eachMeaning.partOfSpeech}
                  </p>
                )}

                {/* Definitions : */}
                {eachMeaning.definitions && (
                  <div className="flex gap-x-2">
                    <p className="font-semibold">Definition : </p>
                    <div className="flex-1">
                      {eachMeaning.definitions.length === 1
                        ? eachMeaning.definitions.map(
                            (eachDefinition, index) => (
                              <div key={index}>
                                <p className="flex flex-col">
                                  {eachDefinition.definition}{" "}
                                  {eachDefinition.example && (
                                    <span>
                                      Example : {eachDefinition.example}
                                    </span>
                                  )}
                                </p>
                              </div>
                            )
                          )
                        : eachMeaning.definitions.map(
                            (eachDefinition, index) => (
                              <div key={index} className="mb-6">
                                <p className="flex flex-col">
                                  {index + 1}. {eachDefinition.definition}{" "}
                                  {eachDefinition.example && (
                                    <span>
                                      Example : {eachDefinition.example}
                                    </span>
                                  )}
                                </p>
                              </div>
                            )
                          )}
                    </div>
                  </div>
                )}

                {/* Synonyms : */}
                {eachMeaning.synonyms.length > 0 && (
                  <div className="flex gap-x-2">
                    <span className="font-semibold">Synonyms</span>
                    {":"}
                    <div className="flex flex-wrap gap-x-2  ">
                      {eachMeaning.synonyms.map((eachSynonym, index) => (
                        <p key={index}>{eachSynonym}</p>
                      ))}
                    </div>
                  </div>
                )}

                {/* Antonyms : */}
                {eachMeaning.antonyms.length > 0 && (
                  <div className="flex gap-x-2">
                    <span className="font-semibold">Antonyms</span>
                    {":"}
                    <div className="flex flex-wrap gap-x-2  ">
                      {eachMeaning.antonyms.map((eachAntonym, index) => (
                        <p key={index}>{eachAntonym}</p>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
        </div>
      </div>

      {/* Source-URLS */}

      <div className="w-full">
        {info.sourceUrls && info.sourceUrls.length > 0 && (
          <div className="flex flex-col lg:flex-row gap-x-2">
            <span className="text-lg font-bold">Source : </span>
            <div className="flex-1 flex flex-col justify-center">
              {info.sourceUrls.map((eachSource, index) => (
                <a
                  href={eachSource}
                  target="_blank"
                  key={index}
                  className="hover:underline hover:text-blue-600 block"
                >
                  {eachSource}
                </a>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default SearchResult;
