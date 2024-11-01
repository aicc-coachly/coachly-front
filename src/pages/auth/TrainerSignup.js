// src/pages/auth/TrainerSignup.js
import React, { useState } from 'react';

import { api } from '../../utils/apiUtils';
import { Link, useNavigate } from 'react-router-dom';

function TrainerSignup() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    username: '',
    password: '',
    confirmPassword: '',
    phone: '',
    email: '',
    gender: '',
    specialization: [], // 초기값을 배열로 변경
    introduction: '',
    classLocation1: '',
    classLocation2: '',
    accountInfo: '',
    mainAccount: false,
    classFee: '',
    consultationFee: '',
    agreeTerms: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // API 호출 - 백엔드 엔드포인트가 준비되면 URL을 업데이트하세요.
      const response = await api.post('/trainerSignup', formData);

      // 서버 응답에 따라 처리
      if (response.status === 201) {
        alert('회원가입이 완료되었습니다!');
        navigate('/login'); // 회원가입 후 로그인 페이지로 이동
      } else {
        alert('회원가입에 실패했습니다.');
      }
    } catch (error) {
      console.error('회원가입 오류:', error);
      alert('오류가 발생했습니다. 다시 시도해주세요.');
    }
  };

  return (
    <div className="flex flex-col min-h-screen">


      <div className="flex-grow max-w-[390px] mx-auto p-6 bg-white rounded-lg shadow-md overflow-y-auto mt-0 h-screen">
        <h2 className="text-2xl font-bold mb-4 text-center">트레이너 회원가입</h2>
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

          {/* 비밀번호 및 확인 */}
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

       {/* 특기 선택 */}
       <div className="mb-4">
            <label className="block mb-2">특기 선택</label>
            <div className="grid grid-cols-2 gap-2">
              {['여성전문', '선수/대회 전문', '재활전문', '실버전문'].map((specialization) => (
                <div key={specialization} className="flex flex-col items-center">
                  <label
                    className={`border rounded-lg w-full h-12 flex items-center justify-center cursor-pointer ${
                      formData.specialization.includes(specialization) ? 'bg-[#d0e3ff] text-white' : 'border-gray-300'
                    }`}
                  >
                    <input
                      type="checkbox"
                      name="specialization"
                      value={specialization}
                      checked={formData.specialization.includes(specialization)}
                      onChange={(e) => {
                        const { value, checked } = e.target;
                        if (checked) {
                          // 최대 2개까지 선택 가능
                          if (formData.specialization.length < 2) {
                            setFormData({
                              ...formData,
                              specialization: [...formData.specialization, value],
                            });
                          }
                        } else {
                          setFormData({
                            ...formData,
                            specialization: formData.specialization.filter((item) => item !== value),
                          });
                        }
                      }}
                      className="hidden" // 체크박스 숨김
                    />
                    {specialization}
                  </label>
                </div>
              ))}
            </div>
          </div>

        {/* 수업 장소 */}
        <div className="mb-4">
          <label className="block mb-2">수업 장소</label>
                    
          {/* 우편번호 입력 */}
          <input
            type="text"
            name="postalCode"
            value={formData.postalCode}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded mb-2"
            placeholder="우편번호"
          />
          
          {/* 주소 입력 */}
          <input
            type="text"
            name="classLocation"
            value={formData.classLocation1}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded mb-2"
            placeholder="주소"
          />
          
          {/* 상세주소 입력 */}
          <input
            type="text"
            name="classLocation2"
            value={formData.classLocation2}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded"
            placeholder="상세주소"
          />
        </div>
                    
                 {/* 계좌 정보 */}
        <div className="mb-4">
            <label htmlFor="bankName" className="block mb-2">은행 이름</label>
              <input
                type="text"
                id="bankName"
                name="bankName"
                value={formData.bankName}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded mb-2"
                placeholder="은행 이름을 입력하세요"
              />
          
            <label htmlFor="accountInfo" className="block mb-2">계좌 정보</label>
              <input
                type="text"
                id="accountInfo"
                name="accountInfo"
                value={formData.accountInfo}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded"
                placeholder="계좌 정보를 입력하세요"
              />
          <div className="mt-2">
            <label>
              <input
                type="checkbox"
                name="mainAccount"
                checked={formData.mainAccount}
                onChange={handleChange}
                className="mr-2"
              />
              대표 계좌로 설정
            </label>
          </div>
        </div>


{/* 가격 정보 */}
<div className="mb-4">
    <label className="block bold-2 mb-2">가격</label>
    <div className="flex items-center mb-2">
        <label className="block mr-2 w-1/2" htmlFor="oneDayClassFee">원데이클래스</label>
        <input
            type="text"
            id="oneDayClassFee"
            name="oneDayClassFee"
            value={formData.classFee.replace(/\B(?=(\d{3})+(?!\d))/g, ",")} // 콤마 추가
            onChange={(e) => {
                const value = e.target.value.replace(/,/g, '');
                setFormData({ ...formData, classFee: value });
            }}
            className="w-5/6 px-3 py-2 border rounded"
            placeholder="원데이 클래스 비용 입력"
        />
    </div>


</div>

{/* 회당 가격 정보 */}
<div className="mb-4">
<div className="flex items-center mb-2 justify-end">
    <label className="block w-1/3 mb-2">회당 가격</label>
    <div className="flex items-center mb-2">
        {/* 회수 선택 */}
        <input
            type="number"
            name="consultationCount"
            value={formData.consultationCount || 0} // 초기값 0으로 설정
            onChange={(e) => {
                const value = Math.max(0, Math.min(30, e.target.value)); // 0에서 30 사이로 제한
                setFormData({ ...formData, consultationCount: value });
            }}
            className="w-13 px-3 py-2 border rounded mx-2"
            min="0"
            max="30"
            style={{ appearance: 'auto' }}
        />
        
        {/* 가격 입력 */}
        <input
            type="text"
            name="consultationFee"
            value={formData.consultationFee.replace(/\B(?=(\d{3})+(?!\d))/g, ",")} // 콤마 추가
            onChange={(e) => {
                const value = e.target.value.replace(/,/g, ''); // 콤마 제거
                setFormData({ ...formData, consultationFee: value });
            }}
            className="w-5/6 px-3 py-2 border rounded"
            placeholder="가격 입력"
        />
    </div>
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
          <Link to="/" className="flex justify-center flex-grow">    
            <button type="submit" className="w-full bg-[#081f5c] text-white py-2 rounded hover:bg-[#041c3d]">
              회원가입 하기
            </button>
          </Link>

          <div className="h-16"></div> {/* 하단 여백 */}
        </form>
      </div>
    </div>
  );
}

export default TrainerSignup;
