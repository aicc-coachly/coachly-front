import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  getUser,
  updateUserInfo,
  updateUserAddress,
} from "../../redux/slice/userSlice";

const UserProfile = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // 최상위에서 userInfo와 Redux 상태에서 user_number를 가져옵니다.
  const { userInfo } = location.state || {};
  const storedUserNumber = useSelector((state) => state.auth.user_number);

  // location.state에 userInfo가 없으면 Redux의 user_number 사용
  const user_number = userInfo?.user_number || storedUserNumber;

  // 유저 프로필 정보 상태 관리
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [detailAddress, setDetailAddress] = useState("");

  // 유저 정보를 처음 불러올 때 상태 초기화
  useEffect(() => {
    console.log("user_number:", user_number);

    if (user_number) {
      // 유저 정보 디스패치
      dispatch(getUser(user_number));
    }

    // Redux 상태에 유저 정보가 있을 때 로컬 상태 초기화
    if (userInfo) {
      setName(userInfo.name || "");
      setPhone(userInfo.phone || "");
      setEmail(userInfo.email || "");
      setAddress(userInfo.user_address || "");
      setDetailAddress(userInfo.user_detail_address || "");
    }
  }, [dispatch, user_number, userInfo]);

  const handleSave = () => {
    const updatedUserInfo = { name, phone, email };
    const updatedAddress = {
      user_address: address,
      user_detail_address: detailAddress,
    };

    // 유저 정보 및 주소 업데이트 액션 호출
    dispatch(
      updateUserInfo({
        user_number: user_number,
        updateData: updatedUserInfo,
      })
    );
    dispatch(
      updateUserAddress({
        user_number: user_number,
        updateData: updatedAddress,
      })
    );

    // 저장 후 마이페이지로 돌아가기
    navigate("/usermypage");
  };

  return (
    <div className="max-w-[390px] mx-auto h-auto bg-gray-100 p-4">
      <div className="mb-4">
        <h2 className="text-lg font-semibold">내 정보</h2>
      </div>

      <div className="text-start px-[2rem] mb-4">
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="text-sm text-gray-500 mb-2 w-full px-2 py-1 border rounded"
          placeholder="이름"
        />
        <input
          type="text"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          className="text-sm text-gray-500 mb-2 w-full px-2 py-1 border rounded"
          placeholder="전화번호"
        />
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="text-sm text-gray-500 mb-2 w-full px-2 py-1 border rounded"
          placeholder="이메일"
        />
      </div>

      <div className="mb-4">
        <h2 className="text-lg font-semibold mb-2">주소 관리</h2>
        <div className="mb-2">
          <input
            type="text"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            className="w-full px-3 py-1 border rounded mb-2"
            placeholder="주소"
          />
          <input
            type="text"
            value={detailAddress}
            onChange={(e) => setDetailAddress(e.target.value)}
            className="w-full px-3 py-1 border rounded"
            placeholder="상세 주소"
          />
        </div>
      </div>

      <button
        onClick={handleSave}
        className="w-full py-2 bg-pink-300 text-sm font-medium rounded-md"
      >
        저장하기
      </button>
    </div>
  );
};

export default UserProfile;
