import React, { useEffect, useState } from 'react';
import { useModal } from '../../components/common/ModalProvider';
import { useNavigate } from 'react-router-dom';
import { CheckScheduleModal } from '../../components/trainer/CheckScheduleModal';
import { BodyCompositionModal } from '../../components/user/BodyCompositionModal';
import { EditBodyCompositionModal } from '../../components/user/EditBodyCompositionModal';

import { useDispatch, useSelector } from 'react-redux';
import { getUser, getUserInbody } from '../../redux/slice/userSlice';
import { setUser } from '../../redux/slice/authSlice';
import { getPtschedule } from '../../redux/slice/paymentSlice';

function UserMypage() {
  const dispatch = useDispatch();
  const { openModal } = useModal();
  const navigate = useNavigate();

  const userId = useSelector((state) => state.auth?.user?.user_id);
  const user_number = useSelector((state) => state.auth?.user?.user_number);
  const profile = useSelector((state) => state.user?.userInfo);
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 3;
  const maxPageButtons = 5;

  const inbodyData = useSelector((state) => {
    const userInbodyData = Array.isArray(state.user?.inbodyData)
      ? state.user.inbodyData
      : [];
    return userInbodyData.filter((data) => data.user_number === user_number);
  });

  const pt_schedule = useSelector((state) =>
    Array.isArray(state.payment?.data) ? state.payment.data : []
  );

  const pt_number = pt_schedule.map((item) => item.pt_number);

  const formatDate = (date) =>
    date ? new Date(date).toISOString().split('T')[0] : '';

  useEffect(() => {
    if (user_number) {
      dispatch(getUser(user_number));
      dispatch(getUserInbody(user_number));
    } else {
      const storedUser = JSON.parse(localStorage.getItem('user'));
      if (storedUser) {
        dispatch(setUser(storedUser));
      }
    }
  }, [dispatch, user_number]);

  useEffect(() => {
    if (user_number) {
      dispatch(
        getPtschedule({
          user_number: user_number,
        })
      );
    }
  }, [dispatch, user_number]);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = inbodyData.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(inbodyData.length / itemsPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleNext = () => {
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  };

  const handlePrev = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 1));
  };

  const getPageNumbers = () => {
    const pageNumbers = [];
    let startPage = Math.max(1, currentPage - Math.floor(maxPageButtons / 2));
    let endPage = Math.min(totalPages, startPage + maxPageButtons - 1);

    if (endPage - startPage + 1 < maxPageButtons) {
      startPage = Math.max(1, endPage - maxPageButtons + 1);
    }

    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(i);
    }
    return pageNumbers;
  };

  return (
    <div className="max-w-[390px] mx-auto bg-gray-100 p-4">
      <div className="bg-white rounded-lg shadow-md p-4 mb-4 relative">
        <h2 className="text-lg font-semibold mb-2">내 정보</h2>
        <button
          onClick={() => navigate('/userrefund')}
          className="absolute top-4 right-30 px-3 py-1 bg-gray-300 text-sm rounded-full"
        >
          환불내역
        </button>
        <button
          onClick={() => navigate('/userprofile')}
          className="absolute top-4 right-4 px-3 py-1 bg-gray-300 text-sm rounded-full"
        >
          수정하기
        </button>
        <div className="flex items-start mt-4 space-x-4">
          <div className="w-[8rem] h-[8rem] bg-gray-200 overflow-hidden"></div>
          <div className="flex-1">
            <div className="flex justify-end">
              <p className="px-3 py-1 bg-gray-300 text-sm rounded-md">
                {profile?.user_detail_address}
              </p>
            </div>
            <p className="mt-2 text-base font-medium">{profile?.name}</p>
            <p className="text-sm text-gray-500">{profile?.email}</p>
            <p className="text-sm text-gray-500">{profile?.phone}</p>
            <p className="text-sm text-gray-500">{profile?.gender}</p>
          </div>
        </div>
      </div>

      {pt_schedule[0]?.trainer_name && (
        <div className="bg-white rounded-lg shadow-md p-2 mb-4">
          <h2 className="text-lg font-semibold p-2">담당 트레이너</h2>
          <div className="flex items-center justify-between bg-gray-300 p-1">
            <p className="text-base text-sm">{pt_schedule[0].trainer_name}</p>
            <button
              onClick={() => navigate('/ChatList')}
              className="px-3 py-1 bg-pink-300 text-sm rounded-md"
            >
              1:1 채팅하기
            </button>
          </div>
        </div>
      )}

      <div className="bg-white rounded-lg shadow-md p-2 mb-4">
        <h2 className="text-lg font-semibold p-2">예약된 수업</h2>
        <div className="flex items-center justify-between bg-gray-300 p-1">
          <p className="text-base text-sm">이건 트레이너</p>
          <span className="text-sm text-gray-500">24-11-01</span>
          <button
            onClick={() => openModal(<CheckScheduleModal />)}
            className="text-center px-3 py-1 bg-pink-300 text-sm rounded-md"
          >
            자세히 보기
          </button>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-md p-2 mb-4">
        <div className="flex justify-between p-2">
          <h2 className="text-lg font-semibold">나의 체성분 기록</h2>
          <button
            onClick={() => openModal(<BodyCompositionModal />)}
            className="text-center px-3 py-1 bg-pink-300 text-sm rounded-md"
          >
            추가하기
          </button>
        </div>

        {currentItems.map((inbody, index) => (
          <div
            key={index}
            className="flex items-center justify-between bg-gray-300 p-1 mb-2"
          >
            <p className="text-base text-sm">
              측정날짜: {formatDate(inbody.user_measurement_date)}
            </p>
            <button
              onClick={() =>
                openModal(<EditBodyCompositionModal inbodyData={inbody} />)
              }
              className="text-center px-3 py-1 bg-pink-300 text-sm rounded-md"
            >
              더보기
            </button>
          </div>
        ))}

        <div className="flex justify-center mt-4">
          <button
            onClick={handlePrev}
            disabled={currentPage === 1}
            className="mx-1 px-2 py-1 bg-gray-300 rounded-md"
          >
            이전
          </button>
          {getPageNumbers().map((pageNumber) => (
            <button
              key={pageNumber}
              onClick={() => handlePageChange(pageNumber)}
              className={`mx-1 px-2 py-1 ${
                currentPage === pageNumber
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-300'
              } rounded-md`}
            >
              {pageNumber}
            </button>
          ))}
          <button
            onClick={handleNext}
            disabled={currentPage === totalPages}
            className="mx-1 px-2 py-1 bg-gray-300 rounded-md"
          >
            다음
          </button>
        </div>
      </div>
    </div>
  );
}

export default UserMypage;
