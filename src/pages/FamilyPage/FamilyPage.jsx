import React from "react";
import AddMembers from "../../components/AddMembers/AddMembers";
import MembersList from "../../components/MembersList/MembersList";
import { useParams } from "react-router-dom";

function FamilyPage() {
  const { familyId } = useParams();
  return (
    <div>
      <h2>This is your family page</h2>
      <AddMembers familyId={familyId} />
      <MembersList familyId={familyId} />
    </div>
  );
}

export default FamilyPage;
