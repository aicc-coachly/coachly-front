export const InbodyDetailModal = ({ inbodyInfo }) => {
  if (!inbodyInfo) return <div>인바디 정보가 없습니다.</div>;

  return (
    <div className="max-w-md p-6 bg-white rounded-lg shadow-md mx-auto">
      <h2 className="text-xl font-bold text-center mb-6 text-gray-700">
        인바디 상세 정보
      </h2>

      {/* 인바디 정보 그리드 레이아웃 */}
      <div className="grid grid-cols-2 gap-4 text-center text-gray-600">
        <div className="bg-gray-100 p-4 rounded-lg shadow-sm">
          <p className="text-sm font-semibold mb-1 text-gray-500">측정일</p>
          <p className="text-lg font-bold">
            {new Date(inbodyInfo.user_measurement_date).toLocaleDateString()}
          </p>
        </div>
        <div className="bg-gray-100 p-4 rounded-lg shadow-sm">
          <p className="text-sm font-semibold mb-1 text-gray-500">신장</p>
          <p className="text-lg font-bold">{inbodyInfo.user_height} cm</p>
        </div>
        <div className="bg-gray-100 p-4 rounded-lg shadow-sm">
          <p className="text-sm font-semibold mb-1 text-gray-500">체중</p>
          <p className="text-lg font-bold">{inbodyInfo.user_weight} kg</p>
        </div>
        <div className="bg-gray-100 p-4 rounded-lg shadow-sm">
          <p className="text-sm font-semibold mb-1 text-gray-500">체지방량</p>
          <p className="text-lg font-bold">
            {inbodyInfo.user_body_fat_mass} kg
          </p>
        </div>
        <div className="bg-gray-100 p-4 rounded-lg shadow-sm">
          <p className="text-sm font-semibold mb-1 text-gray-500">체지방률</p>
          <p className="text-lg font-bold">
            {inbodyInfo.user_body_fat_percentage}%
          </p>
        </div>
        <div className="bg-gray-100 p-4 rounded-lg shadow-sm">
          <p className="text-sm font-semibold mb-1 text-gray-500">근육량</p>
          <p className="text-lg font-bold">{inbodyInfo.user_muscle_mass} kg</p>
        </div>
        <div className="bg-gray-100 p-4 rounded-lg shadow-sm">
          <p className="text-sm font-semibold mb-1 text-gray-500">단백질량</p>
          <p className="text-lg font-bold">{inbodyInfo.user_protein} g</p>
        </div>
        <div className="bg-gray-100 p-4 rounded-lg shadow-sm">
          <p className="text-sm font-semibold mb-1 text-gray-500">체수분량</p>
          <p className="text-lg font-bold">
            {inbodyInfo.user_total_body_water} L
          </p>
        </div>
        <div className="bg-gray-100 p-4 rounded-lg shadow-sm">
          <p className="text-sm font-semibold mb-1 text-gray-500">
            내장지방수치
          </p>
          <p className="text-lg font-bold">
            {inbodyInfo.user_visceral_fat_level}
          </p>
        </div>
        <div className="bg-gray-100 p-4 rounded-lg shadow-sm">
          <p className="text-sm font-semibold mb-1 text-gray-500">복부지방량</p>
          <p className="text-lg font-bold">
            {inbodyInfo.user_abdominal_fat_amount} kg
          </p>
        </div>
        <div className="bg-gray-100 p-4 rounded-lg shadow-sm">
          <p className="text-sm font-semibold mb-1 text-gray-500">기초대사량</p>
          <p className="text-lg font-bold">
            {inbodyInfo.user_metabolic_rate} kcal
          </p>
        </div>
      </div>
    </div>
  );
};
