import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  getTrainer,
  updateTrainerInfo,
  updateTrainerGymAddress,
  updateTrainerAccount,
  updateTrainerPtCost,
  updateTrainerImage, // 새로 추가된 업데이트 함수
} from '../../redux/slice/trainerSlice';

const TrainerProfile = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const path = 'http://localhost:8000';
  const profile = location.state?.profile || {};
  console.log(profile);

  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [resume, setResume] = useState('');
  const [trainerImage, setTrainerImage] = useState('');
  const [newImage, setNewImage] = useState(null); // 새 이미지 파일

  const [addressSections, setAddressSections] = useState({
    trainer_address: '',
    trainer_detail_address: '',
    trainer_zipcode: '',
  });

  const [bankAccount, setBankAccount] = useState({
    bank_name: '',
    account: '',
    account_name: '',
  });

  const [ptCostOptions, setPtCostOptions] = useState([]);

  useEffect(() => {
    // trainerInfo가 있을 때만 로컬 상태 초기화
    if (profile) {
      setName(profile.name || '');
      setPhone(profile.phone || '');
      setResume(profile.resume || '');
      setTrainerImage(profile.image || '');

      setAddressSections({
        trainer_address: profile.trainer_address || '',
        trainer_detail_address: profile.trainer_detail_address || '',
        trainer_zipcode: profile.trainer_zipcode || '',
      });

      if (profile.bank_account) {
        setBankAccount({
          bank_name: profile.bank_account.bank_name || '',
          account: profile.bank_account.account || '',
          account_name: profile.bank_account.account_name || '',
        });
      }

      if (profile.pt_cost_options) {
        setPtCostOptions(profile.pt_cost_options);
      }
    }
  }, [profile]); // trainerInfo가 업데이트될 때만 실행

  const handleImageChange = (e) => {
    setNewImage(e.target.files[0]);
  };

  const handlePtCostChange = (index, field, value) => {
    const updatedOptions = [...ptCostOptions];
    updatedOptions[index] = {
      ...updatedOptions[index],
      [field]: value,
    };
    setPtCostOptions(updatedOptions);
  };

  const handleSave = async () => {
    // 기본 정보 업데이트
    const trainerData = { name, phone };
    await dispatch(
      updateTrainerInfo({
        trainer_number: profile.trainer_number,
        updateData: trainerData,
      })
    );

    // 다른 업데이트도 마찬가지로 await을 사용하여 순차적으로 실행
    const addressData = addressSections;
    await dispatch(
      updateTrainerGymAddress({
        trainer_number: profile.trainer_number,
        updateData: addressData,
      })
    );

    const bankData = bankAccount;
    await dispatch(
      updateTrainerAccount({
        trainer_number: profile.trainer_number,
        updateData: bankData,
      })
    );

    for (const option of ptCostOptions) {
      await dispatch(
        updateTrainerPtCost({
          trainer_number: profile.trainer_number,
          updateData: {
            amount: option.amount,
            frequency: option.frequency,
            option: option.option,
          },
        })
      );
    }

    const resumeAndImageData = new FormData();
    resumeAndImageData.append('resume', resume);
    if (newImage) {
      resumeAndImageData.append('trainer_image', newImage);
    }

    await dispatch(
      updateTrainerImage({
        trainer_number: profile.trainer_number,
        resume: resume,
        trainer_image: newImage,
      })
    );

    // 업데이트 후 최신 데이터를 가져오기
    await dispatch(getTrainer());

    // 페이지 이동
    navigate('/TrainerMyPage');
  };

  return (
    <div className="max-w-[390px] mx-auto bg-gray-50 p-6 rounded-lg shadow-lg">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">내 정보</h2>
      </div>

      {/* 프로필 사진 */}
      <div className="w-40 h-40 bg-gray-200 mx-auto mb-6 rounded-full overflow-hidden shadow-md">
        {trainerImage ? (
          <img
            src={`${path}/${profile.image}`}
            alt="프로필 사진"
            className="object-cover w-full h-full"
          />
        ) : (
          <p className="text-center text-gray-500 pt-16">이미지 없음</p>
        )}
      </div>

      {/* 이미지 수정 */}
      <div className="mb-6 text-center">
        <input
          type="file"
          onChange={handleImageChange}
          className="text-sm text-gray-500 border border-gray-300 rounded-md py-1 px-2 focus:outline-none"
        />
      </div>

      {/* 이름, 전화번호, 소개 */}
      <div className="text-start px-4 mb-6 space-y-4">
        <div>
          <p className="text-base font-medium text-gray-700">이름</p>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full text-sm text-gray-600 border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-200"
          />
        </div>
        <div>
          <p className="text-base font-medium text-gray-700">전화번호</p>
          <input
            type="text"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="w-full text-sm text-gray-600 border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-200"
          />
        </div>
        <div>
          <p className="text-base font-medium text-gray-700">소개</p>
          <textarea
            value={resume}
            onChange={(e) => setResume(e.target.value)}
            className="w-full text-sm text-gray-600 border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-200"
            rows="4"
          />
        </div>
      </div>

      {/* 주소 관리 */}
      <div className="mb-6 px-4">
        <h2 className="text-lg font-semibold text-gray-800 mb-3">주소 관리</h2>
        <div className="flex flex-col space-y-3">
          <input
            type="text"
            placeholder="주소"
            value={addressSections.trainer_address}
            onChange={(e) =>
              setAddressSections((prev) => ({
                ...prev,
                trainer_address: e.target.value,
              }))
            }
            className="w-full text-sm text-gray-600 border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-200"
          />
          <input
            type="text"
            placeholder="상세주소"
            value={addressSections.trainer_detail_address}
            onChange={(e) =>
              setAddressSections((prev) => ({
                ...prev,
                trainer_detail_address: e.target.value,
              }))
            }
            className="w-full text-sm text-gray-600 border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-200"
          />
        </div>
      </div>

      {/* 계좌 정보 */}
      <div className="mb-6 px-4">
        <h2 className="text-lg font-semibold text-gray-800 mb-3">계좌 정보</h2>
        <div className="flex flex-col space-y-3">
          <input
            type="text"
            placeholder="은행"
            value={bankAccount.bank_name}
            onChange={(e) =>
              setBankAccount({ ...bankAccount, bank_name: e.target.value })
            }
            className="w-full text-sm text-gray-600 border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-200"
          />
          <input
            type="text"
            placeholder="계좌번호"
            value={bankAccount.account}
            onChange={(e) =>
              setBankAccount({ ...bankAccount, account: e.target.value })
            }
            className="w-full text-sm text-gray-600 border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-200"
          />
          <input
            type="text"
            placeholder="예금주"
            value={bankAccount.account_name}
            onChange={(e) =>
              setBankAccount({ ...bankAccount, account_name: e.target.value })
            }
            className="w-full text-sm text-gray-600 border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-200"
          />
        </div>
      </div>

      {/* PT 비용 옵션 */}
      <div className="mb-6 px-4">
        <h2 className="text-lg font-semibold text-gray-800 mb-3">
          PT 비용 옵션
        </h2>
        {ptCostOptions.map((option, index) => (
          <div key={index} className="mb-4">
            <p className="font-medium text-gray-700 mb-2">{option.option}</p>
            <div className="flex space-x-3">
              <input
                type="number"
                placeholder="가격"
                value={option.amount}
                onChange={(e) =>
                  handlePtCostChange(index, 'amount', e.target.value)
                }
                className="w-1/2 text-sm text-gray-600 border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-200"
              />
              <input
                type="number"
                placeholder="횟수"
                value={option.frequency}
                onChange={(e) =>
                  handlePtCostChange(index, 'frequency', e.target.value)
                }
                className="w-1/2 text-sm text-gray-600 border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-200"
              />
            </div>
          </div>
        ))}
      </div>

      {/* 저장하기 버튼 */}
      <button
        onClick={handleSave}
        className="w-full py-3 bg-pink-400 text-white text-sm font-semibold rounded-md shadow hover:bg-pink-500 transition duration-200"
      >
        저장하기
      </button>
    </div>
  );
};

export default TrainerProfile;
