const myLibrary = [];

function Book(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
    this.id = crypto.randomUUID();
}

function addBookToLibrary(title, author, pages, read) {
    const newBook = new Book(title, author, pages, read);
    myLibrary.push(newBook);
    return newBook.id;
}

function displayBooks() {
    const libraryDiv = document.getElementById("library");
    libraryDiv.innerHTML = "";
    myLibrary.forEach(function(book) {

        const bookDiv = document.createElement("div");
        bookDiv.classList.add("book");
        bookDiv.setAttribute("data-id", book.id);
        bookDiv.innerHTML = `
            <h2>${book.title}</h2>
            <p>Author: ${book.author}</p>
            <p>Pages: ${book.pages}</p>
            <p>Read: ${book.read}</p>
        `;
        const removeButton = document.createElement("button");
        removeButton.textContent = "Remove";
        removeButton.addEventListener("click", function() {
            const bookIndex = myLibrary.findIndex(b => b.id === book.id);
            if (bookIndex !== -1) {
                myLibrary.splice(bookIndex, 1);
                displayBooks();
            }
        });

        const readButton = document.createElement("button");
        readButton.textContent = "Toggle Read";
        readButton.addEventListener("click", function() {
            const bookIndex = myLibrary.findIndex(b => b.id === book.id);
            if (bookIndex !== -1) {
                myLibrary[bookIndex].toggleRead();
                displayBooks();
            }
        });

        bookDiv.appendChild(removeButton);
        bookDiv.appendChild(readButton);
        libraryDiv.appendChild(bookDiv);
    });
}

Book.prototype.toggleRead = function() {
    this.read = !this.read;
};

const newBookButton = document.getElementById("newBookButton");
const bookForm = document.getElementById("bookForm");

newBookButton.addEventListener("click", function() {
    bookForm.hidden = false;
});

addBookToLibrary("The Hobbit", "J.R.R. Tolkien", 310, false);
addBookToLibrary("Harry Potter", "J.K. Rowling", 450, true);

displayBooks();
console.log(myLibrary);

bookForm.addEventListener("submit", function(event) {
    event.preventDefault();

    const title = document.getElementById("title").value;
    const author = document.getElementById("author").value;
    const pages = parseInt(document.getElementById("pages").value);
    const read = document.getElementById("read").checked;

    addBookToLibrary(title, author, pages, read);
    displayBooks();

    bookForm.reset();
});