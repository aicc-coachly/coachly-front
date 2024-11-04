// src/pages/auth/TrainerSignup.js
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { RegisterTrainer } from '../../redux/trainer/TrainerThunks';
import {
  SelectAuthStatus,
  SelectTrainerError,
} from '../../redux/trainer/TrainerSelectors';

function TrainerSignup() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const authStatus = useSelector(SelectAuthStatus);
  const trainerError = useSelector(SelectTrainerError);
  const [formData, setFormData] = useState({
    trainer_id: '', // 아이디
    pass: '', // 비밀번호
    confirmPassword: '', // 비밀번호 확인
    name: '', // 이름
    phone: '', // 핸드폰 번호
    gender: '', // 성별
    resume: '', // 자기소개서
    trainer_zipcode: '', // 우편번호
    trainer_address: '', // 기본 주소
    trainer_detail_address: '', // 상세 주소
    option: '', // 옵션
    amount: '', // 금액
    frequency: '', // 빈도수
    account: '', // 계좌번호
    bank_name: '', // 은행명
    account_name: '', // 계좌 소유자명
    service_options: '', // 서비스 옵션
    classFee: '', // 원데이 클래스 비용
    consultationFee: '', // 회당 비용
    agreeTerms: false, // 개인정보 수집 동의
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.pass !== formData.confirmPassword) {
      alert('비밀번호가 일치하지 않습니다.');
      return;
    }

    const mappedData = {
      trainer_id: formData.trainer_id,
      pass: formData.pass,
      name: formData.name,
      phone: formData.phone,
      gender: formData.gender,
      resume: formData.resume,
      trainer_zipcode: formData.trainer_zipcode,
      trainer_address: formData.trainer_address,
      trainer_detail_address: formData.trainer_detail_address,
      option: formData.option,
      amount: formData.amount,
      frequency: formData.frequency,
      account: formData.account,
      bank_name: formData.bank_name,
      account_name: formData.account_name,
      service_options: formData.service_options,
      classFee: formData.classFee,
      consultationFee: formData.consultationFee,
    };

    dispatch(RegisterTrainer(mappedData));
  };

  // 회원가입 성공 또는 실패 시 처리
  useEffect(() => {
    if (authStatus === 'success') {
      alert('회원가입이 완료되었습니다.');
      navigate('/login'); // 로그인 페이지로 이동
    } else if (authStatus === 'failed' && trainerError) {
      alert(`회원가입 실패: ${trainerError}`);
    }
  }, [authStatus, trainerError, navigate]);

  return (
    <div className="flex flex-col min-h-screen">
      <div className="flex-grow max-w-[390px] mx-auto p-6 bg-white rounded-lg shadow-md overflow-y-auto mt-0 h-screen">
        <h2 className="text-2xl font-bold mb-4 text-center">
          트레이너 회원가입
        </h2>
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
            <label htmlFor="trainer_id" className="block mb-2">
              아이디
            </label>
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
          {/* 비밀번호 및 확인 */}
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
            <label htmlFor="service_options" className="block mb-2">
              특기 선택
            </label>
            <input
              type="text"
              id="service_options"
              name="service_options"
              value={formData.service_options}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded"
              placeholder="예: 요가, 필라테스 등"
            />
          </div>
          {/* 자기소개서 */}
          <div className="mb-4">
            <label htmlFor="resume" className="block mb-2">
              자기소개서
            </label>
            <textarea
              id="resume"
              name="resume"
              value={formData.resume}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded"
              placeholder="자기소개를 입력하세요."
            ></textarea>
          </div>
          {/* 우편 주소 */}
          <div className="mb-4">
            <label htmlFor="trainer_zipcode" className="block mb-2">
              우편 주소
            </label>
            <input
              type="text"
              id="trainer_zipcode"
              name="trainer_zipcode"
              value={formData.trainer_zipcode}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded"
              required
            />
          </div>
          {/* 수업 장소 */}
          <div className="mb-4">
            <label className="block mb-2">수업 장소</label>
            <input
              type="text"
              name="trainer_address"
              value={formData.trainer_address}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded mb-2"
              placeholder="주소 1"
            />
            <input
              type="text"
              name="trainer_detail_address"
              value={formData.trainer_detail_address}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded"
              placeholder="주소 2"
            />
          </div>
          {/* 계좌 정보 */}
          <div className="mb-4">
            <label htmlFor="account" className="block mb-2">
              계좌 정보
            </label>
            <input
              type="text"
              id="account"
              name="account"
              value={formData.account}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded"
              placeholder="계좌번호"
            />
            <input
              type="text"
              id="bank_name"
              name="bank_name"
              value={formData.bank_name}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded mt-2"
              placeholder="은행명"
            />
            <input
              type="text"
              id="account_name"
              name="account_name"
              value={formData.account_name}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded mt-2"
              placeholder="계좌 소유자명"
            />
          </div>
          {/* 가격 정보 */}
          <div className="mb-4">
            <label className="block mb-2">가격</label>
            <input
              type="text"
              name="classFee"
              value={formData.classFee}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded mb-2"
              placeholder="원데이 클래스 비용"
            />
            <input
              type="text"
              name="consultationFee"
              value={formData.consultationFee}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded"
              placeholder="회당 비용"
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
          {/* 회원가입 버튼 */}
          <button
            type="submit"
            className="w-full bg-[#081f5c] text-white py-2 rounded hover:bg-[#041c3d]"
          >
            회원가입 하기
          </button>
          <div className="h-16"></div> {/* 하단 여백 */}
        </form>
      </div>
    </div>
  );
}

export default TrainerSignup;
