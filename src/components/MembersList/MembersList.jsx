import React, { useState, useEffect } from "react";
import myApi from "../../api/apiHandler";

const MembersList = ({ familyId, isAdmin }) => {
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

  const handleRemoveMember = async (removedUserId) => {
    try {
      await myApi.put(`api/families/${familyId}/members/remove`, {
        removedUserId,
      });
      // needs to refetch members to update the members list
      fetchMembers();
    } catch (error) {
      console.error("Failed to remove family member:", error);
    }
  };

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
            {isAdmin && (
              <button onClick={() => handleRemoveMember(member._id)}>
                Delete
              </button>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MembersList;
