import React, { useEffect, useState } from 'react';
import Buttons from '../../components/common/Buttons';
import { useModal } from '../../components/common/ModalProvider';
import { TrainerInfoModal } from '../../components/trainer/TrainerInfoModal';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { CREATE_CHAT_ROOM_URL } from '../../utils/chatApiUrl';
import { useSelector } from 'react-redux';

function TrainerSearch() {
  const path = 'http://localhost:8000';
  const [trainers, setTrainers] = useState([]);
  const [filteredTrainers, setFilteredTrainers] = useState([]);
  const [isSearching, setIsSearching] = useState(false);

  const navigate = useNavigate();
  const { openModal } = useModal();

  const [filters, setFilters] = useState({
    searchTerm: '',
    gender: '',
    service_option: '',
  });

  // Redux에서 userNumber 가져오기
  const userNumber = useSelector((state) => state.auth?.user?.user_number);
  console.log('Redux에서 가져온 userNumber:', userNumber);

  const handleCreateChatRoom = async (trainerNumber) => {
    try {
      console.log('Creating chat room with:', { userNumber, trainerNumber });
      const response = await axios.post(CREATE_CHAT_ROOM_URL, {
        user_number: userNumber,
        trainer_number: trainerNumber,
        type: 'trainer', // 트레이너와의 채팅방 생성
      });

      if (response.status === 200 || response.status === 201) {
        const { room_id } = response.data;
        console.log('채팅방으로 이동합니다. 방 ID:', room_id);
        navigate(`/chatroom/${room_id}`);
      }
    } catch (error) {
      console.error('채팅방 생성 중 오류가 발생했습니다:', error);
    }
  };

  // 모든 트레이너 데이터 가져오기
  useEffect(() => {
    axios
      .get('http://localhost:8000/trainers')
      .then((response) => {
        const uniqueTrainers = response.data.filter(
          (trainer, index, self) =>
            index ===
              self.findIndex(
                (t) => t.trainer_number === trainer.trainer_number
              ) && trainer.status !== 'inactive' // "inactive" 상태 제외
        );
        setTrainers(uniqueTrainers);
      })
      .catch((error) => console.error('Error fetching trainers:', error));
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
      [key]: prevFilters[key] === value ? '' : value,
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
    <div className="w-full min-h-screen bg-[#edf1f6] flex flex-col items-center p-6">
      <div className="w-full max-w-[390px] mt-6">
        {/* 서비스 옵션 필터 버튼들 */}
        <div className="grid grid-cols-2 gap-2 mb-6">
          {['여성전문', '재활전문', '실버전문', '선수/대회전문'].map(
            (option) => (
              <button
                key={option}
                className={`px-4 py-2 text-sm font-semibold rounded-lg transition-colors ${
                  filters.service_option === option
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-200 text-gray-700'
                }`}
                onClick={() => handleFilterChange('service_option', option)}
              >
                {option}
              </button>
            )
          )}
        </div>

        {/* 주소 검색 및 성별 필터 */}
        <div className="flex items-center gap-2 mb-6">
          <input
            type="text"
            placeholder="주소를 입력하세요 (예: 홍대)"
            value={filters.searchTerm}
            onChange={(e) => handleFilterChange('searchTerm', e.target.value)}
            className="flex-1 px-4 py-2 text-sm bg-white text-gray-800 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          {['male', 'female'].map((gender) => (
            <button
              key={gender}
              className={`px-4 py-2 text-sm font-semibold rounded-lg transition-colors ${
                filters.gender === gender
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-200 text-gray-700'
              }`}
              onClick={() => handleFilterChange('gender', gender)}
            >
              {gender === 'male' ? '남성' : '여성'}
            </button>
          ))}
        </div>

        {/* 검색 버튼 */}
        <button
          onClick={handleSearch}
          className={`px-4 py-3 w-full rounded-lg font-semibold transition-colors ${
            isSearching
              ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
              : 'bg-blue-700 text-white hover:bg-blue-800'
          }`}
          disabled={isSearching}
        >
          검색
        </button>

        {/* Trainer List or No Results Message */}
        <div className="grid grid-cols-2 gap-4 mt-6">
          {filteredTrainers.length > 0 ? (
            filteredTrainers.map((trainer) => (
              <div
                key={trainer.trainer_number}
                className="p-4 bg-white rounded-lg shadow-md text-center hover:shadow-lg transition-shadow"
              >
                <button onClick={() => handleShowTrainerInfo(trainer)}>
                  <div className="h-24 mb-3">
                    <img
                      src={`${path}/${trainer.image}`}
                      alt={`${trainer.name} 사진`}
                      className="w-full h-full object-cover rounded-lg"
                    />
                  </div>
                </button>
                <p className="font-medium text-gray-800">{trainer.name}</p>
                <p className="text-sm text-gray-500 mb-3">
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
            <p className="text-center text-gray-600 mt-6">
              검색된 트레이너가 없습니다.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

export default TrainerSearch;
