import React from "react";
import AddMembers from "../../components/AddMembers/AddMembers";
import { useParams } from "react-router-dom";

function FamilyPage() {
  const { familyId } = useParams();
  return (
    <div>
      <h2>This is a your family page</h2>
      <AddMembers />
    </div>
  );
}

export default FamilyPage;
