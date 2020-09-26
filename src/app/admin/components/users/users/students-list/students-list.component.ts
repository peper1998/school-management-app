import { Component, Input, OnInit } from '@angular/core';
import { StudentGet } from 'src/app/_models/students/student-get';

@Component({
  selector: 'app-students-list',
  templateUrl: './students-list.component.html',
  styleUrls: ['./students-list.component.scss']
})
export class StudentsListComponent implements OnInit {

  constructor() { }
  @Input() gridData: StudentGet[];
  ngOnInit(): void {
  }

}
