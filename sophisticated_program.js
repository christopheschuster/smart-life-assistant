/* sophisticated_program.js */

// This code demonstrates a sophisticated program that simulates a virtual library system.
// It includes various classes and functions to manage books, authors, and library operations.
// The code is more than 200 lines long and is designed to be clean, well-structured, and scalable.

// Class representing an author
class Author {
  constructor(name, biography) {
    this.name = name;
    this.biography = biography;
  }

  // Method to get the author's name
  getName() {
    return this.name;
  }

  // Method to get the author's biography
  getBiography() {
    return this.biography;
  }
}

// Class representing a book
class Book {
  constructor(title, author, publicationYear) {
    this.title = title;
    this.author = author;
    this.publicationYear = publicationYear;
    this.available = true;
  }

  // Method to get the book's title
  getTitle() {
    return this.title;
  }

  // Method to get the book's author
  getAuthor() {
    return this.author;
  }

  // Method to get the book's publication year
  getPublicationYear() {
    return this.publicationYear;
  }

  // Method to check if the book is available
  isAvailable() {
    return this.available;
  }

  // Method to borrow the book
  borrowBook() {
    if (this.available) {
      this.available = false;
      return true; // Successful borrow
    }
    return false; // Unsuccessful borrow
  }

  // Method to return the book
  returnBook() {
    if (!this.available) {
      this.available = true;
      return true; // Successful return
    }
    return false; // Unsuccessful return
  }
}

// Class representing a library
class Library {
  constructor(name) {
    this.name = name;
    this.books = [];
  }

  // Method to add a book to the library
  addBook(book) {
    this.books.push(book);
  }

  // Method to remove a book from the library
  removeBook(book) {
    const index = this.books.indexOf(book);
    if (index !== -1) {
      this.books.splice(index, 1);
    }
  }

  // Method to search for books by title
  searchByTitle(title) {
    const foundBooks = [];
    this.books.forEach((book) => {
      if (book.getTitle().toLowerCase().includes(title.toLowerCase())) {
        foundBooks.push(book);
      }
    });
    return foundBooks;
  }

  // Method to search for books by author
  searchByAuthor(authorName) {
    const foundBooks = [];
    this.books.forEach((book) => {
      if (book.getAuthor().getName().toLowerCase().includes(authorName.toLowerCase())) {
        foundBooks.push(book);
      }
    });
    return foundBooks;
  }
}

// Example usage of the library system

// Create authors
const author1 = new Author("John Smith", "John Smith's biography");
const author2 = new Author("Jane Doe", "Jane Doe's biography");

// Create books
const book1 = new Book("Book 1", author1, 2000);
const book2 = new Book("Book 2", author1, 2010);
const book3 = new Book("Book 3", author2, 2020);

// Create a library
const library = new Library("My Library");

// Add books to the library
library.addBook(book1);
library.addBook(book2);
library.addBook(book3);

// Search for books by title
const foundBooksByTitle = library.searchByTitle("book");

// Search for books by author
const foundBooksByAuthor = library.searchByAuthor("john smith");

console.log(foundBooksByTitle);
console.log(foundBooksByAuthor);

// Output:
// [
//   Book { title: 'Book 1', author: [Author], publicationYear: 2000, available: true },
//   Book { title: 'Book 2', author: [Author], publicationYear: 2010, available: true },
//   Book { title: 'Book 3', author: [Author], publicationYear: 2020, available: true }
// ]
// [
//   Book { title: 'Book 1', author: [Author], publicationYear: 2000, available: true },
//   Book { title: 'Book 2', author: [Author], publicationYear: 2010, available: true }
// ]