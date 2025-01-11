import { Component, OnInit } from '@angular/core';
import { NgbCalendar, NgbDate, NgbDateParserFormatter } from '@ng-bootstrap/ng-bootstrap';
import { Students } from 'src/app/dto/students';
import { StudentsService } from 'src/app/services/students.service';
import * as moment from 'moment';
import { LessonsService } from 'src/app/services/lessons.service';
import { Lessons } from 'src/app/dto/lessons';
import { Subject } from 'src/app/dto/subject';
import { SubjectService } from 'src/app/services/subject.service';
import { Targets } from 'src/app/dto/targets';
import { TargetsService } from 'src/app/services/targets.service';
import { DatePipe } from '@angular/common';
import { BookProgress } from 'src/app/dto/book-progress';
import { TrackingService } from 'src/app/services/tracking.service';
import { Library } from 'src/app/dto/library';
import { Publisher } from 'src/app/dto/publisher';
import { GivenBooks } from 'src/app/dto/given-books';
import { SharedService } from 'src/app/services/shared.service';
import { SubjectProgressRequest } from 'src/app/dto/request/subject-progress-request';
import { SubjectProgress } from 'src/app/dto/subject-progress';
import { ExamProgress } from 'src/app/dto/exam-progress';
import { Grades } from 'src/app/dto/grades';
import { SubjectRequest } from 'src/app/dto/request/subject-request';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-stu-tracking',
  templateUrl: './stu-tracking.component.html',
  styleUrls: ['./stu-tracking.component.css']
})
export class StuTrackingComponent implements OnInit {
  
	students: Students[] = [];
	student: Students;	
  questTarget: Targets[] = [];
  timeTarget: Targets[] = [];
  target: Targets;
	lessons: Lessons[] = [];
  subjects: Subject[] = [];
  subjectsForTrack: Subject[] = [];
  subjectsAll: Subject[] = [];
  grades: Grades[] = [];
  bookProgresses: BookProgress[] = [];
  progressList: BookProgress[] = [];
  subjectProgressList: SubjectProgress[] = [];
  subjectProgressListChange: SubjectProgress[] = [];
  examList: ExamProgress[] = [];
  bookTrack: BookProgress;
  givenBooks: GivenBooks[] = [];
  givenBooksLesson: any[] = [];
  books: Library[] = [];
  publishers: Publisher[] = [];
  hoveredDate: NgbDate | null = null;
	fromDate: NgbDate | null;
	toDate: NgbDate | null;
	isDisabled: any;
	model: any;
  selectedLesson: any;
  selectedColor: string = 'red-row';
	modelQuest1: any = "";
	modelQuest2: any = "";
	modelTime1: any = "";
	modelTime2: any = "";
  totalWorkTime: any;
  totalSolvedQuestion: any;
  foyLessons: any[] = [];
  foySubjects: any[] = [];
  foyLessonSubjects: any[] = [];
  buttonState: boolean = true;
  buttonStateSP: boolean = true;
  selectedFoyId: number;
  newExam: ExamProgress;

  constructor(private studentsService: StudentsService, public formatter: NgbDateParserFormatter,
    private calendar: NgbCalendar, private sharedService: SharedService, private lessonsService: LessonsService,
	  private subjectService: SubjectService, private targetsService: TargetsService,
    private datePipe: DatePipe, private trackingService: TrackingService, private messageService: MessageService) {
    this.getStudents();
    this.getPublishers();
    this.datePicker(0, 0);
    this.datePicker(0, 1);
    this.isDisabled = (date: NgbDate) => 
    this.calendar.getWeekday(date) !== 1;
	  this.model = (date: NgbDate) => 
    this.calendar.getWeekday(date) !== 1;
	  this.student = new Students();
	  this.target = new Targets();
    this.bookTrack = new BookProgress();
    this.newExam = new ExamProgress();
  }

  ngOnInit(): void {
    this.sharedService.lessons.forEach(value => {
      if (value.bookType == 1) {
        this.lessons.push(value);
      }
    });
    this.grades = this.sharedService.grades;
    this.foyLessons = this.sharedService.foyLessons;
    this.foySubjects = this.sharedService.foySubjects;
  }

  saveTarget(type: number): void {
    this.target.studentId = this.student.studentId;
    this.target.targetType = type;
    this.target.targetStatus = 0;
    this.targetsService.addTarget(this.target).subscribe(target1 => {
      if (type == 0) {
        this.getTargets(0);
        document.getElementById("closeTargetQuestionModal").click();
      } else {
        this.getTargets(1);
        document.getElementById("closeTargetTimeModal").click();
      }
      this.showSuccess();
    });
    this.clear();
  }

