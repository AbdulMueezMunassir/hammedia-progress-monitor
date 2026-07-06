import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../services/api';

export const fetchWorkers = createAsyncThunk(
  'workers/fetchWorkers',
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get('/users/workers');
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch workers');
    }
  }
);

export const createWorker = createAsyncThunk(
  'workers/createWorker',
  async (workerData, { rejectWithValue }) => {
    try {
      const response = await api.post('/users/workers', workerData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to create worker');
    }
  }
);

export const updateWorker = createAsyncThunk(
  'workers/updateWorker',
  async ({ id, workerData }, { rejectWithValue }) => {
    try {
      const response = await api.put(`/users/workers/${id}`, workerData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to update worker');
    }
  }
);

export const deleteWorker = createAsyncThunk(
  'workers/deleteWorker',
  async (id, { rejectWithValue }) => {
    try {
      await api.delete(`/users/workers/${id}`);
      return id;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to delete worker');
    }
  }
);

const initialState = {
  workers: [],
  currentWorker: null,
  loading: false,
  error: null,
};

const workerSlice = createSlice({
  name: 'workers',
  initialState,
  reducers: {
    clearWorkerError: (state) => {
      state.error = null;
    },
    setCurrentWorker: (state, action) => {
      state.currentWorker = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch workers
      .addCase(fetchWorkers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchWorkers.fulfilled, (state, action) => {
        state.loading = false;
        state.workers = action.payload;
      })
      .addCase(fetchWorkers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Create worker
      .addCase(createWorker.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createWorker.fulfilled, (state, action) => {
        state.loading = false;
        state.workers.push(action.payload);
      })
      .addCase(createWorker.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Update worker
      .addCase(updateWorker.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateWorker.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.workers.findIndex(w => w._id === action.payload._id);
        if (index !== -1) {
          state.workers[index] = action.payload;
        }
      })
      .addCase(updateWorker.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Delete worker
      .addCase(deleteWorker.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteWorker.fulfilled, (state, action) => {
        state.loading = false;
        state.workers = state.workers.filter(w => w._id !== action.payload);
      })
      .addCase(deleteWorker.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearWorkerError, setCurrentWorker } = workerSlice.actions;
export default workerSlice.reducer;