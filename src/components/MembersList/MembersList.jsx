import React, { useState, useEffect } from "react";
import myApi from "../../api/apiHandler";
import OneFamilyMember from "../OneFamilyMember/OneFamilyMember";

const MembersList = ({ family, isAdmin, setFamily }) => {
  const [members, setMembers] = useState(null);

  const fetchMembers = async () => {
    try {
      const response = await myApi.get(`api/families/${family._id}/members`);
      setMembers(response.data);
    } catch (error) {
      console.error("Failed to fetch family members:", error);
    }
  };

  useEffect(() => {
    fetchMembers();
  }, [family]);

  const handleRemoveMember = async (removedUserId) => {
    try {
      const response = await myApi.put(
        `api/families/${family._id}/members/remove`,
        {
          removedUserId,
        }
      );
      setFamily(response.data);
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
    <div className="members-list">
      <h2>Family Members</h2>
      <div className="members-list">
        {members.map((member) => (
          <OneFamilyMember
            key={member._id}
            member={member}
            isAdmin={isAdmin}
            handleRemoveMember={handleRemoveMember}
          />
        ))}
      </div>
    </div>
  );
};

export default MembersList;
