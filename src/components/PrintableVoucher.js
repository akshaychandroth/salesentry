import React from 'react';

const PrintableVoucher = ({ header, details }) => {
  const totalAmount = details.reduce(
    (sum, detail) => sum + detail.qty * detail.rate,
    0
  );

  return (
    <div id="voucher" style={{ border: '1px solid #000', padding: '20px' }}>
      <h1>Voucher</h1>
      <div>
        <strong>VR No:</strong> {header.vr_no}
      </div>
      <div>
        <strong>VR Date:</strong> {header.vr_date}
      </div>
      <div>
        <strong>Account Name:</strong> {header.ac_name}
      </div>
      <div>
        <strong>Status:</strong> {header.status === 'A' ? 'Active' : 'Inactive'}
      </div>
      <h2>Details</h2>
      <table
        border="1"
        cellPadding="5"
        cellSpacing="0"
        style={{ width: '100%', borderCollapse: 'collapse' }}
      >
        <thead>
          <tr>
            <th>SR No</th>
            <th>Item Code</th>
            <th>Item Name</th>
            <th>Description</th>
            <th>Qty</th>
            <th>Rate</th>
            <th>Total</th>
          </tr>
        </thead>
        <tbody>
          {details.map((detail, index) => (
            <tr key={index}>
              <td>{detail.sr_no}</td>
              <td>{detail.item_code}</td>
              <td>{detail.item_name}</td>
              <td>{detail.description}</td>
              <td>{detail.qty}</td>
              <td>{detail.rate}</td>
              <td>{detail.qty * detail.rate}</td>
            </tr>
          ))}
          <tr>
            <td colSpan="6" style={{ textAlign: 'right' }}>
              <strong>Total Amount:</strong>
            </td>
            <td>
              <strong>{totalAmount}</strong>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default PrintableVoucher;
