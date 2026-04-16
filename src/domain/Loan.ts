export class Loan {
  public readonly createdAt: Date;

  constructor(
    public readonly id: string,
    public readonly bookId: string,
    public readonly studentId: string
  ) {
    this.createdAt = new Date();
  }
}