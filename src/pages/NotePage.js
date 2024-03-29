import React, { useState, useEffect } from "react";
//import notes from "../assets/data";
import { ReactComponent as ArrowLeft } from "../assets/arrow-left.svg";
import { Link, useNavigate, useParams } from "react-router-dom";
import { db } from "../firebase";
import { addDoc, collection, deleteDoc, doc, getDoc, setDoc } from "firebase/firestore";

const NotePage = () => {

  const history = useNavigate();
  const params = useParams();
  let noteId = params?.id;
  let [note, setNote] = useState(null);

  let getNote = async () => {
      if(noteId === "new") return;
      const docRef = doc(db, "notes",`${noteId}`);
      const docSnap = await getDoc(docRef);
      setNote(docSnap.data());
    // if (noteId === "new") return;
    // let response = await getDoc(docRef);
    // let data = await response.json();
    // setNote(data);
  };

  useEffect(() => {
    getNote();
  }, [noteId]);

  //let note = notes.find((note) => note.id === noteId);

  let createNote = async () => {
    const docRef = await addDoc(collection(db, "notes",), {
      ...note, updated: new Date().toString(),
    });
    setNote(docRef);
  };
  // let createNote = async () => {
  //   await fetch(`http://localhost:5000/notes/`, {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //     body: JSON.stringify({ ...note, updated: new Date() }),
  //   });
  // };
  let updateNote = async () => {
    const docRef = doc(db, "notes",`${noteId}`);
    setDoc(docRef, {...note,updated:new Date().toString()})
    // await fetch(`http://localhost:5000/notes/${noteId}`, {
    //   method: "PUT",
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    //   body: JSON.stringify({ ...note, updated: new Date() }),
    // });
  };

  let deleteNote = async () => {
    const docRef = doc(db, "notes",`${noteId}`);
    deleteDoc(docRef);
    // await fetch(`http://localhost:5000/notes/${noteId}`, {
    //   method: "DELETE",
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    //   body: JSON.stringify(note),
    // });
     history("/");
  };

  let handleSubmit = () => {
    if (noteId !== "new" && !note.body) {
      deleteNote();
    } else if (noteId === "new" && note !== null) {
      createNote();
    } else if (noteId !== "new") {
      updateNote();
    }
    history("/");
  };

  return (
    <div className="note">
      <div className="note-header">
        <h3>
          <Link to="/">
            <ArrowLeft onClick={handleSubmit} />
          </Link>
        </h3>
        {noteId !== "new" ? (
          <button onClick={deleteNote}>Eliminar</button>
        ) : (
          <button onClick={handleSubmit}>Hecho</button>
        )}
      </div>
      <textarea
        onChange={(e) => {
          setNote({ ...note, body: e.target.value });
        }}
        value={note?.body}
      ></textarea>
    </div>
  );
};
export default NotePage;
