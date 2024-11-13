import React, { useEffect, useState, useRef } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import { completePtPayment } from "../../redux/slice/paymentSlice";

const Success = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const [isLoading, setIsLoading] = useState(true);
  const paymentSuccess = useRef(false); // useRef로 paymentSuccess 상태 관리

  const MAX_RETRY = 3; // 최대 재시도 횟수
  const RETRY_DELAY = 5000; // 재시도 딜레이 (5초)

  useEffect(() => {
    console.log("useEffect triggered in Success.js");
    const searchParams = new URLSearchParams(location.search);
    const ptNumber = searchParams.get("ptNumber");
    const paymentKey = searchParams.get("paymentKey");
    const orderId = searchParams.get("orderId");
    const amount = searchParams.get("amount");
    const payment_number = searchParams.get("paymentNumber");

    // URL 파라미터 확인
    console.log("URL Params:", {
      paymentKey,
      orderId,
      amount,
      payment_number,
      ptNumber,
    });

    if (!ptNumber || !paymentKey || !orderId || !amount || !payment_number) {
      setIsLoading(false);
      alert("필수 결제 정보가 누락되었습니다.");
      return; // 함수 종료
    }

    const processPaymentCompletion = async (retryCount = 0) => {
      if (paymentSuccess.current) {
        return; // 결제가 이미 성공한 경우 추가적인 재시도를 방지
      }

      try {
        if (retryCount === 0) {
          console.log("첫 시도: 약간의 딜레이 추가");
          await new Promise((resolve) => setTimeout(resolve, RETRY_DELAY));
        }

        console.log("dispatching completePtPayment...");
        const result = await dispatch(
          completePtPayment({
            payment_number,
            paymentKey,
            orderId,
            amount,
            ptNumber,
          })
        ).unwrap();

        // 결제 완료 성공 시
        console.log("결제가 완료되었습니다:", result);
        alert("결제가 완료되었습니다!");
        paymentSuccess.current = true; // 성공 상태 설정
        navigate("/usermypage");
      } catch (error) {
        console.error(
          `결제 완료 처리 중 오류 발생, 재시도 횟수: ${retryCount + 1}`,
          error
        );

        if (retryCount < MAX_RETRY && !paymentSuccess.current) {
          // 최대 재시도 횟수에 도달하지 않은 경우, 딜레이 후 재시도
          console.log(`재시도 중... (${retryCount + 1}/${MAX_RETRY})`);
          await new Promise((resolve) => setTimeout(resolve, RETRY_DELAY));
          return processPaymentCompletion(retryCount + 1);
        } else {
          // 최대 재시도 후 실패하면 오류 메시지 표시
          alert("결제 완료 처리 중 문제가 발생했습니다. 다시 시도해 주세요.");
          setIsLoading(false);
        }
      }
    };

    processPaymentCompletion();
  }, [dispatch, location.search, navigate, isLoading]);

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
