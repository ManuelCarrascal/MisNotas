import React, { useEffect, useState } from "react";
//import notes from "../assets/data";
import ListItem from "../components/ListItem";
import AddButton from "../components/AddButton";
import { db } from "../firebase";
import { collection, onSnapshot, query } from "firebase/firestore";
const NotesPage = () => {
  let [notes, setNotes] = useState([]);

  useEffect(() => {
    getNotes();
  }, []);
  let getNotes = async () => {
    const q = query(collection(db, "notes"));
    const unsub = onSnapshot(q, (QuerySnapshot) => {
      setNotes(
        QuerySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }))
      );
    });
    return () => unsub();
    // QuerySnapshot.map((doc, index)=>{
    //   taskArray.push(doc.data());
    //   return  taskArray;
    // });
    //const querySnapshot = await getDocs(collection(db, "notes"));
    //  querySnapshot.forEach((doc) => {
    //   const note = doc.data();
    //   console.log(`this is  ${note.body}`);
    //   return
    // });
    // setNotes(querySnapshot.docs.map(doc=>{
    //   console.log(doc.data().body);
    //   return doc.data();
    // }));
  };

  // let getNotes = async () => {
  //   let response = await fetch('http://localhost:5000/notes');
  //   let data = await response.json();
  //   setNotes(data);
  // };
  return (
    <div className="notes">
      <div className="notes-header">
        <h2 className="notes-title">&#9782;Notas</h2>
        <p className="notes-count">{notes.length}</p>
      </div>
      <div className="notes-list">
        {notes.map((note, index) => (
          <ListItem key={index} note={note} />
        ))}
      </div>
      <AddButton />
    </div>
  );
};

export default NotesPage;
