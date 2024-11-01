// src/pages/auth/TrainerSignup.js
import React, { useState } from 'react';
import { api } from '../../utils/apiUtils';
import { useNavigate } from 'react-router-dom';

function TrainerSignup() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    trainer_id: '',
    pass: '',
    name: '',
    phone: '',
    gender: '',
    resume: '',
    trainer_zipcode: '',
    trainer_address: '',
    trainer_detail_address: '',
    price_options: [{ option: '', amount: '', frequency: '' }], // 가격 옵션을 배열로 관리
    account: '',
    bank_name: '',
    account_name: '',
    main_account: false, // 대표계좌 설정
    service_options: [], // 특기 옵션
  });
  const [selectedImage, setSelectedImage] = useState(null); // 이미지 선택 상태

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  // 특기 옵션 선택 처리
  const handleServiceOptionsChange = (option) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      service_options: prevFormData.service_options.includes(option)
        ? prevFormData.service_options.filter((item) => item !== option)
        : [...prevFormData.service_options, option],
    }));
  };

  // 이미지 파일 선택 처리
  const handleImageChange = (e) => {
    if (e.target.files.length > 0) {
      setSelectedImage(e.target.files[0]);
    }
  };

  // 가격 옵션 추가/수정 핸들러
  const handlePriceOptionChange = (index, field, value) => {
    const updatedOptions = [...formData.price_options];
    updatedOptions[index][field] = value;
    setFormData((prevFormData) => ({
      ...prevFormData,
      price_options: updatedOptions,
    }));
  };

  // 가격 옵션 추가
  const addPriceOption = () => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      price_options: [...prevFormData.price_options, { option: '', amount: '', frequency: '' }],
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.agreeTerms) { // 체크박스가 체크되지 않은 경우
      alert('개인정보 수집 및 활용에 동의해야 합니다.');
      return;
    }

    const data = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      if (Array.isArray(value)) {
        value.forEach((item) => data.append(`${key}[]`, JSON.stringify(item)));
      } else {
        data.append(key, value);
      }
    });
    if (selectedImage) {
      data.append('image', selectedImage);
    }
 
    try {
      const response = await api.post('/trainerSignup', data, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      if (response.status === 201) {
        alert('회원가입이 완료되었습니다!');
        navigate('/login');
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
          {/* 기본 정보 입력 */}
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
          {/* 아이디 및 비밀번호 */}
          <div className="mb-4">
            <label htmlFor="trainer_id" className="block mb-2">아이디</label>
            <input
              type="text"
              id="trainer_id"
              name="trainer_id"
              value={formData.trainer_id}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded"
              required
            />
          </div>
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

          {/* 전화번호 */}
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

          {/* 성별 선택 */}
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

          {/* 특기 옵션 */}
          <div className="mb-4">
            <label className="block mb-2">특기 선택</label>
            <div className="grid grid-cols-2 gap-2">
              {['여성전문', '선수/대회 전문', '재활전문', '실버 전문'].map((option) => (
                <div key={option} className="flex flex-col items-center">
                  <label
                    className={`border rounded-lg w-full h-12 flex items-center justify-center cursor-pointer ${
                      formData.service_options.includes(option) ? 'bg-[#d0e3ff] text-white' : 'border-gray-300'
                    }`}
                  >
                    <input
                      type="checkbox"
                      name="service_options"
                      value={option}
                      checked={formData.service_options.includes(option)}
                      onChange={() => handleServiceOptionsChange(option)}
                      className="hidden"
                    />
                    {option}
                  </label>
                </div>
              ))}
            </div>
          </div>

          {/* 수업 장소 */}
          <div className="mb-4">
            <label className="block mb-2">수업 장소</label>
            <input
              type="text"
              name="trainer_zipcode"
              value={formData.trainer_zipcode}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded mb-2"
              placeholder="우편번호"
            />
            <input
              type="text"
              name="trainer_address"
              value={formData.trainer_address}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded mb-2"
              placeholder="주소"
            />
            <input
              type="text"
              name="trainer_detail_address"
              value={formData.trainer_detail_address}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded"
              placeholder="상세주소"
            />
          </div>

{/* 가격 옵션 입력 */}
<div className="mb-4">
  <label className="block mb-2">가격 옵션</label>
  
  {/* 원데이 클래스 */}
  <div className="flex items-center mb-4">
    <span className="w-1/4 text-gray-700">원데이 클래스:</span>
    <input
      type="text"
      name="option"
      value={formData.price_options[0]?.option || ''}
      onChange={(e) => handlePriceOptionChange(0, 'option', e.target.value)}
      className="w-1/2 px-3 py-2 border rounded mr-2"
      placeholder="금액"
    />
    <span className="text-gray-700">원</span>
  </div>
  
  {/* 회당 가격 */}
  <div className="flex items-center mb-4">
    <span className="w-1/4 text-gray-700">회당 가격:</span>
    <input
      type="number"
      name="frequency"
      value={formData.price_options[0]?.frequency || ''}
      onChange={(e) => handlePriceOptionChange(0, 'frequency', e.target.value)}
      className="w-1/5 px-3 py-2 border rounded mr-2"
      placeholder="횟수"
      min="0"
      max="30"
    />
    <span className="text-gray-700">회</span>
    <input
      type="text" // 숫자 입력을 위한 텍스트 필드로 변경
      name="amount"
      value={formData.price_options[0]?.amount ? formData.price_options[0].amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") : ''}
      onChange={(e) => handlePriceOptionChange(0, 'amount', e.target.value.replace(/,/g, ''))} // 콤마 제거 후 저장
      className="w-1/2 px-3 py-2 border rounded ml-2"
      placeholder="금액"
    />
    <span className="text-gray-700">원</span>
  </div>
</div>

          <div className="mb-4">
  <label htmlFor="bank_name" className="block mb-2">은행 이름</label>
  <input
    type="text"
    id="bank_name"
    name="bank_name"
    value={formData.bank_name}
    onChange={handleChange}
    className="w-full px-3 py-2 border rounded mb-2"
    placeholder="은행 이름"
  />
  <label htmlFor="account" className="block mb-2">계좌 번호</label>
  <input
    type="text"
    id="account"
    name="account"
    value={formData.account}
    onChange={handleChange}
    className="w-full px-3 py-2 border rounded"
    placeholder="계좌 번호"
  />
  <label htmlFor="account_name" className="block mb-2">예금주</label>
  <input
    type="text"
    id="account_name"
    name="account_name"
    value={formData.account_name}
    onChange={handleChange}
    className="w-full px-3 py-2 border rounded"
    placeholder="예금주"
  />
  {/* 대표 계좌 선택 체크박스 추가 */}
  <div className="flex items-center mt-2">
    <input
      type="checkbox"
      id="main_account"
      name="main_account"
      checked={formData.main_account}
      onChange={handleChange}
      className="mr-2"
    />
    <label htmlFor="main_account" className="text-sm">
      이 계좌를 대표 계좌로 설정
    </label>
  </div>
</div>

          {/* 프로필 이미지 업로드 */}
          <div className="mb-4">
            <label className="block mb-2">프로필 이미지 업로드</label>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="w-full"
            />
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

          {/* 제출 버튼 */}
          <div className="mt-6">
            <button type="submit" className="w-full bg-[#081f5c] text-white py-2 rounded hover:bg-[#041c3d]">
              회원가입 하기
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default TrainerSignup;
