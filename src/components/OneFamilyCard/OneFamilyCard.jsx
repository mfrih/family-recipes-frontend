import React from "react";
import { Link } from "react-router-dom";
import "./OneFamilyCard.css";

function OneFamilyCard({ family }) {
  return (
    <Link to={`/my-families/${family._id}`} className="OneFamilyCard">
      <div>
        <h3>{family.name}</h3>
      </div>
    </Link>
  );
}

export default OneFamilyCard;