  saveEasyTarget(type: number, target: Targets) {
    if (type == 0) {
      target.solvedNoQ = target.targetedNoQ;
      target.targetStatus = 1;
      this.targetsService.addTarget(target).subscribe(target1 => {
        this.getTargets(0);
        this.showSuccess();
      });
    } else if(type == 1) {
      target.targetStatus = 2;
      this.targetsService.addTarget(target).subscribe(target1 => {
        this.getTargets(0);
        this.showSuccess();
      });
    } else if (type == 2) {
      target.targetStatus = 1;
      this.targetsService.addTarget(target).subscribe(target1 => {
        this.getTargets(1);
        this.showSuccess();
      });
    } else if (type == 3) {
      target.targetStatus = 2;
      this.targetsService.addTarget(target).subscribe(target1 => {
        this.getTargets(1);
        this.showSuccess();
      });
    }
  }

  getTargets(type: number): void {
    this.getSubjectsAll();
    var tempStudentId: number = +((document.getElementById("inputStudent")as HTMLInputElement).value);
    if (type == 0) {
      this.questTarget = [];
      this.targetsService.getTargets(type, tempStudentId, this.modelQuest1).subscribe(z => {
        this.questTarget = z;
        this.targetsService.getTotalSolvedQuestion(tempStudentId, this.modelQuest1).subscribe(z => {
          this.totalSolvedQuestion = z;
          var tempAcc = document.getElementById("panel1")as HTMLElement;
          tempAcc.style.maxHeight = tempAcc.scrollHeight + "px";
          tempAcc.style.minHeight = "375px";
        });
      });
    } else if (type == 1) {
      this.timeTarget = [];
      this.targetsService.getTargets(type, tempStudentId, this.modelTime1).subscribe(z => {
        this.timeTarget = z;
        this.targetsService.getTotalWorkTime(tempStudentId, this.modelTime1).subscribe(z => {
          this.totalWorkTime = z;
          var tempAcc = document.getElementById("panel2")as HTMLElement;
          tempAcc.style.maxHeight = tempAcc.scrollHeight + "px";
          tempAcc.style.minHeight = "375px";
        });
      });      
    }
  }

  getTarget(target: Targets) {
    this.target = target;
    this.subjectService.getSubjectByLessonId(target.lessonId).subscribe(x => {
      this.subjects = x;
    })
  }

  getStudents(): void{
    this.studentsService.getStudentsByRegState(0).subscribe(z => this.students = z);
  }

  getSubjectsAll(): void{
	  this.subjectsAll =  [];
    this.subjectService.getSubjects().subscribe(x => {
		this.subjectsAll = x;
    })
  }

  getSubjects(event): void{
    this.subjects =  [];
    this.subjectService.getSubjectByLessonId(event.target.value).subscribe(x => {
      this.subjects = x;
    })
    this.target.lessonId = event.target.value;
  }

  getStudent(event): void {
    const id = this.students[event.target.selectedIndex - 1].studentId;
    this.studentsService.getStudent(id).subscribe( x => this.student = x);
    this.subjectsForTrack = [];
    this.bookProgresses = [];
    this.givenBooks = [];
    this.questTarget = [];
    this.timeTarget = [];
    this.subjectProgressList = [];
    this.subjectProgressListChange = [];
    this.examList = [];
    this.newExam = new ExamProgress();
    this.trackingService.getLessonsByStudentId(event.target.value).subscribe(x => this.givenBooksLesson = x );
    this.getExamProgressByStudentId(event.target.value);
  }

  getPublishers(): void {
    this.lessonsService.getPublisher().subscribe(x => this.publishers = x )
  }

  getSubjectForTracking(givenBook: string[]) {
    this.selectedLesson = givenBook[1];
    var gradeId = givenBook[2];
    var subReq = new SubjectRequest;
    subReq.gradeId = +gradeId;
    subReq.lessonId = this.selectedLesson;
    this.subjectsForTrack =  [];
    this.bookProgresses = [];
    this.givenBooks = [];
    this.trackingService.getGivenBook(this.student.studentId, this.selectedLesson, gradeId).subscribe(x => {
      this.givenBooks = x;
      this.subjectService.getSubjectByLessonIdAndGradeId(subReq).subscribe(x => {
        this.subjectsForTrack = x;
        this.trackingService.getProgressByStudentIdAndLessonId(this.student.studentId, this.selectedLesson).subscribe(x => {
          this.bookProgresses = x;
          var tempAcc = document.getElementById("panel3")as HTMLElement;
          tempAcc.style.maxHeight = tempAcc.scrollHeight + "px";
          tempAcc.style.minHeight = "375px";
        });
      });
    });
  }

