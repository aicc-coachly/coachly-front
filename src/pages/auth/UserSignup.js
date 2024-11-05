// src/pages/auth/UserSignup.js
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { userSignup } from "../../redux/silce/authSlice";

function UserSignup() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    user_id: "",
    pass: "",
    confirmPassword: "",
    email: "",
    name: "",
    phone: "",
    gender: "",
    birth: "",
    user_zipcode: "",
    user_address: "",
    user_detail_address: "",
    agreeTerms: false,
  });

  const dispatch = useDispatch();

  // 회원가입 상태 확인
  const { data, error } = useSelector((state) => state.auth);

  useEffect(() => {
    if (data) {
      alert("회원가입이 완료되었습니다!");
      navigate("/"); // 로그인 페이지로 이동
    }
    if (error) {
      alert("회원가입에 실패했습니다.");
    }
  }, [data, error, navigate]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // 필수 값이 입력되었는지 확인하는 검증
    const requiredFields = [
      "user_id",
      "pass",
      "confirmPassword",
      "email",
      "name",
      "phone",
      "gender",
      "birth",
      "user_zipcode",
      "user_address",
      "user_detail_address",
      "agreeTerms",
    ];
    for (const field of requiredFields) {
      if (!formData[field]) {
        alert(`${field.replace("_", " ")}(을)를 입력해주세요.`);
        return;
      }
    }

    // confirmPassword 필드 제거
    const mappedData = { ...formData };
    delete mappedData.confirmPassword;

    // 회원가입 액션 디스패치
    dispatch(userSignup(mappedData));
  };

  return (
    <div className="max-w-[390px] mx-auto p-6 bg-white rounded-lg shadow-md mt-0 overflow-y-auto h-screen">
      <h2 className="text-2xl font-bold mb-4 text-center">회원 회원가입</h2>
      <form onSubmit={handleSubmit}>
        {/* 이름 */}
        <div className="mb-4">
          <label htmlFor="name" className="block mb-2">이름</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded"
            required
          />
        </div>

        {/* 아이디 */}
        <div className="mb-4">
          <label htmlFor="user_id" className="block mb-2">아이디</label>
          <input
            type="text"
            id="user_id"
            name="user_id"
            value={formData.user_id}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded"
            required
          />
        </div>

        {/* 비밀번호 */}
        <div className="mb-4">
          <label htmlFor="pass" className="block mb-2">비밀번호</label>
          <input
            type="password"
            id="pass"
            name="pass"
            value={formData.pass}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded"
            required
          />
        </div>

        {/* 비밀번호 확인 */}
        <div className="mb-4">
          <label htmlFor="confirmPassword" className="block mb-2">비밀번호 확인</label>
          <input
            type="password"
            id="confirmPassword"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded"
            required
          />
        </div>

        {/* 핸드폰 번호 */}
        <div className="mb-4">
          <label htmlFor="phone" className="block mb-2">핸드폰 번호</label>
          <input
            type="tel"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded"
            required
          />
        </div>

        {/* 이메일 주소 */}
        <div className="mb-4">
          <label htmlFor="email" className="block mb-2">이메일 주소</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded"
            required
          />
        </div>

        {/* 성별 */}
        <div className="mb-4">
          <label className="block mb-2">성별</label>
          <div className="flex space-x-4">
            <label>
              <input
                type="radio"
                name="gender"
                value="male"
                checked={formData.gender === "male"}
                onChange={handleChange}
                className="mr-1"
              />
              남성
            </label>
            <label>
              <input
                type="radio"
                name="gender"
                value="female"
                checked={formData.gender === "female"}
                onChange={handleChange}
                className="mr-1"
              />
              여성
            </label>
          </div>
        </div>

        {/* 생년월일 */}
        <div className="mb-4">
          <label htmlFor="birth" className="block mb-2">생년월일</label>
          <input
            type="date"
            id="birth"
            name="birth"
            value={formData.birth}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded"
            required
          />
        </div>

        {/* 주소 */}
        <div className="mb-4">
          <label htmlFor="user_address" className="block mb-2">주소</label>
          <div className="flex space-x-2 mb-2">
            <input
              type="text"
              name="user_address"
              value={formData.user_address}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded"
              placeholder="주소"
              required
            />
            <input
              type="text"
              name="user_detail_address"
              value={formData.user_detail_address}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded"
              placeholder="상세 주소"
            />
          </div>
        </div>

        {/* 개인정보 수집 동의 */}
        <div className="mb-6 flex items-center">
          <input
            type="checkbox"
            id="agreeTerms"
            name="agreeTerms"
            checked={formData.agreeTerms}
            onChange={handleChange}
            required
          />
          <label htmlFor="agreeTerms" className="ml-2 text-sm">
            개인정보 수집 및 활용 동의(필수)
          </label>
        </div>

        {/* 회원가입 버튼 */}
        <button type="submit" className="w-full bg-[#081f5c] text-white py-2 rounded hover:bg-[#041c3d]">
          회원가입 하기
        </button>

        <div className="h-16"></div>
      </form>
    </div>
  );
}

export default UserSignup;
