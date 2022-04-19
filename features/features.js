/* eslint-disable max-classes-per-file */

const form = document.querySelector('.form-input');

/* creating an object for the book */

class Book {
  constructor(title, author) {
    this.title = title;
    this.author = author;
  }
}

/* creating storage for the books */

class Storage {
  getBooks = () => {
    let books;
    if (localStorage.getItem('booksKeeper') === null) {
      books = [];
    } else {
      books = JSON.parse(localStorage.getItem('booksKeeper'));
    }
    return books;
  }

  saveBook = (book) => {
    const books = this.getBooks();
    books.push(book);
    localStorage.setItem('booksKeeper', JSON.stringify(books));
  }

  deleteBook = (button) => {
    const books = this.getBooks();
    const divTag = button.parentNode;
    const myTitle = divTag.querySelector('title').textContent;
    const myAuthor = divTag.querySelector('author').textContent;
    const remainBooks = books.filter((book) => book.title !== myTitle && book.author !== myAuthor);
    localStorage.setItem('booksKeeper', JSON.stringify(remainBooks));
  }
}

class displayPage {
  addingBooks = () => {
    const storage = new Storage();
    const books = storage.getBooks();
    books.forEach((book) => {
      this.newBook(book);
    });
  }

newBook = (book) => {
  const bookCatalogue = document.createElement('div');
  bookCatalogue.className = 'single-book';
  const authorSection = document.createElement('div');
  authorSection.className = 'author-name';
  const span = document.createElement('span');
  span.textContent = 'By';
  const bookTitle = document.createElement('h6');
  bookTitle.className = 'title';
  const bookAuthor = document.createElement('h6');
  bookAuthor.className = 'author';
  const buttonRemove = document.createElement('button');
  buttonRemove.className = 'btn-remove';
  buttonRemove.textContent = 'Remove';
  bookTitle.textContent = book.title;
  bookAuthor.textContent = book.author;
  authorSection.append(bookTitle, span, bookAuthor);
  bookCatalogue.append(authorSection, buttonRemove);
  booksCatalogue.appendChild(bookCatalogue);
 } 

 saveBook = (book) => {
   this.newBook(book);
 }

 deleteBook = (button) => {
   const divTag = button.parentNode;
   divTag.remove();
 }

 clearForm = () => {
   form.elements.title.value = '';
   form.elements.author.value = '';
 }
}

/* displaying the UI */
const displayContent = new displayPage();
const storage = new Storage();
document.addEventListener('DOMContentLoaded', displayContent.addingBooks());

/* Adding a Book */
const addButton = document.getElementById('add-btn');
addButton.addEventListener('click', () => {
  const title = form.elements.title.value;
  const author = form.elements.author.value;
  const newBook = new Book(title, author);

  displayContent.saveBook(newBook);
  storage.saveBook(newBook);
  displayContent.clearForm();
});

document.addEventListener('click', (e) => {
  const button = e.target;
  if (button.className === 'btn-remove') {
    displayContent.deleteBook(button);
    storage.deleteBook(button);
  }
});

// const saveBook = () => {
//   let savedBooks = JSON.parse(window.localStorage.getItem('booksKeeper'));
//   if (savedBooks === null) savedBooks = [];
//   const title = form.elements.title.value;
//   const author = form.elements.author.value;
//   const book = {
//     title,
//     author,
//   };
//   savedBooks.push(book);
//   window.localStorage.setItem('booksKeeper', JSON.stringify(savedBooks));
//   newBook(book);
// };

// const addingBooks = () => {
//   const books = JSON.parse(window.localStorage.getItem('booksKeeper'));
//   if (localStorage.getItem('booksKeeper')) {
//     books.forEach((book) => {
//       newBook(book);
//     });
//   }
// };

// window.onload = addingBooks;

// addButton.addEventListener('click', () => {
//   saveBook();
//   form.elements.title.value = '';
//   form.elements.author.value = '';
// });

// const deleteBook = (button) => {
//   const FormerBooks = JSON.parse(window.localStorage.getItem('booksKeeper'));
//   const divTag = button.parentNode;
//   const myTitle = divTag.querySelector('.title').textContent;
//   const myAuthor = divTag.querySelector('.author').textContent;
//   const remainBooks = FormerBooks.filter((book) => book.title !== myTitle
//    && book.author !== myAuthor);
//   window.localStorage.setItem('booksKeeper', JSON.stringify(remainBooks));

//   divTag.remove();
// };
