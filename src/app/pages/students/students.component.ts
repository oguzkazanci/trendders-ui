import { Component, OnInit } from '@angular/core';
import { 
  animate, 
  style, 
  transition,
  trigger,
  AnimationEvent
} from '@angular/animations';
import { Students } from 'src/app/dto/students';
import { StudentsService } from 'src/app/services/students.service';
import { SharedService } from 'src/app/services/shared.service';
import { GradeService } from 'src/app/services/grade.service';
import { Grades } from 'src/app/dto/grades';
import { Events } from 'src/app/dto/events';
import { EventsService } from 'src/app/services/events.service';
import { AuthService } from 'src/app/services/auth.service';

declare var $:any;

@Component({
  selector: 'app-students',
  templateUrl: './students.component.html',
  styleUrls: ['./students.component.css']
})
export class StudentsComponent implements OnInit {

  students: Students[] = [];
  student: Students;
  studentID: number;
  grades: Grades[] = [];
  events: Events[] = [];
  userRole: string;

  constructor(private studentsService: StudentsService, private sharedService: SharedService, 
    private eventsService: EventsService, private authService: AuthService) { }

  ngOnInit(): void {
    this.getStudents();
    this.grades = this.sharedService.grades;
    var roles = this.authService.getUserRole();
    this.userRole = roles[0];
  }

  getStudents(): void{
    this.studentsService.getStudents().subscribe(x => {
      this.students = x;
      this.students.forEach((value,index)=>{
        //if (value.regState == 0)
          //this.getLastEvent(value.studentId);
    });
    })
  }  

  delete(): void {
    this.studentsService.deleteStudent(this.studentID).subscribe(x => {     
        this.getStudents();
        window.location.href='#/students';
      }
    );
    document.getElementById("closeDeleteModal").click();
  }

  edit(id: number): void {
    this.sharedService.setStudentID(id);    
    window.location.href='#/stu-registry';
  }

  clear() {
    this.sharedService.setStudentID(null);
  }

  onPreviewDeleteModal(id: number): void {
    this.studentID = id;
  }
  
  getLastEvent(studentId): void {
    this.events = [];
    this.eventsService.getLastEventByStudentId(studentId).subscribe(y => {
      this.events.push(y);
    });
  }

  downloadPdf(studentId: number): void {
    this.studentsService.downloadPDF(studentId).subscribe((data) => {
      var tempStudentName;
        const blob = new Blob([data], {type: 'application/pdf'});
        for (let student of this.students) {
          tempStudentName = student.name + "-" + student.surname;
        }
        var downloadURL = window.URL.createObjectURL(blob);
        var link = document.createElement('a');
        link.href = downloadURL;
        link.download = tempStudentName + "-kayit.pdf";
        link.click();
    });
  }

}