
const newBook = (book) => {
  const bookCatalogue = document.createElement('div');
  bookCatalogue.className = 'single-book';
  const authorSection = document.createElement('div');
  authorSection.className='author-name'
  const span =document.createElement('span');
  span.textContent= 'By';
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

 booksCatalogue.appendChild(bookCatalogue)
};

const addButton = document.getElementById('add-btn');
const form = document.querySelector('.form-input');
const booksCatalogue = document.querySelector('.lib-catalogue');



const saveBook = () => {
  let savedBooks = JSON.parse(window.localStorage.getItem('booksKeeper'));
  if (savedBooks === null) savedBooks = [];
  const title = form.elements.title.value;
  const author = form.elements.author.value;
  const book = {title,author, };
  savedBooks.push(book);
  window.localStorage.setItem('booksKeeper', JSON.stringify(savedBooks));
  newBook(book);
};

const addingBooks = () => {
  const books = JSON.parse(window.localStorage.getItem('booksKeeper'));
  if (localStorage.getItem('booksKeeper')) {
    books.forEach((book) => {
      newBook(book);
    });
  }
};

window.onload = addingBooks;

addButton.addEventListener('click', () => {
  saveBook();
  form.elements.title.value = '';
  form.elements.author.value = '';
});


const deleteBook = (button) => {
  const FormerBooks = JSON.parse(window.localStorage.getItem('booksKeeper'));
  const divTag = button.parentNode;
  const myTitle = divTag.querySelector('.title').textContent;
  const myAuthor = divTag.querySelector('.author').textContent;
  const remainBooks = FormerBooks.filter((book) => book.title !== myTitle && book.author !== myAuthor);
  window.localStorage.setItem('booksKeeper', JSON.stringify(remainBooks));

  divTag.remove();
};

document.addEventListener('click', (e) => {
  const button = e.target;
  if (button.className === 'btn-remove') {
    deleteBook(button);
  }
});