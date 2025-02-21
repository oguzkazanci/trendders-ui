import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-introduction',
  templateUrl: './introduction.component.html',
  styleUrls: ['./introduction.component.css']
})
export class IntroductionComponent implements OnInit {
  public isCollapsed = true;

  constructor() { }

  ngOnInit(): void {
    this.isCollapsed = true;
  }
	images = [{name: "assets/img/headers/new-tda.jpg"}, {name: "assets/img/headers/1.gif"}, {name: "assets/img/headers/2.gif"}, {name: "assets/img/headers/3.gif"}, {name: "assets/img/headers/4.gif"}, {name: "assets/img/headers/5.gif"}];


    responsiveOptions:any[] = [
        {
            breakpoint: '1024px',
            numVisible: 5
        },
        {
            breakpoint: '768px',
            numVisible: 3
        },
        {
            breakpoint: '560px',
            numVisible: 1
        }
    ];

}
