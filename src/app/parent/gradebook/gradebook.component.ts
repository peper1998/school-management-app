import { CourseModel } from './../../_models/courses/course.model';
import { MarkService } from './../../_services/mark/mark.service';
import { Component, OnInit } from '@angular/core';
import { MarkCourse } from 'src/app/_models/mark/mark-course';
import { CoursesService } from 'src/app/_services/courses/courses.service';

@Component({
  selector: 'app-gradebook',
  templateUrl: './gradebook.component.html',
  styleUrls: ['./gradebook.component.scss']
})
export class GradebookComponent implements OnInit {


  gradebook: MarkCourse[];
  course: CourseModel[];

  constructor(public markService: MarkService, public coursesService: CoursesService) { }

  ngOnInit() {
    this.markService.getMarks().subscribe(marks => {
      this.gradebook = marks;
    });

    this.coursesService.getCourses().subscribe(course => {
      this.course = course;
    });
  }

}
