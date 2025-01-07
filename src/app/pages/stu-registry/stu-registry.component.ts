import { Component, OnInit } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Day } from 'src/app/dto/day';
import { Enrollment } from 'src/app/dto/enrollment';
import { Grades } from 'src/app/dto/grades';
import { Lessons } from 'src/app/dto/lessons';
import { NormalEnrollment } from 'src/app/dto/normal-enrollment';
import { Package } from 'src/app/dto/package';
import { RegistryState } from 'src/app/dto/registry-state';

import { Students } from 'src/app/dto/students';
import { Teachers } from 'src/app/dto/teachers';
import { SharedService } from 'src/app/services/shared.service';
import { StudentsService } from 'src/app/services/students.service';
import { TeachersService } from 'src/app/services/teachers.service';

@Component({
  selector: 'app-stu-registry',
  templateUrl: './stu-registry.component.html',
  styleUrls: ['./stu-registry.component.css'],
})
export class StuRegistryComponent implements OnInit {

  students: Students[] = [];
  student: Students;
  packages: Package[] = [];
  package: Package;
  lessons: Lessons[] = [];
  teachers: Teachers[] = [];
  teachersListByLesson: Teachers[] = [];
  grade: Grades[] = [];
  enrollments: Enrollment[] = [];
  normalEnrollments: NormalEnrollment[] = [];
  enrollment: Enrollment = new Enrollment();
  normalEnrollment: NormalEnrollment = new NormalEnrollment();
  rState: RegistryState[] = [{rStateId: 0, rState: "Kesin Kayıt"}, {rStateId: 1, rState: "Görüşmeye Gelecek"}, {rStateId: 2, rState: "İptal"}];
  months: any[] = [
    { value: 1, label: 'Ocak' },
    { value: 2, label: 'Şubat' },
    { value: 3, label: 'Mart' },
    { value: 4, label: 'Nisan' },
    { value: 5, label: 'Mayıs' },
    { value: 6, label: 'Haziran' },
    { value: 7, label: 'Temmuz' },
    { value: 8, label: 'Ağustos' },
    { value: 9, label: 'Eylül' },
    { value: 10, label: 'Ekim' },
    { value: 11, label: 'Kasım' },
    { value: 12, label: 'Aralık' }
  ];
  numbersOfInstallment: number[] = Array(12).fill(0).map((_, i) => i + 1);
  selectedLessonId: number;
  selectedTeacherId: number;
  days: Day[] = [
    { id: 1, name: "Pazartesi", selected: false },
    { id: 2, name: "Salı", selected: false }, 
    { id: 3, name: "Çarşamba", selected: false },
    { id: 4, name: "Perşembe", selected: false },
    { id: 5, name: "Cuma", selected: false },
    { id: 6, name: "Cumartesi", selected: false },
    { id: 7, name: "Pazar", selected: false }
  ];
  
  constructor(private studentsService: StudentsService, private sharedService: SharedService, private teacherService: TeachersService,
    private messageService: MessageService, private confirmServ: ConfirmationService) { 
    this.student = new Students();
    this.package = new Package();
  }

  ngOnInit(): void {
    this.sharedService.grades.forEach(value => {
      if (value.gradeType == 1 || value.gradeType == 0) {
        this.grade.push(value);
      }
    });
    this.sharedService.lessons.forEach(value => {
      if (value.bookType == 1) {
        this.lessons.push(value);
      }
    });
    this.getPackages();
    this.getTeachers();
    if (this.sharedService.studentID) {
      this.student.studentId = this.sharedService.studentID;
      this.getStudent(this.student.studentId);
    }
  }  

  saveStudent(): void {
    if (!this.student.name || !this.student.surname || this.student.regState == null) { return; }
    this.student.seasonId = this.sharedService.getSeasonId();
    this.studentsService.saveStudent(this.student).subscribe(student1 => {
      this.students.push(student1);
      window.location.href='#/students'
    });
  }

  getStudent(id: number): void {
    this.studentsService.getStudent(id).subscribe( x => {this.student = x; this.getEnrollments(); });
  }

  getPackages(): void {
    this.studentsService.getPackages().subscribe( y => this.packages = y);
  }

  getTeachers(): void {
    this.teacherService.getTeachers().subscribe( y => this.teachers = y);
  }

