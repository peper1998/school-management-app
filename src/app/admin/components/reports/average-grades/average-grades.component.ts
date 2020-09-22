import { Component, OnInit } from "@angular/core";
import { ClassGrades, CourseGrade, ReportsService, StudentGrades } from "src/app/_services/reports/reports.service";

@Component({
  selector: 'app-average-grades',
  templateUrl: './average-grades.component.html',
  styleUrls: ['./average-grades.component.scss']
})
export class AverageGradesComponent implements OnInit {

  classesGrades: ClassGrades[];
  dropdownItems: string[];
  selectedClass: ClassGrades;
  selectedStudentGrades: CourseGrade[];
  selectedStudent: StudentGrades;

  constructor(private reportsService:ReportsService) { }

  ngOnInit(): void {
    this.reportsService.getClassesGrades().subscribe(res=>{
      this.classesGrades=res;
      this.dropdownItems = res.map(x=>x.className);
    })
  }

  dropdownValueChanged(className:string)
  {
    this.selectedClass = this.classesGrades.find(x=>x.className===className);
  }

  studentSelected(data:StudentGrades)
  {
    this.selectedStudent = data;
    this.selectedStudentGrades = data.courseGrades;
    console.log(data)
  }

}
