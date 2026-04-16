import { BookRepository } from "../ports/BookRepository";
import { StudentRepository } from "../ports/StudentRepository";
import { LoanRepository } from "../ports/LoanRepository";
import { Loan } from "../domain/Loan";

export class BorrowBookUseCase {
  constructor(
    private bookRepository: BookRepository,
    private studentRepository: StudentRepository,
    private loanRepository: LoanRepository
  ) {}

  execute(studentId: string, bookId: string): Loan {
    const book = this.bookRepository.findById(bookId);
    if (!book) {
      throw new Error(`Книгу з id "${bookId}" не знайдено`);
    }

    const student = this.studentRepository.findById(studentId);
    if (!student) {
      throw new Error(`Студента з id "${studentId}" не знайдено`);
    }

    book.borrowCopy();
    student.borrowBook(bookId);

    const loan = new Loan(
      `loan-${Date.now()}`,
      bookId,
      studentId
    );

    this.bookRepository.save(book);
    this.studentRepository.save(student);
    this.loanRepository.save(loan);

    return loan;
  }
}