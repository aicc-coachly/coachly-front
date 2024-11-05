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
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();

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
      [name]: type === 'checkbox' ? checked : value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // 필수 값이 입력되었는지 확인하는 검증
    const { name, username, password, confirmPassword, phone, email, birthdate, address, agreeTerms } = formData;
    if (!name || !username || !password || !confirmPassword || !phone || !email || !birthdate || !address || !agreeTerms) {
      alert('모든 필수 필드를 입력하고 개인정보 수집 동의에 체크해 주세요.');
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
      "user_detail_address",
    ];
    for (const field of requiredFields) {
      if (!formData[field]) {
        alert(`${field.replace("_", " ")}(을)를 입력해주세요.`);
        return;
      }
    }

    // DB에 맞는 필드명으로 데이터 매핑
    const { confirmPassword, ...mappedData } = formData;

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
          <label htmlFor="username" className="block mb-2">아이디</label>
          <input
            type="text"
            id="username"
            name="username"
            value={formData.username}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded"
            required
          />
        </div>
        
        {/* 비밀번호 */}
        <div className="mb-4">
          <label htmlFor="password" className="block mb-2">비밀번호</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
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
                checked={formData.gender === 'male'}
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
                checked={formData.gender === 'female'}
                onChange={handleChange}
                className="mr-1"
              />
              여성
            </label>
          </div>
        </div>
        
        {/* 생년월일 */}
        <div className="mb-4">
          <label htmlFor="birthdate" className="block mb-2">생년월일</label>
          <input
            type="date"
            id="birthdate"
            name="birthdate"
            value={formData.birthdate}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded"
            required
          />
        </div>
        
        {/* 주소 */}
        <div className="mb-4">
          <label htmlFor="address" className="block mb-2">주소</label>
          <div className="flex space-x-2 mb-2">
            <input
              type="text"
              name="address"
              value={formData.address}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded"
              placeholder="주소"
              required
            />
            <input
              type="text"
              name="addressDetail"
              value={formData.addressDetail}
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
