import { Component, OnInit, Injectable, ChangeDetectorRef, ViewChild, ElementRef } from '@angular/core';
import { 
  animate, 
  style, 
  transition,
  trigger,
  AnimationEvent
} from '@angular/animations';

import { CalendarOptions } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';;
import timeGridPlugin from '@fullcalendar/timegrid';
import trLocale from '@fullcalendar/core/locales/tr';
import interactionPlugin from '@fullcalendar/interaction';
import {
  NgbCalendar,
  NgbDate,
  NgbDateParserFormatter,
  NgbDateStruct,
} from '@ng-bootstrap/ng-bootstrap';
import { Lessons } from 'src/app/dto/lessons';
import { StudentsService } from 'src/app/services/students.service';
import { Students } from 'src/app/dto/students';
import { Events } from 'src/app/dto/events';
import { EventsService } from 'src/app/services/events.service';
import { Subject } from 'src/app/dto/subject';
import { TeachersService } from 'src/app/services/teachers.service';
import { Teachers } from 'src/app/dto/teachers';
import { SharedService } from 'src/app/services/shared.service';
import { MessageService } from 'primeng/api';
import { NormalEnrollment } from 'src/app/dto/normal-enrollment';

@Injectable()
export class CustomDateParserFormatter extends NgbDateParserFormatter {
  readonly DELIMITER = '/';

  parse(value: string): NgbDateStruct | null {
    if (value) {
      const date = value.split(this.DELIMITER);
      return {
        day: parseInt(date[0], 10),
        month: parseInt(date[1], 10),
        year: parseInt(date[2], 10),
      };
    }
    return null;
  }

  format(date: NgbDateStruct | null): string {
    return date
      ? date.day + this.DELIMITER + date.month + this.DELIMITER + date.year
      : '';
  }
}

@Component({
  selector: 'app-appointments',
  templateUrl: './appointments.component.html',
  styleUrls: ['./appointments.component.css'],
  animations: [
    trigger('animation', [
      transition('void => visible', [
        style({transform: 'scale(0.5)'}),
        animate('150ms', style({transform: 'scale(1)'}))
      ]),
      transition('visible => void', [
        style({transform: 'scale(1)'}),
        animate('150ms', style({transform: 'scale(0.5)'}))
      ]),
    ]),
    trigger('animation2', [
      transition(':leave', [
        style({opacity: 1}),
        animate('50ms', style({opacity: 0.8}))
      ])
    ])
  ],
  providers: [
    { provide: NgbDateParserFormatter, useClass: CustomDateParserFormatter },
  ]
})
export class AppointmentsComponent implements OnInit {
  
  teachers: Teachers[] = [];
  teachersLes: Teachers[] = [];
  students: Students[] = [];
  lessons: Lessons[] = [];
  lessonsEvent: Lessons[] = [];
  events2: Events[] = [];
  events: Events[] = [];
  subjects: Subject[] = [];
  nEnrollments: NormalEnrollment[] = [];
  repeatsIntervalDay: number = 0;
  repeatsChecked: any;
  event: Events;
  isUpdate: number = 0;
  showForm = false;
  controls = true;
  hoveredDate: NgbDate | null = null;
	fromDate: NgbDate | null;
	toDate: NgbDate | null;
  
  calendarOptions: CalendarOptions = {
    plugins: [dayGridPlugin, timeGridPlugin, interactionPlugin],
    initialView: 'dayGridMonth',
    dateClick: this.onDateClick.bind(this),
    weekends: true,
    editable: false,
    selectable: true,
    selectMirror: true,
    dayMaxEvents: true,
    locale: trLocale,
    headerToolbar: {
      left: 'prev,next today',
      center: 'title',
      right: 'dayGridMonth' // user can switch between the two    ,timeGridWeek,timeGridDay
    },
    events: [
      this.events2
    ]
  };

  constructor(private studentsService: StudentsService, private eventService: EventsService,
    private cd: ChangeDetectorRef, private sharedService: SharedService,
    private calendar: NgbCalendar, public formatter: NgbDateParserFormatter,
    private teacherService: TeachersService, private messageService: MessageService) { 
      this.event = new Events();
      this.event.description = "";
      this.event.eventStatus = true;
      this.event.title = "";
      this.sharedService.lessons.forEach(value => {
        if (value.bookType == 1) {
          this.lessons.push(value);
        }
      });
      this.getStudents();
      this.getTeachers();
      const today = this.calendar.getToday();

    this.fromDate = this.calendar.getPrev(today, 'd', today.day - 1);
    this.toDate = this.getLastDayOfMonth(this.fromDate);
  }

  private getLastDayOfMonth(date: NgbDate): NgbDate {
    const nextMonth = this.calendar.getNext(date, 'm', 1);
    return this.calendar.getPrev(nextMonth, 'd', 1);
  }

  ngOnInit(): void {
    this.getEvents();
    this.getEventsByDateRange();
  }

  onDateClick(res: any) {
    document.getElementById("addAppointment").click();
    this.calendarOptions.events = this.events2;
    this.event.date = res.dateStr;
  }

  getEvents(): void {
    this.eventService.getEvents().subscribe( y => {
      this.events2 = y;
      this.calendarOptions.events = this.events2;
    });
  }  

  getEventsByDateRange() {
    var frmDate = this.fromDate.day + "-" + this.fromDate.month + "-" + this.fromDate.year;
    var endDate = this.toDate.day + "-" + this.toDate.month + "-" + this.toDate.year;
    this.eventService.getEventsByDateRange(frmDate, endDate).subscribe( y => {
      this.events = y;
    });
  }