  getTeachersByLessonId(): void {
    this.teacherService.getTeachersByLessonId(this.selectedLessonId).subscribe( y => this.teachersListByLesson = y);
  }

  getEnrollments(): void {
    this.studentsService.getEnrollmentsByStudent(this.student).subscribe( y => this.enrollments = y);
    this.studentsService.getNEnrollmentsByStudent(this.student.studentId).subscribe( y => this.normalEnrollments = y);
  }

  saveEnrollment(): void {
    var sDays: Day[] = [];
    this.lessons.forEach(value => {
      if (value.lessonId == this.selectedLessonId) {
        this.enrollment.lesson = value;
      }
    });
    this.teachers.forEach(value => {
      if (value.teacherId == this.selectedTeacherId) {
        this.enrollment.teacher = value;
      }
    });
    this.days.forEach(value => {
      if (value.selected == true) {
        sDays.push(value);
      }
    });
    this.enrollment.days = sDays;
    this.enrollment.status = 0;
    if (!this.student.studentId) {
      this.confirmServ.confirm({
        key: "submitConfirm",
        header: "İşlem Onayı",
        message: 'Öncelikle öğrencinin kaydedilmesi gerekir. Kaydetme işlemini onaylıyor musunuz',
        acceptLabel: "Onayla",
        rejectLabel: "İptal",
        blockScroll: true,
        accept: () => {
          this.studentsService.saveStudent(this.student).subscribe(student1 => {
            this.student = student1;
            this.enrollment.student = this.student;
            this.studentsService.saveEnrollment(this.enrollment).subscribe(enroll => {
              this.enrollments.forEach(val => {
                if (val.enrollmentId != enroll.enrollmentId) {
                  this.enrollments.push(enroll);
                }
              });
              this.messageService.add({severity:'success', summary: 'Başarılı', detail: 'Başarıyla Kaydedildi!'});
              document.getElementById("closeCoachingModal").click();
            });
          });
        },
        reject: () => {
          this.messageService.add({severity:'warn', summary: 'İptal', detail: 'İşlem İptal Edildi!'});
        }
      });  
    } else {
      this.enrollment.student = this.student;
      this.studentsService.saveEnrollment(this.enrollment).subscribe(enroll => {
        this.enrollments.forEach(val => {
          if (val.enrollmentId != enroll.enrollmentId) {
            this.enrollments.push(enroll);
          }
        });
        this.messageService.add({severity:'success', summary: 'Başarılı', detail: 'Başarıyla Kaydedildi!'});
        document.getElementById("closeCoachingModal").click();
      });
    }
  }

  saveNormalEnrollment(): void {
    this.lessons.forEach(value => {
      if (value.lessonId == this.selectedLessonId) {
        this.normalEnrollment.lesson = value;
      }
    });
    this.teachers.forEach(value => {
      if (value.teacherId == this.selectedTeacherId) {
        this.normalEnrollment.teacher = value;
      }
    });
    this.normalEnrollment.status = 0;
    if (!this.student.studentId) {
      this.confirmServ.confirm({
        key: "submitConfirm",
        header: "İşlem Onayı",
        message: 'Öncelikle öğrencinin kaydedilmesi gerekir. Kaydetme işlemini onaylıyor musunuz',
        acceptLabel: "Onayla",
        rejectLabel: "İptal",
        blockScroll: true,
        accept: () => {
          this.studentsService.saveStudent(this.student).subscribe(student1 => {
            this.student = student1;
            this.normalEnrollment.student = this.student;
            this.studentsService.saveNormalEnrollment(this.normalEnrollment).subscribe(enroll => {
              this.enrollments.forEach(val => {
                if (val.enrollmentId != enroll.enrollmentId) {
                  this.normalEnrollments.push(enroll);
                }
              });
              this.messageService.add({severity:'success', summary: 'Başarılı', detail: 'Başarıyla Kaydedildi!'});
              document.getElementById("closeNCoachingModal").click();
            });
          });
        },
        reject: () => {
          this.messageService.add({severity:'warn', summary: 'İptal', detail: 'İşlem İptal Edildi!'});
        }
      });  
    } else {
      this.normalEnrollment.student = this.student;
      this.studentsService.saveNormalEnrollment(this.normalEnrollment).subscribe(enroll => {
        this.enrollments.forEach(val => {
          if (val.enrollmentId != enroll.enrollmentId) {
            this.normalEnrollments.push(enroll);
          }
        });
        this.messageService.add({severity:'success', summary: 'Başarılı', detail: 'Başarıyla Kaydedildi!'});
        document.getElementById("closeNCoachingModal").click();
      });
    }
  }

