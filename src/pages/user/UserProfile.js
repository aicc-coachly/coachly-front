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

  const { userInfo } = location.state || {};
  // console.log(userInfo);
  // Redux에서 유저 정보 가져오기
  // const user = useSelector((state) => state.user.userInfo);
  // const userId = useSelector((state) => state.auth?.user?.user_id);

  // console.log(userId);

  // 유저 프로필 정보 상태 관리
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [zipcode, setZipcode] = useState("");
  const [address, setAddress] = useState("");
  const [detailAddress, setDetailAddress] = useState("");

  // 유저 정보를 처음 불러올 때 상태 초기화
  useEffect(() => {
    // 유저 정보 디스패치
    dispatch(getUser(userInfo.user_number));

    // Redux 상태에 유저 정보가 있을 때 로컬 상태 초기화
    if (userInfo) {
      setName(userInfo.name || "");
      setPhone(userInfo.phone || "");
      setEmail(userInfo.email || "");
      setZipcode(userInfo.user_zipcode || "");
      setAddress(userInfo.user_address || "");
      setDetailAddress(userInfo.user_detail_address || "");
    }
  }, [dispatch]);

  const handleSave = () => {
    const updatedUserInfo = { name, phone, email };
    const updatedAddress = {
      user_zipcode: zipcode,
      user_address: address,
      user_detail_address: detailAddress,
    };

    // 유저 정보 및 주소 업데이트 액션 호출
    dispatch(
      updateUserInfo({
        user_number: userInfo?.user_number,
        updateData: updatedUserInfo,
      })
    );
    dispatch(
      updateUserAddress({
        user_number: userInfo?.user_number,
        updateData: updatedAddress,
      })
    );
    // console.log(updatedUserInfo);
    // console.log(updatedAddress);

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
            value={zipcode}
            onChange={(e) => setZipcode(e.target.value)}
            className="w-full px-3 py-1 border rounded mb-2"
            placeholder="우편번호"
          />
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
