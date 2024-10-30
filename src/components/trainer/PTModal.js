import React from 'react'

export const PTModal = () => {
  return (
    <div>
      <div>
        <picture>사진</picture>
      </div>
      <div className='트레이너 정보란'>
        <p>트레이너 이름</p>
        <p>헬스장 주소</p>
        <p>트레이너 장점</p>
        <p>대표 가격</p>
      </div>
      <div className='가격 선택란'>
        <div>
          <input type='checkbox' id="oneday"></input>
          <label for="oneday">원데이 클래스</label>
          <p>50분 5만원</p>
        </div>
        <div>
          <input type='checkbox' id="ferprice"></input>
          <label for="ferprice">회당 가격</label>
          <p>20회 시간당 4만원</p>
        </div>
        <button>1:1채팅하기</button>
      </div>
      <button>결제 요청하기</button>
    </div>
  );
}


