import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { StudentsService } from 'src/app/services/students.service';
import { Students } from 'src/app/dto/students';
import { EventsService } from 'src/app/services/events.service';
import { Events } from 'src/app/dto/events';
import { Teachers } from 'src/app/dto/teachers';
import { TeachersService } from 'src/app/services/teachers.service';
import { Lessons } from 'src/app/dto/lessons';
import { Payment } from 'src/app/dto/payment';
import { PaymentService } from 'src/app/services/payment.service';
import { PaymentMethods } from 'src/app/dto/payment-methods';
import { SharedService } from 'src/app/services/shared.service';
import { ExpenseRequest } from 'src/app/dto/request/expense-request';
import { ConfirmationService, MessageService } from 'primeng/api';
import { EventWithPayment } from 'src/app/dto/event-with-payment';

@Component({
  selector: 'app-accounting',
  templateUrl: './accounting.component.html',
  styleUrls: ['./accounting.component.css']
})
export class AccountingComponent implements OnInit {

  students: Students[] = [];
  teachers: Teachers[] = [];
  lessons: Lessons[] = [];
  payments: Payment[] = [];
  paymentsTeacher: Payment[] = [];
  paymentsExpense: Payment[] = [];
  paymentMethods: PaymentMethods[] = [];
  payment: Payment;
  expensePay: Payment;
  events: Events[] = [];
  eventsWithPayments: EventWithPayment[] = [];
  eventsTeacherWithPayments: EventWithPayment[] = [];
  eventsTeacher: Events[] = [];
  months: any = [{value: 7, name: "Ağustos"},{value: 8, name: "Eylül"},{value: 9, name: "Ekim"},
  {value: 10, name: "Kasım"},{value: 11, name: "Aralık"},{value: 0, name: "Ocak"},{value: 1, name: "Şubat"},{value: 2, name: "Mart"},{value: 3, name: "Nisan"},{value: 4, name: "Mayıs"},
  {value: 5, name: "Haziran"},{value: 6, name: "Temmuz"},];
  paymentState: any = [{value: 0, name: "Ödenmemiş"}, {value: 1, name: "Ödenen"}, {value:3, name: "Tümü"}];
  selectState: number = 3;
  nowMonth: number;
  totalAmountRec: any = 0;
  totalAmountTra: any = 0;
  totalAmountCash: any = 0;
  totalAmountInc: any = 0;
  totalAmountExp: any = 0;
  totalTeacherAmount: any = 0;
  totalStudentAmount: any = 0;
  totalExpenseAmount: any = 0;
  event: Events;
  selectedOption: string = 'option1';
  selectedOptionTeacher: string = 'option3';
  inputValue: string = '';
  loading: boolean = false;
  
  constructor(private studentsService: StudentsService, private eventsService: EventsService,
    private teachersService: TeachersService, private sharedService: SharedService,
    private paymentService: PaymentService, private messageService: MessageService) {
    this.getStart();
    const now = new Date();
    this.nowMonth = now.getMonth();
    this.event = new Events();
    this.payment = new Payment();
    this.expensePay = new Payment();
  }

  ngOnInit(): void {
    this.sharedService.lessons.forEach(value => {
      if (value.bookType == 1) {
        this.lessons.push(value);
      }
    });
  }

  getEventsByStudentId() {
    this.loading = true;
    this.payments = [];
    this.events = [];
    this.totalStudentAmount = 0;
    var tempStudentId: number = +((document.getElementById("inputStudent")as HTMLInputElement).value);
    var tempMonth: number = +((document.getElementById("inputMonths")as HTMLInputElement).value);
    var tempState: number = +((document.getElementById("inputState")as HTMLInputElement).value);
    this.event.studentId = tempStudentId;
    this.eventsService.getEventsByStudentId(tempStudentId, tempMonth).subscribe(x => {
      this.eventsWithPayments = x;
      this.eventsWithPayments.forEach((currentValue, index) => {
        this.events.push(currentValue.event);
        this.payments.push(currentValue.payment);
        this.totalStudentAmount = this.totalStudentAmount + currentValue.payment.paymentAmount;
        this.controlButtonAllPayment();
      })
      this.loading = false;
    });
  }

