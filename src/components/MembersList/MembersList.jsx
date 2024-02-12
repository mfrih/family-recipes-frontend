import React, { useState, useEffect } from "react";
import myApi from "../../api/apiHandler";

const MembersList = ({ familyId }) => {
  const [members, setMembers] = useState(null);

  const fetchMembers = async () => {
    try {
      const response = await myApi.get(`api/families/${familyId}/members`);
      setMembers(response.data);
    } catch (error) {
      console.error("Failed to fetch family members:", error);
    }
  };

  useEffect(() => {
    fetchMembers();
  }, [familyId]);

  if (!members) {
    return <p>Loading...</p>;
  }
  return (
    <div>
      <h2>Family Members</h2>
      <ul>
        {members.map((member) => (
          <li key={member._id}>
            {member.username} ({member.email})
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MembersList;
