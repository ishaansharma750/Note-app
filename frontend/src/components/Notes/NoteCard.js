import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";  
import formatDateAndTime from "../../DateTimeUtils";
import axios from "axios";
function NoteCard({ props, setMyNote, myNote }) {
  const token = localStorage.getItem("token");
  const handleDeleteNote = (noteId) => {
    axios
      .delete(
        `${process.env.REACT_APP_BACKEND_URL}/note/delete-note/${noteId}`,
        {
          headers: {
            "X-Acciojob": token,
          },
        }
      )
      .then((res) => {
        if (res.data.status === 200) {
          alert(res.data.message);
          const myNotesNew = myNote.filter((note) => note._id !== noteId);
          setMyNote(myNotesNew);
        }
      })
      .catch((err) => {
        alert(err);
      });
  };

  const handleSubmit = (e, noteId) => {
    e.preventDefault();
    const newNoteObj = {
      noteId,
      title: newTitle,
      desc: newTextBody,
    };

    axios
      .put(`${process.env.REACT_APP_BACKEND_URL}/note/edit-note`, newNoteObj, {
        headers: {
          "X-Acciojob": token,
        },
      })
      .then((res) => {
        alert(res.data.message);
        setIsEdit(false);
        window.location.reload();
      })
      .catch((err) => {
        alert(err);
      });
    }
  return (
    <div>
      <h1>My Notes</h1>
      <Card style={{ width: "100%", marginBottom: "25px" }}>
        <Card.Body>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <Card.Title>{props.title}</Card.Title>
            <Card.Text>
              {formatDateAndTime(new Date(props.creationDateTime))}
            </Card.Text>
          </div>
          <Card.Text>{props.desc}</Card.Text>

          <Button
            variant="primary"
            style={{ marginRight: "15px" }}
            // onClick={() => setIsEdit(!isEdit)}
          >
            Edit Blog
          </Button>
          <Button variant="danger" onClick={(e) => handleDeleteNote(props._id)}>
            Delete Blog
          </Button>
        </Card.Body>
      </Card>
    </div>
  );
}

export default NoteCard;
