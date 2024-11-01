import { createSlice } from '@reduxjs/toolkit';
import {
  RegisterTrainer,
  LoginTrainer,
  AddPtOption,
  AddTrainerAddress,
  AddTrainerBankAccount,
  FetchTrainers,
  FetchTrainerById,
  FetchPtOptions,
  FetchTrainerAddress,
  FetchTrainerBankAccount,
  UpdateTrainerInfo,
  UpdatePtOption,
  UpdateTrainerAddress,
  UpdateTrainerBankAccount,
  DeleteTrainer,
} from './TrainerThunks';

const TrainerSlice = createSlice({
  name: 'trainers',
  initialState: {
    trainerList: [],
    trainerDetail: null,
    ptOptions: [],
    address: null,
    bankAccount: null,
    authStatus: null,
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // 트레이너 회원가입
      .addCase(RegisterTrainer.fulfilled, (state, action) => {
        state.authStatus = action.payload.status;
      })
      // 트레이너 로그인
      .addCase(LoginTrainer.fulfilled, (state, action) => {
        state.authStatus = action.payload.status;
      })
      // PT 옵션 추가
      .addCase(AddPtOption.fulfilled, (state, action) => {
        state.ptOptions.push(action.payload);
      })
      // 트레이너 주소 추가
      .addCase(AddTrainerAddress.fulfilled, (state, action) => {
        state.address = action.payload;
      })
      // 트레이너 계좌 추가
      .addCase(AddTrainerBankAccount.fulfilled, (state, action) => {
        state.bankAccount = action.payload;
      })
      // 트레이너 목록 조회
      .addCase(FetchTrainers.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(FetchTrainers.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.trainerList = action.payload;
      })
      .addCase(FetchTrainers.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      // 특정 트레이너 조회
      .addCase(FetchTrainerById.fulfilled, (state, action) => {
        state.trainerDetail = action.payload;
      })
      // PT 옵션 조회
      .addCase(FetchPtOptions.fulfilled, (state, action) => {
        state.ptOptions = action.payload;
      })
      // 트레이너 주소 조회
      .addCase(FetchTrainerAddress.fulfilled, (state, action) => {
        state.address = action.payload;
      })
      // 트레이너 계좌 조회
      .addCase(FetchTrainerBankAccount.fulfilled, (state, action) => {
        state.bankAccount = action.payload;
      })
      // 트레이너 정보 수정
      .addCase(UpdateTrainerInfo.fulfilled, (state, action) => {
        state.trainerDetail = { ...state.trainerDetail, ...action.payload };
      })
      // PT 옵션 수정
      .addCase(UpdatePtOption.fulfilled, (state, action) => {
        const index = state.ptOptions.findIndex(
          (option) => option.amount_number === action.payload.amount_number
        );
        if (index !== -1) {
          state.ptOptions[index] = action.payload;
        }
      })
      // 트레이너 주소 수정
      .addCase(UpdateTrainerAddress.fulfilled, (state, action) => {
        state.address = action.payload;
      })
      // 트레이너 계좌 수정
      .addCase(UpdateTrainerBankAccount.fulfilled, (state, action) => {
        state.bankAccount = action.payload;
      })
      // 트레이너 삭제
      .addCase(DeleteTrainer.fulfilled, (state, action) => {
        state.trainerList = state.trainerList.filter(
          (trainer) => trainer.trainer_number !== action.payload
        );
      });
  },
});

export default TrainerSlice.reducer;
