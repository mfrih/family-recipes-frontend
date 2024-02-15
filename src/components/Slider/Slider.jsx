import React from "react";
import "./Slider.css";

function Slider({ label, value, onChange }) {
  return (
    <div className="one-slider">
      <label htmlFor={label}>{label}</label>
      <div>
        <input
          className="slider-input"
          type="range"
          id={label}
          name={label}
          min="0"
          max="10"
          value={value}
          step="1"
          onChange={onChange}
        />
      </div>
    </div>
  );
}

export default Slider;
