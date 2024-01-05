// chatSlice.js
import { createSlice } from '@reduxjs/toolkit';

const chatSlice = createSlice({
  name: 'chat',
  initialState: {
    entries: [],
    text: '',
  },
  reducers: {
    addEntry: (state) => {
        state.entries.push({ entry: state.text });
        state.text = '';
      },
      updateText: (state, action) => {
        state.text = action.payload;
      },
  },
});

export const { addEntry, updateText } = chatSlice.actions;
export const selectEntries = (state) => state.chat.entries;
export const selectText = (state) => state.chat.text;
export default chatSlice.reducer;
