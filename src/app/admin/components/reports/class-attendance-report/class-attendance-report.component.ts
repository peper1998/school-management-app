import { Component, Input, OnInit } from "@angular/core";
import { ClassAttendance, StudentAttendance } from "src/app/_services/reports/reports.service";

@Component({
  selector: 'app-class-attendance-report',
  templateUrl: './class-attendance-report.component.html',
  styleUrls: ['./class-attendance-report.component.scss']
})
export class ClassAttendanceReportComponent implements OnInit {
  students: StudentAttendance[];
  selectedClassName: string;

  constructor() { }

  @Input() classes: ClassAttendance[];

  ngOnInit(): void {
  }

  classSelected(dataItem:any) {
    this.selectedClassName= dataItem.dataItem.className;
    this.students = dataItem.dataItem.students;
  }

}
