import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector} from 'react-redux';
import Buttons from '../common/Buttons';
import { loadTossPayments } from '@tosspayments/tosspayments-sdk';
import { createPtPayment } from '../../redux/slice/paymentSlice';
import { useModal } from '../common/ModalProvider';
import { getTrainerPtCost } from '../../redux/slice/trainerSlice';

export const PTModal = ({ trainer }) => {
  const { openModal, closeModal } = useModal();
  const dispatch = useDispatch();
  const [selectedOption, setSelectedOption] = useState('');
  const [widgets, setWidgets] = useState(null);
  const [isPaymentReady, setIsPaymentReady] = useState(false);
  const user_number = 28;
  const widgetClientKey = 'test_gck_docs_Ovk5rk1EwkEbP0W43n07xlzm';
  const trainerProfile = trainer || {};
  const trainerImage = trainerProfile.image;
  const path = 'http://localhost:8000';

  // PT 가격 정보 가져오기
  useEffect(() => {
    if (trainer && trainer.trainer_number) {
      dispatch(getTrainerPtCost(trainer.trainer_number));
    }
  }, [trainer, dispatch]);

  // Redux에서 가격 옵션 데이터 가져오기
  const { data: trainerPtCostData } = useSelector((state) => state.trainer);
  const filteredPtCostData = trainerPtCostData && Array.isArray(trainerPtCostData)
    ? trainerPtCostData.map(({ amount_number, option, amount, frequency }) => ({
        amount_number,
        option,
        amount,
        frequency,
      }))
    : [];
    
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
          trainer_number: trainerProfile.trainer_id,
          payment_option: 1,
        })
      ).unwrap();

      const { pt_number, payment_number } = result;

      const paymentWidgets = tossPayments.widgets({ customerKey: 'ANONYMOUS' });
      console.log('widgets 객체:', paymentWidgets);

      await paymentWidgets.setAmount({ currency: 'KRW', value: amount });
      setWidgets({ paymentWidgets, pt_number, payment_number });
      setIsPaymentReady(true);

      // 결제 모달 열기
      openModal(
        <div className="p-6 bg-white rounded-lg  w-full max-w-sm">
          <h2 className="text-xl font-bold mb-4 felx justify-center text-center">
            {trainerProfile.name} 트레이너 결제
          </h2>
          <div id="payment-method-container">
            <div id="payment-method" />
            <div id="agreement" />
          </div>
          <div className='flex gap-4 mt-4 justify-center items-center'>
          <Buttons
            size="middle"
            color="#4831D4"
            onClick={handlePaymentRequest}
            className="mt-4 "
          >
            결제 하기
          </Buttons>
          </div>
        </div>
      );

      // 결제 위젯 렌더링
      setTimeout(() => {
        paymentWidgets.renderPaymentMethods({
          selector: '#payment-method',
        });
        paymentWidgets.renderAgreement({
          selector: '#agreement',
        });
      }, 0);
      console.log('위젯 렌더링 완료');
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

    const { paymentWidgets, payment_number, pt_number } = widgets;
    const amount = selectedOption === 'oneday' ? 50000 : 800000;
    const order_id = generateRandomString();

    try {
      await paymentWidgets.requestPayment({
        orderId: order_id,
        orderName: selectedOption === 'oneday' ? '원데이 클래스' : '20회 클래스',
        successUrl: `${window.location.origin}/Success?status=completed&paymentNumber=${payment_number}&ptNumber=${pt_number}`,
        failUrl: `${window.location.origin}/payment-fail`,
        customerName: trainerProfile.name,
      });
    } catch (error) {
      console.error('결제 생성 중 오류 발생:', error);
      alert('결제 요청에 실패했습니다.');
    }
  };

  return (
    <div className="max-w-sm p-6 w-full rounded-lg relative bg-white">
      {/* 트레이너 정보 섹션 */}
      <div className="flex gap-4 mb-6">
        <picture className="w-32 h-32 bg-gray-200 rounded-lg flex items-center justify-center">
          {trainerImage ? (
            <img
              src={`${path}/${trainerImage}`}
              alt="프로필"
              className="w-full h-full object-cover rounded-lg"
            />
          ) : (
            <p className="text-center text-gray-400">이미지 없음</p>
          )}
        </picture>

        <div className="flex flex-col gap-4">
          <p className="font-bold text-lg">{trainerProfile.name}</p>
          <p className="text-[#4831D4]">
            {trainerProfile.trainer_address} {trainerProfile.trainer_detail_address}
          </p>
          <div className="flex gap-2">
            {trainer.service_options.map((option, index) => (
              <span
                key={index}
                className="text-xs bg-[#CCF381] text-[#4831D4] px-3 py-1 rounded-full"
              >
                {option}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* 가격 선택 섹션 */}
      <div className="flex flex-col gap-4 mb-6">
        {filteredPtCostData.map((option) => (
          <div key={option.amount_number} className="border rounded-lg p-4 flex items-center gap-3 justify-start">
            <input
              type="checkbox"
              id={option.option}
              className="w-5 h-5"
              checked={selectedOption === option.option}
              onChange={() => handleCheckboxChange(option.option)}
            />
            <label htmlFor={option.option}>
              {option.option} - {option.amount}원 {option.frequency && `(${option.frequency}회)`}
            </label>
          </div>
        ))}
      </div>

      <div className="flex gap-4 mt-4 justify-center items-center">
        {!isPaymentReady && (
          <Buttons size="middle" color="#4831D4" onClick={handleWidgetRender}>
            결제 요청하기
          </Buttons>
        )}
      </div>
    </div>
  );
};

export default PTModal;
