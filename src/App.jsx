import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

const apiUrl = 'http://127.0.0.1:8000/authors';

function App() {
  const [authors, setAuthors] = useState([]);
  const [authorForm, setAuthorForm] = useState({ id: '', name: '', surname: '' });

  useEffect(() => {
    loadAuthors();
  }, []);

  const loadAuthors = async () => {
    const response = await axios.get(apiUrl);
    setAuthors(response.data);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setAuthorForm({ ...authorForm, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (authorForm.id) {
      await axios.put(`${apiUrl}/${authorForm.id}`, {
        name: authorForm.name,
        surname: authorForm.surname,
      });
    } else {
      await axios.post(apiUrl, {
        name: authorForm.name,
        surname: authorForm.surname,
      });
    }
    setAuthorForm({ id: '', name: '', surname: '' });
    loadAuthors();
  };

  const handleEdit = (author) => {
    setAuthorForm(author);
  };

  const handleDelete = async (id) => {
    await axios.delete(`${apiUrl}/${id}`);
    loadAuthors();
  };

  return (
    <div className="App">
      <h1>Hihihihi</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="hidden"
          name="id"
          value={authorForm.id}
          onChange={handleInputChange}
        />
        <label>
          Name:
          <input
            type="text"
            name="name"
            value={authorForm.name}
            onChange={handleInputChange}
            required
          />
        </label>
        <label>
          Surname:
          <input
            type="text"
            name="surname"
            value={authorForm.surname}
            onChange={handleInputChange}
            required
          />
        </label>
        <button type="submit">Save</button>
      </form>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Surname</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {authors.map((author) => (
            <tr key={author.id}>
              <td>{author.name}</td>
              <td>{author.surname}</td>
              <td>
                <button onClick={() => handleEdit(author)}>Edit</button>
                <button onClick={() => handleDelete(author.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;

