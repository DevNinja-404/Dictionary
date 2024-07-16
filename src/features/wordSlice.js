import { createSlice, nanoid } from "@reduxjs/toolkit";

const initialState = {
  words: [],
};

export const wordSlice = createSlice({
  name: "MyDictionary",
  initialState,

  reducers: {
    addWord: (state, action) => {
      const word = {
        id: nanoid(),
        text: action.payload,
      };
      state.words.push(word);
    },
    removeWord: (state, action) => {
      state.words = state.words.filter(
        (eachWord) => eachWord.id !== action.payload
      );
    },
    loadWord: (state, action) => {
      state.words = action.payload;
    },
  },
});

export const { addWord, removeWord, loadWord } = wordSlice.actions;

export default wordSlice.reducer;
