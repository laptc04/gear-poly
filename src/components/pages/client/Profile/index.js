import React, { useEffect, useState } from "react";

const Profile = () => {

  return (
    <div className="container">
      <div className="row">
        <button className="btn btn-danger w-auto me-3">{`-`}</button>
        {/* <h1 className="text-primary w-auto">{count}</h1> */}
        <button
          className="btn btn-success w-auto ms-3 me-3"
          // onClick={plus}
        >{`+`}</button>
        <button className="btn btn-warning w-auto">{`Reset`}</button>
      </div>
    </div>
  );
};

export default Profile;
