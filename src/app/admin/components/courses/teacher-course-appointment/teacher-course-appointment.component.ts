import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { CourseModel } from "src/app/_models/courses/course.model";
import { TeacherCourseLinkPostModel } from "src/app/_models/courses/teacher-course-link.model";
import { Teacher } from "src/app/_models/teachers/teacher.model";
import { CoursesService } from "src/app/_services/courses/courses.service";

@Component({
  selector: 'app-teacher-course-appointment',
  templateUrl: './teacher-course-appointment.component.html',
  styleUrls: ['./teacher-course-appointment.component.scss']
})
export class TeacherCourseAppointmentComponent implements OnInit {

  @Input() coursesList: CourseModel[];
  @Input() teachersList: Teacher[];
  @Output() dataStateChanged = new EventEmitter<any>();
  selectedTeacher:Teacher;
  selectedCourseId:number;

  teacherSelected(event:any)
  {
    console.log(event);
    if(event.selectedRows[0])
    {
      this.selectedTeacher = event.selectedRows[0].dataItem;
    }
  }
  dropdownValueChanged(val:any)
  {
    this.selectedCourseId=val.id;
  }

  linkTeacherWithCourse()
  {
    const model = new TeacherCourseLinkPostModel();
    model.courseId=this.selectedCourseId;
    model.teacherId = this.selectedTeacher.id;

    this.coursesService.linkTeacherWithCourse(model).subscribe(resp=>{
      alert('Przypisano przedmiot do nauczyciela');
      this.dataStateChanged.emit();
    },
    err=>{
      alert('Nie udało się przypisać przedmiotu do nauczyciela');
    })
  }

  constructor(private coursesService:CoursesService) { }

  ngOnInit() {
  }

}
