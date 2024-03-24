import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  mainJobs: [], // bu diziyi asla değiştirmeyeceğiz
  jobs: [],
  isLoading: false,
  isError: false,
};

const jobSlice = createSlice({
  name: 'jobs',
  initialState,
  reducers: {
    setLoading: (state, action) => {
      state.isLoading = true;
    },

    setError: (state, action) => {
      state.isLoading = false;
      state.isError = action.payload;
    },

    setJobs: (state, action) => {
      state.isLoading = false;
      state.isError = false;
      state.jobs = action.payload;
      state.mainJobs = action.payload;
    },

    deleteJob: (state, action) => {
      // silincek elemanın sırasını bulma
      const i = state.jobs.findIndex((i) => i.id === action.payload);
      // elemanı diziden kaldırma
      state.jobs.splice(i, 1);
    },

    createJob: (state, action) => {
      state.jobs.push(action.payload);
    },

    // aratılan şirket ismine göre filtrele
    filterBySearch: (state, action) => {
      const query = action.payload.text.toLowerCase();

      const filtred = state.mainJobs.filter((i) =>
        i[action.payload.field].toLowerCase().includes(query)
      );

      state.jobs = filtred;
    },

    // sıralama
    sortJobs: (state, action) => {
      switch (action.payload) {
        case 'a-z':
          state.jobs.sort((a, b) =>
            a.company.localeCompare(b.company)
          );
          break;

        case 'z-a':
          state.jobs.sort((a, b) =>
            b.company.localeCompare(a.company)
          );
          break;

        case 'En Yeni':
          state.jobs.sort(
            (a, b) => new Date(b.date) - new Date(a.date)
          );
          break;

        case 'En Eski':
          state.jobs.sort(
            (a, b) => new Date(a.date) - new Date(b.date)
          );
          break;

        default:
          break;
      }
    },

    // filtreleri sıfırla
    clearFilters: (state) => {
      state.jobs = state.mainJobs;
    },
  },
});

export const {
  sortJobs,
  filterBySearch,
  createJob,
  setLoading,
  setError,
  setJobs,
  deleteJob,
  clearFilters,
} = jobSlice.actions;

export default jobSlice.reducer;