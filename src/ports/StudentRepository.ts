import { Student } from "../domain/Student";

export interface StudentRepository {
  findById(id: string): Student | undefined;
  save(student: Student): void;
}