  listProgressStatus(givenBookId: number, subjectId: number, bookId: number, type: number) {
    var tempState = 0;
    var tempState2 = 0;
    var tempStudentId: number = +((document.getElementById("inputStudent")as HTMLInputElement).value);
    this.bookTrack = new BookProgress();
    this.bookTrack.bookProgressId = null;
    this.bookTrack.studentId = tempStudentId;
    this.bookTrack.givenBookId = givenBookId;
    this.bookTrack.subjectId = subjectId;
    this.bookTrack.progress = type;
    this.bookTrack.bookId = bookId;
    this.bookTrack.lessonId = this.selectedLesson;
    this.bookProgresses.forEach((value,index)=>{
      if(value.studentId == this.bookTrack.studentId && value.bookId == this.bookTrack.bookId && 
       value.subjectId == this.bookTrack.subjectId && value.givenBookId == this.bookTrack.givenBookId) {
        this.bookProgresses[index].progress = type;
        tempState = 1;
      }
    });
    this.progressList.forEach((value, index)=>{
      if(value.studentId == this.bookTrack.studentId && value.bookId == this.bookTrack.bookId && 
        value.subjectId == this.bookTrack.subjectId && value.givenBookId == this.bookTrack.givenBookId) {
         this.progressList[index].progress = type;
         tempState2 = 1;
      }
    });
    if (tempState == 0) {
      this.bookProgresses.push(this.bookTrack);
    }
    if (tempState2 == 0) {
      this.progressList.push(this.bookTrack);
    }
    this.buttonState = true;
    setTimeout(() => {
      var tempAcc = document.getElementById("panel3")as HTMLElement;
      tempAcc.style.maxHeight = tempAcc.scrollHeight + "px";
      tempAcc.style.minHeight = "375px";
    }, 300);
  }

  saveProgressStatus() {
    this.progressList.forEach((value, index)=>{
      this.buttonState = false;
      this.trackingService.saveBookProgress(value).subscribe(track => {
        this.progressList = [];
        this.showSuccess();
      });
    });
  }

  getUniquePublishers(): any[] {
    const uniquePublishers: any[] = [];
  
    this.givenBooks.forEach(item => {
      for (let publisher of this.publishers) {
        if ((item.publisherId && !uniquePublishers.includes(publisher.publisherName)) && publisher.publisherId == item.publisherId) {
          uniquePublishers.push({ PUBLISHER_NAME: publisher.publisherName, PUBLISHER_ID: publisher.publisherId, BOOK_ID: item.bookId, GIVEN_BOOK_ID: item.givenBookId});
        }
      }
    });
  
    return uniquePublishers;
  }

  getUniqueSubjects(): any[] {
    const uniqueSubjects: any[] = [];

    this.subjectsForTrack.forEach(item => {
      const gradeId = this.grades.find(x => x.gradeId == item.gradeId).grade;
      const existingSubject = uniqueSubjects.find(subject => subject.SUBJECT === item.subject && subject.EXAM_TYPE === gradeId);
      if (!existingSubject) {
        uniqueSubjects.push({ SUBJECT: item.subject, EXAM_TYPE: gradeId, SUBJECT_ID: item.subjectId });
      }
    });
  
    return uniqueSubjects;
  }
  
  getWorkStatus(subjectId: number, bookId: number): string {
    const matchingItem = this.bookProgresses.find(item => item.subjectId === subjectId && item.bookId === bookId);
  
    if (!matchingItem) {
      this.selectedColor = 'red-row';
      return 'Bilinmiyor';
    }
    
    if (matchingItem.progress === 1) {
      this.selectedColor = 'orange-row';
      return 'Çalışıyor';
    } else if (matchingItem.progress === 2) {
      this.selectedColor = 'green-row';
      return 'Tamamlandı';
    } else {
      this.selectedColor = 'red-row';
      return 'Bilinmiyor';
    }
  }

  onCloseModal() {
    this.clear();
  }

  clear() {
    this.target = new Targets();
    this.target.subjectId = 0;
  }

