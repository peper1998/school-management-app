import { Component, OnInit } from "@angular/core";
import { CourseModel } from "src/app/_models/courses/course.model";
import { TeacherCourseLinkingModel } from "src/app/_models/courses/teacher-course-linking.model";
import { Teacher } from "src/app/_models/teachers/teacher.model";
import { CoursesService } from "src/app/_services/courses/courses.service";
import { TeachersService } from "src/app/_services/teachers/teachers.service";

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.scss']
})
export class CoursesComponent implements OnInit {

  coursesList:CourseModel[];
  teachersList:Teacher[];
  teacherCourseLinkingsList:TeacherCourseLinkingModel[];

  constructor(private coursesService:CoursesService,
              private teachersService: TeachersService) { }

  ngOnInit() {
     this.loadData()
  }

  loadData(){
    this.coursesService.getCourses().subscribe(courses=>{
      this.coursesList = courses;
    });
    this.teachersService.getTeachers().subscribe(teachers=>{
      this.teachersList=teachers;
    })
    this.coursesService.getTeacherCourseLinkings().subscribe(linkings=>{
      this.teacherCourseLinkingsList=linkings;
    })
  }

}
