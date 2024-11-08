// PTModal.js
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import Buttons from '../common/Buttons';
import { loadTossPayments } from '@tosspayments/tosspayments-sdk';
import { createPtPayment } from '../../redux/slice/paymentSlice';

export const PTModal = () => {
  const dispatch = useDispatch();
  const [selectedOption, setSelectedOption] = useState('');
  const [widgets, setWidgets] = useState(null);
  const user_number = 28; // 실제 사용자 ID로 교체
  const trainer_number = 12; // 실제 트레이너 ID로 교체
  const widgetClientKey = 'test_gck_docs_Ovk5rk1EwkEbP0W43n07xlzm';
  const [isPaymentReady, setIsPaymentReady] = useState(false); // 결제 준비 상태 추가
  const generateRandomString = () => window.btoa(Math.random()).slice(0, 20);

  const handleCheckboxChange = (option) => {
    setSelectedOption((prevOption) => (prevOption === option ? '' : option));
  };

  const handleWidgetRender = async () => {
    if (!selectedOption) {
      alert('결제 옵션을 선택해 주세요.');
      return;
    }

    const amount = selectedOption === 'oneday' ? 50000 : 800000;

    try {
      const tossPayments = await loadTossPayments(widgetClientKey);
      console.log('tossPayments 객체:', tossPayments);

      console.log('createPtPayment 호출 시작');
      const result = await dispatch(
        createPtPayment({
          user_number,
          trainer_number,
          payment_option: 1,
        })
      ).unwrap();

      const { pt_number, payment_number } = result; // createPtPayment에서 payment_number도 가져옴

      const paymentWidgets = tossPayments.widgets({ customerKey: 'ANONYMOUS' });
      console.log('widgets 객체:', paymentWidgets);

      await paymentWidgets.setAmount({ currency: 'KRW', value: amount });
      await paymentWidgets.renderPaymentMethods({
        selector: '#payment-method',
      });
      await paymentWidgets.renderAgreement({
        selector: '#agreement',
      });

      console.log('위젯 렌더링 완료');
      setWidgets({ paymentWidgets, pt_number, payment_number }); // payment_number 저장
      setIsPaymentReady(true);
    } catch (error) {
      console.error('위젯 렌더링 중 오류 발생:', error);
      alert('위젯 렌더링에 실패했습니다.');
    }
  };

  const handlePaymentRequest = async () => {
    if (!widgets) {
      alert('결제 정보를 선택한 후에 시도해 주세요.');
      return;
    }

    const { paymentWidgets, payment_number, pt_number } = widgets; // payment_number 가져오기
    const amount = selectedOption === 'oneday' ? 50000 : 800000; // 선택한 결제 옵션에 따라 amount 값 설정
    const order_id = generateRandomString(); // orderId로 사용될 값 생성
    const payment_key = payment_number; // payment_number를 payment_key로 설정

    try {
      await paymentWidgets.requestPayment({
        orderId: order_id,
        orderName:
          selectedOption === 'oneday' ? '원데이 클래스' : '20회 클래스',
        successUrl: `${window.location.origin}/Success?status=completed&paymentNumber=${payment_number}&ptNumber=${pt_number}`,
        failUrl: `${window.location.origin}/payment-fail`,
        customerName: '이건트레이너',
      });
    } catch (error) {
      console.error('결제 생성 중 오류 발생:', error);
      alert('결제 요청에 실패했습니다.');
    }
  };

  return (
    <div className="max-w-sm p-6 rounded-lg relative">
      {/* 트레이너 정보 섹션 */}
      <div className="flex gap-4 mb-6">
        <picture className="w-32 h-32 bg-gray-200 rounded-lg">
          <img
            src="/path-to-image.jpg"
            alt="트레이너 프로필"
            className="w-full h-full object-cover rounded-lg"
          />
        </picture>

        <div className="flex flex-col gap-2">
          <p className="font-bold text-lg">이건트레이너</p>
          <p className="text-gray-600">동대문구 회기동</p>
          <div className="flex gap-2">
            <span className="bg-gray-100 px-3 py-1 rounded-full text-sm">
              교정/재활
            </span>
            <span className="bg-gray-100 px-3 py-1 rounded-full text-sm">
              여성전문
            </span>
          </div>
        </div>
      </div>

      {/* 가격 선택 섹션 */}
      <div className="flex flex-col gap-4 mb-6">
        <div className="border rounded-lg p-4 flex items-center justify-between">
          <input
            type="checkbox"
            id="oneday"
            className="w-5 h-5"
            checked={selectedOption === 'oneday'}
            onChange={() => handleCheckboxChange('oneday')}
          />
          <label htmlFor="oneday">원데이 클래스 - 50분 5만원</label>
        </div>

        <div className="border rounded-lg p-4 flex items-center justify-between">
          <input
            type="checkbox"
            id="ferprice"
            className="w-5 h-5"
            checked={selectedOption === 'ferprice'}
            onChange={() => handleCheckboxChange('ferprice')}
          />
          <label htmlFor="ferprice">20회 - 시간당 4만원</label>
        </div>

        <p className="text-red-400 text-sm">
          회원님은 선택하신 회차/시간대 선택을 하셔야 합니다
        </p>
      </div>

      {/* 결제 위젯 및 결제 요청 버튼 */}
      <div id="payment-method" />
      <div id="agreement" />

      <div className="flex gap-4 mt-4 justify-center items-center">
        {/* 위젯 렌더링 버튼 */}
        {!isPaymentReady && (
          <Buttons size="middle" color="#3282f6" onClick={handleWidgetRender}>
            결제 요청하기
          </Buttons>
        )}

        {/* 결제 요청 버튼 */}
        {isPaymentReady && (
          <Buttons size="middle" color="#ff4b4b" onClick={handlePaymentRequest}>
            결제 하기
          </Buttons>
        )}
      </div>
    </div>
  );
};
export default PTModal;
