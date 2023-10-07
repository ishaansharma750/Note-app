import { useEffect, useState } from "react";
import axios from "axios";
import NoteCard from "../components/Notes/NoteCard";
import Header from "../components/common/Header";
// import NoteCard from "../components/Notes/NoteCard";
// import Header from "../components/common/Header";

function MyNotes() {
  const [myNote, setMyNote] = useState();
  const token = localStorage.getItem("token");

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_BACKEND_URL}/note/get-user-notes`, {
        headers: {
          "X-Acciojob": token,
        },
      })
      .then((res) => {
        setMyNote(res.data.data);
      })
      .catch((err) => {
        alert(err);
      });
    }, [token]);
    
    // console.log(myNote);
  return (
    <>
    <Header/>
      <div style={{ padding: "3rem" }}>
        {/* <h1 style={{ textAlign: "center", marginBottom: "40px" }}>My Notes</h1> */}
        {myNote?.map((item, key) => (
          <NoteCard
            key={key}
            props={item}
            setMyNote={setMyNote}
            myNote={myNote}
          />
        ))}
      </div>
    </>
  );
}

export default MyNotes;
