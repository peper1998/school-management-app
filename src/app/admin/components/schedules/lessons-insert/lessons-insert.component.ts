import { Component, OnInit, Input } from '@angular/core';
import { ClassModel } from 'src/app/_models/class/class.model';
import { TeacherCourseLinkingModel } from 'src/app/_models/courses/teacher-course-linking.model';

@Component({
  selector: 'app-lessons-insert',
  templateUrl: './lessons-insert.component.html',
  styleUrls: ['./lessons-insert.component.scss']
})
export class LessonsInsertComponent implements OnInit {

  @Input() classesList: ClassModel[];
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

  constructor() { }

  ngOnInit() {
  }

}