  getEventsByTeacherId() {
    this.loading = true;
    this.paymentsTeacher = [];
    this.eventsTeacher = [];
    this.totalTeacherAmount = 0;
    var tempTeacherId: number = +((document.getElementById("inputTeacher")as HTMLInputElement).value);
    var tempMonth: number = +((document.getElementById("inputMonthsTeacher")as HTMLInputElement).value);
    var tempState: number = +((document.getElementById("inputStateTeacher")as HTMLInputElement).value);
    this.event.teacherId = tempTeacherId;
    /*this.eventsService.getEventsByTeacherId(tempTeacherId, tempMonth).subscribe(x => {
      this.eventsTeacher = x;
      this.eventsTeacher.forEach((currentValue, index) => {
        if(currentValue.eventId) {
          if (tempState == 3)
            this.paymentService.getPaymentByEventId(currentValue.eventId, 1).subscribe(y => {
              this.paymentsTeacher.push(y);
              this.totalTeacherAmount = this.totalTeacherAmount + y.paymentAmount;
              this.controlButtonAllPaymentTeacher();
            });
          else            
            this.paymentService.getPaymentByEventIdAndStatus(currentValue.eventId, 1, tempState).subscribe(y => {
              if (y.eventId) {
                this.paymentsTeacher.push(y);
                this.totalTeacherAmount = this.totalTeacherAmount + y.paymentAmount;
                this.controlButtonAllPaymentTeacher();
              } else {
                const index2: number = this.events.indexOf(currentValue);
                this.eventsTeacher.splice(index2, 1);
              }
            });
        }
      })
      this.loading = false;
    });*/
    this.eventsService.getEventsByTeacherId(tempTeacherId, tempMonth).subscribe(x => {
      this.eventsWithPayments = x;
      this.eventsWithPayments.forEach((currentValue, index) => {
        this.eventsTeacher.push(currentValue.event);
        this.paymentsTeacher.push(currentValue.payment);
        this.totalTeacherAmount = this.totalTeacherAmount + currentValue.payment.paymentAmount;
        this.controlButtonAllPaymentTeacher();
      })
      this.loading = false;
    });
  }

  getStudents(): void{
    this.studentsService.getStudentsByRegState(0).subscribe(x => {
      this.students = x;
    })
  }
  
  savePayment(type: number): void {
    if (!this.payment.paymentId && !this.payment.eventId && !this.payment.paymentMethodId && !this.payment.paymentStatus) { return; }
    this.paymentService.updatePayment(this.payment).subscribe(payment => {
      if (type === 0) {
        this.payments.push(payment);
        document.getElementById("closePaymentStudentModal").click();
        this.getEventsByStudentId();
      } else if (type === 1) {
        this.paymentsTeacher.push(payment);
        document.getElementById("closePaymentTeacherModal").click();
        this.getEventsByTeacherId();
      }
      this.getStart();
      this.showSuccess();
    });
  }
  
  saveAllPayment(): void {
    var tempPaymentMethod: number = +((document.getElementById("inputPaymentAllMethod")as HTMLInputElement).value);
    this.payments.forEach((value,index)=>{
      if(value.paymentStatus == 0) {
        value.paymentMethodId = tempPaymentMethod;
        value.paymentStatus = 1;
        this.paymentService.updatePayment(value).subscribe(payment => {
          this.payments.push(payment);
          this.getEventsByStudentId();
          this.showSuccess();
          document.getElementById("closePaymentAllStudentModal").click();
          this.getStart();
        });
      }
    });
  }
  
  saveAllTeacherPayment(): void {
    var tempPaymentMethod: number = +((document.getElementById("inputPaymentAllTeacherMethod")as HTMLInputElement).value);
    this.paymentsTeacher.forEach((value,index)=>{
      if(value.paymentStatus == 0) {
        value.paymentMethodId = tempPaymentMethod;
        value.paymentStatus = 1;
        this.paymentService.updatePayment(value).subscribe(payment => {
          this.payments.push(payment);
          this.showSuccess();
          this.getEventsByTeacherId();
          document.getElementById("closePaymentAllTeacherModal").click();
          this.getStart();
        });
      }
    });
  }

  saveExpensePayment() {
    this.expensePay.paymentStatus = 1;
    this.expensePay.paymentType = 2;
    this.paymentService.savePayment(this.expensePay).subscribe(exp2 => {
      this.paymentsExpense.push(exp2);
      this.listExpense();
      this.showSuccess();
      this.messageService.add({severity:'success', summary: 'Başarılı!', detail: 'Başarıyla Kaydedildi!'});
      document.getElementById("closePaymentExpenseModal").click();
      document.getElementById("closeApproveModal").click();
      this.getStart();
    });
  }

  expenseDateCheck(): boolean {
    if (this.expensePay.paymentDate) {
      const paymentDate = new Date(this.expensePay.paymentDate);
      const today = new Date();
  
      const isSameMonth = paymentDate.getFullYear() === today.getFullYear() && paymentDate.getMonth() === today.getMonth();
      
      return !isSameMonth;
    }
  
    return true;
  }

  getTeachers(): void{
    this.teachersService.getTeachers().subscribe(x => {
      this.teachers = x;
    })
  }

