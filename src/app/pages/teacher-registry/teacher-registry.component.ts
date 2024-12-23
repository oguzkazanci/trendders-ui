import { Component, OnInit } from '@angular/core';
import { Teachers } from 'src/app/dto/teachers';
import { Lessons } from 'src/app/dto/lessons';
import { TeachersService } from 'src/app/services/teachers.service';
import { Events } from 'src/app/dto/events';
import { EventsService } from 'src/app/services/events.service';
import { SharedService } from 'src/app/services/shared.service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-teacher-registry',
  templateUrl: './teacher-registry.component.html',
  styleUrls: ['./teacher-registry.component.css']
})
export class TeacherRegistryComponent implements OnInit {

  teachers: Teachers[] = [];
  events: Events[] = [];
  teacher: Teachers;
  lessons: Lessons[] = [];
  selectedLessons: Lessons[] = [];
  selectedLessonId: number;

  constructor(private sharedService: SharedService, private teacherService: TeachersService,
    private eventsService: EventsService, private messageService: MessageService) { 
    this.teacher = new Teachers();
  }

  ngOnInit(): void {
    this.sharedService.lessons.forEach(value => {
      if (value.lessonType == 0) {
        this.lessons.push(value);
      }
    });
    this.sharedService.lessons.forEach(value => {
      if (value.lessonType == 0) {
        this.selectedLessons.push(value);
      }
    });
    this.getTeachers();
  }
  
  saveTeacher(): void {
    if (this.teacher.workType == 1) {
      this.teacher.teacherLesPrice = 0;
    } else if (this.teacher.workType == 0) {
      this.teacher.teacherBaseFee = 0;
    }
    var slcLesList: Lessons[] = [];
    this.selectedLessons.forEach(value => {
      if (value.selected) {
        slcLesList.push(value);
      }
    });
    this.teacher.lessons = slcLesList;
    if (!this.teacher.username && !this.teacher.teacherName && !this.teacher.teacherSurname) { return; }
    this.teacherService.saveTeacher(this.teacher).subscribe(teacher1 => {
      document.getElementById("closeAddTeacherModal").click();
      this.showSuccess();
      this.getTeachers();
    });
  }

  getTeachers(): void {
    this.teachers = [];
    this.teacherService.getTeachers().subscribe(x => {
      this.teachers = x;
      this.teachers.forEach((value,index)=>{
        if (value.teacherState == 0)
          this.getLastEvent(value.teacherId);
      });
    })
  }

  getTeacher(teacher: Teachers) {
    this.clear();
    this.teacher = teacher;
    this.selectedLessons.forEach((value) => {
      if (this.teacher.lessons) {
        this.teacher.lessons.forEach(val => {
          if (val.lessonId == value.lessonId) {
            value.selected = true;
          }
        });
      }
    });
  }

  clear(): void {
    this.teacher = new Teachers();
    this.teacher.teacherMail = "";
    this.teacher.teacherName = "";
    this.teacher.teacherSurname = "";
    this.teacher.teacherAddress = "";
    this.teacher.teacherPhoneNumber = "";
    this.teacher.teacherLesPrice = null;
    this.teacher.explanation = "";
    this.teacher.username = "";
    this.selectedLessonId = null;
    this.sharedService.lessons.forEach(value => value.selected = false);
    this.selectedLessons = [];
    this.sharedService.lessons.forEach(value => {
      if (value.lessonType == 0) {
        this.selectedLessons.push(value);
      }
    });
  }

  getLastEvent(teacherId): void {
    this.events = [];
    this.eventsService.getLastEventByTeacherId(teacherId).subscribe(y => {
      this.events.push(y);
    });
  }

  getSelectedLessons(): string {
    return this.selectedLessons
      .filter(lesson => lesson.selected)
      .map(lesson => lesson.lesson)
      .join(', ');
  }
  
  showSuccess() {
    this.messageService.add({severity:'success', summary: 'Başarılı', detail: 'Başarıyla Kaydedildi!'});
  }
}