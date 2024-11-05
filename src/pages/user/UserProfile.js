import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { updateUserProfile } from "../../redux/thunks/userThunk"; // 프로필 업데이트 액션

const UserProfile = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Redux에서 유저 정보 가져오기
  const user = useSelector((state) => state.auth.user);
  const profile = useSelector((state) => state.users.profile);

  // 유저 프로필 정보 초기화
  const [name, setName] = useState(user?.name || "");
  const [phone, setPhone] = useState(user?.phone || "");
  const [email, setEmail] = useState(user?.email || "");

  // 주소 관련 상태 관리
  const [address, setAddress] = useState(
    Array.isArray(user?.user_detail_address) ? user?.user_detail_address : [""]
  );

  useEffect(() => {
    // 유저 정보가 있을 때 프로필 정보 갱신
    if (profile) {
      setName(profile.name);
      setPhone(profile.phone);
      setEmail(profile.email);
      setAddress(
        Array.isArray(profile.user_detail_address)
          ? profile.user_detail_address
          : [""]
      ); // 주소는 배열이어야 함
    }
  }, [profile]);

  const handleSave = () => {
    const updatedUser = {
      name,
      phone,
      email,
      address, // 수정된 주소 정보
    };

    // Redux에서 프로필 업데이트를 위한 액션 디스패치
    dispatch(updateUserProfile(updatedUser));

    // 저장 후, 마이페이지로 돌아가기
    navigate("/usermypage");
  };

  // 주소 추가
  const addAddressSection = () => {
    setAddress([...address, ""]); // 빈 문자열로 주소 추가
  };

  // 주소 삭제
  const removeAddressSection = (index) => {
    if (address.length > 1) {
      setAddress(address.filter((_, i) => i !== index)); // 하나 이상의 주소는 남겨두기
    }
  };

  // 주소 값 수정
  const handleAddressChange = (index, value) => {
    const updatedAddresses = [...address];
    updatedAddresses[index] = value; // 해당 주소 값만 수정
    setAddress(updatedAddresses);
  };

  return (
    <div className="max-w-[390px] mx-auto h-auto bg-gray-100 p-4">
      <div className="mb-4">
        <h2 className="text-lg font-semibold">내 정보</h2>
      </div>

      <div className="w-[16rem] h-[16rem] bg-gray-200 mx-auto mb-4 overflow-hidden"></div>

      <div className="text-start px-[2rem] mb-4">
        <p className="text-base font-medium">{profile?.name}</p>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="text-sm text-gray-500 mb-2"
        />
        <input
          type="text"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          className="text-sm text-gray-500 mb-2"
        />
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="text-sm text-gray-500 mb-2"
        />
      </div>

      <div className="mb-4">
        <div className="flex justify-between items-center">
          <h2 className="text-lg font-semibold mb-2">주소관리</h2>
          <button
            onClick={addAddressSection}
            className="px-3 py-1 bg-gray-300 text-sm rounded-md"
          >
            추가하기
          </button>
        </div>

        {/* 주소가 배열일 경우에만 map을 실행 */}
        {Array.isArray(address) &&
          address.map((addr, index) => (
            <div key={index} className="mb-4 border-t pt-2 relative">
              <h2 className="text-md font-normal px-3 mb-2">장소명 입력</h2>
              <div className="flex justify-between px-4 mb-4">
                <input
                  type="text"
                  value={addr}
                  onChange={(e) => handleAddressChange(index, e.target.value)} // 주소 수정
                  className="px-3 py-1 bg-gray-300 text-sm rounded-md"
                  placeholder="주소를 입력하세요"
                />
              </div>
              <button
                onClick={() => removeAddressSection(index)}
                className="absolute top-0 right-0 text-gray-500 hover:text-red-500"
              >
                X
              </button>
            </div>
          ))}
      </div>

      <button
        onClick={handleSave} // 저장 버튼 클릭 시 변경된 정보 저장
        className="w-full py-2 bg-pink-300 text-sm font-medium rounded-md"
      >
        저장하기
      </button>
    </div>
  );
};

export default UserProfile;
