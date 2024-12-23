import { Component, OnInit } from '@angular/core';
import Chart from 'chart.js';

// core components
import {
  chartOptions,
  parseOptions,
  chartExample1,
  chartExample2
} from "../../variables/charts";
import { AuthService } from 'src/app/services/auth.service';
import { StudentsService } from 'src/app/services/students.service';
import { EventsService } from 'src/app/services/events.service';
import { Events } from 'src/app/dto/events';
import { Students } from 'src/app/dto/students';
import { Lessons } from 'src/app/dto/lessons';
import { TeachersService } from 'src/app/services/teachers.service';
import { Teachers } from 'src/app/dto/teachers';
import { SharedService } from 'src/app/services/shared.service';
declare var $:any;

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  sizeOfStudent: number;
  sizeOfEvent: number;
  userInfo: string;
  lastEvents: Events[] = [];
  students: Students[] = [];
  teachers: Teachers[] = [];
  lessons: Lessons[] = [];
  public datasets: any;
  public data: any;
  public salesChart;
  public clicked: boolean = true;
  public clicked1: boolean = false;

  constructor(private authService: AuthService, private studentsService: StudentsService, private eventsService: EventsService,
    private sharedService: SharedService, private teacherService: TeachersService) {
    this.userInfo = authService.getUserFullName();
  }

  ngOnInit() {
    this.sizeOfStudents();
    this.sizeOfEvents();
    this.getLastEvents();
    this.getStudents();
    this.sharedService.lessons.forEach(value => {
      if (value.bookType == 1) {
        this.lessons.push(value);
      }
    });
    this.getTeachers();
    
    this.datasets = [
      [0, 20, 10, 30, 15, 40, 20, 60, 60],
      [0, 20, 5, 25, 10, 30, 15, 40, 40]
    ];
    this.data = this.datasets[0];


    var chartOrders = document.getElementById('chart-orders');

    parseOptions(Chart, chartOptions());


    var ordersChart = new Chart(chartOrders, {
      type: 'bar',
      options: chartExample2.options,
      data: chartExample2.data
    });

    var chartSales = document.getElementById('chart-sales');

    this.salesChart = new Chart(chartSales, {
			type: 'line',
			options: chartExample1.options,
			data: chartExample1.data
		});
  }

  sizeOfStudents() {
    this.studentsService.getSizeOfStudents().subscribe(x => this.sizeOfStudent = x);
  }

  sizeOfEvents() {
    this.eventsService.getSizeOfEvents().subscribe(x => this.sizeOfEvent = x);
  }

  getLastEvents() {
    this.eventsService.getLast7Events().subscribe(x => this.lastEvents = x);
  }

  getStudents() {
    this.studentsService.getStudentsByRegState(0).subscribe(x => this.students = x);
  }

  getTeachers() {
    this.teacherService.getTeachersByState(0).subscribe(x => this.teachers = x);
  }

  showNotification(from, align){
    const type = ['','info','success','warning','danger'];

    var color = Math.floor((Math.random() * 4) + 1);
    $.notify({
        icon: "pe-7s-gift",
        message: "Welcome to <b>Light Bootstrap Dashboard</b> - a beautiful freebie for every web developer."
    },{
        type: type[color],
        placement: {
            from: from,
            align: align
        }
    });
  }

  public updateOptions() {
    this.salesChart.data.datasets[0].data = this.data;
    this.salesChart.update();
  }

}
