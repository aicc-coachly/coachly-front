import React, { useEffect, useState } from "react";
import Buttons from "../../components/common/Buttons";
import { useModal } from "../../components/common/ModalProvider";
import { TrainerInfoModal } from "../../components/trainer/TrainerInfoModal";
import axios from "axios";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { CREATE_CHAT_ROOM_URL } from "../../utils/chatApiUrl";

function TrainerSearch() {
  const { openModal } = useModal();
  const [filters, setFilters] = useState({
    searchTerm: "",
    gender: "",
    service_option: "",
  });

  const navigate = useNavigate();
  const path = "http://localhost:8000";
  const [trainers, setTrainers] = useState([]);
  const [filteredTrainers, setFilteredTrainers] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const user_number = useSelector((state) => state.auth?.user?.user_number);
  const user_name = useSelector((state) => state.auth?.user?.user_name);
  const aaa = useSelector((state) => state);
  // console.log(aaa);
  // console.log(user_number);
  // console.log(trainers);

  const handleCreateChatRoom = async (trainerNumber) => {
    try {
      console.log("Creating chat room with:", { user_number, trainerNumber });
      const response = await axios.post(CREATE_CHAT_ROOM_URL, {
        user_number: user_number,
        trainer_number: trainerNumber,
        type: "trainer", // 트레이너와의 채팅방 생성
      });

      if (response.status === 200 || response.status === 201) {
        const { room_id } = response.data;
        console.log("채팅방으로 이동합니다. 방 ID:", room_id);
        navigate(`/chatroom/${room_id}`);
      }
    } catch (error) {
      console.error("채팅방 생성 중 오류가 발생했습니다:", error);
    }
  };

  // 모든 트레이너 데이터 가져오기
  useEffect(() => {
    axios
      .get("http://localhost:8000/trainers")
      .then((response) => {
        const uniqueTrainers = response.data.filter(
          (trainer, index, self) =>
            index ===
              self.findIndex(
                (t) => t.trainer_number === trainer.trainer_number
              ) && trainer.status !== "inactive" // "inactive" 상태 제외
        );
        setTrainers(uniqueTrainers);
      })
      .catch((error) => console.error("Error fetching trainers:", error));
  }, []);

  // 필터 적용
  const applyFilters = () => {
    const searchAddress = filters.searchTerm.trim(); // 검색어에서 공백 제거
    const filtered = trainers.filter((trainer) => {
      const matchesService = filters.service_option
        ? trainer.service_options.includes(filters.service_option)
        : true;
      const matchesAddress = searchAddress
        ? trainer.trainer_detail_address.includes(searchAddress)
        : true;
      const matchesGender = filters.gender
        ? trainer.gender === filters.gender
        : true;
      return matchesService && matchesAddress && matchesGender;
    });
    setFilteredTrainers(filtered);
  };

  const handleFilterChange = (key, value) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      [key]: prevFilters[key] === value ? "" : value,
    }));
  };

  const handleSearch = () => {
    setIsSearching(true);
    applyFilters();
    setTimeout(() => setIsSearching(false), 200);
  };

  // Show trainer info in a modal with the trainer's image
  const handleShowTrainerInfo = (trainer) => {
    openModal(
      <TrainerInfoModal
        trainer={trainer}
        user_number={user_number}
        user_name={user_name}
      />
    );
  };

  const handleConsult = (trainer) => {
    alert(`${trainer.name}님과의 상담을 요청하였습니다.`);
  };

  return (
    <div className="w-full min-h-screen bg-[#edf1f6] flex flex-col items-center p-4">
      <div className="w-full max-w-[390px] mt-4">
        {/* 서비스 옵션 필터 버튼들 */}
        <div className="flex justify-around mb-4">
          <button
            className={`px-4 py-2 rounded ${
              filters.service_option === "여성전문"
                ? "bg-[#4831D4] text-white"
                : "bg-[#CCF381]"
            }`}
            onClick={() => handleFilterChange("service_option", "여성전문")}
          >
            여성전문
          </button>
          <button
            className={`px-4 py-2 rounded ${
              filters.service_option === "재활전문"
                ? "bg-[#4831D4] text-white"
                : "bg-[#CCF381]"
            }`}
            onClick={() => handleFilterChange("service_option", "재활전문")}
          >
            재활전문
          </button>
          <button
            className={`px-4 py-2 rounded ${
              filters.service_option === "실버전문"
                ? "bg-[#4831D4] text-white"
                : "bg-[#CCF381]"
            }`}
            onClick={() => handleFilterChange("service_option", "실버전문")}
          >
            실버전문
          </button>
          <button
            className={`px-4 py-2 rounded ${
              filters.service_option === "선수/대회전문"
                ? "bg-[#4831D4] text-white"
                : "bg-[#CCF381]"
            }`}
            onClick={() =>
              handleFilterChange("service_option", "선수/대회전문")
            }
          >
            선수/대회전문
          </button>
        </div>

        {/* 주소 검색 및 성별 필터 */}
        <div className="flex items-center mb-4">
          <input
            type="text"
            placeholder="주소를 입력하세요 (예: 홍대)"
            value={filters.searchTerm}
            onChange={(e) => handleFilterChange("searchTerm", e.target.value)}
            className="flex-1 px-4 py-2 border rounded bg-white text-[#081f5c] border-[#d0e3ff] focus:outline-none mr-2"
          />
          <button
            className={`px-4 py-2 rounded ${
              filters.gender === "male"
                ? "bg-[#4831D4] text-white"
                : "bg-[#CCF381]"
            }`}
            onClick={() => handleFilterChange("gender", "male")}
          >
            남성
          </button>
          <button
            className={`px-4 py-2 rounded ml-2 ${
              filters.gender === "female"
                ? "bg-[#4831D4] text-white"
                : "bg-[#CCF381]"
            }`}
            onClick={() => handleFilterChange("gender", "female")}
          >
            여성
          </button>
        </div>

        {/* 검색 버튼 */}
        <button
          onClick={handleSearch}
          className={`px-4 py-2 rounded w-full ${
            isSearching
              ? "bg-[#CCF381] text-[#CCF381]"
              : "bg-[#4831D4] text-white"
          }`}
        >
          검색
        </button>

        {/* Trainer List or No Results Message */}
        <div className="grid grid-cols-2 gap-4 mt-4">
          {filteredTrainers.length > 0 ? (
            filteredTrainers.map((trainer) => (
              <div
                key={trainer.trainer_number}
                className="p-4 border rounded-lg bg-white text-center"
              >
                <button onClick={() => handleShowTrainerInfo(trainer)}>
                  <div className="h-24 mb-4">
                    <img
                      src={`${path}/${trainer.image}`}
                      alt={`${trainer.name} 사진`}
                      aria-hidden="true"
                      className="w-full h-full object-cover rounded-lg"
                    />
                  </div>
                </button>
                <p>{trainer.name}</p>
                <p>
                  {trainer.trainer_address} {trainer.trainer_detail_address}
                </p>
                <div className="flex gap-4 mt-4 justify-center items-center">
                  <Buttons
                    size="small"
                    onClick={() => handleCreateChatRoom(trainer.trainer_number)}
                  >
                    1:1 상담 받기
                  </Buttons>
                </div>
              </div>
            ))
          ) : (
            <p className="text-center text-[#081f5c] mt-6">
              검색된 트레이너가 없습니다.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

export default TrainerSearch;
