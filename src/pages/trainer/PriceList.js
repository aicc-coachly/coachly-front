import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'; // useNavigate 추가


const PriceList = () => {
  const navigate = useNavigate(); 
  const [oneDayClasses, setOneDayClasses] = useState([{ id: 1, price: '' }]);
  const [perSessionPrices, setPerSessionPrices] = useState([{ id: 1, count: '', price: '' }]);
  const [selectedOneDay, setSelectedOneDay] = useState(null);
  const [selectedPerSession, setSelectedPerSession] = useState(null);


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
    <div className="max-w-[390px] mx-auto bg-gray-100 p-4">
      {/* 제목 */}
      <div className="mb-4">
        <div className='flex justify-between'>
          <h2 className="text-lg font-semibold">내 수업 가격관리</h2>
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
    </div>
  )
}

export default PriceList
