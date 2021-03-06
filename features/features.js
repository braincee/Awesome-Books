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
  };

  saveBook = (book) => {
    const books = this.getBooks();

    books.push(book);
    localStorage.setItem('booksKeeper', JSON.stringify(books));
  };

  deleteBook = (button) => {
    const books = this.getBooks();
    const divTag = button.parentNode;
    const myTitle = divTag.querySelector('.title').textContent;
    const myAuthor = divTag.querySelector('.author').textContent;
    const remainBooks = books.filter((book) => book.title !== myTitle && book.author !== myAuthor);
    localStorage.setItem('booksKeeper', JSON.stringify(remainBooks));
  };
}

class DisplayPage {
  addingBooks = () => {
    const storage = new Storage();
    const books = storage.getBooks();
    books.forEach((book) => {
      this.newBook(book);
    });
  };

  /* creating a new Book */
  newBook = (book) => {
    const booksCatalogue = document.querySelector('.lib-catalogue');
    const bookCatalogue = document.createElement('div');
    bookCatalogue.className = 'single-book';
    const authorSection = document.createElement('div');
    authorSection.className = 'author-name';
    const span = document.createElement('span');
    span.textContent = 'by';
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
  };

  saveBook = (book) => {
    this.newBook(book);
  };

  deleteBook = (button) => {
    const divTag = button.parentNode;
    divTag.remove();
  };

  clearForm = () => {
    form.elements.title.value = '';
    form.elements.author.value = '';
  };
}

/* displaying the UI */
const displayContent = new DisplayPage();
const storage = new Storage();

const saveInfo = document.querySelector('.form-container');
const contactInfo = document.querySelector('.contact');
const displayInfo = document.querySelector('.container');
document.addEventListener('DOMContentLoaded', () => {
  displayContent.addingBooks();
  contactInfo.style.display = 'none';
  saveInfo.style.display = 'none';
});

/* Adding a Book */
const addButton = document.querySelector('#add-btn');
addButton.addEventListener('click', () => {
  const title = form.elements.title.value;
  const author = form.elements.author.value;
  const newBook = new Book(title, author);

  displayContent.saveBook(newBook);
  storage.saveBook(newBook);
  displayContent.clearForm();
});

/* removing a book */

document.addEventListener('click', (e) => {
  const button = e.target;
  if (button.className === 'btn-remove') {
    displayContent.deleteBook(button);
    storage.deleteBook(button);
  } else if (button.parentNode.id === 'list') {
    displayInfo.style.display = 'flex';
    contactInfo.style.display = 'none';
    saveInfo.style.display = 'none';
  } else if (button.parentNode.id === 'add') {
    saveInfo.style.display = 'flex';
    contactInfo.style.display = 'none';
    displayInfo.style.display = 'none';
  } else if (button.parentNode.id === 'contact') {
    saveInfo.style.display = 'none';
    contactInfo.style.display = 'flex';
    displayInfo.style.display = 'none';
  }
});

/* Displaying the current date and time */
const dateTime = document.querySelector('#date-time');
function getDate() {
  const showDate = new Date();
  const datetime = `Wednesday ${showDate.getDate()}th/${showDate.getMonth() + 1}
  /${showDate.getFullYear()}, ${showDate.getHours()}:${showDate.getMinutes()}:
  ${showDate.getSeconds()}`;
  dateTime.innerHTML = datetime;
}
setInterval(getDate, 500);
