import axios from 'axios';

const InbodyRepository = {
  getInbodyData: (userId) => axios.get(`/api/inbody/${userId}`),
  addInbodyData: (inbodyData) => axios.post('/api/inbody', inbodyData),
  updateInbodyData: (inbodyData) =>
    axios.put(`/api/inbody/${inbodyData.id}`, inbodyData),
  deleteInbodyData: (inbodyId) => axios.delete(`/api/inbody/${inbodyId}`),
};

export default InbodyRepository;
