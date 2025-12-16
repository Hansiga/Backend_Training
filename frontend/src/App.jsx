import { useEffect, useState } from "react";
import axios from "axios";

const API_URL = "http://localhost:3000";

function App() {
  const [books, setBooks] = useState([]);
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    fetchBooks();
  }, []);

  const fetchBooks = async () => {
    const res = await axios.get(`${API_URL}/books`);
    setBooks(res.data);
  };

  const addBook = async () => {
    await axios.post(`${API_URL}/add`, { title, author });
    setTitle("");
    setAuthor("");
    setShowForm(false);
    fetchBooks();
  };

  const deleteBook = async (id) => {
    await axios.delete(`${API_URL}/delete/${id}`);
    fetchBooks();
  };

  const editBook = async (id) => {
    const newTitle = prompt("Enter new book name");
    const newAuthor = prompt("Enter new author name");

    await axios.put(`${API_URL}/update/${id}`, {
      title: newTitle,
      author: newAuthor,
    });

    fetchBooks();
  };

  return (
    <>
      <div className="navbar">
        <h2>Library Management System</h2>
        <button onClick={() => setShowForm(!showForm)}>Register Book</button>
      </div>

      {showForm && (
        <div className="form">
          <input
            type="text"
            placeholder="Book Name"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <input
            type="text"
            placeholder="Author Name"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
          />
          <button onClick={addBook}>Save</button>
        </div>
      )}

      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Book</th>
            <th>Author</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {books.map((book) => (
            <tr key={book.id}>
              <td>{book.id}</td>
              <td>{book.title}</td>
              <td>{book.author}</td>
              <td>
                <button className="edit" onClick={() => editBook(book.id)}>
                  Edit
                </button>
                <button className="delete" onClick={() => deleteBook(book.id)}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}

export default App;
