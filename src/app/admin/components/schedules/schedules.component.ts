import { Component, OnInit } from '@angular/core';
import { TeacherCourseLinkingModel } from 'src/app/_models/courses/teacher-course-linking.model';
import { ClassModel } from 'src/app/_models/class/class.model';
import { CoursesService } from 'src/app/_services/courses/courses.service';
import { TeachersService } from 'src/app/_services/teachers/teachers.service';
import { ClassesService } from 'src/app/_services/classes/classes.service';

@Component({
  selector: 'app-schedules',
  templateUrl: './schedules.component.html',
  styleUrls: ['./schedules.component.scss']
})
export class SchedulesComponent implements OnInit {

  teacherCoursesList: TeacherCourseLinkingModel[];
  classesList: ClassModel[];

  constructor(private coursesService:CoursesService,
    private teachersService: TeachersService,
    private classesService: ClassesService) { }

  ngOnInit() {
    this.coursesService.getTeacherCourseLinkings().subscribe(linkings=>{
      this.teacherCoursesList = linkings;
    });
    this.classesService.getClasses().subscribe(classes=>{
      this.classesList=classes;
    });
  }

}
