import React, { useState } from "react";
import "./topbar.css";

function Topbar() {
  return (
    <div className="topbar form-control-lg " style={{ marginBottom: "10px" }}>
      <span className="logo" style={{ color: "DC143C", height: "50px" }}>
        AgroTraders
      </span>
    </div>
  );
}

export default Topbar;
