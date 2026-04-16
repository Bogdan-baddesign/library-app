export class Student {
  private borrowedBookIds: string[] = [];
  private static readonly MAX_BOOKS = 3;

  constructor(
    public readonly id: string,
    public name: string
  ) {}

  canBorrow(): boolean {
    return this.borrowedBookIds.length < Student.MAX_BOOKS;
  }

  borrowBook(bookId: string): void {
    if (!this.canBorrow()) {
      throw new Error(`Студент "${this.name}" не може взяти більше ${Student.MAX_BOOKS} книг`);
    }
    this.borrowedBookIds.push(bookId);
  }

  getBorrowedBookIds(): string[] {
    return [...this.borrowedBookIds];
  }
}