import React from "react";
import { red } from "@mui/material/colors";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import EditIcon from "@mui/icons-material/Edit";

const Note = function ({ note, onDelete, onEdit }) {
  const { title, content } = note;
  function handleDeleteClick(e) {
    onDelete(note.key);
  }
  function handleEditClick(e) {
    onEdit(note);
  }
  return (
    <div className="note" id={"note-" + note.key}>
      <h1>{title}</h1>
      <p>{content}</p>

      <button onClick={handleDeleteClick}>
        <DeleteOutlineIcon sx={{ color: red[400] }} />
      </button>
      <button onClick={handleEditClick}>
        <EditIcon color="info" />
      </button>
    </div>
  );
};
export default Note;
