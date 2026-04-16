import { Book } from "./domain/Book";
import { Student } from "./domain/Student";
import { BorrowBookUseCase } from "./application/BorrowBookUseCase";
import { InMemoryBookRepository } from "./adapters/InMemoryBookRepository";
import { InMemoryStudentRepository } from "./adapters/InMemoryStudentRepository";
import { InMemoryLoanRepository } from "./adapters/InMemoryLoanRepository";

// Ініціалізація адаптерів
const bookRepository = new InMemoryBookRepository();
const studentRepository = new InMemoryStudentRepository();
const loanRepository = new InMemoryLoanRepository()

// Тестові дані
const book = new Book("book-1", "Кобзар", "Тарас Шевченко", 2);
const student = new Student("student-1", "Іван Петренко");

bookRepository.seed(book);
studentRepository.seed(student);

// Ініціалізація use case
const borrowBookUseCase = new BorrowBookUseCase(
  bookRepository,
  studentRepository,
  loanRepository
);

// Виконання use case
try {
  console.log("=== Система видачі книг у бібліотеці ===\n");
  
  console.log(`Студент: ${student.name}`);
  console.log(`Книга: "${book.title}" — доступно екземплярів: ${book.availableCopies}`);
  console.log("\nВидаємо книгу...\n");

  const loan = borrowBookUseCase.execute("student-1", "book-1");

  console.log("✓ Книгу успішно видано!");
  console.log(`  ID видачі: ${loan.id}`);
  console.log(`  Дата: ${loan.createdAt.toLocaleString()}`);
  console.log(`  Залишилось екземплярів: ${book.availableCopies}`);
  console.log(`  Книг у студента: ${student.getBorrowedBookIds().length}`);

  // Перевірка бізнес-правила — книга без екземплярів
  console.log("\n--- Тест: спроба взяти недоступну книгу ---");
  const book2 = new Book("book-2", "Лісова пісня", "Леся Українка", 0);
  bookRepository.seed(book2);
  borrowBookUseCase.execute("student-1", "book-2");

} catch (error: any) {
  console.log(`✗ Помилка: ${error.message}`);
}