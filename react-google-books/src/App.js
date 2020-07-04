import React, { useState } from 'react';
import axios from 'axios';

import './App.css';

//creating the search UI
function App() {
  const [searchTerm, setSearchTerm] = useState('');
  const onInputChange = (e) => {
    setSearchTerm(e.target.value);
  }

  let API_URL = `https://www.googleapis.com/books/v1/volumes`;

  const fetchBooks = async () => {
      // Ajax call to API using Axios
      const result = await axios.get(`${API_URL}?q=${searchTerm}`);
      // Books result
      console.log(result.data);
  }

  // Submit handler
  const onSubmitHandler = (e) => {
      // Prevent browser refreshing after form submission
      e.preventDefault();
      // Call fetch books async function
      fetchBooks();
  }

//updating books search result to state
const [books, setBooks] = useState({ items: [] });

const fetchBooks = async () => {
  const result = await axios.get(`${API_URL}?q=${searchTerm}`);
  setBooks(result.data);
};

//Displaying the books author

let authors = ['Param', 'Vennila', 'Afrin'];
bookAuthors(authors);
// Param, Vennila and Afrin
let authors = ['Param', 'Afrin'];
bookAuthors(authors);
// Param and Afrin

const bookAuthors = authors => {
  if (authors.length <= 2) {
    authors = authors.join(' and ');
  } else if (authors.length > 2) {
    let lastAuthor = ' and ' + authors.slice(-1);
    authors.pop();
    authors = authors.join(', ');
    authors += lastAuthor;
  }
  return authors;
};


  return (
    <section>
      <form onSubmit={onSubmitHandler}>
      <label>
        <span>Search for books</span>
        <input
            type="search"
            placeholder="microservice, restful design, etc.,"
            value={searchTerm}
            onChange={onInputChange}
          />
        <button type="submit">Search</button>
      </label>
    </form>
    <ul>
        {
          books.items.map((book, index) => {
            return (
              <li key={index}>
                <div>
                  <img alt={`${book.volumeInfo.title} book`} src={`http://books.google.com/books/content?id=${book.id}&printsec=frontcover&img=1&zoom=1&source=gbs_api`} />
                  <div>
                    <h3>{book.volumeInfo.title}</h3>
                    <p>{ bookAuthors(book.volumeInfo.authors) }</p>
                    <p>{book.volumeInfo.publishedDate}</p>
                  </div>
                </div>
                <hr />
              </li>
            );
          })
        }
      </ul>
  </section>
  );
}



export default App;
