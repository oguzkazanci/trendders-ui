import { Lessons } from "./lessons";

export class Teachers {
    teacherId: number;
    username: string;
    teacherPhoneNumber: string;
    teacherState: number = 0;
    workType: number = 0;
    teacherMail: string;
    teacherName: string;
    teacherSurname: string;
    teacherAddress: string;
    lessons: Lessons[];
    teacherLesPrice: number;
    teacherBaseFee: number;
    explanation: string;
}