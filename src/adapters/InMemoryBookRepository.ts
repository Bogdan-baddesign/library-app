import { Book } from "../domain/Book";
import { BookRepository } from "../ports/BookRepository";

export class InMemoryBookRepository implements BookRepository {
  private books: Map<string, Book> = new Map();

  findById(id: string): Book | undefined {
    return this.books.get(id);
  }

  save(book: Book): void {
    this.books.set(book.id, book);
  }

  seed(book: Book): void {
    this.books.set(book.id, book);
  }
}