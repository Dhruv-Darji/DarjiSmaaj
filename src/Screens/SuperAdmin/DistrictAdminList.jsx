import React from "react";
import Toast, { showSuccessToast } from '../../Components/Toast';

const DistrictAdminList = () => {

  return (
    <>
     <Toast/>
      <button onClick={()=>showSuccessToast('this is the test')} className="btn btn-secondary">test</button>
    </>
  );
};

export default DistrictAdminList;
