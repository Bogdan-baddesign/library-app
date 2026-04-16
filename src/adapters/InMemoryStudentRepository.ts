import { Student } from "../domain/Student";
import { StudentRepository } from "../ports/StudentRepository";

export class InMemoryStudentRepository implements StudentRepository {
  private students: Map<string, Student> = new Map();

  findById(id: string): Student | undefined {
    return this.students.get(id);
  }

  save(student: Student): void {
    this.students.set(student.id, student);
  }

  seed(student: Student): void {
    this.students.set(student.id, student);
  }
}