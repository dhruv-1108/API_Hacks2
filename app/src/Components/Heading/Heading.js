import React from "react";
import "./Heading.css";
import Typist from "react-typist";

function Heading() {
  return (
    <>
      <div className="heading">
        <div className="title">
          <p>
            API
            <br />
            HACKS
          </p>
        </div>
        <div className="version">
          <p>2.0</p>
        </div>
      </div>
    </>
  );
}

export default Heading;
