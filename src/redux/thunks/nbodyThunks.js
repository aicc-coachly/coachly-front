import { createAsyncThunk } from '@reduxjs/toolkit';
import InbodyRepository from '../../repositories/InbodyRepository';

export const fetchInbodyData = createAsyncThunk(
  'inbody/fetchInbodyData',
  async (userId, { rejectWithValue }) => {
    try {
      const response = await InbodyRepository.getInbodyData(userId);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const addInbodyData = createAsyncThunk(
  'inbody/addInbodyData',
  async (inbodyData, { rejectWithValue }) => {
    try {
      const response = await InbodyRepository.addInbodyData(inbodyData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const updateInbodyData = createAsyncThunk(
  'inbody/updateInbodyData',
  async (inbodyData, { rejectWithValue }) => {
    try {
      const response = await InbodyRepository.updateInbodyData(inbodyData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const deleteInbodyData = createAsyncThunk(
  'inbody/deleteInbodyData',
  async (inbodyId, { rejectWithValue }) => {
    try {
      await InbodyRepository.deleteInbodyData(inbodyId);
      return inbodyId;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
