// PTModal.js
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Buttons from "../common/Buttons";
import { loadTossPayments } from "@tosspayments/tosspayments-sdk";
import { createPtPayment } from "../../redux/slice/paymentSlice";
import { getTrainer } from "../../redux/slice/trainerSlice";

export const PTModal = ({
  trainer_name,
  trainer_number,
  user_number,
  user_name,
  pt_cost_option,
}) => {
  const dispatch = useDispatch();
  const [selectedOption, setSelectedOption] = useState("");
  const [widgets, setWidgets] = useState(null);
  const [isPaymentReady, setIsPaymentReady] = useState(false); // 결제 준비 상태 추가

  // 유저 정보를 authSlice에서 가져오기
  // const user = useSelector((state) => state.user);
  // const user_number = useSelector((state) => state.auth?.user?.user_number);
  // console.log(user_name);
  // 트레이너 PT 비용 정보 가져오기
  useEffect(() => {
    if (trainer_number) {
      dispatch(getTrainer(trainer_number));
    }
  }, [trainer_number, dispatch]);
  // console.log(pt_cost_option);

  const trainerPtCostData = pt_cost_option;
  // console.log(trainerPtCostData);
  const filteredPtCostData = trainerPtCostData
    ? trainerPtCostData.map(({ amount_number, option, amount }) => ({
        amount_number,
        option,
        amount,
      }))
    : [];

  console.log("트레이너 PT 비용 정보:", filteredPtCostData);

  const widgetClientKey = process.env.REACT_APP_WIDGET_CLIENT_KEY;
  const generateRandomString = () => window.btoa(Math.random()).slice(0, 20);

  const handleCheckboxChange = (amountNumber) => {
    setSelectedOption(amountNumber); // 선택한 금액 옵션을 즉시 설정
  };

  // console.log(user_number);
  // console.log(trainer_number);

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
      await paymentWidgets.renderPaymentMethods({
        selector: "#payment-method",
      });
      await paymentWidgets.renderAgreement({
        selector: "#agreement",
      });

      console.log("위젯 렌더링 완료");
      setWidgets({ paymentWidgets });
      setIsPaymentReady(true);
    } catch (error) {
      console.error("위젯 렌더링 중 오류 발생:", error);
      alert("위젯 렌더링에 실패했습니다.");
    }
  };

  const handlePaymentRequest = async () => {
    if (!widgets) {
      alert("결제 정보를 선택한 후에 시도해 주세요.");
      return;
    }

    const { paymentWidgets } = widgets;
    const selectedCost = filteredPtCostData.find(
      (ptCost) => ptCost.amount_number === selectedOption
    );

    const order_id = generateRandomString();

    try {
      const result = await dispatch(
        createPtPayment({
          user_number,
          trainer_number,
          payment_option: selectedOption,
          amount_number: selectedCost.amount_number,
        })
      ).unwrap();

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
    <div>
      {/* 가격 선택 섹션 */}
      <div className="flex flex-col gap-4 mb-6">
        {filteredPtCostData.length > 0 ? (
          filteredPtCostData.map((ptCost) => (
            <div
              key={ptCost.amount_number}
              className="border rounded-lg p-4 flex items-center justify-between"
            >
              <input
                type="radio" // checkbox 대신 radio로 변경
                name="ptOption" // 동일한 name 속성 설정
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

      {/* 결제 위젯이 렌더링될 요소들 추가 */}
      <div id="payment-method" className="mt-4"></div>
      <div id="agreement" className="mt-4"></div>

      <div className=" flex items-center justify-center">
        {isPaymentReady === false ? (
          <Buttons onClick={handleWidgetRender}>결제 위젯 렌더링</Buttons>
        ) : (
          <Buttons onClick={handlePaymentRequest}>결제 요청</Buttons>
        )}
      </div>
    </div>
  );
};

export default PTModal;
