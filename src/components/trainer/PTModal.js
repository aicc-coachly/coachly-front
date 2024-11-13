// PTModal.js
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Buttons from "../common/Buttons";
import { loadTossPayments } from "@tosspayments/tosspayments-sdk";
import { createPtPayment } from "../../redux/slice/paymentSlice";
import { getTrainer } from "../../redux/slice/trainerSlice";
import { useModal } from "../common/ModalProvider";

export const PTModal = ({
  trainer,
  trainer_name,
  trainer_number,
  user_number,
  user_name,
  pt_cost_option,
}) => {
  const dispatch = useDispatch();
  const { openModal, closeModal } = useModal();
  const [selectedOption, setSelectedOption] = useState("");
  const [isPaymentReady, setIsPaymentReady] = useState(false); // 결제 준비 상태 추가
  const trainerProfile = trainer || {};
  const trainerImage = trainerProfile.image;
  const path = "http://localhost:8000";
  // console.log(user_number);
  useEffect(() => {
    if (trainer_number) {
      dispatch(getTrainer(trainer_number));
    }
  }, [trainer_number, dispatch]);

  const trainerPtCostData = pt_cost_option;
  const filteredPtCostData = trainerPtCostData
    ? trainerPtCostData.map(({ amount_number, option, amount }) => ({
        amount_number,
        option,
        amount,
      }))
    : [];

  const widgetClientKey = process.env.REACT_APP_WIDGET_CLIENT_KEY;
  const generateRandomString = () => window.btoa(Math.random()).slice(0, 20);

  const handleCheckboxChange = (amountNumber) => {
    setSelectedOption(amountNumber);
  };

  const handleWidgetRender = async () => {
    if (!selectedOption) {
      alert("결제 옵션을 선택해 주세요.");
      return;
    }

    const selectedCost = filteredPtCostData.find(
      (ptCost) => ptCost.amount_number === selectedOption
    );

    if (!selectedCost) {
      alert("선택한 결제 옵션이 유효하지 않습니다.");
      return;
    }

    const amount = parseInt(selectedCost.amount, 10);

    try {
      const tossPayments = await loadTossPayments(widgetClientKey);
      const paymentWidgets = tossPayments.widgets({ customerKey: "ANONYMOUS" });

      await paymentWidgets.setAmount({ currency: "KRW", value: amount });
      setIsPaymentReady(true);

      openModal(
        <div className="p-6 bg-white rounded-lg w-full max-w-sm">
          <h2 className="text-xl font-bold mb-4 text-center">
            {selectedCost.option} 결제
          </h2>
          <p className="text-center mb-4">금액: {amount}원</p>
          <div id="payment-method-container">
            <div id="payment-method" />
            <div id="agreement" />
          </div>
          <div className="flex gap-4 mt-4 justify-center items-center">
            <Buttons
              size="middle"
              color="#4831D4"
              onClick={() => handlePaymentRequest(paymentWidgets, selectedCost)}
              className="mt-4"
            >
              결제 하기
            </Buttons>
          </div>
        </div>
      );

      setTimeout(() => {
        paymentWidgets.renderPaymentMethods({
          selector: "#payment-method",
        });
        paymentWidgets.renderAgreement({
          selector: "#agreement",
        });
      }, 0);
    } catch (error) {
      console.error("위젯 렌더링 중 오류 발생:", error);
      alert("위젯 렌더링에 실패했습니다.");
    }
  };

  const handlePaymentRequest = async (paymentWidgets, selectedCost) => {
    if (!paymentWidgets) {
      alert("결제 정보를 선택한 후에 시도해 주세요.");
      return;
    }

    const order_id = generateRandomString();

    try {
      const result = await dispatch(
        createPtPayment({
          user_number: user_number,
          trainer_number,
          payment_option: selectedOption,
          amount_number: selectedCost.amount_number,
        })
      ).unwrap();
      // console.log(user_number);
      const { pt_number, payment_number } = result;

      await paymentWidgets.requestPayment({
        orderId: order_id,
        orderName: selectedCost.option,
        successUrl: `${window.location.origin}/Success?status=completed&paymentNumber=${payment_number}&ptNumber=${pt_number}`,
        failUrl: `${window.location.origin}/payment-fail`,
        customerName: user_name || "유저이름",
      });

      console.log("결제 요청 성공");
    } catch (error) {
      console.error("결제 요청 중 오류 발생:", error);
      alert("결제 요청에 실패했습니다. 잠시 후 다시 시도해 주세요.");
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
            {trainerProfile.trainer_address || "주소 없음"}{" "}
            {trainerProfile.trainer_detail_address || ""}{" "}
          </p>
          <div className="flex gap-2">
            {trainer.service_options?.map((option, index) => (
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
        {filteredPtCostData.length > 0 ? (
          filteredPtCostData.map((ptCost) => (
            <div
              key={ptCost.amount_number}
              className="border rounded-lg p-4 flex items-center justify-between"
            >
              <input
                type="radio"
                name="ptOption"
                id={`option-${ptCost.amount_number}`}
                className="w-5 h-5"
                checked={selectedOption === ptCost.amount_number}
                onChange={() => handleCheckboxChange(ptCost.amount_number)}
              />
              <label htmlFor={`option-${ptCost.amount_number}`}>
                {ptCost.option} - 비용: {ptCost.amount}원
              </label>
            </div>
          ))
        ) : (
          <p>PT 비용 정보를 불러오지 못했습니다.</p>
        )}
      </div>

      <div className="flex gap-4 mt-4 justify-center items-center">
        {!isPaymentReady ? (
          <Buttons size="middle" color="#4831D4" onClick={handleWidgetRender}>
            결제 요청하기
          </Buttons>
        ) : null}
      </div>
    </div>
  );
};

export default PTModal;
PTModal.defaultProps = {
  trainer: {},
};
