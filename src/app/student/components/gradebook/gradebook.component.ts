import { Component, OnInit, Input } from '@angular/core';
import { MarkService } from 'src/app/_services/mark/mark.service';
import { MarkCourse } from 'src/app/_models/mark/mark-course';
import { LessonsService } from 'src/app/_services/lessons/lessons.service';
import { Lesson } from 'src/app/_models/lessons/lesson.model';
import { CoursesService } from 'src/app/_services/courses/courses.service';
import { CourseModel } from 'src/app/_models/courses/course.model';
import { numberSymbols } from '@progress/kendo-angular-intl';

@Component({
  selector: 'app-gradebook',
  templateUrl: './gradebook.component.html',
  styleUrls: ['./gradebook.component.scss']
})
export class GradebookComponent implements OnInit {

  @Input() marksList: MarkCourse[];
  lessons: Lesson[];
  @Input() coursesList: CourseModel[];
  courses: string[];

  selectedCourseId: number;

  constructor(private lessonsService: LessonsService,
              private markService: MarkService,
              private coursesService: CoursesService) {  }

    dropdownValueChanged(val: any)
  {
    this.selectedCourseId = val.id;
  }

  ngOnInit() {

    this.lessonsService.getLessons().subscribe(lessonTable => {
      this.lessons = lessonTable;
    });

    this.markService.getMarks().subscribe(marks => {
      this.marksList = marks;
    });

    this.coursesService.getCourses().subscribe(coursesTable => {
      this.coursesList = coursesTable;
    });

    let i = 0;
    for (i; i < this.coursesList.length; i++){
      this.courses.push(this.coursesList[i].name);
    }
  }

}
