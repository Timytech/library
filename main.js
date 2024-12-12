const myLibrary = [];

class Book {
    constructor(title, author, pages, read) {
        this.title = title;
        this.author = author;
        this.pages = pages;
        this.read = read;
    }

    toggleRead() {
        this.read = !this.read;
    }
}

function addBookToLibrary(title, author, pages, read) {
    const newBook = new Book(title, author, pages, read);
    myLibrary.push(newBook);
    displayBooks();
}

function displayBooks() {
    const libraryDiv = document.getElementById('library');
    libraryDiv.innerHTML = ''; // Clear previous entries

    myLibrary.forEach((book, index) => {
        const bookCard = document.createElement('div');
        bookCard.classList.add('book-card');
        bookCard.setAttribute('data-index', index);

        const bookInfo = document.createElement('p');
        bookInfo.textContent = `${book.title} by ${book.author}, ${book.pages} pages, ${book.read ? 'Read' : 'Not Read'}`;
        bookCard.appendChild(bookInfo);

        const toggleReadBtn = document.createElement('button');
        toggleReadBtn.textContent = 'Toggle Read Status';
        toggleReadBtn.addEventListener('click', () => {
            book.toggleRead();
            displayBooks();
        });
        bookCard.appendChild(toggleReadBtn);

        const removeBtn = document.createElement('button');
        removeBtn.textContent = 'Remove Book';
        removeBtn.addEventListener('click', () => {
            myLibrary.splice(index, 1);
            displayBooks();
        });
        bookCard.appendChild(removeBtn);

        libraryDiv.appendChild(bookCard);
    });
}

document.getElementById('newBookBtn').addEventListener('click', () => {
    document.getElementById('formContainer').classList.toggle('hidden');
});

document.getElementById('bookForm').addEventListener('submit', (event) => {
    event.preventDefault();

    const title = document.getElementById('title').value;
    const author = document.getElementById('author').value;
    const pages = document.getElementById('pages').value;
    const read = document.getElementById('read').checked;

    addBookToLibrary(title, author, pages, read);

    document.getElementById('bookForm').reset();
    document.getElementById('formContainer').classList.add('hidden');
});
