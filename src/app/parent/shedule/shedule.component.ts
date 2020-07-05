import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-shedule',
  templateUrl: './shedule.component.html',
  styleUrls: ['./shedule.component.scss']
})
export class SheduleComponent implements OnInit {

  
  constructor() { }

  ngOnInit() {
  }
  
  // listOfShedule: SheduleModel[];

  // constructor(private sheduleService: SheduleService) { }

  // ngOnInit() {
  //   this.sheduleService.getShedule().subscribe(x => {
  //     this.listOfShedule = x;
  //     console.log(this.listOfShedule);
  //   })
  // }

  // public getTeacher():String{
  //   return this.listOfShedule[0].teacherName + " " + this.listOfShedule[0].teacherSurname;
  // }

  // public getRecord(dayNumber: number, lessonNumber: number): String {
    
  //   let len: number = this.listOfShedule.length;
  //   var i: number = 0;

  //   while (i != len) {
  //     if (this.listOfShedule[i].day == dayNumber) {
  //       if (this.listOfShedule[i].lessonNumber == lessonNumber) {
  //         return this.listOfShedule[i].subjectName + ',   s.' + this.listOfShedule[i].schoolClassSymbol;
  //       }
  //     }
  //     i = i + 1;
  //   }
  //   return "------------";
  // }

}
