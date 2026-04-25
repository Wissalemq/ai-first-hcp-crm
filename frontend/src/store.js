// src/store.js
import { configureStore, createSlice } from "@reduxjs/toolkit";

const interactionSlice = createSlice({
  name: "interaction",
  initialState: {
    form: {
      hcp_name: "",
      interaction_type: "",
      date: "",
      time: "",
      topics: "",
      sentiment: "",
      outcome: "",
      follow_up: "",
    },
  },
  reducers: {
    updateField: (state, action) => {
      state.form[action.payload.name] = action.payload.value;
    },
    fillForm: (state, action) => {
      state.form = { ...state.form, ...action.payload };
    },
    resetForm: (state) => {
      state.form = {
        hcp_name: "",
        interaction_type: "",
        date: "",
        time: "",
        topics: "",
        sentiment: "",
        outcome: "",
        follow_up: "",
      };
    },
  },
});

export const { updateField, fillForm, resetForm } = interactionSlice.actions;

export const store = configureStore({
  reducer: {
    interaction: interactionSlice.reducer,
  },
});