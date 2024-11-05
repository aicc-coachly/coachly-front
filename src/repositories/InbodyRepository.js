import axios from "axios";

const InbodyRepository = {
  getInbodyData: (userId) => axios.get(`/inbody/${userId}`),
  addInbodyData: (inbodyData) => axios.post("/inbody", inbodyData),
  updateInbodyData: (inbodyData) =>
    axios.patch(`/inbody/user_number/inbody`, inbodyData),
  deleteInbodyData: (inbodyId) => axios.delete(`/inbody/user_number`),
};

export default InbodyRepository;
