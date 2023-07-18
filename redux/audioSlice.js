import { createSlice } from '@reduxjs/toolkit';

const audioSlice = createSlice({
  name: 'audio',
  initialState: {
    recordings: [],
  },
  reducers: {
    addRecording: (state, action) => {
      state.recordings.push(action.payload);
    },
    deleteRecording: (state, action) => {
      state.recordings = state.recordings.filter((recording) => recording.uri !== action.payload);
    },
  },
});

export const { addRecording, deleteRecording } = audioSlice.actions;
export default audioSlice.reducer;
