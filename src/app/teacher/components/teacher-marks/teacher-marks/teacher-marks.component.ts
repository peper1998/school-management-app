import { Component, OnInit, Input } from '@angular/core';
import { ClassModel } from 'src/app/_models/class/class.model';
import { TeacherCourseLinkingModel } from 'src/app/_models/courses/teacher-course-linking.model';
import { entityClass } from '../../_models/entityClass';
import { TeacherMarksService } from '../../_services/teacher-marks.service';

@Component({
  selector: 'app-teacher-marks',
  templateUrl: './teacher-marks.component.html',
  styleUrls: ['./teacher-marks.component.scss']
})
export class TeacherMarksComponent implements OnInit {

  constructor(private teacherMarksService:TeacherMarksService) { }

  ngOnInit(): void {
    this.teacherMarksService.getTeacherClasses().subscribe(res=>{
      this.classesList =res;
      console.log(this.classesList);
    },
    error=>{alert("couldnt fetch teacher classes")})
  }
  @Input() classesList: entityClass[];
  @Input() teacherCoursesList: TeacherCourseLinkingModel[];

  selectedClassId: number;

  dropdownValueChanged(id:number)
  {
    this.selectedClassId=id;
  }

  teacherCourseDropdownValueChanged(id:number)
  {
    console.log(id);
  }
}
