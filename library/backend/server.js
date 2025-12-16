const express = require("express");
const cors = require("cors");
const app = express();
const port = 3000;
app.use(cors());
app.use(express.json());

let nextId = 3;

let books = [
  { id: 1, title: "DBMS", author: "Korth" },
  { id: 2, title: "OS", author: "Silberschatz" },
];

app.get("/", (req, res) => {
  res.send("Library Management System");
});

app.get("/books", (req, res) => {
  res.json(books);
});

app.post("/add", (req, res) => {
  const { title, author } = req.body;

  const newBook = {
    id: nextId++,  
    title,
    author,
  };

  books.push(newBook);
  res.status(201).json(newBook);
});

app.put("/update/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const { title, author } = req.body;

  const book = books.find((b) => b.id === id);

  if (book) {
    book.title = title || book.title;
    book.author = author || book.author;
    res.json(book);
  } else {
    res.status(404).send("Book not found");
  }
});

app.delete("/delete/:id", (req, res) => {
  const id = parseInt(req.params.id);

  books = books.filter((b) => b.id !== id);
  res.send("Book deleted");
});


app.listen(port, () => {
  console.log(`Backend running at http://localhost:${port}`);
});
