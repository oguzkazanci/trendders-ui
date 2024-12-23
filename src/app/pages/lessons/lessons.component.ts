import { Component, OnInit } from '@angular/core';
import { LessonsService } from 'src/app/services/lessons.service';
import { Lessons } from 'src/app/dto/lessons';
import { Subject } from 'src/app/dto/subject';
import { SubjectService } from 'src/app/services/subject.service';
import { Publisher } from 'src/app/dto/publisher';
import { Library } from 'src/app/dto/library';
import { Students } from 'src/app/dto/students';
import { StudentsService } from 'src/app/services/students.service';
import { TrackingService } from 'src/app/services/tracking.service';
import { GivenBooks } from 'src/app/dto/given-books';
import { SharedService } from 'src/app/services/shared.service';
import { Grades } from 'src/app/dto/grades';
import { SubjectRequest } from 'src/app/dto/request/subject-request';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-lessons',
  templateUrl: './lessons.component.html',
  styleUrls: ['./lessons.component.css']
})
export class LessonsComponent implements OnInit {

  students: Students[] = [];
  student: Students;
  lessons: Lessons[] = [];
  grades: Grades[] = [];
  subjects: Subject[] = [];
  subject: Subject;
  publishers: Publisher[] = [];
  chnPublishers: Publisher[] = [];
  publisher: Publisher;
  books: Library[] = [];
  chnBooks: Library[] = [];
  booksByPublisher: Library[] = [];
  book: Library;
  givenBooks: GivenBooks[] = [];
  givenBook: GivenBooks;
  type: any;
  selectId: any;
  lesDis: any;
  subjectRequest: SubjectRequest;

  constructor(private studentService: StudentsService, private lessonsService: LessonsService, private subjectService: SubjectService,
    private bookTrackingService: TrackingService, private sharedService: SharedService, private messageService: MessageService) { 
    this.subject = new Subject();
    this.publisher = new Publisher();
    this.book = new Library();
    this.subjectRequest = new SubjectRequest();
    this.student = new Students();
    this.givenBook = new GivenBooks();
    this.getStudents();
    sharedService.lessons.forEach(value => {
      if (value.bookType == 1) {
        this.lessons.push(value);
      }
    });
    sharedService.grades.forEach(value => {
      if (value.gradeType == 1 || value.gradeType == 2) {
        this.grades.push(value);
      }
    });
    this.getPublishers();
    this.getBooks();
  }

  ngOnInit(): void {
  }
  
  getSubjects(): void {
    if (this.subjectRequest.gradeId) {
      this.subjectService.getSubjectByLessonIdAndGradeId(this.subjectRequest).subscribe( x => this.subjects = x);
    }
  }

  saveSubject(): void {
    if (!this.subject.lessonId && !this.subject.subject) { return; }
    console.log(this.subject)
    this.subjectService.addSubject(this.subject).subscribe(subject1 => {
      const existingSubjectIndex = this.subjects.findIndex(subject => subject.subjectId === subject1.subjectId);
      if (existingSubjectIndex !== -1) {
        this.subjects[existingSubjectIndex] = subject1;
      } else {
        this.subjects.push(subject1);
      }
      this.onClosePreviewSS();
      this.showSuccess();
    });
    document.getElementById("closeAddSubjectModal").click();
  }

  savePublisher(): void {
    if (!this.publisher.publisherName) { return; }
    this.lessonsService.addPublisher(this.publisher).subscribe(publisher1 => {
      const existingSubjectIndex = this.publishers.findIndex(publisher => publisher1.publisherId === publisher.publisherId);
      if (existingSubjectIndex !== -1) {
        this.publishers[existingSubjectIndex] = publisher1;
      } else {
        this.publishers.push(publisher1);
      }
      this.onClosePreviewPS();
      this.showSuccess();
    });
    document.getElementById("closeAddPublisherModal").click();
  }

  giveBookToStudent(): void {
    if (!this.givenBook.bookId && !this.student.studentId) { return; }
    this.givenBook.studentId = this.student.studentId;
    this.bookTrackingService.addGivenBook(this.givenBook).subscribe(book => {
      this.givenBooks.push(book);
      this.showSuccess();
    });
    document.getElementById("closeGiveBookModal").click();
  }

  saveBook(): void {
    if (!this.book.lessonId && !this.book.publisherId && !this.book.gradeId) { return; }
    this.lessonsService.saveBook(this.book).subscribe(book1 => {
      const existingSubjectIndex = this.books.findIndex(book => book1.bookId === book.bookId);
      if (existingSubjectIndex !== -1) {
        this.books[existingSubjectIndex] = book1;
      } else {
        this.publishers.push(book1);
      }
      this.onClosePreviewBS();
      this.showSuccess();
    });
    document.getElementById("closeAddBookModal").click();

  }

