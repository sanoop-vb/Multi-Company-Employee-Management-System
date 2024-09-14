import React from "react";
import './RestrictedUser.css'

const RestrictedUser = () => {
  return (
    <div className="alertbox">
        <div class="alert alert-danger" role="alert">
        You are not Authorized to View this Page! 
        </div>
    </div>
  );
};

export default RestrictedUser;