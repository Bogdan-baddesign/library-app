export class Book {
  constructor(
    public readonly id: string,
    public title: string,
    public author: string,
    public availableCopies: number
  ) {}

  isAvailable(): boolean {
    return this.availableCopies > 0;
  }

  borrowCopy(): void {
    if (!this.isAvailable()) {
      throw new Error(`Книга "${this.title}" недоступна — немає вільних екземплярів`);
    }
    this.availableCopies--;
  }
}