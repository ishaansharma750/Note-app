import { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import axios from "axios";
import Header from "../components/common/Header";

function CreateNote() {
  const [title, setTitle] = useState();
  const [desc, setDesc] = useState();

  const token = localStorage.getItem("token");

  const handleSubmit = (e) => {
    e.preventDefault();

    const noteObj = {
      title,
      desc,
    };

    axios
      .post(`${process.env.REACT_APP_BACKEND_URL}/note/create-note`, noteObj, {
        headers: {
          "X-Acciojob": token,
        },
      })
      .then((res) => {
        if (res.data.status === 201) {
          window.location.href = "/notes";
        } else {
          alert(res.data.message);
        }
      })
      .catch((err) => {
        alert(err);
      });
  };

  return (
    <>
      <Header />

      <div style={{ padding: "3rem" }}>
        <Form onSubmit={handleSubmit}>
          <h1
            style={{
              marginBottom: "40px",
              display: "flex",
              justifyContent: "center",
            }}>
            Create a Note
          </h1>
          <Form.Group className="mb-3" controlId="title">
            <Form.Label>Title</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter Title"
              onChange={(e) => setTitle(e.target.value)}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="textbody">
            <Form.Label>Text Body</Form.Label>
            <Form.Control
              as="textarea"
              rows={5}
              placeholder="Enter Text Body"
              onChange={(e) => setDesc(e.target.value)}
            />
          </Form.Group>
          <Button type="submit" style={{ marginTop: "20px" }}>
            Create Note
          </Button>
        </Form>
      </div>
    </>
  );
}

export default CreateNote;
