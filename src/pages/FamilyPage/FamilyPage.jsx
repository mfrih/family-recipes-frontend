import React, { useState, useEffect } from "react";
import AddMembers from "../../components/AddMembers/AddMembers";
import MembersList from "../../components/MembersList/MembersList";
import { useParams } from "react-router-dom";
import myApi from "../../api/apiHandler";

const FamilyPage = () => {
  const [family, setFamily] = useState(null);
  const { familyId } = useParams();

  const fetchFamily = async () => {
    try {
      const response = await myApi.get(`api/families/${familyId}`);
      setFamily(response.data);
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
      <AddMembers familyId={familyId} />
      <MembersList familyId={familyId} />
    </div>
  );
};

export default FamilyPage;