  getTotalAmountOfReceivable(): void {
    this.paymentService.getTotalAmountOfAny(0).subscribe(x => {
      if (x)
        this.totalAmountRec = x;
      else
        this.totalAmountRec = 0;
      
      this.getTotalAmountOfCash();
    });
  }

  getTotalAmountOfCash(): void {
    this.paymentService.getTotalAmountOfAny(1).subscribe(x => {
      if (x)
        this.totalAmountCash = x;
      else
        this.totalAmountCash = 0;
        
      this.getTotalAmountOfTransfer();
    });
  }

  getTotalAmountOfTransfer(): void {
    this.paymentService.getTotalAmountOfAny(2).subscribe(x => {
      if (x)
        this.totalAmountTra = x;
      else
        this.totalAmountTra = 0;
        
      this.getTotalAmountOfIncome();
    });
  }

  getTotalAmountOfIncome(): void {
    this.paymentService.getTotalAmountOfAny(3).subscribe(x => {
      if (x)
        this.totalAmountInc = x;
      else
        this.totalAmountInc = 0;
        
      this.getTotalAmountOfExpense();
    });
  }

  getTotalAmountOfExpense(): void {    
    this.paymentService.getTotalAmountOfAny(4).subscribe(x => {
      if (x)
        this.totalAmountExp = this.totalAmountInc - x;
      else 
        this.totalAmountExp = this.totalAmountInc;
    });
  }

  getRollbackPayment(type: number): void {
    this.payment.paymentMethodId = null;
    this.payment.paymentStatus = 0;
    this.payment.payBack = 1;
    this.paymentService.updatePayment(this.payment).subscribe(payment1 => {
      if (type === 0) {
        const existingPaymentIndex = this.payments.findIndex(pay => pay.paymentId === payment1.paymentId);
        if (existingPaymentIndex !== -1) {
          this.payments[existingPaymentIndex] = payment1;
        } else {
          this.payments.push(payment1);
        }
        document.getElementById("closePaymentStudentModal").click();
      } else if (type === 1) {
        const existingPaymentIndex = this.paymentsTeacher.findIndex(pay => pay.paymentId === payment1.paymentId);
        if (existingPaymentIndex !== -1) {
          this.paymentsTeacher[existingPaymentIndex] = payment1;
        } else {
          this.paymentsTeacher.push(payment1);
        }
        document.getElementById("closePaymentTeacherModal").click();
      }
      //this.getTotalAmountOfReceivable();
      this.showSuccess();
    });
  }

  listExpense() {
    this.paymentsExpense = [];
    this.totalExpenseAmount = 0;
    var tempStatus: number = +((document.getElementById("inputStateExpense")as HTMLInputElement).value);
    if (tempStatus == 3) {
      this.getTotalExpense(0, 1);
      this.getTotalExpense(1, 1);
      this.getOtherExpense(0);
      this.getOtherExpense(1);
    } else {
      this.getTotalExpense(tempStatus, 1);
      this.getOtherExpense(tempStatus);
    }
  }

  getTotalExpense(paymentStatus: number, paymentType: number): void {
    var tempMonth: number = +((document.getElementById("inputMonthsExpense")as HTMLInputElement).value);
    var expenseRequest = new ExpenseRequest;
    expenseRequest.companyId = this.sharedService.getCompanyId();
    expenseRequest.seasonId = this.sharedService.getSeasonId();
    expenseRequest.month = tempMonth;
    expenseRequest.paymentStatus = paymentStatus;
    expenseRequest.paymentType = paymentType;
    this.paymentService.getPaymentExpenses(expenseRequest).subscribe(exp => {
      if (exp.length > 0) {
        this.paymentsExpense.push(...exp);
        exp.forEach(x => {
          this.totalExpenseAmount = this.totalExpenseAmount + x.paymentAmount;
        });
      }
    });
  }

  getOtherExpense(paymentStatus: number): void {
    var tempMonth: number = +((document.getElementById("inputMonthsExpense")as HTMLInputElement).value);
    var expenseRequest = new ExpenseRequest;
    expenseRequest.companyId = this.sharedService.getCompanyId();
    expenseRequest.month = tempMonth;
    expenseRequest.paymentStatus = paymentStatus;
    expenseRequest.paymentType = 2;
    this.loading = true;
    expenseRequest.seasonId = this.sharedService.getSeasonId();
    this.paymentService.getPaymentExpenses(expenseRequest).subscribe(exp => {
      if (exp.length > 0) {
        this.paymentsExpense.push(...exp);
        exp.forEach(x => {
          this.totalExpenseAmount = this.totalExpenseAmount + x.paymentAmount;
        });
      }
      this.loading = false;
    });
  }

