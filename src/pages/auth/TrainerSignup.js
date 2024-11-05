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
    price_options: { 
      one_day: { amount: '', isChecked: false }, // 원데이 클래스
      per_session: { frequency: '', amount: '', isChecked: false }, // 회당 가격
      inquiry_needed: false // 문의 필요 여부
    },
    account: '',
    bank_name: '',
    account_name: '',
    main_account: false, // 대표계좌 설정
    service_options: [], // 특기 옵션
    agreeTerms: false, // 개인정보 수집 동의
  });

  const [selectedImage, setSelectedImage] = useState(null); // 이미지 선택 상태

  const optionMap = {
    '여성전문': 1,
    '선수/대회 전문': 2,
    '재활전문': 3,
    '실버 전문': 4,
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  // 특기 옵션 선택 핸들러
  const handleServiceOptionsChange = (option) => {
    const optionValue = optionMap[option];
    setFormData((prevFormData) => {
      const currentOptions = prevFormData.service_options;
      if (currentOptions.includes(optionValue)) {
        return {
          ...prevFormData,
          service_options: currentOptions.filter((item) => item !== optionValue),
        };
      } else {
        if (currentOptions.length < 2) {
          return {
            ...prevFormData,
            service_options: [...currentOptions, optionValue],
          };
        } else {
          const updatedOptions = [...currentOptions.slice(1), optionValue];
          return {
            ...prevFormData,
            service_options: updatedOptions,
          };
        }
      }
    });
  };

  // 이미지 파일 선택 처리
  const handleImageChange = (e) => {
    if (e.target.files.length > 0) {
      setSelectedImage(e.target.files[0]);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // 필수 값이 입력되었는지 확인하는 검증
    const { trainer_id, pass, name, phone, gender, trainer_address, agreeTerms } = formData;
    if (!trainer_id || !pass || !name || !phone || !gender || !trainer_address || !agreeTerms) {
      alert('모든 필수 필드를 입력하고 개인정보 수집 동의에 체크해 주세요.');
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
              {Object.keys(optionMap).map((option) => (
                <div key={option} className="flex flex-col items-center">
                  <label
                    className={`border rounded-lg w-full h-12 flex items-center justify-center cursor-pointer ${
                      formData.service_options.includes(optionMap[option]) ? 'bg-[#d0e3ff] text-white' : 'border-gray-300'
                    }`}
                  >
                    <input
                      type="checkbox"
                      name="service_options"
                      value={option}
                      checked={formData.service_options.includes(optionMap[option])}
                      onChange={() => handleServiceOptionsChange(option)}
                      className="hidden"
                    />
                    {option}
                  </label>
                </div>
              ))}
            </div>
          </div>

          {/* 자기소개서 */}
          <div className="mb-4">
            <label htmlFor="resume" className="block mb-2">자기소개서</label>
            <textarea
              id="resume"
              name="resume"
              value={formData.resume}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded"
              placeholder="자기소개를 입력하세요."
            ></textarea>
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
