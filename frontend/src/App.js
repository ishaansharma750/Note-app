import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Register from "./pages/Register"
import "bootstrap/dist/css/bootstrap.min.css";
import Login from "./pages/Login";
import CreateNote from "./pages/CreateNote";
import MyNotes from "./pages/MyNotes";


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Register />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/notes" element={<MyNotes />}></Route>
        <Route path="/create-note" element={<CreateNote />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