  getStart(): void {
    //this.getTotalAmountOfReceivable();
    this.getStudents();
    this.getTeachers();
    this.paymentMethods = this.sharedService.paymentMethods;
  }

  controlButtonAllPayment(): void {
    var state = 0;
    (document.getElementById("pdfButton")as HTMLButtonElement).style.visibility = 'hidden';
    //(document.getElementById("excelButton")as HTMLButtonElement).style.visibility = 'hidden';
    this.payments.forEach((currentValue, index) => {
      if (currentValue.paymentStatus == 0){    
        state = 1;
      }
      (document.getElementById("pdfButton")as HTMLButtonElement).style.visibility = 'visible';
      //(document.getElementById("excelButton")as HTMLButtonElement).style.visibility = 'visible';
    });
    if (state == 1)
      (document.getElementById("buttonAllPayment")as HTMLButtonElement).style.visibility = 'visible';
    else 
      (document.getElementById("buttonAllPayment")as HTMLButtonElement).style.visibility = 'hidden';
  }

  controlButtonAllPaymentTeacher(): void {
    var state = 0;
    this.paymentsTeacher.forEach((currentValue, index) => {
      if (currentValue.paymentStatus == 0){    
        state = 1;
      }
    });
    if (state == 1)
      (document.getElementById("buttonAllPaymentTeacher")as HTMLButtonElement).style.visibility = 'visible';
    else 
      (document.getElementById("buttonAllPaymentTeacher")as HTMLButtonElement).style.visibility = 'hidden';
  }

  changeRadio() {
    this.payment.amountReceived = this.payment.remainingAmount;
  }
  
  downloadPdf() {
    var tempStudentId: number = +((document.getElementById("inputStudent")as HTMLInputElement).value);
    var tempMonth: number = +((document.getElementById("inputMonths")as HTMLInputElement).value);
    this.paymentService.downloadPDF(tempStudentId, tempMonth).subscribe((data) => {
    var tempStudentName;
    var tempMonthName;
      const blob = new Blob([data], {type: 'application/pdf'});
      for (let student of this.students) {
        if (student.studentId == tempStudentId) {
          tempStudentName = student.name + "-" + student.surname;
        }
      }
      for (let month of this.months) {
        if (month.value == tempMonth) {
          tempMonthName = month.name;
        }
      }
      var downloadURL = window.URL.createObjectURL(blob);
      var link = document.createElement('a');
      link.href = downloadURL;
      link.download = tempStudentName + "-" + tempMonthName + ".pdf";
      link.click();
    
    });
  }
  
  downloadExcel() {
    var tempStudentId: number = +((document.getElementById("inputStudent")as HTMLInputElement).value);
    var tempMonth: number = +((document.getElementById("inputMonths")as HTMLInputElement).value);
    this.paymentService.downloadExcel(tempStudentId, tempMonth).subscribe((data) => {
    var tempStudentName;
    var tempMonthName;
      const blob = new Blob([data], {type: 'application/octet-stream'});
      for (let student of this.students) {
        if (student.studentId == tempStudentId) {
          tempStudentName = student.name + "-" + student.surname;
        }
      }
      for (let month of this.months) {
        if (month.value == tempMonth) {
          tempMonthName = month.name;
        }
      }
      var downloadURL = window.URL.createObjectURL(blob);
      var link = document.createElement('a');
      link.href = downloadURL;
      link.download = tempStudentName + "-" + tempMonthName + ".xlsx";
      link.click();
    
    });
  }

  onPreviewImage(): void {
    this.expensePay = new Payment();
    this.expensePay.explanation = "";
    this.expensePay.paymentAmount = 0;
    this.expensePay.paymentDate = this.formatDate(new Date());
    this.expensePay.paymentQuantity = 1;
    this.expensePay.repeatInterval = 0;
  }

  formatDate(date: Date): string {
    const year = date.getFullYear();
    const month = ('0' + (date.getMonth() + 1)).slice(-2);
    const day = ('0' + date.getDate()).slice(-2);
    return `${year}-${month}-${day}`;
  }

  toExpenseScreen(expense: Payment): void {
    this.clear();
    this.expensePay = expense;
  }

  toPaymentScreen(payment: Payment): void {
    this.clear();
    this.payment = payment;
    this.payment.amountReceived = payment.remainingAmount;
    this.payment.paymentMethodId = null;
  }

  clear(): void {
    this.payment = new Payment();
  }
  
  showSuccess() {
    this.messageService.add({severity:'success', summary: 'Başarılı', detail: 'Başarıyla Kaydedildi!'});
  }

  checkStatus(variable: any): boolean {
    if (variable != null && !this.loading) {
      return false;
    } 
    return true;
  }
}