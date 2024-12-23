import { Lessons } from "./lessons";
import { Students } from "./students";
import { Teachers } from "./teachers";

export class NormalEnrollment {
    nEnrollmentId: number;
    student: Students;
    lesson: Lessons;
    teacher: Teachers;
    price: number;
    status?: number;
}