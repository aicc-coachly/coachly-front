import React, { useEffect, useState } from "react";
import Buttons from "../../components/common/Buttons";
import { useModal } from "../../components/common/ModalProvider";
import { TrainerInfoModal } from "../../components/trainer/TrainerInfoModal";
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import { CREATE_CHAT_ROOM_URL } from "../../utils/chatApiUrl"; 
import { useSelector } from 'react-redux';

const TrainerSearch = () => {
  const navigate = useNavigate();
  const { openModal } = useModal();

  // Redux에서 userNumber 가져오기
  const userNumber = useSelector((state) => state.user.userInfo.user_number);
  console.log("Redux에서 가져온 userNumber:", userNumber);

  const handleCreateChatRoom = async (trainerNumber) => {
    try {
      console.log("Creating chat room with:", { userNumber, trainerNumber });
      const response = await axios.post(CREATE_CHAT_ROOM_URL, {
        user_number: userNumber,
        trainer_number: trainerNumber,
        type: "trainer", // 트레이너와의 채팅방 생성
      });

      if (response.status === 201) {
        const { room_id } = response.data;
        console.log("채팅방이 생성되었습니다. 방 ID:", room_id);
        // 생성된 채팅방 페이지로 이동
        navigate(`/chatroom/${room_id}`);
      }
    } catch (error) {
      console.error("채팅방 생성 중 오류가 발생했습니다:", error);
    }
  };

  const [filters, setFilters] = useState({
    searchTerm: "",
    gender: "",
    service_option: "",
  });
  const path = "http://localhost:8000";
  const [trainers, setTrainers] = useState([]);
  const [filteredTrainers, setFilteredTrainers] = useState([]);
  const [isSearching, setIsSearching] = useState(false);

  // 모든 트레이너 데이터 가져오기
  useEffect(() => {
    axios
      .get("http://localhost:8000/trainers")
      .then((response) => {
        const uniqueTrainers = response.data.filter(
          (trainer, index, self) =>
            index ===
            self.findIndex((t) => t.trainer_number === trainer.trainer_number)
        );
        setTrainers(uniqueTrainers);
      })
      .catch((error) => console.error("Error fetching trainers:", error));
  }, []);

  // 필터 적용
  const applyFilters = () => {
    const searchAddress = filters.searchTerm.trim();
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
    openModal(<TrainerInfoModal trainer={trainer} />);
  };

  return (
    <div className="w-full min-h-screen bg-[#edf1f6] flex flex-col items-center p-4">
      <div className="w-full max-w-[390px] mt-4">
        {/* 서비스 옵션 필터 버튼들 */}
        <div className="flex justify-around mb-4">
          <button
            className={`px-4 py-2 rounded ${
              filters.service_option === "여성전문"
                ? "bg-[#081f5c] text-white"
                : "bg-[#d0e3ff]"
            }`}
            onClick={() => handleFilterChange("service_option", "여성전문")}
          >
            여성전문
          </button>
          <button
            className={`px-4 py-2 rounded ${
              filters.service_option === "재활전문"
                ? "bg-[#081f5c] text-white"
                : "bg-[#d0e3ff]"
            }`}
            onClick={() => handleFilterChange("service_option", "재활전문")}
          >
            재활전문
          </button>
          <button
            className={`px-4 py-2 rounded ${
              filters.service_option === "실버전문"
                ? "bg-[#081f5c] text-white"
                : "bg-[#d0e3ff]"
            }`}
            onClick={() => handleFilterChange("service_option", "실버전문")}
          >
            실버전문
          </button>
          <button
            className={`px-4 py-2 rounded ${
              filters.service_option === "선수/대회전문"
                ? "bg-[#081f5c] text-white"
                : "bg-[#d0e3ff]"
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
                ? "bg-[#081f5c] text-white"
                : "bg-[#d0e3ff]"
            }`}
            onClick={() => handleFilterChange("gender", "male")}
          >
            남성
          </button>
          <button
            className={`px-4 py-2 rounded ml-2 ${
              filters.gender === "female"
                ? "bg-[#081f5c] text-white"
                : "bg-[#d0e3ff]"
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
              ? "bg-[#4831D4] text-[#CCF381]"
              : "bg-[#081f5c] text-white"
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
                
                  <Buttons 
                    size="small" 
                    onClick={() => handleCreateChatRoom(trainer.trainer_number)}
                  >
                    1:1 상담 받기
                  </Buttons>
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
