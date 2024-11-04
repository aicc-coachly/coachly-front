import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';


const TrainerProfile = () => {
  const navigate = useNavigate();
  const [addressSections, setAddressSections] = useState([1]); // 기본 주소관리 섹션 1개
  const [bankAccountSections, setBankAccountSections] = useState([1]); // 기본 은행계좌 섹션 1개
  const [selectedAccount, setSelectedAccount] = useState(null); // 선택된 계좌

  const [oneDayClasses, setOneDayClasses] = useState([{ id: 1, price: '' }]);
  const [perSessionPrices, setPerSessionPrices] = useState([{ id: 1, count: '', price: '' }]);
  const [selectedOneDay, setSelectedOneDay] = useState(null);
  const [selectedPerSession, setSelectedPerSession] = useState(null);
  

  // 새로운 주소관리 섹션을 추가하는 함수 (최대 2개까지 추가 가능)
  const addAddressSection = () => {
    if (addressSections.length < 2) {
      setAddressSections([...addressSections, addressSections.length + 1]);
    }
  };

  // 특정 주소관리 섹션을 삭제하는 함수
  const removeAddressSection = (index) => {
    if (addressSections.length > 1) { // 최소 1개의 섹션을 유지하는 조건
      setAddressSections(addressSections.filter((_, i) => i !== index));
    }
  }

  // 새로운 주소관리 섹션을 추가하는 함수
  const addBankAccountSection = () => {
    setBankAccountSections([...bankAccountSections, bankAccountSections.length + 1]);
  }

  // 특정 주소관리 섹션을 삭제하는 함수
  const removeBankAccountSection = (index) => {
    if (bankAccountSections.length > 1) { // 최소 1개의 섹션을 유지하는 조건
      setBankAccountSections(bankAccountSections.filter((_, i) => i !== index));
    }
  }

  // 가격관리 섹션 관련 함수
  const addOneDayClass = () => {
    setOneDayClasses([{ id: oneDayClasses.length + 1, price: '' }, ...oneDayClasses]);
  };

  const removeOneDayClass = (index) => {
    const updated = oneDayClasses.filter((_, i) => i !== index);
    setOneDayClasses(updated);
    if (selectedOneDay === index) setSelectedOneDay(null);
  };

  const addPerSessionPrice = () => {
    setPerSessionPrices([{ id: perSessionPrices.length + 1, count: '', price: '' }, ...perSessionPrices]);
  };

  const removePerSessionPrice = (index) => {
    const updated = perSessionPrices.filter((_, i) => i !== index);
    setPerSessionPrices(updated);
    if (selectedPerSession === index) setSelectedPerSession(null);
  };

  const handleOneDayCheckbox = (index) => {
    setSelectedOneDay(selectedOneDay === index ? null : index);
  };

  const handlePerSessionCheckbox = (index) => {
    setSelectedPerSession(selectedPerSession === index ? null : index);
  };



  return (
    <div className="max-w-[390px] mx-auto h-auto bg-gray-100 p-4">
      {/* 제목 */}
      <div className="mb-4">
        <h2 className="text-lg font-semibold">내 정보</h2>
      </div>

      {/* 프로필 사진 */}
      <div className="w-[16rem] h-[16rem] bg-gray-200 mx-auto mb-4 overflow-hidden">
        {/* <img 
          // src="https://via.placeholder.com/64" // 프로필 사진 URL 또는 경로로 대체
          alt="프로필 사진" 
          className="object-cover w-full h-full"
        /> */}
      </div>

      {/* 사용자 정보 */}
      <div className="text-start px-[2rem] mb-4">
        <p className="text-base font-medium">정혜현</p>
        <input 
          type="text" 
          defaultValue="010-1234-5678" 
          className="text-sm text-gray-500" 
        />
      </div>

      {/* 주소 관리 섹션 */}
      <div className="mb-4">
        <div className='flex justify-between items-center'>
          <h2 className="text-lg font-semibold mb-2">주소관리</h2>
          <button 
            onClick={addAddressSection} 
            className="px-3 py-1 bg-gray-300 text-sm rounded-md"
          >
            추가하기
          </button>
        </div>

        {/* 동적 주소관리 섹션들 */}
        {addressSections.map((section, index) => (
          <div key={index} className="mb-4 border-t pt-2 relative">
            <h2 className="text-md font-normal px-3 mb-2">장소명 입력</h2>
            <div className="flex justify-between px-4 mb-4">
              <p className="px-3 py-1 bg-gray-300 text-sm rounded-md">구</p>
              <p className="px-3 py-1 bg-gray-300 text-sm rounded-md">동</p>
              <p className="px-3 py-1 bg-gray-300 text-sm rounded-md">상세주소</p>
              <p className="px-3 py-1 bg-gray-300 text-sm rounded-md">(우편번호)</p>
            </div>
            {/* 삭제 버튼 (오른쪽 상단) */}
            <button 
              onClick={() => removeAddressSection(index)} 
              className="absolute top-0 right-0 text-gray-500 hover:text-red-500"
            >
              X
            </button>
          </div>
        ))}
      </div>

      {/* 은행계좌 관리 섹션 */}
      <div className="mb-4">
        <div className='flex justify-between items-center'>
          <h2 className="text-lg font-semibold mb-2">계좌정보</h2>
          <button 
            onClick={addBankAccountSection} 
            className="px-3 py-1 bg-gray-300 text-sm rounded-md"
          >
            추가하기
          </button>
        </div>

        {/* 동적 은행계좌관리 섹션들 */}
        {bankAccountSections.map((section, index) => (
          <div key={index} className="mb-4 border-t pt-2 relative">
            <div className="flex items-center px-4 mb-4">
              <input
                type="checkbox"
                checked={selectedAccount === index}
                onChange={() => setSelectedAccount(index)}
                className="mr-2"
              />
              <p className="px-3 py-1 bg-gray-300 text-sm rounded-md">은행종류</p>
              <p className="px-3 py-1 bg-gray-300 text-sm rounded-md">계좌번호</p>
            </div>
            <button
              onClick={() => removeBankAccountSection(index)}
              className="absolute top-0 right-0 text-gray-500 hover:text-red-500"
            >
              X
            </button>
          </div>
        ))}
      </div>

      {/* 가격 관리 섹션 */}
      <div className="mb-4">
      <div className='flex justify-between'>
      <h2 className="text-lg font-semibold">대표 가격</h2>
      <div className="flex  items-center">
        <button onClick={addOneDayClass} className="px-3 py-1 bg-gray-300 text-sm rounded-md mr-2">
          원데이 추가
        </button>
        <button onClick={addPerSessionPrice} className="px-3 py-1 bg-gray-300 text-sm rounded-md">
          회당 추가
        </button>
      </div>
      </div>
      

      {/* 원데이 클래스 가격 섹션 */}
      <div className="mb-4 mt-4">
        {oneDayClasses.map((item, index) => (
          <div key={index} className="flex items-center mt-2">
            <input
              type="checkbox"
              checked={selectedOneDay === index}
              onChange={() => handleOneDayCheckbox(index)}
              className="mr-2"
            />
            <span className="text-base mr-2">원데이 클래스 :</span>
            <input
              type="text"
              placeholder="가격 입력"
              value={item.price}
              onChange={(e) => {
                const updated = [...oneDayClasses];
                updated[index].price = e.target.value;
                setOneDayClasses(updated);
              }}
              className="text-sm text-gray-500 border rounded px-2 py-1 mr-1 w-24"
            />
            <span>원</span>
            <button
              onClick={() => removeOneDayClass(index)}
              className="ml-2 text-gray-500 hover:text-red-500"
            >
              X
            </button>
          </div>
        ))}
      </div>

      {/* 회당 가격 섹션 */}
      <div className="mb-4">
        {perSessionPrices.map((item, index) => (
          <div key={index} className="flex items-center mt-2">
            <input
              type="checkbox"
              checked={selectedPerSession === index}
              onChange={() => handlePerSessionCheckbox(index)}
              className="mr-2"
            />
            <span className="text-base mr-2">회당 가격 :</span>
            <input
              type="text"
              placeholder="횟수 입력"
              value={item.count}
              onChange={(e) => {
                const updated = [...perSessionPrices];
                updated[index].count = e.target.value;
                setPerSessionPrices(updated);
              }}
              className="text-sm text-gray-500 border rounded px-2 py-1 mr-1 w-12"
            />
            <span>회</span>
            <input
              type="text"
              placeholder="가격 입력"
              value={item.price}
              onChange={(e) => {
                const updated = [...perSessionPrices];
                updated[index].price = e.target.value;
                setPerSessionPrices(updated);
              }}
              className="text-sm text-gray-500 border rounded px-2 py-1 mr-1 w-24"
            />
            <span>원</span>
            <button
              onClick={() => removePerSessionPrice(index)}
              className="ml-2 text-gray-500 hover:text-red-500"
            >
              X
            </button>
          </div>
        ))}
      </div>
    </div>

      {/* 저장하기 버튼 */}
      <button 
        onClick={() => navigate('/TrainerMyPage')}  // 페이지 이동 설정
        className="w-full py-2 bg-pink-300 text-sm font-medium rounded-md"
      >
        저장하기
      </button>
    </div>
  )
}

export default TrainerProfile
