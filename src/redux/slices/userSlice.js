import { createSlice } from '@reduxjs/toolkit';
import {
  fetchUserProfile,
  fetchUserPage,
  fetchUserInbody,
  postUserInbody,
  updateUserProfile,
  updateUserAddress,
  updateUserInbody,
  deleteUser,
  deleteUserInbody,
  deleteUserAddress,
} from '../thunks/userThunks';

const userSlice = createSlice({
  name: 'user',
  initialState: {
    profile: null,
    pageData: null,
    inbodyData: null,
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // 사용자 프로필 조회
      .addCase(fetchUserProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUserProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.profile = action.payload;
      })
      .addCase(fetchUserProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      // 사용자 페이지 정보 조회
      .addCase(fetchUserPage.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUserPage.fulfilled, (state, action) => {
        state.loading = false;
        state.pageData = action.payload;
      })
      .addCase(fetchUserPage.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      // 사용자 인바디 정보 조회
      .addCase(fetchUserInbody.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUserInbody.fulfilled, (state, action) => {
        state.loading = false;
        state.inbodyData = action.payload;
      })
      .addCase(fetchUserInbody.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      // 사용자 인바디 정보 저장
      .addCase(postUserInbody.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(postUserInbody.fulfilled, (state, action) => {
        state.loading = false;
        state.inbodyData = action.payload;
      })
      .addCase(postUserInbody.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      // 사용자 기본 정보 업데이트
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
      })

      // 사용자 주소 정보 업데이트
      .addCase(updateUserAddress.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateUserAddress.fulfilled, (state, action) => {
        state.loading = false;
        if (state.profile) {
          state.profile.address = action.payload;
        }
      })
      .addCase(updateUserAddress.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      // 사용자 인바디 정보 업데이트
      .addCase(updateUserInbody.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateUserInbody.fulfilled, (state, action) => {
        state.loading = false;
        state.inbodyData = action.payload;
      })
      .addCase(updateUserInbody.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      // 사용자 소프트 삭제
      .addCase(deleteUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteUser.fulfilled, (state) => {
        state.loading = false;
        state.profile = null;
        state.pageData = null;
        state.inbodyData = null;
      })
      .addCase(deleteUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      // 사용자 인바디 정보 소프트 삭제
      .addCase(deleteUserInbody.fulfilled, (state) => {
        state.inbodyData = null;
      })

      // 사용자 주소 정보 소프트 삭제
      .addCase(deleteUserAddress.fulfilled, (state) => {
        if (state.profile) {
          state.profile.address = null;
        }
      });
  },
});

export default userSlice.reducer;
