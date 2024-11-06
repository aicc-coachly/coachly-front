import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  getTrainer,
  updateTrainerInfo,
  updateTrainerGymAddress,
  updateTrainerAccount,
} from "../../redux/slice/trainerSlice";

const TrainerProfile = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const trainerInfo = useSelector((state) => state.trainer?.data);

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [resume, setResume] = useState("");
  const [trainerImage, setTrainerImage] = useState("");
  const [newImage, setNewImage] = useState(null); // 새 이미지 파일

  const [addressSections, setAddressSections] = useState({
    address: "",
    detail_address: "",
    zipcode: "",
  });

  const [bankAccount, setBankAccount] = useState({
    bank_name: "",
    account: "",
    account_name: "",
  });

  useEffect(() => {
    if (!trainerInfo) {
      dispatch(getTrainer());
    } else {
      setName(trainerInfo.name || "");
      setPhone(trainerInfo.phone || "");
      setResume(trainerInfo.trainer_resume || "");
      setTrainerImage(trainerInfo.trainer_image || "");

      if (trainerInfo.trainer_address) {
        setAddressSections({
          address: trainerInfo.trainer_address,
          detail_address: trainerInfo.trainer_detail_address,
          zipcode: trainerInfo.trainer_zipcode || "",
        });
      }

      if (trainerInfo.bank_account) {
        const bank_account = trainerInfo.bank_account;
        setBankAccount({
          bank_name: bank_account.bank_name || "",
          account: bank_account.account || "",
          account_name: bank_account.account_name || "",
        });
      }
    }
  }, [trainerInfo, dispatch]);

  const handleImageChange = (e) => {
    setNewImage(e.target.files[0]);
  };

  const handleSave = () => {
    const trainerData = {
      name,
      phone,
      resume,
      trainer_image: newImage ? URL.createObjectURL(newImage) : trainerImage,
    };

    const addressData = addressSections;
    const bankData = bankAccount;

    dispatch(
      updateTrainerInfo({
        trainer_number: trainerInfo.trainer_number,
        updateData: trainerData,
      })
    );

    dispatch(
      updateTrainerGymAddress({
        trainer_number: trainerInfo.trainer_number,
        updateData: addressData,
      })
    );

    dispatch(
      updateTrainerAccount({
        trainer_number: trainerInfo.trainer_number,
        updateData: bankData,
      })
    );

    navigate("/TrainerMyPage");
  };

  return (
    <div className="max-w-[390px] mx-auto h-auto bg-gray-100 p-4">
      <div className="mb-4">
        <h2 className="text-lg font-semibold">내 정보</h2>
      </div>

      {/* 프로필 사진 */}
      <div className="w-[16rem] h-[16rem] bg-gray-200 mx-auto mb-4 overflow-hidden">
        {trainerImage ? (
          <img
            src={trainerImage}
            alt="프로필 사진"
            className="object-cover w-full h-full"
          />
        ) : (
          <p className="text-center text-gray-400">이미지 없음</p>
        )}
      </div>

      {/* 이미지 수정 */}
      <input type="file" onChange={handleImageChange} className="mb-4" />

      {/* 이름, 전화번호, 소개 */}
      <div className="text-start px-[2rem] mb-4">
        <p className="text-base font-medium">이름</p>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="text-sm text-gray-500 mb-2"
        />
        <p className="text-base font-medium">전화번호</p>
        <input
          type="text"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          className="text-sm text-gray-500 mb-2"
        />
        <p className="text-base font-medium">소개</p>
        <textarea
          value={resume}
          onChange={(e) => setResume(e.target.value)}
          className="text-sm text-gray-500 mb-2 w-full border rounded px-2 py-1"
          rows="4"
        />
      </div>

      {/* 주소 관리 */}
      <div className="mb-4">
        <h2 className="text-lg font-semibold mb-2">주소 관리</h2>
        <div className="flex justify-between px-4 mb-4">
          <input
            type="text"
            placeholder="주소"
            value={addressSections.address}
            onChange={(e) =>
              setAddressSections({
                ...addressSections,
                address: e.target.value,
              })
            }
            className="text-sm text-gray-500 border rounded px-2 py-1 mr-1 w-1/3"
          />
          <input
            type="text"
            placeholder="상세주소"
            value={addressSections.detail_address}
            onChange={(e) =>
              setAddressSections({
                ...addressSections,
                detail_address: e.target.value,
              })
            }
            className="text-sm text-gray-500 border rounded px-2 py-1 mr-1 w-1/3"
          />
          <input
            type="text"
            placeholder="우편번호"
            value={addressSections.zipcode}
            onChange={(e) =>
              setAddressSections({
                ...addressSections,
                zipcode: e.target.value,
              })
            }
            className="text-sm text-gray-500 border rounded px-2 py-1 w-1/3"
          />
        </div>
      </div>

      {/* 계좌 정보 */}
      <div className="mb-4">
        <h2 className="text-lg font-semibold mb-2">계좌 정보</h2>
        <div className="flex justify-between px-4 mb-4">
          <input
            type="text"
            placeholder="은행"
            value={bankAccount.bank_name}
            onChange={(e) =>
              setBankAccount({ ...bankAccount, bank_name: e.target.value })
            }
            className="text-sm text-gray-500 border rounded px-2 py-1 mr-1 w-1/3"
          />
          <input
            type="text"
            placeholder="계좌번호"
            value={bankAccount.account}
            onChange={(e) =>
              setBankAccount({ ...bankAccount, account: e.target.value })
            }
            className="text-sm text-gray-500 border rounded px-2 py-1 mr-1 w-1/3"
          />
          <input
            type="text"
            placeholder="예금주"
            value={bankAccount.account_name}
            onChange={(e) =>
              setBankAccount({ ...bankAccount, account_name: e.target.value })
            }
            className="text-sm text-gray-500 border rounded px-2 py-1 w-1/3"
          />
        </div>
      </div>

      {/* 저장하기 버튼 */}
      <button
        onClick={handleSave}
        className="w-full py-2 bg-pink-300 text-sm font-medium rounded-md"
      >
        저장하기
      </button>
    </div>
  );
};

export default TrainerProfile;
