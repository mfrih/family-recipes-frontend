import React from "react";
import "./OneFamilyMember.css";

function OneFamilyMember({ member, isAdmin, handleRemoveMember }) {
  return (
    <div className="OneFamilyMember">
      <p>{member.username}</p>
      {isAdmin && (
        <button onClick={() => handleRemoveMember(member._id)}>Delete</button>
      )}
    </div>
  );
}

export default OneFamilyMember;
