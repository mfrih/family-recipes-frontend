import React, { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import { AuthContext } from "../../context/auth.context";
import AddMembers from "../../components/AddMembers/AddMembers";
import MembersList from "../../components/MembersList/MembersList";
import FamilyRecipeList from "../../components/FamilyRecipeList/ FamilyRecipeList";
import myApi from "../../api/apiHandler";
import "./FamilyPage.css";

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
  }, [familyId]);

  if (!family) {
    return <p>Loading...</p>;
  }

  return (
    <div className="FamilyPage">
      <h2>Welcome to "{family.name}"</h2>
      <FamilyRecipeList family={family} />
      <AddMembers family={family} isAdmin={isAdmin} setFamily={setFamily} />
      <MembersList family={family} isAdmin={isAdmin} setFamily={setFamily} />
    </div>
  );
};

export default FamilyPage;
