import React, { useState } from "react";
import Header from "./Header";
import Footer from "./Footer";
import Note from "./Note";
import CreateArea from "./CreateArea";
import notes from "../notes";

const App = function () {
  let localNotes = JSON.parse(localStorage.getItem("localNotes")) || [];
  if (localNotes.length === 0) {
    localNotes = notes.sort((a, b) => b.key - a.key);
  }
  const [noteArr, setNoteArr] = useState(localNotes);
  const [formNote, setFormNote] = useState({
    title: "",
    content: "",
  });
  const [isFormActive, setFormActive] = useState(false);
  const [isEditMode, setEditMode] = useState(false);
  function addNote(newNote) {
    setNoteArr((prevNotes) => {
      let id = 1;
      if (prevNotes.length) {
        id = prevNotes[0].key + 1;
      }
      const updateNotes = [
        {
          ...newNote,
          key: id,
        },
        ...prevNotes,
      ];
      localStorage.setItem("localNotes", JSON.stringify(updateNotes));
      return updateNotes;
    });
  }
  function deleteNote(id) {
    setNoteArr((prevNotes) => {
      const updateNotes = prevNotes.filter((item) => {
        return item.key !== id;
      });
      localStorage.setItem("localNotes", JSON.stringify(updateNotes));
      return updateNotes;
    });
  }
  function formNoteChange(newNote) {
    setFormNote((prevNote) => {
      return {
        ...prevNote,
        ...newNote,
      };
    });
  }
  function editFormNote(note) {
    setFormActive(true);
    setEditMode(true);
    formNoteChange(note);
  }
  function editNote(note) {
    setEditMode(false);
    setNoteArr((prevNotes) => {
      const index = prevNotes.findIndex((item) => item.key === note.key);
      const updateNotes = [...prevNotes];
      updateNotes[index] = {
        ...note,
      };
      localStorage.setItem("localNotes", JSON.stringify(updateNotes));
      return updateNotes;
    });
  }
  return (
    <div className="App">
      <Header />
      <CreateArea
        onAdd={addNote}
        note={formNote}
        onChange={formNoteChange}
        isActive={isFormActive}
        setActive={setFormActive}
        isEditMode={isEditMode}
        onEdit={editNote}
      />
      <div className="allNotes">
        {noteArr.map((el, i) => (
          <Note key={i} note={el} onDelete={deleteNote} onEdit={editFormNote} />
        ))}
      </div>

      <Footer />
    </div>
  );
};

export default App;
