import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate, useLocation } from 'react-router-dom';
import { completePtPayment } from '../../redux/slice/paymentSlice';

const Success = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    console.log('useEffect triggered in Success.js');
    const searchParams = new URLSearchParams(location.search);
    const ptNumber = searchParams.get('ptNumber'); // 추가
    const paymentKey = searchParams.get('paymentKey');
    const orderId = searchParams.get('orderId'); // orderId 추가
    const amount = searchParams.get('amount');
    const payment_number = searchParams.get('paymentNumber');
    console.log('URL Params:', {
      paymentKey,
      orderId,
      amount,
      payment_number,
      ptNumber,
    });
    if (payment_number && paymentKey && orderId && amount && ptNumber) {
      dispatch(
        completePtPayment({
          payment_number,
          paymentKey,
          orderId,
          amount,
          ptNumber,
        })
      )
        .unwrap()
        .then((result) => {
          alert('결제가 완료되었습니다!');
          navigate('/UserMypage');
        })
        .catch((error) => {
          alert(
            '결제 완료 처리 중 문제가 발생했습니다. 다시 시도해 주세요.',
            error
          );
        });
    }
  }, [dispatch, location.search, navigate]);

  return (
    <div className="relative flex flex-col justify-center items-center p-4 bg-[#edf1f6] shadow-md max-w-[390px] mx-auto h-[100vh] text-center">
      <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-blue-500 border-solid mb-4"></div>
      <p className="text-gray-700 text-lg font-semibold mb-2">
        잠시만 기다려 주세요
      </p>
      <p className="text-gray-600">결제 완료 처리가 진행 중입니다.</p>
      <p className="text-sm text-gray-500 mt-4">
        창을 닫지 말고 잠시만 기다려 주세요.
      </p>
    </div>
  );
};

export default Success;
