/* eslint-disable

react/prop-types */

import React, { useEffect } from "react";
import { FaEdit, FaTrash } from "react-icons/fa";
import { Link } from "react-router-dom";
import { fechNotes, deleteNote } from "../Store/api/NoteSlice";
import { useSelector, useDispatch } from "react-redux";

function Notes() {
  const notes = useSelector((state) => state.note.notes)
  console.log(notes);
  const dispatch = useDispatch()

  useEffect(() => {
  dispatch(fechNotes());
}, [dispatch]);


  const handledelateNote =(noteId) =>{
    dispatch(deleteNote(noteId))
  }

  return (
    <div className="flex flex-wrap justify-center mt-5">
      {notes.map((note) => (
        <div
          className="relative bg-yellow-400 w-64 h-64 m-5 shadow-2xl overflow-hidden"
          key={note.id}
        >
          <div className="p-5">
            <h3 className="font-bold text-2xl mb-4">{note.title}</h3>
            <p>{note.content}</p>
          </div>
          <div className="absolute bg-yellow-400 w-12 h-12 rotate-45 -top-6 -left-6" />
          <div className="absolute bottom-0 left-0 right-0 flex justify-center p-4">
            <button className="mr-2">
        
              <Link to = {`/EditNote/${note.id}`}>
                <FaEdit size={20}/>
              </Link>
            </button>
            <button>
              <FaTrash size={20} onClick={() => handledelateNote(note.id)} />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Notes;