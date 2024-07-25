import React from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify"
import { handleSearch } from "../../pages/PassPage";
import "./Pass.css"

const PassEntry = ({ entry }) => {
  const issue_date = new Date(entry.issue_date).toLocaleDateString("en-US");
  const exp_date = new Date(entry.exp_date).toLocaleDateString("en-US");
  const navigate = useNavigate();


  const deleteJob = async (id) => {
    const res = await fetch(`/api/delete_pass/${id}`, {
      method: "DELETE",
    });
    return;
  };

  const onDeleteClick = (id) => {
    const confirm = window.confirm(
      `Are you sure you want to delete the pass for ${entry.name}, with license plate ${entry.license}?`
    );

    if (!confirm) return;
    deleteJob(id);
    toast.success("Pass deleted successfully");
    // TODO refresh search
    handleSearch();
  };

  const navEditPass = (id) => {
    return navigate(`/edit_pass/${id}`)
  }

  return (
    <tr className="table-row">
      <td>{entry.id}</td>
      <td>{entry.license}</td>
      <td>{entry.name}</td>
      <td>{issue_date}</td>
      <td>{exp_date}</td>
      <td>
        <button onClick={()=>navEditPass(entry.id)}>Edit</button>
      </td>
      <td>
        <button onClick={()=>onDeleteClick(entry.id)}>Delete</button>
      </td>
    </tr>
  );
};

export default PassEntry;