  getStudents(): void {
    this.studentService.getStudentsByRegState(0).subscribe( y => this.students = y);
  }

  getLessons(): void {
    this.lessonsService.getLessonsForBook().subscribe( x => this.lessons = x);
  }

  getPublishers(): void {
    this.lessonsService.getPublisher().subscribe( x => this.publishers = x);
  }

  getBooks(): void {
    this.lessonsService.getBooks().subscribe( x => this.books = x);
  }

  getBook(book: Library) {
    this.book = book;
  }

  getBookByPublisherId() {
    //this.lessonsService.getBooksByPublisherId(this.givenBook.publisherId).subscribe(x => this.booksByPublisher = x);
    this.chnBooks = [];
    this.givenBook.bookId = undefined;
    this.books.forEach(value => {
      if (value.lessonId == this.givenBook.lessonId && this.givenBook.publisherId == value.publisherId) {
        this.chnBooks.push(value);
      }
    });
  }

  getSubject(subject: Subject) {
    this.subject = subject;
  }

  getPublisher(publisher: Publisher) {
    this.publisher = publisher;
  }

  getGivenBooksByStudentId() {
    this.bookTrackingService.getGivenBooksByStudentId(this.student.studentId).subscribe(x => this.givenBooks = x);
    this.givenBook = new GivenBooks();
    this.givenBook.studentId = this.student.studentId;
  }

  delete() {
    if (this.type == 0) {
      this.lessonsService.deleteBook(this.selectId).subscribe();
    } else if (this.type == 1) {
      this.subjectService.deleteSubject(this.selectId).subscribe();
      this.subjects.forEach((value,index)=>{
        if(value.subjectId==this.selectId) this.subjects.splice(index,1);
      });
    } else if (this.type == 2) {
      this.lessonsService.deletePublisher(this.selectId).subscribe();
    } else if (this.type == 3) {
      this.bookTrackingService.removeGivenBook(this.selectId).subscribe();
    }
    setTimeout(() => {
      this.getBooks();
      this.getPublishers();
      this.getGivenBooksByStudentId();
      this.showSuccess();
    }, 400);
    document.getElementById("closeDeleteModal").click();
  }
  
  controls = true;

  onPreviewSubjectS(): void {
    this.subject = new Subject();
    this.subject.subject = "";

    if (this.subjectRequest.gradeId) {
      this.subject.gradeId = this.subjectRequest.gradeId;
    }
    if (this.subjectRequest.lessonId) {
      this.subject.lessonId = this.subjectRequest.lessonId;
    }
  }

  onClosePreviewSS() {
    this.clear();
  }

  onPreviewBookS(): void {
    this.book = new Library();
    this.book.bookName = "";
  }

  onClosePreviewBS() {
    this.clear();
  }

  onPreviewPublisherS(): void {
    this.publisher = new Publisher();
    this.publisher.publisherName = "";
  }

  onClosePreviewPS() {
    this.clear();
  }

  deleteScreen(type, id) {
    this.type = type;
    this.selectId = id;
  }

  clear() {
    this.subject = new Subject();
    this.publisher = new Publisher();
    this.book = new Library();
    this.givenBook = new GivenBooks();
    this.lesDis = 0;
  }

  changeDisabled() {
    if (this.givenBook.lessonId != undefined) {
      this.lesDis = 1;
    } else {
      this.lesDis = 0;
    }
    this.givenBook.publisherId = undefined;
    this.givenBook.bookId = undefined;

    this.chnBooks = [];
    this.books.forEach(value => {
      if (value.lessonId == this.givenBook.lessonId) {
        this.chnBooks.push(value);
      }
    });

    this.chnPublishers = [];
    this.chnBooks.forEach(book => {
      const existingPublisher = this.chnPublishers.find(publisher => publisher.publisherId === book.publisherId);
      if (!existingPublisher) {
        this.chnPublishers.push(this.publishers.find(publisher => publisher.publisherId === book.publisherId));
      }
    });

    this.chnBooks = [];
  }

  moveUp(index: number) {
    console.log(index);
    if (index > 0) {
      const temp = this.subjects[index];
      this.subjects[index] = this.subjects[index - 1];
      this.subjects[index - 1] = temp;
      this.subjectService.changePosition(temp.subjectId, index, index - 1).subscribe(x => x);
    }
  }

  moveDown(index: number) {
    console.log(index);
    if (index < this.subjects.length - 1) {
      const temp = this.subjects[index];
      this.subjects[index] = this.subjects[index + 1];
      this.subjects[index + 1] = temp;
      this.subjectService.changePosition(temp.subjectId, index, index + 1).subscribe(x => x);
    }
  }
  
  showSuccess() {
    this.messageService.add({severity:'success', summary: 'Başarılı', detail: 'Başarıyla Kaydedildi!'});
  }

}