  savePackage(): void {
    var dersler: Lessons[] = [];
    this.lessons.forEach(value => {
      if (value.selected) {
        dersler.push(value);
      }
    })
    this.package.lessons = dersler;
    this.studentsService.savePackage(this.package).subscribe(pack => {
      this.packages.push(pack);
      this.messageService.add({severity:'success', summary: 'Başarılı', detail: 'Başarıyla Kaydedildi!'});
      document.getElementById("closePackageModal").click();
    });
  }

  editEnrollment(id: number) {
    this.studentsService.getEnrollment(id).subscribe(value => { 
      this.enrollment = value;
      this.selectedLessonId = this.enrollment.lesson.lessonId;
      this.getTeachersByLessonId();
      this.selectedTeacherId = this.enrollment.teacher.teacherId;
      this.days.forEach(value => {
        this.enrollment.days.forEach(enrDay => {
          if (value.id == enrDay.id) {
            value.selected = true;
          }
        });
      });
    });
  }

  editNormalEnrollment(id: number) {
    this.normalEnrollment = new NormalEnrollment();
    this.normalEnrollments.filter(enroll => {
      if (enroll.nEnrollmentId == id) {
        this.normalEnrollment = enroll;
        this.selectedLessonId = this.normalEnrollment.lesson.lessonId;
        this.getTeachersByLessonId();
        this.selectedTeacherId = this.normalEnrollment.teacher.teacherId;
      }
    })
  }
  
  deleteEnrollment(enroll: Enrollment) {
    this.confirmServ.confirm({
      key: "deleteEnrollment",
      header: "İşlem Onayı",
      message: 'Ders kaydını silme işlemini onaylıyor musunuz?',
      acceptLabel: "Onayla",
      rejectLabel: "İptal",
      blockScroll: true,
      accept: () => {
        enroll.status = 1;
        this.studentsService.saveEnrollment(enroll).subscribe(value => {
          this.enrollments.forEach((val,index) => {
            if (val.enrollmentId == enroll.enrollmentId) this.enrollments.splice(index,1);
            this.messageService.add({severity:'success', summary: 'İşlem Sonucu', detail: 'Silme işlemi gerçekleştirildi!'});
          });
        });
      },
      reject: () => {
        this.messageService.add({severity:'warn', summary: 'İptal', detail: 'İşlem İptal Edildi!'});
      }
    });
  }
  
  deleteNormalEnrollment(enroll: NormalEnrollment) {
    this.confirmServ.confirm({
      key: "deleteEnrollment",
      header: "İşlem Onayı",
      message: 'Ders kaydını silme işlemini onaylıyor musunuz?',
      acceptLabel: "Onayla",
      rejectLabel: "İptal",
      blockScroll: true,
      accept: () => {
        enroll.status = 1;
        this.studentsService.saveNormalEnrollment(enroll).subscribe(value => {
          this.normalEnrollments.forEach((val,index) => {
            if (val.nEnrollmentId == enroll.nEnrollmentId) this.enrollments.splice(index,1);
            this.messageService.add({severity:'success', summary: 'İşlem Sonucu', detail: 'Silme işlemi gerçekleştirildi!'});
          });
        });
      },
      reject: () => {
        this.messageService.add({severity:'warn', summary: 'İptal', detail: 'İşlem İptal Edildi!'});
      }
    });
  }

  enrollmentControl(): boolean {
    var slctdChck: boolean = false;
    this.days.forEach(x => {if (x.selected) {slctdChck = true}})
    if (slctdChck && this.enrollment.firstDate != null && this.selectedTeacherId != null && this.enrollment.price != null) {
      return false;
    } else {
      return true;
    }
  }

  clear() {
    this.selectedLessonId = null;
    this.selectedTeacherId = null;
    this.teachersListByLesson = [];
    this.days.forEach(val => {
      if (val.selected == true) val.selected = false;
    });
    this.enrollment = new Enrollment();
    this.normalEnrollment = new NormalEnrollment();
  }

  packageClear() {
    this.package = new Package();
    this.lessons.forEach(value => value.selected = false);
  }
}
