export const InbodyDetailModal = ({ inbodyInfo }) => {
  if (!inbodyInfo) return <div>인바디 정보가 없습니다.</div>;

  return (
    <div className="max-w-md p-6 rounded-lg relative">
      <h2 className="text-lg font-bold text-center mb-4">인바디 상세 정보</h2>

      {/* 인바디 정보 출력 */}
      <div className="text-sm text-center mb-4">
        <p>
          <strong>측정일:</strong>{" "}
          {new Date(inbodyInfo.user_measurement_date).toLocaleDateString()}
        </p>
        <p>
          <strong>체중:</strong> {inbodyInfo.user_weight} kg
        </p>
        <p>
          <strong>체지방량:</strong> {inbodyInfo.user_body_fat_mass} kg
        </p>
        <p>
          <strong>체지방률:</strong> {inbodyInfo.user_body_fat_percentage}%
        </p>
        <p>
          <strong>근육량:</strong> {inbodyInfo.user_muscle_mass} kg
        </p>
        <p>
          <strong>단백질량:</strong> {inbodyInfo.user_protein} g
        </p>
        <p>
          <strong>총 체수분량:</strong> {inbodyInfo.user_total_body_water} L
        </p>
        <p>
          <strong>내장지방수치:</strong> {inbodyInfo.user_visceral_fat_level}
        </p>
        <p>
          <strong>복부지방량:</strong> {inbodyInfo.user_abdominal_fat_amount} kg
        </p>
        <p>
          <strong>기초대사량:</strong> {inbodyInfo.user_metabolic_rate} kcal
        </p>
        <p>
          <strong>신장:</strong> {inbodyInfo.user_height} cm
        </p>
      </div>
    </div>
  );
};