  accordionChange(event) {    
    var element = event.target;
    element.classList.toggle("active"); 
    var panel = element.nextElementSibling;
    if (panel.style.maxHeight) {
      panel.style.maxHeight = null;
      panel.style.minHeight = null;
    } else {
      panel.style.maxHeight = panel.scrollHeight + "px";
      panel.style.minHeight = "375px";
    }
  }

  datePicker(event, type) {
    var date = "";
    if (event == 0){
      var tmpDate = new Date();
      var day = tmpDate.getDay(),
      diff = tmpDate.getDate() - day + (day == 0 ? -6:1); // adjust when day is sunday
      tmpDate = new Date(tmpDate.setDate(diff));
      date = this.datePipe.transform(tmpDate, "yyyy-MM-dd");
    } else     
      date = event.year + "-" + event.month + "-" + event.day
    
      const mod =  moment(date, "YYYY-MM-DD").toDate();

      if (type == 0) {
        this.modelQuest1 = moment(mod).format('DD-MM-YYYY');
        const picker = moment(date, "YYYY-MM-DD").add(7, 'days').toDate();
        this.modelQuest2 = moment(picker).format('DD-MM-YYYY');
      } else if (type == 1) {
        this.modelTime1 = moment(mod).format('DD-MM-YYYY');
        const picker = moment(date, "YYYY-MM-DD").add(7, 'days').toDate();
        this.modelTime2 = moment(picker).format('DD-MM-YYYY');
      }
  }

  dateChanger(type: any) {
    if(type == 0) {
      this.modelQuest1 = this.modelQuest2;
      const picker = moment(this.modelQuest2, "DD-MM-YYYY").add(7, 'days').toDate();
      this.modelQuest2 = moment(picker).format('DD-MM-YYYY');
      this.getTargets(0);
    } else if (type == 1) {
      this.modelQuest2 = this.modelQuest1;
      const mod =  moment(this.modelQuest1, "DD-MM-YYYY").add(-7, 'days').toDate();
      this.modelQuest1 = moment(mod).format('DD-MM-YYYY');
      this.getTargets(0);
    } else if (type == 2) {
      this.modelTime1 = this.modelTime2;
      const picker = moment(this.modelTime2, "DD-MM-YYYY").add(7, 'days').toDate();
      this.modelTime2 = moment(picker).format('DD-MM-YYYY');
      this.getTargets(1);
    } else if (type == 3) {
      this.modelTime2 = this.modelTime1;
      const mod =  moment(this.modelTime1, "DD-MM-YYYY").add(-7, 'days').toDate();
      this.modelTime1 = moment(mod).format('DD-MM-YYYY');
      this.getTargets(1);
    }
  }

  getFoySubjects() {
    this.foyLessonSubjects = [];
    this.subjectProgressList = [];
    var subReq = new SubjectProgressRequest;
    subReq.foyId = this.selectedFoyId;
    subReq.studentId = this.student.studentId;
    this.foySubjects.forEach(value => {
      if (value.foyId == this.selectedFoyId) {
        this.foyLessonSubjects.push(value);
      }
    });
    this.trackingService.getSubjectProgressByStudentIdAndFoyId(subReq).subscribe(x => {
      if (x.length > 0) {
        this.subjectProgressList.push(x);
      }
    });
    setTimeout(() => {
      var tempAcc = document.getElementById("panel4")as HTMLElement;
      tempAcc.style.maxHeight = tempAcc.scrollHeight + "px";
      tempAcc.style.minHeight = "375px";
    }, 300);
  }

  changeSubjectProgress(subjectProgress: SubjectProgress, status: number) {
    this.buttonStateSP = true;
    var subProg = new SubjectProgress();
    const existingProgress = this.subjectProgressList.flat().find(sp => sp.foyKod === subjectProgress.foyKod);
    const changeExistingProgress = this.subjectProgressListChange.find(sp => sp.foyKod === subjectProgress.foyKod);
    
    if (existingProgress) {
      this.subjectProgressList.flat().find(sp => sp.foyKod === subjectProgress.foyKod).progress = status;
    } else {
      subProg = { ...subjectProgress };
      subProg.studentId = this.student.studentId;
      subProg.progress = status;
      this.subjectProgressList.push(subProg);
    }

    if (changeExistingProgress) {
      this.subjectProgressListChange.find(sp => sp.foyKod === subjectProgress.foyKod).progress = status;
    } else {
      subProg = { ...subjectProgress };
      subProg.studentId = this.student.studentId;
      subProg.progress = status;
      this.subjectProgressListChange.push(subProg);
    }
    setTimeout(() => {
      var tempAcc = document.getElementById("panel4")as HTMLElement;
      tempAcc.style.maxHeight = tempAcc.scrollHeight + "px";
      tempAcc.style.minHeight = "375px";
    }, 300);
  }

