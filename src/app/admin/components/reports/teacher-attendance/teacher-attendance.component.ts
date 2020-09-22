import { Component, Input, OnInit } from "@angular/core";
import { TeacherAttendance } from "src/app/_services/reports/reports.service";

@Component({
  selector: 'app-teacher-attendance',
  templateUrl: './teacher-attendance.component.html',
  styleUrls: ['./teacher-attendance.component.scss']
})
export class TeacherAttendanceComponent implements OnInit {

  @Input() report:TeacherAttendance[];

  constructor() { }

  ngOnInit(): void {
  }

}
