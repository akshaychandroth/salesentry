import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import PrintableVoucher from './PrintableVoucher';
import { resetForm } from '../features/salesSlice';

const SubmitForm = () => {
  const dispatch = useDispatch();
  const { header, details } = useSelector((state) => state.sales);
  const [errorMessage, setErrorMessage] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);
  const [voucherData, setVoucherData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async () => {
    setIsLoading(true);

    const ac_amt = details.reduce(
      (sum, detail) => sum + Number(detail.qty) * Number(detail.rate),
      0
    );

    const postData = {
      header_table: {
        vr_no: Number(header.vr_no), 
        vr_date: header.vr_date, 
        ac_name: header.ac_name,
        ac_amt: ac_amt,
        status: header.status,
      },
      detail_table: details.map((detail, index) => ({
        vr_no: Number(header.vr_no),
        sr_no: index + 1,
        item_code: detail.item_code,
        item_name: detail.item_name,
        description: detail.description,
        qty: Number(detail.qty),
        rate: Number(detail.rate),
      })),
    };

    if (
      !postData.header_table.vr_no ||
      !postData.header_table.vr_date ||
      !postData.header_table.ac_name ||
      !postData.header_table.status
    ) {
      setErrorMessage('Please fill in all required header fields.');
      setSuccessMessage(null);
      setIsLoading(false);
      return;
    }

    for (let detail of postData.detail_table) {
      if (
        !detail.item_code ||
        !detail.item_name ||
        detail.qty === 0 ||
        detail.rate === 0
      ) {
        setErrorMessage('Please fill in all required detail fields.');
        setSuccessMessage(null);
        setIsLoading(false);
        return;
      }
    }

    console.log('Submitting data:', postData);

    try {
      const response = await axios.post(
        'http://5.189.180.8:8010/header/multiple',
        postData,
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
      console.log('Data submitted successfully', response.data);
      setSuccessMessage('Data submitted successfully.');
      setErrorMessage(null);
      setVoucherData(postData);
      dispatch(resetForm()); 
    } catch (error) {
      console.error('Error submitting data', error);
      if (error.response) {
        setErrorMessage(
          error.response.data.message || 'An error occurred while submitting the form.'
        );
      } else if (error.request) {
        setErrorMessage('No response received from the server.');
      } else {
        setErrorMessage('An unexpected error occurred.');
      }
      setSuccessMessage(null);
      setVoucherData(null);
    } finally {
      setIsLoading(false);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div>
      {errorMessage && (
        <div
          className="error"
          style={{ color: 'red', marginBottom: '10px' }}
        >
          {errorMessage}
        </div>
      )}
      {successMessage && (
        <div
          className="success"
          style={{ color: 'green', marginBottom: '10px' }}
        >
          {successMessage}
        </div>
      )}
      <button onClick={handleSubmit} disabled={isLoading}>
        {isLoading ? 'Submitting...' : 'Submit'}
      </button>
      {voucherData && (
        <div>
          <h2>Printable Voucher</h2>
          <PrintableVoucher
            header={voucherData.header_table}
            details={voucherData.detail_table}
          />
          <button onClick={handlePrint}>Print Voucher</button>
        </div>
      )}
    </div>
  );
};

export default SubmitForm;
