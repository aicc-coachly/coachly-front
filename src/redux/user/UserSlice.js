import { createSlice } from '@reduxjs/toolkit';
import {
  RegisterUser,
  LoginUser,
  SaveUserInbody,
  SaveUserAddress,
  FetchAllUsers,
  FetchUserById,
  FetchUserInbody,
  DeleteUserInbody,
  DeleteUserAddress,
  UpdateUserInfo,
  UpdateUserAddress,
} from './UserThunks';

const UserSlice = createSlice({
  name: 'users',
  initialState: {
    userList: [],
    userDetail: null,
    authStatus: null,
    inbodyStatus: null,
    addressStatus: null,
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // 회원가입
      .addCase(RegisterUser.fulfilled, (state, action) => {
        state.authStatus = action.payload.status;
      })
      // 로그인
      .addCase(LoginUser.fulfilled, (state, action) => {
        state.authStatus = action.payload.status;
      })
      // 인바디 정보 저장
      .addCase(SaveUserInbody.fulfilled, (state, action) => {
        state.inbodyStatus = action.payload.status;
      })
      // 주소 정보 저장
      .addCase(SaveUserAddress.fulfilled, (state, action) => {
        state.addressStatus = action.payload.status;
      })
      // 모든 사용자 조회
      .addCase(FetchAllUsers.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(FetchAllUsers.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.userList = action.payload;
      })
      .addCase(FetchAllUsers.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      // 특정 사용자 조회
      .addCase(FetchUserById.fulfilled, (state, action) => {
        state.userDetail = action.payload;
      })
      // 회원 인바디 정보 조회
      .addCase(FetchUserInbody.fulfilled, (state, action) => {
        state.userDetail = { ...state.userDetail, inbody: action.payload };
      })
      // 회원 인바디 삭제
      .addCase(DeleteUserInbody.fulfilled, (state, action) => {
        state.userDetail.inbody = state.userDetail.inbody.filter(
          (inbody) => inbody.user_inbody_number !== action.payload
        );
      })
      // 회원 주소 삭제
      .addCase(DeleteUserAddress.fulfilled, (state, action) => {
        state.userDetail.address = state.userDetail.address.filter(
          (address) => address.address_number !== action.payload
        );
      })
      // 회원 정보 수정
      .addCase(UpdateUserInfo.fulfilled, (state, action) => {
        state.userDetail = { ...state.userDetail, ...action.payload };
      })
      // 회원 주소 수정
      .addCase(UpdateUserAddress.fulfilled, (state, action) => {
        const index = state.userDetail.address.findIndex(
          (address) => address.address_number === action.payload.address_number
        );
        if (index !== -1) {
          state.userDetail.address[index] = action.payload;
        }
      });
  },
});

export default UserSlice.reducer;
