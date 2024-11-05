import { createSlice } from '@reduxjs/toolkit';
import {
  fetchTrainerProfile,
  fetchTrainerPtAmount,
  fetchTrainerGymAddress,
  fetchTrainerAccount,
  updateTrainerProfile,
  updateTrainerAddress,
  updateTrainerPtAmount,
  updateTrainerAccount,
  deleteTrainer,
  deleteTrainerPtAmount,
  deleteTrainerGymAddress,
  deleteTrainerAccount,
} from '../thunks/trainerThunks';

const trainerSlice = createSlice({
  name: 'trainer',
  initialState: {
    profile: {},
    ptAmount: null,
    gymAddress: null,
    account: null,
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // 트레이너 프로필 조회
      .addCase(fetchTrainerProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTrainerProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.profile = action.payload;
      })
      .addCase(fetchTrainerProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      // 트레이너 PT 가격 정보 조회
      .addCase(fetchTrainerPtAmount.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTrainerPtAmount.fulfilled, (state, action) => {
        state.loading = false;
        state.ptAmount = action.payload;
      })
      .addCase(fetchTrainerPtAmount.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      // 트레이너 헬스장 주소 조회
      .addCase(fetchTrainerGymAddress.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTrainerGymAddress.fulfilled, (state, action) => {
        state.loading = false;
        state.gymAddress = action.payload;
      })
      .addCase(fetchTrainerGymAddress.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      // 트레이너 계좌 정보 조회
      .addCase(fetchTrainerAccount.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTrainerAccount.fulfilled, (state, action) => {
        state.loading = false;
        state.account = action.payload;
      })
      .addCase(fetchTrainerAccount.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      // 트레이너 정보 업데이트
      .addCase(updateTrainerProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateTrainerProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.profile = action.payload;
      })
      .addCase(updateTrainerProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      // 트레이너 주소 업데이트
      .addCase(updateTrainerAddress.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateTrainerAddress.fulfilled, (state, action) => {
        state.loading = false;
        state.gymAddress = action.payload;
      })
      .addCase(updateTrainerAddress.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      // 트레이너 PT 가격 정보 업데이트
      .addCase(updateTrainerPtAmount.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateTrainerPtAmount.fulfilled, (state, action) => {
        state.loading = false;
        state.ptAmount = action.payload;
      })
      .addCase(updateTrainerPtAmount.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      // 트레이너 계좌 정보 업데이트
      .addCase(updateTrainerAccount.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateTrainerAccount.fulfilled, (state, action) => {
        state.loading = false;
        state.account = action.payload;
      })
      .addCase(updateTrainerAccount.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      // 트레이너 소프트 삭제
      .addCase(deleteTrainer.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteTrainer.fulfilled, (state) => {
        state.loading = false;
        state.profile = null;
        state.ptAmount = null;
        state.gymAddress = null;
        state.account = null;
      })
      .addCase(deleteTrainer.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      // 트레이너 PT 가격 정보 소프트 삭제
      .addCase(deleteTrainerPtAmount.fulfilled, (state) => {
        state.ptAmount = null;
      })

      // 트레이너 헬스장 주소 소프트 삭제
      .addCase(deleteTrainerGymAddress.fulfilled, (state) => {
        state.gymAddress = null;
      })

      // 트레이너 계좌 정보 소프트 삭제
      .addCase(deleteTrainerAccount.fulfilled, (state) => {
        state.account = null;
      });
  },
});

export default trainerSlice.reducer;
