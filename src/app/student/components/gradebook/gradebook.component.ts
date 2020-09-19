import { Component, OnInit } from "@angular/core";
import { Observable, of, Subject } from "rxjs";
import { tap } from "rxjs/operators";
import { CourseMarks, MarkModel } from "src/app/_models/marks/mark.model";
import { MarksService } from "src/app/_services/marks/marks.service";

@Component({
  selector: 'app-gradebook',
  templateUrl: './gradebook.component.html',
  styleUrls: ['./gradebook.component.scss']
})
export class GradebookComponent implements OnInit {
  courseDropdownItems: string[];
  selectedCourse = new Subject<string>();
  marks: CourseMarks[];
  displayedMarks: Observable<MarkModel[]>;

  constructor(private marksService:MarksService) { }

  ngOnInit() {
    this.marksService.getMarks().pipe(
      tap(m=>{
        this.courseDropdownItems = m.map(course=>course.course);
        console.log(this.courseDropdownItems);
      })
    ).subscribe(m=>{
      this.marks = m;
    });
  }

  onDropdownValueChanged(course:string){
    const courseMarks = this.marks.find(c=>c.course===course)
    this.displayedMarks = of(courseMarks.grades);
  }

  translateGrade(grade:string)
  {
    switch (grade) {
      case 'NONE': {
        return 'brak';
      }
      case 'ONE': {
        return '1';
      }
      case 'TWO': {
        return '2';
      }
      case 'THREE': {
        return '3';
      }
      case 'FOUR': {
        return '4';
      }
      case 'FIVE': {
        return '5';
      }
      case 'SIX ': {
        return '6';
      }
      default:{
        return 'err'
      }
    }
  }

}
