import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setHeaderField } from '../features/salesSlice';

const HeaderForm = () => {
  const dispatch = useDispatch();
  const header = useSelector((state) => state.sales.header);

  const handleChange = (e) => {
    dispatch(setHeaderField({ field: e.target.name, value: e.target.value }));
  };

  return (
    <div>
      <h2>Header</h2>
      <div>
        <label>VR No:</label>
        <input
          name="vr_no"
          type="number"
          value={header.vr_no}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label>VR Date:</label>
        <input
          name="vr_date"
          type="date"
          value={header.vr_date}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label>Account Name:</label>
        <input
          name="ac_name"
          type="text"
          value={header.ac_name}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label>Status:</label>
        <select
          name="status"
          value={header.status}
          onChange={handleChange}
          required
        >
          <option value="A">Active</option>
          <option value="I">Inactive</option>
        </select>
      </div>
    </div>
  );
};

export default HeaderForm;