  addEvents(): void {
    this.editTitle();
    if (!this.event.title && !this.event.teacherId && !this.event.studentId && !this.event.lessonId) { return; }
    if (this.isUpdate == 1) {
      this.eventService.updateEvent(this.event).subscribe(event1 => {
        this.addEventSubs(event1);
        this.showSuccess();
      });
    } else if (this.repeatsChecked == true) {
      this.eventService.addRoutineEvent(this.event, this.repeatsIntervalDay).subscribe(event1 => {
        this.addEventSubs(event1);
        this.showSuccess();
      });
    } else {
      this.eventService.addEvent(this.event).subscribe(event1 => {
        this.addEventSubs(event1);
        this.showSuccess();
      });
    }
    this.onClosePreview();
  }

  pushEventsToCalendar(event: Events) {
    if (event.eventStatus) {
      this.events2.push(event);
    } else {
      this.events2.forEach((value,index)=>{
        if(value.eventId==event.eventId) this.events2.splice(index,1);
    });
    }
  }

  getEvent(event: Events) {
    this.isUpdate = 1;
    this.event = new Events();
    this.event = event;
    this.teachersLes = [];
    this.lessonsEvent = [];
    this.teachersLes = this.teachers.filter(x => x.teacherId === this.event.teacherId);
    this.lessonsEvent = this.lessons.filter(y => y.lessonId === this.event.lessonId);
  }

  openModal() {
    this.isUpdate = 0;
    this.event = new Events();
    this.event.date = new Date().toISOString().substring(0, 10);
    this.event.description = "";
    this.event.eventStatus = true;
    this.event.title = "";
  }

  addEventSubs(event1: any) {
    this.pushEventsToCalendar(event1);
    this.getEvents();
    this.getEventsByDateRange();
    this.calendarOptions.events = this.events2;
    this.cd.detectChanges();
  }

  onClosePreview() {
    document.getElementById("closeEventModal").click();
    this.calendarOptions.events = this.events2;
    this.clear();
    this.isUpdate = 0;
  }

  editTitle() {
    this.event.title = '';
    for(var student of this.students){
      if(student.studentId == this.event.studentId) {
        this.event.title = student.name;
      }
    }
    for(var lesson of this.lessons){
      if(lesson.lessonId == this.event.lessonId) {
        this.event.title = this.event.title + ' - ' + lesson.lesson.substring(0, 3);
      }
    }
    for(var teacher of this.teachers){
      if(teacher.teacherId == this.event.teacherId) {
        this.event.title = this.event.title + ' - ' + teacher.teacherName + ' Hoca';
      }
    }
  }

  clear(): void {
    this.event = new Events();
  }

  getTeachers(): void {
    this.teacherService.getTeachersByState(0).subscribe( y => this.teachers = y);
  }

  getNormalEnrollments(studentId: number) {
    this.teachersLes = [];
    this.lessonsEvent = [];
    this.studentsService.getNEnrollmentsByStudent(studentId).subscribe(y => {
      this.nEnrollments = y;
      this.nEnrollments.forEach(x => {
        this.teachersLes.push(x.teacher);
        this.lessonsEvent.push(x.lesson);
      });
    });
  }

  getStudents(): void{
    this.studentsService.getStudentsByRegState(0).subscribe(z => this.students = z);
  }

	onDateSelection(date: NgbDate) {
		if (!this.fromDate && !this.toDate) {
			this.fromDate = date;
		} else if (this.fromDate && !this.toDate && date && date.after(this.fromDate)) {
			this.toDate = date;
		} else {
			this.toDate = null;
			this.fromDate = date;
		}
	}

	isHovered(date: NgbDate) {
		return (
			this.fromDate && !this.toDate && this.hoveredDate && date.after(this.fromDate) && date.before(this.hoveredDate)
		);
	}

	isInside(date: NgbDate) {
		return this.toDate && date.after(this.fromDate) && date.before(this.toDate);
	}

	isRange(date: NgbDate) {
		return (
			date.equals(this.fromDate) ||
			(this.toDate && date.equals(this.toDate)) ||
			this.isInside(date) ||
			this.isHovered(date)
		);
	}

	validateInput(currentValue: NgbDate | null, input: string): NgbDate | null {
		const parsed = this.formatter.parse(input);
		return parsed && this.calendar.isValid(NgbDate.from(parsed)) ? NgbDate.from(parsed) : currentValue;
	}

  repeatIntervalCheckChange() {
    var tempIntervalDay: number = +((document.getElementById("inputInterval")as HTMLInputElement).value);
    this.repeatsIntervalDay = tempIntervalDay;
  }

  repeatCheckChange() {
    var tempRepeatChecked: any = (document.getElementById("repeatChecked")as HTMLInputElement).checked;
    if (tempRepeatChecked) {
      this.repeatsChecked = tempRepeatChecked;
      (document.getElementById("inputInterval")as HTMLInputElement).style.visibility = 'visible';
    } else {
      this.repeatsChecked = tempRepeatChecked;
      (document.getElementById("inputInterval")as HTMLInputElement).style.visibility = 'hidden';
    }
  }
  
  range(start: number, end: number): number[] {
    const arr = [];
    for (let i = start; i <= end; i++) {
      arr.push(i);
    }
    return arr;
  }
  
  showSuccess() {
    this.messageService.add({severity:'success', summary: 'Başarılı', detail: 'Başarıyla Kaydedildi!'});
  }
  
  onDateChange(event: any) {
    const selectedDate = new Date(event);
    const localDate = new Date(selectedDate.getTime() - selectedDate.getTimezoneOffset() * 60000);
    this.event.date = localDate.toISOString();
  }

}