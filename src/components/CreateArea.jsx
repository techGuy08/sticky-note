import React from "react";
import Fab from "@mui/material/Fab";
import AddIcon from "@mui/icons-material/Add";
import Zoom from "@mui/material/Zoom";

const CreateArea = function ({
  onAdd,
  note,
  onChange,
  setActive,
  isActive,
  isEditMode,
  onEdit,
}) {
  function handleChange(e) {
    const { name, value } = e.target;
    onChange({
      ...note,
      [name]: value,
    });
  }
  function submitNote(e) {
    if (!isEditMode) {
      onAdd(note);
    } else {
      onEdit(note);
    }

    onChange({
      title: "",
      content: "",
    });
    setActive(false);
    e.preventDefault();
    return false;
  }
  function toggleForm(e) {
    let active = false;
    if (note.title !== "" || note.content !== "" || e.type === "focus") {
      active = true;
    }
    setActive(active);
  }
  return (
    <div>
      <form className="create-note" action="#" onSubmit={submitNote}>
        {isActive && (
          <input
            name="title"
            placeholder="Title"
            value={note.title}
            onChange={handleChange}
            onFocus={toggleForm}
            onBlur={toggleForm}
          />
        )}
        <textarea
          name="content"
          placeholder="Take a note..."
          rows={isActive ? "3" : "1"}
          value={note.content}
          onChange={handleChange}
          onFocus={toggleForm}
          onBlur={toggleForm}
        ></textarea>
        <Zoom in={isActive}>
          <Fab type="submit" size="medium" color="info" aria-label="add">
            <AddIcon />
          </Fab>
        </Zoom>
      </form>
    </div>
  );
};
export default CreateArea;
