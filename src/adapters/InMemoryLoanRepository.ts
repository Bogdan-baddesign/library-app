import { Loan } from "../domain/Loan";
import { LoanRepository } from "../ports/LoanRepository";

export class InMemoryLoanRepository implements LoanRepository {
  private loans: Loan[] = [];

  save(loan: Loan): void {
    this.loans.push(loan);
  }

  findAll(): Loan[] {
    return [...this.loans];
  }
}