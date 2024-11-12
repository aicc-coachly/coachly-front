import React, { useState } from "react";
import { useModal } from "../../components/common/ModalProvider";
import { useDispatch, useSelector } from "react-redux";
import {
  updateUserInbody,
  deleteUserInbody,
  getUserInbody,
} from "../../redux/slice/userSlice";

export const EditBodyCompositionModal = ({ inbodyData }) => {
  const dispatch = useDispatch();
  const { closeModal } = useModal();

  const [measurementDate, setMeasurementDate] = useState(
    inbodyData.user_measurement_date
  );
  const [height, setHeight] = useState(inbodyData.user_height);
  const [weight, setWeight] = useState(inbodyData.user_weight);
  const [bodyFatPercentage, setBodyFatPercentage] = useState(
    inbodyData.user_body_fat_percentage
  );
  const [bodyFatMass, setBodyFatMass] = useState(inbodyData.user_body_fat_mass);
  const [muscleMass, setMuscleMass] = useState(inbodyData.user_muscle_mass);
  const [metabolicRate, setMetabolicRate] = useState(
    inbodyData.user_metabolic_rate
  );
  const [abdominalFatAmount, setAbdominalFatAmount] = useState(
    inbodyData.user_abdominal_fat_amount
  );
  const [visceralFatLevel, setVisceralFatLevel] = useState(
    inbodyData.user_visceral_fat_level
  );
  const [totalBodyWater, setTotalBodyWater] = useState(
    inbodyData.user_total_body_water
  );
  const [protein, setProtein] = useState(inbodyData.user_protein);
  const userId = useSelector((state) => state.auth?.user?.user_id);
  // console.log(userId);

  const handleUpdate = () => {
    const updatedData = {
      user_measurement_date: measurementDate,
      user_height: height,
      user_weight: weight,
      user_body_fat_percentage: bodyFatPercentage,
      user_body_fat_mass: bodyFatMass,
      user_muscle_mass: muscleMass,
      user_metabolic_rate: metabolicRate,
      user_abdominal_fat_amount: abdominalFatAmount,
      user_visceral_fat_level: visceralFatLevel,
      user_total_body_water: totalBodyWater,
      user_protein: protein,
    };

    console.log("Updated data to be sent:", updatedData); // 업데이트된 데이터 확인

    dispatch(
      updateUserInbody({
        user_inbody_number: inbodyData.user_inbody_number, // 개별 인바디 번호 전달
        inbodyData: updatedData,
      })
    )
      .then(() => {
        alert("수정되었습니다.");
        dispatch(getUserInbody(userId)); // userId는 해당 유저 ID

        closeModal();
      })
      .catch((error) => {
        console.error("인바디 정보 수정 오류:", error);
        alert("수정에 실패했습니다.");
      });
  };

  const handleDelete = () => {
    dispatch(deleteUserInbody(inbodyData.user_inbody_number))
      .then(() => {
        alert("삭제되었습니다.");
        closeModal();
      })
      .catch((error) => {
        console.error("인바디 정보 삭제 오류:", error);
        alert("삭제에 실패했습니다.");
      });
  };

  return (
    <div className="max-w-sm p-6 rounded-lg relative">
      <h2 className="text-lg font-bold text-center mb-6">인바디 기록</h2>

      <div className="mb-4">
        <label className="block text-sm font-semibold mb-1">측정날짜</label>
        <input
          type="date"
          value={measurementDate}
          onChange={(e) => setMeasurementDate(e.target.value)}
          className="w-full bg-gray-200 p-2 rounded text-center"
        />
      </div>

      <div className="grid grid-cols-2 gap-4 mb-4">
        <div>
          <label className="block text-sm font-semibold">키(cm)</label>
          <input
            type="number"
            value={height}
            onChange={(e) => setHeight(e.target.value)}
            className="w-full bg-gray-200 p-2 rounded text-center"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold">체중(kg)</label>
          <input
            type="number"
            value={weight}
            onChange={(e) => setWeight(e.target.value)}
            className="w-full bg-gray-200 p-2 rounded text-center"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold">체지방률(%)</label>
          <input
            type="number"
            value={bodyFatPercentage}
            onChange={(e) => setBodyFatPercentage(e.target.value)}
            className="w-full bg-gray-200 p-2 rounded text-center"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold">체지방량(kg)</label>
          <input
            type="number"
            value={bodyFatMass}
            onChange={(e) => setBodyFatMass(e.target.value)}
            className="w-full bg-gray-200 p-2 rounded text-center"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold">골격근량(kg)</label>
          <input
            type="number"
            value={muscleMass}
            onChange={(e) => setMuscleMass(e.target.value)}
            className="w-full bg-gray-200 p-2 rounded text-center"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold">기초대사량</label>
          <input
            type="number"
            value={metabolicRate}
            onChange={(e) => setMetabolicRate(e.target.value)}
            className="w-full bg-gray-200 p-2 rounded text-center"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold">체수분(L)</label>
          <input
            type="number"
            value={totalBodyWater}
            onChange={(e) => setTotalBodyWater(e.target.value)}
            className="w-full bg-gray-200 p-2 rounded text-center"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold">단백질(kg)</label>
          <input
            type="number"
            value={protein}
            onChange={(e) => setProtein(e.target.value)}
            className="w-full bg-gray-200 p-2 rounded text-center"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold">
            복부지방률 (최대 1.2)
          </label>
          <input
            type="number"
            value={abdominalFatAmount}
            onChange={(e) => setAbdominalFatAmount(e.target.value)}
            className="w-full bg-gray-200 p-2 rounded text-center"
            max="1.2"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold">
            내장지방레벨 (최대 20)
          </label>
          <input
            type="number"
            value={visceralFatLevel}
            onChange={(e) => setVisceralFatLevel(e.target.value)}
            className="w-full bg-gray-200 p-2 rounded text-center"
            max="20"
          />
        </div>
      </div>

      <div className="flex gap-4 mt-4">
        <button
          onClick={handleUpdate}
          className="w-full bg-pink-200 py-2 rounded text-black font-semibold"
        >
          수정하기
        </button>
        <button
          onClick={handleDelete}
          className="w-full bg-pink-200 py-2 rounded text-black font-semibold"
        >
          삭제하기
        </button>
      </div>
    </div>
  );
};
