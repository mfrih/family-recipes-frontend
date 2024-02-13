import React, { useState, useEffect, useContext } from "react";
import { AuthContext } from "../../context/auth.context";
import AddMembers from "../../components/AddMembers/AddMembers";
import MembersList from "../../components/MembersList/MembersList";
import { useParams } from "react-router-dom";
import myApi from "../../api/apiHandler";

const FamilyPage = () => {
  const [family, setFamily] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const { familyId } = useParams();
  const { user } = useContext(AuthContext);

  const fetchFamily = async () => {
    try {
      const response = await myApi.get(`api/families/${familyId}`);
      const fetchedFamily = response.data;
      setFamily(fetchedFamily);
      const isAdminStatus = fetchedFamily.admins.some(
        (adminId) => adminId === user._id
      );
      setIsAdmin(isAdminStatus);
    } catch (error) {
      console.error("Failed to fetch family:", error);
    }
  };

  useEffect(() => {
    fetchFamily();
  }, []);

  if (!family) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <h2>Welcome to "{family.name}"</h2>
      <AddMembers familyId={familyId} isAdmin={isAdmin} />
      <MembersList familyId={familyId} isAdmin={isAdmin} />
    </div>
  );
};

export default FamilyPage;
