import { Book } from "../domain/Book";

export interface BookRepository {
  findById(id: string): Book | undefined;
  save(book: Book): void;
}