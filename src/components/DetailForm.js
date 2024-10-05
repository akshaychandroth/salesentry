

import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  setDetailField,
  addDetailRow,
  removeDetailRow,
  setItemMaster,
} from '../features/salesSlice';
import axios from 'axios';

const DetailForm = () => {
  const dispatch = useDispatch();
  const details = useSelector((state) => state.sales.details);
  const itemMaster = useSelector((state) => state.sales.itemMaster);
  const [autoFill, setAutoFill] = useState(true);

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const response = await axios.get('http://5.189.180.8:8010/item');
        dispatch(setItemMaster(response.data));
      } catch (error) {
        console.error('Error fetching item master data:', error);
      }
    };

    fetchItems();
  }, [dispatch]);

  const handleChange = (index, e) => {
    const { name, value } = e.target;
    dispatch(setDetailField({ index, field: name, value }));

    if (name === 'item_code' && autoFill) {
      const selectedItem = itemMaster.find((item) => item.item_code === value);
      if (selectedItem) {
        dispatch(
          setDetailField({
            index,
            field: 'item_name',
            value: selectedItem.item_name,
          })
        );
      } else {
        dispatch(
          setDetailField({
            index,
            field: 'item_name',
            value: '',
          })
        );
      }
    }
  };

  return (
    <div>
      <h2>Details</h2>
      <div>
        <label>
          <input
            type="checkbox"
            checked={autoFill}
            onChange={(e) => setAutoFill(e.target.checked)}
          />
          Auto-Fill Item Name
        </label>
      </div>
      {details.map((detail, index) => (
        <div
          key={index}
          style={{
            marginBottom: '10px',
            border: '1px solid #ccc',
            padding: '10px',
          }}
        >
          <div>
            <label>Item Code:</label>
            <select
              name="item_code"
              value={detail.item_code}
              onChange={(e) => handleChange(index, e)}
              required
            >
              <option value="">Select Item Code</option>
              {itemMaster.map((item) => (
                <option key={item.item_code} value={item.item_code}>
                  {item.item_code} - {item.item_name}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label>Item Name:</label>
            <input
              name="item_name"
              type="text"
              value={detail.item_name}
              onChange={(e) => handleChange(index, e)}
              required
              readOnly={autoFill} // Read-only based on autoFill state
            />
          </div>
          <div>
            <label>Description:</label>
            <textarea
              name="description"
              value={detail.description}
              onChange={(e) => handleChange(index, e)}
              required
            />
          </div>
          <div>
            <label>Qty:</label>
            <input
              name="qty"
              type="number"
              step="0.001"
              value={detail.qty}
              onChange={(e) => handleChange(index, e)}
              required
            />
          </div>
          <div>
            <label>Rate:</label>
            <input
              name="rate"
              type="number"
              step="0.01"
              value={detail.rate}
              onChange={(e) => handleChange(index, e)}
              required
            />
          </div>
          <div>
            <button
              type="button"
              onClick={() => dispatch(removeDetailRow(index))}
              disabled={details.length === 1} 
            >
              Remove
            </button>
          </div>
        </div>
      ))}
      <button type="button" onClick={() => dispatch(addDetailRow())}>
        Add Row
      </button>
    </div>
  );
};

export default DetailForm;