  saveSubjectProgress() {
    this.subjectProgressListChange.forEach(value=>{
      this.buttonStateSP = false;
      this.trackingService.saveSubjectProgress(value).subscribe(track => {
        this.subjectProgressListChange = [];
        this.showSuccess();
      });
    });
  }

  findSubjectProgress(foyKod: string): SubjectProgress | undefined {
    return this.subjectProgressList?.flat().find(subProg => { return subProg.foyKod === foyKod;});
  }

  getStatusClass(status: number): string {
    switch(status) {
      case 0: return 'red-row';
      case 1: return 'orange-row';
      case 2: return 'green-row';
      default: return 'red-row';
    }
  }

  showSuccess() {
    this.messageService.add({severity:'success', summary: 'Başarılı', detail: 'Başarıyla Kaydedildi!'});
  }

  showError() {
    this.messageService.add({severity:'error', summary: 'Hata', detail: 'Kayıt başarısız!'});
  }

  showDeleteSuccess() {
    this.messageService.add({severity:'success', summary: 'Başarılı', detail: 'Sınav Silindi!'});
  }

  showDeleteError() {
    this.messageService.add({severity:'error', summary: 'Hata', detail: 'Silme başarısız!'});
  }

  showInfo() {
    this.messageService.add({severity:'info', summary: 'Bilgi', detail: 'Bilgi mesajı'});
  }

  getExamProgressByStudentId(studentId: number) {
    this.examList = [];
    this.trackingService.getExamProgressByStudentId(studentId).subscribe(exam => {
      if (exam.length > 0) {
        this.examList = exam;
      }
    });
  }

  saveExam() {
    if (
      this.newExam.examName && this.newExam.examDate &&
      /*this.newExam.turkishD !== null && this.newExam.turkishY !== null && */this.newExam.turkishN !== null &&
      /*this.newExam.mathD !== null && this.newExam.mathY !== null && */this.newExam.mathN !== null &&
      /*this.newExam.scienceD !== null && this.newExam.scienceY !== null && */this.newExam.scienceN !== null &&
      /*this.newExam.socialD !== null && this.newExam.socialY !== null && */this.newExam.socialN !== null
    ) {
      this.newExam.studentId = this.student.studentId;
      this.trackingService.saveExamProgress(this.newExam).subscribe(exam => this.examList.push({ ...exam }) );
      this.newExam = new ExamProgress();
      var tempAcc = document.getElementById("panel5")as HTMLElement;
      tempAcc.style.maxHeight = tempAcc.scrollHeight + "px";
      tempAcc.style.minHeight = "375px";
      this.showSuccess();
    } else {
      alert('Lütfen sınav ile ilgili alanları ve net bilgilerini doldurun.');
    }
  }

  checkNewExam(): boolean {
    return this.newExam.examName && this.newExam.examDate &&
    /*this.newExam.turkishD !== null && this.newExam.turkishY !== null && */this.newExam.turkishN !== null &&
    /*this.newExam.mathD !== null && this.newExam.mathY !== null && */this.newExam.mathN !== null &&
    /*this.newExam.scienceD !== null && this.newExam.scienceY !== null && */this.newExam.scienceN !== null &&
    /*this.newExam.socialD !== null && this.newExam.socialY !== null && */this.newExam.socialN !== null;
  }

  calculateCorrect(exam: ExamProgress): number {
    return (exam.turkishD || 0) + (exam.mathD || 0) + (exam.scienceD || 0) + (exam.socialD || 0);
  }

  calculateWrong(exam: ExamProgress): number {
    return (exam.turkishY || 0) + (exam.mathY || 0) + (exam.scienceY || 0) + (exam.socialY || 0)
  }

  calculateNet(exam: ExamProgress): number {
    return (exam.turkishN || 0) + (exam.mathN || 0) + (exam.scienceN || 0) + (exam.socialN || 0)
  }

  deleteExam(examId: number) {
    this.trackingService.deleteExamProgress(examId).subscribe(exam => {
      if(exam) {
        this.examList = this.examList.filter(exam => exam.examId !== examId);
        this.showDeleteSuccess();
        var tempAcc = document.getElementById("panel5")as HTMLElement;
        tempAcc.style.maxHeight = tempAcc.scrollHeight + "px";
        tempAcc.style.minHeight = "375px";
      } else {
        this.showDeleteError();
      }
    });
  }
}
