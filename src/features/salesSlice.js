import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  header: {
    vr_no: '',
    vr_date: '',
    ac_name: '',
    ac_amt: 0,
    status: 'A',
  },
  details: [
    { sr_no: 1, item_code: '', item_name: '', description: '', qty: 0, rate: 0 },
  ],
  itemMaster: [], 
};

const salesSlice = createSlice({
  name: 'sales',
  initialState,
  reducers: {
    setHeaderField(state, action) {
      const { field, value } = action.payload;
      state.header[field] = value;
    },
    addDetailRow(state) {
      const newSrNo = state.details.length
        ? state.details[state.details.length - 1].sr_no + 1
        : 1;
      state.details.push({
        sr_no: newSrNo,
        item_code: '',
        item_name: '',
        description: '',
        qty: 0,
        rate: 0,
      });
    },
    removeDetailRow(state, action) {
      state.details.splice(action.payload, 1);
      state.details.forEach((detail, index) => {
        detail.sr_no = index + 1;
      });
    },
    setDetailField(state, action) {
      const { index, field, value } = action.payload;
      state.details[index][field] = value;
    },
    setItemMaster(state, action) {
      state.itemMaster = action.payload;
    },
    resetForm(state) {
      return initialState;
    },
  },
});

export const {
  setHeaderField,
  addDetailRow,
  removeDetailRow,
  setDetailField,
  setItemMaster,
  resetForm,
} = salesSlice.actions;
export default salesSlice.reducer;
