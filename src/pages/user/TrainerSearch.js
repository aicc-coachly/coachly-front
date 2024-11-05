import React, { useState } from "react";
import Buttons from "../../components/common/Buttons";
import { useModal } from "../../components/common/ModalProvider";
import { TrainerInfoModal } from "../../components/trainer/TrainerInfoModal";

function TrainerSearch() {
  const { openModal } = useModal();
  const [filters, setFilters] = useState({
    category: "여성전문",
    area: "",
    neighborhood: "",
    gender: "",
  });
  const [showAreaDropdown, setShowAreaDropdown] = useState(false);
  const [showNeighborhoodDropdown, setShowNeighborhoodDropdown] =
    useState(false);
  const [areaSearch, setAreaSearch] = useState("");
  const [neighborhoodSearch, setNeighborhoodSearch] = useState("");

  const areaList = ["마포구", "용산구", "강남구", "서초구"];
  const neighborhoodList = ["방배동", "청룡동", "논현동", "서교동"];

  const handleFilterChange = (key, value) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      [key]: value,
    }));
  };

  const handleToggleAreaDropdown = () => {
    setShowAreaDropdown((prev) => !prev);
    setShowNeighborhoodDropdown(false);
  };

  const handleToggleNeighborhoodDropdown = () => {
    setShowNeighborhoodDropdown((prev) => !prev);
    setShowAreaDropdown(false);
  };

  const handleClearFilter = (key) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      [key]: "",
    }));
  };

  const handleSearch = () => {
    alert(
      `검색 결과: ${filters.area}, ${filters.neighborhood}, ${filters.gender}`
    );
  };

  const handleConsult = (trainer) => {
    alert(`${trainer.name}님과의 상담을 요청하였습니다.`);
  };

  return (
    <div className="w-full min-h-screen bg-[#edf1f6] flex flex-col items-center p-4">
      <div className="w-full max-w-[390px] mt-4">

        {/* 상단 필터 버튼들 */}
        <div className="flex justify-around mb-4">
          <button
            className={`px-4 py-2 rounded ${
              filters.category === "여성전문"
                ? "bg-[#081f5c] text-white"
                : "bg-[#d0e3ff]"
            }`}
            onClick={() => handleFilterChange("category", "여성전문")}
          >
            여성전문
          </button>
          <button
            className={`px-4 py-2 rounded ${
              filters.category === "재활전무"
                ? "bg-[#081f5c] text-white"
                : "bg-[#d0e3ff]"
            }`}
            onClick={() => handleFilterChange("category", "교정/재활")}
          >
            교정/재활
          </button>
          <button
            className={`px-4 py-2 rounded ${
              filters.category === "노인전문"
                ? "bg-[#081f5c] text-white"
                : "bg-[#d0e3ff]"
            }`}
            onClick={() => handleFilterChange("category", "노인전문")}
          >
            실버전문
          </button>
          <button
            className={`px-4 py-2 rounded ${
              filters.category === "선수/대회전문"
                ? "bg-[#081f5c] text-white"
                : "bg-[#d0e3ff]"
            }`}
            onClick={() => handleFilterChange("category", "선수/대회전문")}
          >
            선수/대회전문
          </button>
        </div>

        {/* 구, 동, 성별 필터 버튼들 */}
        <div className="flex justify-around mb-4">
          <button
            onClick={handleToggleAreaDropdown}
            className={`px-4 py-2 rounded ${
              filters.area ? "bg-[#081f5c] text-white" : "bg-[#d0e3ff]"
            }`}
          >
            구
          </button>
          <button
            onClick={handleToggleNeighborhoodDropdown}
            className={`px-4 py-2 rounded ${
              filters.neighborhood ? "bg-[#081f5c] text-white" : "bg-[#d0e3ff]"
            }`}
          >
            동
          </button>
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
            className={`px-4 py-2 rounded ${
              filters.gender === "female"
                ? "bg-[#081f5c] text-white"
                : "bg-[#d0e3ff]"
            }`}
            onClick={() => handleFilterChange("gender", "female")}
          >
            여성
          </button>
          {/* 검색 버튼 */}
          <Buttons size="middle" onClick={handleSearch}>
            검색
          </Buttons>
        </div>

        {/* 구 검색 드롭다운 */}
        {showAreaDropdown && (
          <div className="relative mb-4">
            <input
              type="text"
              placeholder="구 검색"
              value={areaSearch}
              onChange={(e) => setAreaSearch(e.target.value)}
              className="w-full px-3 py-2 border rounded mb-2"
            />
            <div className="absolute w-full bg-white border rounded shadow-lg max-h-40 overflow-y-auto">
              {areaList
                .filter((area) => area.includes(areaSearch))
                .map((area) => (
                  <button
                    key={area}
                    onClick={() => {
                      handleFilterChange("area", area);
                      setShowAreaDropdown(false);
                    }}
                    className={`block w-full text-left px-3 py-2 ${
                      filters.area === area
                        ? "bg-[#081f5c] text-white"
                        : "hover:bg-[#edf1f6]"
                    }`}
                  >
                    {area}
                  </button>
                ))}
            </div>
          </div>
        )}

        {/* 동 검색 드롭다운 */}
        {showNeighborhoodDropdown && (
          <div className="relative mb-4">
            <input
              type="text"
              placeholder="동 검색"
              value={neighborhoodSearch}
              onChange={(e) => setNeighborhoodSearch(e.target.value)}
              className="w-full px-3 py-2 border rounded mb-2"
            />
            <div className="absolute w-full bg-white border rounded shadow-lg max-h-40 overflow-y-auto">
              {neighborhoodList
                .filter((neighborhood) =>
                  neighborhood.includes(neighborhoodSearch)
                )
                .map((neighborhood) => (
                  <button
                    key={neighborhood}
                    onClick={() => {
                      handleFilterChange("neighborhood", neighborhood);
                      setShowNeighborhoodDropdown(false);
                    }}
                    className={`block w-full text-left px-3 py-2 ${
                      filters.neighborhood === neighborhood
                        ? "bg-[#081f5c] text-white"
                        : "hover:bg-[#edf1f6]"
                    }`}
                  >
                    {neighborhood}
                  </button>
                ))}
            </div>
          </div>
        )}

        {/* 선택된 구와 동 필터 표시 */}
        <div className="flex flex-wrap mb-4">
          {filters.area && (
            <div className="flex items-center bg-[#d0e3ff] px-3 py-1 rounded mr-2 mb-2">
              <span>{filters.area}</span>
              <button
                onClick={() => handleClearFilter("area")}
                className="ml-2 text-lg font-semibold text-[#081f5c]"
              >
                ×
              </button>
            </div>
          )}
          {filters.neighborhood && (
            <div className="flex items-center bg-[#d0e3ff] px-3 py-1 rounded mr-2 mb-2">
              <span>{filters.neighborhood}</span>
              <button
                onClick={() => handleClearFilter("neighborhood")}
                className="ml-2 text-lg font-semibold text-[#081f5c]"
              >
                ×
              </button>
            </div>
          )}
        </div>

        {/* 트레이너 리스트 */}
        <div className="grid grid-cols-2 gap-4">
          <div className="p-4 border rounded-lg bg-white text-center">
            {/* 트레이너 자세히 보기    */}
          <button onClick={() => openModal(<TrainerInfoModal />) } calssName="bg-gray-200 w-30 h-24 mb-4">  
            <div className="bg-gray-200 h-24 mb-6">트레이너 사진</div>
            </button>
            <p></p>
            <Buttons size="small" onClick={() => handleConsult()}>
              1:1 상담 받기
            </Buttons>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TrainerSearch;
