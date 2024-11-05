import { createSlice } from "@reduxjs/toolkit";
import { fetchUserProfile, updateUserProfile } from "../thunks/userThunk";

const initialState = {
  userData: JSON.parse(localStorage.getItem("userData")) || null,
};

const userSlice = createSlice({
  name: "user",
  initialState: {
    profile: JSON.parse(localStorage.getItem("userData")) || null,
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUserProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.profile = action.payload;
        localStorage.setItem(
          "userData",
          JSON.stringify(action.payload.userData)
        );
      })
      .addCase(fetchUserProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(updateUserProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateUserProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.profile = action.payload;
      })
      .addCase(updateUserProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default userSlice.reducer;
