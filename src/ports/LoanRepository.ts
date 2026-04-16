import { Loan } from "../domain/Loan";

export interface LoanRepository {
  save(loan: Loan): void;
  findAll(): Loan[];
}