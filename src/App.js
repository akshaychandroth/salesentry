import React from 'react';
import HeaderForm from './components/HeaderForm';
import DetailForm from './components/DetailForm';
import SubmitForm from './components/SubmitForm';

const App = () => {
  return (
    <div>
      <h1>Sales Entry Form</h1>
      <HeaderForm />
      <DetailForm />
      <SubmitForm />
    </div>
  );
};

export default App;
