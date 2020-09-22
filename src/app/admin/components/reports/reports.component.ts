import { Component, OnInit } from "@angular/core";
import { ClassAttendance, ReportsService, TeacherAttendance } from "src/app/_services/reports/reports.service";

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.scss']
})
export class ReportsComponent implements OnInit {
  classesAttendanceReport: ClassAttendance[];
  teacherAttendanceReport: TeacherAttendance[];

  constructor(private reportsService:ReportsService) { }

  ngOnInit(): void {
    this.reportsService.getClassesAttendance().subscribe(res=>{
      this.classesAttendanceReport=res;
    })

    this.reportsService.getTeacherAttendance().subscribe(res=>{
      this.teacherAttendanceReport=res;
    })

  }

}
