// src/pages/auth/UserSignup.js
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { registerUser } from "../../redux/thunks/authThunk";
import {
  selectAuthStatus,
  selectUserError,
} from "../../redux/slices/authSlice";

function UserSignup() {
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
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const authStatus = useSelector(selectAuthStatus);
  const userError = useSelector(selectUserError);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // 비밀번호 확인
    if (formData.pass !== formData.confirmPassword) {
      alert("비밀번호가 일치하지 않습니다.");
      return;
    }

    // 필수 필드 검증
    const requiredFields = [
      "user_id",
      "pass",
      "email",
      "name",
      "phone",
      "gender",
      "birth",
      "user_zipcode",
      "user_address",
    ];
    for (const field of requiredFields) {
      if (!formData[field]) {
        alert(`${field.replace("_", " ")}(을)를 입력해주세요.`);
        return;
      }
    }

    // DB에 맞는 필드명으로 데이터 매핑
    const { confirmPassword, ...mappedData } = formData;
    console.log(mappedData);

    // 회원가입 액션 디스패치
    dispatch(registerUser(mappedData));
  };

  useEffect(() => {
    if (authStatus === "success") {
      alert("회원가입이 완료되었습니다.");
      navigate("/login"); // 로그인 페이지로 이동
    } else if (authStatus === "failed" && userError) {
      alert(`회원가입 실패: ${userError}`);
    }
  }, [authStatus, userError, navigate]);

  return (
    <div className="max-w-[390px] mx-auto p-6 bg-white rounded-lg shadow-md mt-0 overflow-y-auto h-screen">
      <h2 className="text-2xl font-bold mb-4 text-center">회원가입</h2>
      <form onSubmit={handleSubmit}>
        {/* 이름 */}
        <div className="mb-4">
          <label htmlFor="name" className="block mb-2">
            이름
          </label>
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
          <label htmlFor="user_id" className="block mb-2">
            아이디
          </label>
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
          <label htmlFor="pass" className="block mb-2">
            비밀번호
          </label>
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
          <label htmlFor="confirmPassword" className="block mb-2">
            비밀번호 확인
          </label>
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
          <label htmlFor="phone" className="block mb-2">
            핸드폰 번호
          </label>
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
          <label htmlFor="email" className="block mb-2">
            이메일 주소
          </label>
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
          <label htmlFor="birth" className="block mb-2">
            생년월일
          </label>
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

        {/* 우편번호 */}
        <div className="mb-4">
          <label htmlFor="user_zipcode" className="block mb-2">
            우편번호
          </label>
          <input
            type="text"
            id="user_zipcode"
            name="user_zipcode"
            value={formData.user_zipcode}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded"
            required
          />
        </div>

        {/* 주소 */}
        <div className="mb-4">
          <label htmlFor="user_address" className="block mb-2">
            주소
          </label>
          <input
            type="text"
            id="user_address"
            name="user_address"
            value={formData.user_address}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded"
            required
          />
        </div>

        {/* 상세 주소 */}
        <div className="mb-4">
          <label htmlFor="user_detail_address" className="block mb-2">
            상세 주소
          </label>
          <input
            type="text"
            id="user_detail_address"
            name="user_detail_address"
            value={formData.user_detail_address}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded"
          />
        </div>

        {/* 회원가입 버튼 */}
        <button
          type="submit"
          className="w-full bg-[#081f5c] text-white py-2 rounded hover:bg-[#041c3d]"
        >
          회원가입 하기
        </button>
      </form>
    </div>
  );
}

export default UserSignup;
