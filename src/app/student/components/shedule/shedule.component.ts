import { Component, OnInit } from '@angular/core';
import { Lesson } from 'src/app/_models/lessons/lesson.model';
import { LessonsService } from 'src/app/_services/lessons/lessons.service';

@Component({
  selector: 'app-shedule',
  templateUrl: './shedule.component.html',
  styleUrls: ['./shedule.component.scss']
})
export class SheduleComponent implements OnInit {


  listOfShedule: Lesson[];

  constructor(private sheduleService: LessonsService) { }

  ngOnInit() {
    this.sheduleService.getLessons().subscribe(x => {
      this.listOfShedule = x;
      console.log(this.listOfShedule);
    })
  }

  public getRecord(dayOfWeek: number, lessonNumber: number): string {
    const len: number = this.listOfShedule.length;
    let i: number = 0;

    while (i !== len) {
      if (this.listOfShedule[i].dayOfWeek === dayOfWeek) {
        if (this.listOfShedule[i].lessonNumber === lessonNumber) {
          return this.listOfShedule[i].entityClass.name + ',   (' + this.listOfShedule[i].teacherCourse.teacher.firstName +
           ' ' + this.listOfShedule[i].teacherCourse.teacher.lastName + ') ';
        }
      }
      i = i + 1;
    }
    return "------------";
  }

}
