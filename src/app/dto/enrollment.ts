import { Day } from "./day";
import { Lessons } from "./lessons";
import { Students } from "./students";
import { Teachers } from "./teachers";

export class Enrollment {
    enrollmentId: number;
    student: Students;
    lesson: Lessons;
    teacher: Teachers;
    firstDate: Date;
    days: Day[];
    price: number;
    status?: number;
}