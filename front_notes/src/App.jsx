import { useCallback, useEffect, useState } from "react";
import { useSocket } from "./hooks/useSocket";
import { FaTrash, FaPenAlt } from "react-icons/fa";

const initialState = { title: "", description: "" };
function App() {
  useEffect(() => {
    getNotes();
  }, []);

  const { socket } = useSocket("http://localhost:4000");
  const [note, setNote] = useState(initialState);
  const [notes, setNotes] = useState([]);
  const [isEdit, setIsEdit] = useState(false);
  const handleChange = (e) => {
    setNote({ ...note, [e.target.name]: e.target.value });
  };

  const getNotes = useCallback(() => {
    socket.on("server:getNotes", (notes) => {
      setNotes(notes);
    });
  }, []);

  const deleteNote = (id) => {
    socket.emit("client:deleteNote", id);
  };

  const actions = (e) => {
    e.preventDefault();
    isEdit
      ? socket.emit("client:updateNote", note)
      : socket.emit("client:addNote", note);

    clean();
  };

  const edit = (note) => {
    setIsEdit(true);
    setNote(note);
  };

  const clean = () => {
    setIsEdit(false);
    setNote(initialState);
  };
  return (
    <div className="container my-5">
      <div className="row">
        <div className="col-4">
          <div className="card">
            <div className="card-title text-center">Notes</div>
            <div className="card-body">
              <form onSubmit={actions}>
                <div className="mb-3">
                  <label className="form-label">Título</label>
                  <input
                    type="text"
                    name="title"
                    className="form-control"
                    autoFocus
                    required
                    onChange={(e) => handleChange(e)}
                    value={note.title}
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label">Descripción</label>
                  <input
                    type="text"
                    name="description"
                    className="form-control"
                    required
                    value={note.description}
                    onChange={(e) => handleChange(e)}
                  />
                </div>

                <button className="btn btn-primary" type="submit">
                  {isEdit ? "Editar" : "Guardar"}
                </button>
              </form>
            </div>
          </div>
        </div>

        {/* Listar Notas */}
        <div className="col-8">
          <ol className="list-group list-group-numbered">
            {notes.map((note) => (
              <li
                key={note._id}
                className="list-group-item d-flex justify-content-between align-items-start"
              >
                <div className="ms-2 me-auto">
                  <div className="fw-bold">{note.title}</div>
                  {note.description}
                </div>
                <button
                  className="btn btn-danger"
                  onClick={() => deleteNote(note._id)}
                >
                  <FaTrash />
                </button>
                <button className="btn btn-warning" onClick={() => edit(note)}>
                  <FaPenAlt />
                </button>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </div>
  );
}

export default App;
