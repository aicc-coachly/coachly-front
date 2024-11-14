import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getUserInbody, postUserInbody } from '../../redux/slice/userSlice';
import { useModal } from '../common/ModalProvider';

export const BodyCompositionModal = ({ onClose }) => {
  const user = useSelector((state) => state.user?.userInfo);
  const dispatch = useDispatch();
  const { closeModal } = useModal();
  // console.log(user);

  const [measurementDate, setMeasurementDate] = useState('');
  const [height, setHeight] = useState('');
  const [weight, setWeight] = useState('');
  const [bodyFatPercentage, setBodyFatPercentage] = useState('');
  const [bodyFatMass, setBodyFatMass] = useState('');
  const [muscleMass, setMuscleMass] = useState('');
  const [metabolicRate, setMetabolicRate] = useState('');
  const [totalBodyWater, setTotalBodyWater] = useState('');
  const [protein, setProtein] = useState('');
  const [abdominalFatAmount, setAbdominalFatAmount] = useState('');
  const [visceralFatLevel, setVisceralFatLevel] = useState('');

  const handleSave = () => {
    const inbodyData = {
      user_measurement_date: measurementDate,
      user_height: height,
      user_weight: weight,
      user_body_fat_percentage: bodyFatPercentage,
      user_body_fat_mass: bodyFatMass,
      user_muscle_mass: muscleMass,
      user_metabolic_rate: metabolicRate,
      user_total_body_water: totalBodyWater,
      user_protein: protein,
      user_abdominal_fat_amount: abdominalFatAmount,
      user_visceral_fat_level: visceralFatLevel,
      user_number: user.user_number,
    };
    console.log(inbodyData);
    // user_id를 포함하여 액션 호출
    dispatch(postUserInbody({ user_id: user.user_id, inbodyData }))
      .then(() => {
        alert('인바디 정보가 저장되었습니다.');
        dispatch(getUserInbody(user.user_id));
        closeModal();
      })
      .catch((error) => {
        console.error('인바디 정보 저장 오류:', error);
        alert('저장에 실패했습니다.');
      });
  };

  return (
    <div className="max-w-md p-6 bg-white rounded-lg shadow-md mx-auto">
      <h2 className="text-xl font-bold text-center mb-6 text-gray-700">
        인바디 상세 정보 입력
      </h2>

      {/* 입력 필드 그리드 레이아웃 */}
      <div className="grid grid-cols-2 gap-4 text-center text-gray-600">
        <div className="bg-gray-100 p-4 rounded-lg shadow-sm">
          <label className="text-sm font-semibold text-gray-500 mb-1 block">
            측정날짜
          </label>
          <input
            type="text"
            value={measurementDate}
            onChange={(e) => setMeasurementDate(e.target.value)}
            className="w-full bg-white text-lg font-bold text-gray-700 p-2 rounded text-center"
            placeholder="YYYY-MM-DD"
          />
        </div>

        <div className="bg-gray-100 p-4 rounded-lg shadow-sm">
          <label className="text-sm font-semibold text-gray-500 mb-1 block">
            키(cm)
          </label>
          <input
            type="text"
            value={height}
            onChange={(e) => setHeight(e.target.value)}
            className="w-full bg-white text-lg font-bold text-gray-700 p-2 rounded text-center"
          />
        </div>

        <div className="bg-gray-100 p-4 rounded-lg shadow-sm">
          <label className="text-sm font-semibold text-gray-500 mb-1 block">
            체중(kg)
          </label>
          <input
            type="text"
            value={weight}
            onChange={(e) => setWeight(e.target.value)}
            className="w-full bg-white text-lg font-bold text-gray-700 p-2 rounded text-center"
          />
        </div>

        <div className="bg-gray-100 p-4 rounded-lg shadow-sm">
          <label className="text-sm font-semibold text-gray-500 mb-1 block">
            체지방률(%)
          </label>
          <input
            type="text"
            value={bodyFatPercentage}
            onChange={(e) => setBodyFatPercentage(e.target.value)}
            className="w-full bg-white text-lg font-bold text-gray-700 p-2 rounded text-center"
          />
        </div>

        <div className="bg-gray-100 p-4 rounded-lg shadow-sm">
          <label className="text-sm font-semibold text-gray-500 mb-1 block">
            체지방량(kg)
          </label>
          <input
            type="text"
            value={bodyFatMass}
            onChange={(e) => setBodyFatMass(e.target.value)}
            className="w-full bg-white text-lg font-bold text-gray-700 p-2 rounded text-center"
          />
        </div>

        <div className="bg-gray-100 p-4 rounded-lg shadow-sm">
          <label className="text-sm font-semibold text-gray-500 mb-1 block">
            골격근량(kg)
          </label>
          <input
            type="text"
            value={muscleMass}
            onChange={(e) => setMuscleMass(e.target.value)}
            className="w-full bg-white text-lg font-bold text-gray-700 p-2 rounded text-center"
          />
        </div>

        <div className="bg-gray-100 p-4 rounded-lg shadow-sm">
          <label className="text-sm font-semibold text-gray-500 mb-1 block">
            기초대사량
          </label>
          <input
            type="text"
            value={metabolicRate}
            onChange={(e) => setMetabolicRate(e.target.value)}
            className="w-full bg-white text-lg font-bold text-gray-700 p-2 rounded text-center"
          />
        </div>

        <div className="bg-gray-100 p-4 rounded-lg shadow-sm">
          <label className="text-sm font-semibold text-gray-500 mb-1 block">
            체수분(L)
          </label>
          <input
            type="text"
            value={totalBodyWater}
            onChange={(e) => setTotalBodyWater(e.target.value)}
            className="w-full bg-white text-lg font-bold text-gray-700 p-2 rounded text-center"
          />
        </div>

        <div className="bg-gray-100 p-4 rounded-lg shadow-sm">
          <label className="text-sm font-semibold text-gray-500 mb-1 block">
            단백질(kg)
          </label>
          <input
            type="text"
            value={protein}
            onChange={(e) => setProtein(e.target.value)}
            className="w-full bg-white text-lg font-bold text-gray-700 p-2 rounded text-center"
          />
        </div>

        <div className="bg-gray-100 p-4 rounded-lg shadow-sm">
          <label className="text-sm font-semibold text-gray-500 mb-1 block">
            복부지방률
          </label>
          <input
            type="text"
            value={abdominalFatAmount}
            onChange={(e) => setAbdominalFatAmount(e.target.value)}
            className="w-full bg-white text-lg font-bold text-gray-700 p-2 rounded text-center"
            placeholder="최대 1.2"
          />
        </div>

        <div className="bg-gray-100 p-4 rounded-lg shadow-sm">
          <label className="text-sm font-semibold text-gray-500 mb-1 block">
            내장지방레벨(Lv)
          </label>
          <input
            type="text"
            value={visceralFatLevel}
            onChange={(e) => setVisceralFatLevel(e.target.value)}
            className="w-full bg-white text-lg font-bold text-gray-700 p-2 rounded text-center"
            placeholder="최대 20"
          />
        </div>
      </div>

      <div className="flex gap-4 mt-6">
        <button
          onClick={handleSave}
          className="w-full bg-blue-500 py-2 rounded-lg font-semibold text-gray-200 shadow-md hover:shadow-lg transition duration-200"
        >
          저장하기
        </button>
      </div>
    </div>
  );
};
